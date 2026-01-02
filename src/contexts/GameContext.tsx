import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from './AuthContext';
import { UserProgress, initialUserProgress, skillTree, SkillNode, getXpProgress } from '@/data/learningData';

interface GameContextType {
  userProgress: UserProgress;
  skills: SkillNode[];
  addXp: (amount: number) => void;
  loseHeart: () => void;
  restoreHearts: () => void;
  completeLesson: (lessonId: string) => void;
  incrementStreak: () => void;
  getCurrentSkill: () => SkillNode | undefined;
  getXpProgressPercent: () => number;
  isSyncing: boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [userProgress, setUserProgress] = useState<UserProgress>(initialUserProgress);
  const [skills, setSkills] = useState<SkillNode[]>(skillTree);
  const [isSyncing, setIsSyncing] = useState(false);

  // Load progress from Firestore when user logs in
  useEffect(() => {
    if (!user) {
      setUserProgress(initialUserProgress);
      setSkills(skillTree);
      return;
    }

    const progressRef = doc(db, 'users', user.id, 'progress', 'current');
    
    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(progressRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserProgress({
          ...initialUserProgress,
          ...data,
        } as UserProgress);
        if (data.skills) {
          setSkills(data.skills as SkillNode[]);
        }
      }
    });

    return () => unsubscribe();
  }, [user]);

  // Save progress to Firestore whenever it changes
  const saveProgress = async (progress: UserProgress, currentSkills: SkillNode[]) => {
    if (!user) return;
    
    setIsSyncing(true);
    try {
      const progressRef = doc(db, 'users', user.id, 'progress', 'current');
      await setDoc(progressRef, {
        ...progress,
        skills: currentSkills,
        updatedAt: new Date(),
      }, { merge: true });
    } catch (error) {
      console.error('Failed to sync progress:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  const addXp = (amount: number) => {
    setUserProgress(prev => {
      const newTotalXp = prev.totalXp + amount;
      const newLevel = Math.floor(newTotalXp / 100) + 1;
      const updated = {
        ...prev,
        totalXp: newTotalXp,
        level: Math.max(prev.level, newLevel),
      };
      saveProgress(updated, skills);
      return updated;
    });
  };

  const loseHeart = () => {
    setUserProgress(prev => {
      const updated = {
        ...prev,
        hearts: Math.max(0, prev.hearts - 1),
      };
      saveProgress(updated, skills);
      return updated;
    });
  };

  const restoreHearts = () => {
    setUserProgress(prev => {
      const updated = {
        ...prev,
        hearts: prev.maxHearts,
      };
      saveProgress(updated, skills);
      return updated;
    });
  };

  const completeLesson = (lessonId: string) => {
    setUserProgress(prev => {
      const updated = {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
      };
      
      // Update skill progress
      const skillId = lessonId.split('-')[0];
      const updatedSkills: SkillNode[] = skills.map(skill => {
        if (skill.id === skillId) {
          const totalLessons = skill.lessons.length;
          const completedCount = skill.lessons.filter(l => 
            updated.completedLessons.includes(l.id) || l.id === lessonId
          ).length;
          const newXpEarned = (completedCount / totalLessons) * skill.xpRequired;
          const newStatus: SkillNode['status'] = completedCount === totalLessons ? 'completed' : 'in-progress';
          
          return {
            ...skill,
            xpEarned: newXpEarned,
            level: Math.floor(completedCount / (totalLessons / skill.maxLevel)),
            status: newStatus,
          };
        }
        if (skill.status === 'locked') {
          const prereqSkill = skills.find(s => s.connections.includes(skill.id));
          if (prereqSkill && prereqSkill.status === 'completed') {
            const newStatus: SkillNode['status'] = 'available';
            return { ...skill, status: newStatus };
          }
        }
        return skill;
      });
      
      setSkills(updatedSkills);
      saveProgress(updated, updatedSkills);
      return updated;
    });
  };

  const incrementStreak = () => {
    setUserProgress(prev => {
      const updated = {
        ...prev,
        streak: prev.streak + 1,
      };
      saveProgress(updated, skills);
      return updated;
    });
  };

  const getCurrentSkill = () => {
    return skills.find(s => s.status === 'in-progress') || skills.find(s => s.status === 'available');
  };

  const getXpProgressPercent = () => {
    return getXpProgress(userProgress.totalXp, userProgress.level);
  };

  return (
    <GameContext.Provider value={{
      userProgress,
      skills,
      addXp,
      loseHeart,
      restoreHearts,
      completeLesson,
      incrementStreak,
      getCurrentSkill,
      getXpProgressPercent,
      isSyncing,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
