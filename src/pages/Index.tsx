import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Trophy, Target, User, ChevronRight, Sparkles, LogOut } from 'lucide-react';
import { GameProvider, useGame } from '@/contexts/GameContext';
import { useAuth } from '@/contexts/AuthContext';
import { StatsBar } from '@/components/game/StatsBar';
import { SkillTree } from '@/components/game/SkillTree';
import { LessonList } from '@/components/game/LessonList';
import { LessonPlayer } from '@/components/game/LessonPlayer';
import { Achievements } from '@/components/game/Achievements';
import { Profile } from '@/components/game/Profile';
import { Mascot } from '@/components/game/Mascot';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SkillNode, Lesson } from '@/data/learningData';
import Auth from './Auth';

type View = 'home' | 'skills' | 'lessons' | 'playing' | 'achievements' | 'profile';

function DashboardContent() {
  const [view, setView] = useState<View>('home');
  const [selectedSkill, setSelectedSkill] = useState<SkillNode | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);

  const { skills, userProgress, getCurrentSkill } = useGame();
  const { user, logout } = useAuth();
  const currentSkill = getCurrentSkill();

  const handleSkillClick = (skill: SkillNode) => {
    setSelectedSkill(skill);
    setView('lessons');
  };

  const handleStartLesson = (lesson: Lesson) => {
    setCurrentLesson(lesson);
    setView('playing');
  };

  const handleLessonComplete = () => {
    setCurrentLesson(null);
    if (selectedSkill) {
      setView('lessons');
    } else {
      setView('home');
    }
  };

  const handleExitLesson = () => {
    setCurrentLesson(null);
    if (selectedSkill) {
      setView('lessons');
    } else {
      setView('home');
    }
  };

  // Lesson playing view
  if (view === 'playing' && currentLesson) {
    return (
      <LessonPlayer
        lesson={currentLesson}
        onComplete={handleLessonComplete}
        onExit={handleExitLesson}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b">
        <div className="container py-4">
          <div className="flex items-center justify-between mb-4">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-xl">
                🐍
              </div>
              <div>
                <h1 className="text-xl font-bold">CodeQuest</h1>
                <p className="text-xs text-muted-foreground">
                  Hi, {user?.displayName || 'Coder'}!
                </p>
              </div>
            </motion.div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setView('profile')} 
                title="Profile"
                className="rounded-full"
              >
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={logout} title="Logout">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <StatsBar />
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        {view === 'home' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Welcome Card */}
            <Card className="overflow-hidden gradient-hero border-0">
              <div className="flex items-center gap-4 p-6">
                <Mascot mood="happy" size="md" />
                <div className="flex-1">
                  <h2 className="text-xl font-bold">
                    {userProgress.streak > 0 
                      ? `${userProgress.streak} day streak! 🔥` 
                      : `Welcome, ${user?.displayName || 'Coder'}!`}
                  </h2>
                  <p className="text-muted-foreground">
                    {currentSkill 
                      ? `Continue learning ${currentSkill.name}`
                      : 'Start your coding journey!'}
                  </p>
                  {currentSkill && (
                    <Button
                      className="mt-4"
                      onClick={() => handleSkillClick(currentSkill)}
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Continue
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  )}
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Card
                variant="interactive"
                className="p-4"
                onClick={() => setView('skills')}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Learn</h3>
                    <p className="text-sm text-muted-foreground">Browse skills</p>
                  </div>
                </div>
              </Card>

              <Card
                variant="interactive"
                className="p-4"
                onClick={() => setView('achievements')}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-light">
                    <Trophy className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Badges</h3>
                    <p className="text-sm text-muted-foreground">{userProgress.badges.length} earned</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Today's Goal */}
            <Card className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <Target className="h-5 w-5 text-primary" />
                <h3 className="font-bold">Today's Goal</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Complete 1 lesson</span>
                  <span className="font-bold text-primary">0/1</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-0 rounded-full bg-primary transition-all" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Complete a lesson to keep your streak going!
                </p>
              </div>
            </Card>

            {/* Skill Preview */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Your Journey</h3>
                <Button variant="ghost" size="sm" onClick={() => setView('skills')}>
                  See all
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              <SkillTree 
                skills={skills.slice(0, 3)} 
                onSkillClick={handleSkillClick} 
              />
            </div>
          </motion.div>
        )}

        {view === 'skills' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setView('home')}>
                ← Back
              </Button>
              <h2 className="text-2xl font-bold">Learning Path</h2>
            </div>
            <p className="text-muted-foreground">
              Master Python step by step. Complete skills to unlock new ones!
            </p>
            <SkillTree skills={skills} onSkillClick={handleSkillClick} />
          </motion.div>
        )}

        {view === 'lessons' && selectedSkill && (
          <LessonList
            skill={selectedSkill}
            onStartLesson={handleStartLesson}
            onBack={() => {
              setSelectedSkill(null);
              setView('skills');
            }}
          />
        )}

        {view === 'achievements' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <Button variant="ghost" size="sm" onClick={() => setView('home')}>
              ← Back
            </Button>
            <Achievements />
          </motion.div>
        )}

        {view === 'profile' && (
          <Profile onBack={() => setView('home')} />
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-20 border-t bg-card/95 backdrop-blur">
        <div className="container flex items-center justify-around py-2">
          <button
            onClick={() => setView('home')}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${
              view === 'home' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <div className={`p-2 rounded-xl ${view === 'home' ? 'bg-primary-light' : ''}`}>
              <BookOpen className="h-6 w-6" />
            </div>
            <span className="text-xs font-medium">Home</span>
          </button>

          <button
            onClick={() => setView('skills')}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${
              view === 'skills' || view === 'lessons' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <div className={`p-2 rounded-xl ${view === 'skills' || view === 'lessons' ? 'bg-primary-light' : ''}`}>
              <Target className="h-6 w-6" />
            </div>
            <span className="text-xs font-medium">Learn</span>
          </button>

          <button
            onClick={() => setView('achievements')}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${
              view === 'achievements' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <div className={`p-2 rounded-xl ${view === 'achievements' ? 'bg-primary-light' : ''}`}>
              <Trophy className="h-6 w-6" />
            </div>
            <span className="text-xs font-medium">Badges</span>
          </button>

          <button
            onClick={() => setView('profile')}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${
              view === 'profile' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <div className={`p-2 rounded-xl ${view === 'profile' ? 'bg-primary-light' : ''}`}>
              <User className="h-6 w-6" />
            </div>
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

function AuthenticatedApp() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4 animate-pulse">
            🐍
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </motion.div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Auth />;
  }

  return (
    <GameProvider>
      <DashboardContent />
    </GameProvider>
  );
}

export default function Index() {
  return <AuthenticatedApp />;
}
