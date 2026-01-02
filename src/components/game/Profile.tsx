import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Trophy, 
  Flame, 
  Zap, 
  BookOpen, 
  Edit2, 
  Check, 
  X, 
  ChevronLeft,
  Calendar,
  Target,
  Star
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Mascot } from './Mascot';
import { allBadges } from '@/data/learningData';
import { updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

interface ProfileProps {
  onBack: () => void;
}

export function Profile({ onBack }: ProfileProps) {
  const { user } = useAuth();
  const { userProgress, skills } = useGame();
  const { toast } = useToast();
  
  const [isEditingName, setIsEditingName] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(user?.displayName || '');
  const [isSaving, setIsSaving] = useState(false);

  const completedLessonsCount = userProgress.completedLessons.length;
  const totalLessonsCount = skills.reduce((acc, skill) => acc + skill.lessons.length, 0);
  const completionPercent = totalLessonsCount > 0 
    ? Math.round((completedLessonsCount / totalLessonsCount) * 100) 
    : 0;

  const earnedBadgeIds = userProgress.badges.map(b => b.id);
  const earnedBadges = userProgress.badges;
  const lockedBadges = allBadges.filter(badge => !earnedBadgeIds.includes(badge.id));

  const handleSaveName = async () => {
    if (!newDisplayName.trim() || !auth.currentUser) return;
    
    setIsSaving(true);
    try {
      await updateProfile(auth.currentUser, { displayName: newDisplayName.trim() });
      toast({
        title: "Name updated!",
        description: "Your display name has been changed.",
      });
      setIsEditingName(false);
    } catch (error) {
      toast({
        title: "Failed to update",
        description: "Could not update your display name. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setNewDisplayName(user?.displayName || '');
    setIsEditingName(false);
  };

  // Get learning history from completed lessons
  const learningHistory = userProgress.completedLessons.map(lessonId => {
    const skillId = lessonId.split('-')[0];
    const skill = skills.find(s => s.id === skillId);
    const lesson = skill?.lessons.find(l => l.id === lessonId);
    return {
      id: lessonId,
      skillName: skill?.name || 'Unknown',
      lessonTitle: lesson?.title || 'Unknown Lesson',
      xp: lesson?.xp || 0,
    };
  }).reverse().slice(0, 10);

  const stats = [
    { icon: Zap, label: 'Total XP', value: userProgress.totalXp, color: 'text-yellow-500' },
    { icon: Trophy, label: 'Level', value: userProgress.level, color: 'text-primary' },
    { icon: Flame, label: 'Day Streak', value: userProgress.streak, color: 'text-orange-500' },
    { icon: BookOpen, label: 'Lessons Done', value: completedLessonsCount, color: 'text-blue-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>

      {/* Profile Card */}
      <Card className="overflow-hidden">
        <div className="gradient-hero p-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-background flex items-center justify-center border-4 border-background shadow-lg">
                <Mascot mood="happy" size="sm" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                Lvl {userProgress.level}
              </div>
            </div>
            <div className="flex-1">
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={newDisplayName}
                    onChange={(e) => setNewDisplayName(e.target.value)}
                    className="h-9 bg-background/90"
                    placeholder="Enter your name"
                    maxLength={30}
                  />
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-9 w-9"
                    onClick={handleSaveName}
                    disabled={isSaving}
                  >
                    <Check className="h-4 w-4 text-primary" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-9 w-9"
                    onClick={handleCancelEdit}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold">{user?.displayName || 'Coder'}</h2>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8"
                    onClick={() => setIsEditingName(true)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              <div className="flex items-center gap-1 mt-1 text-sm">
                <Calendar className="h-3 w-3" />
                <span className="text-muted-foreground">
                  Joined {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'recently'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl bg-muted ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Overall Progress */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            Overall Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Course Completion</span>
              <span className="font-bold">{completionPercent}%</span>
            </div>
            <Progress value={completionPercent} className="h-3" />
            <p className="text-xs text-muted-foreground">
              {completedLessonsCount} of {totalLessonsCount} lessons completed
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-500" />
            Achievements ({earnedBadges.length}/{allBadges.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {earnedBadges.map((badge) => (
              <motion.div
                key={badge.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full"
              >
                <span className="text-lg">{badge.icon}</span>
                <span className="text-sm font-medium">{badge.name}</span>
              </motion.div>
            ))}
            {lockedBadges.slice(0, 3).map((badge) => (
              <div
                key={badge.id}
                className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full opacity-50"
              >
                <span className="text-lg grayscale">{badge.icon}</span>
                <span className="text-sm text-muted-foreground">???</span>
              </div>
            ))}
            {lockedBadges.length > 3 && (
              <Badge variant="secondary" className="px-3">
                +{lockedBadges.length - 3} more
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Learning History */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-blue-500" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          {learningHistory.length > 0 ? (
            <div className="space-y-3">
              {learningHistory.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{item.lessonTitle}</p>
                      <p className="text-xs text-muted-foreground">{item.skillName}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    +{item.xp} XP
                  </Badge>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <Mascot mood="thinking" size="sm" />
              <p className="text-muted-foreground mt-2">No lessons completed yet</p>
              <p className="text-sm text-muted-foreground">Start learning to see your history!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
