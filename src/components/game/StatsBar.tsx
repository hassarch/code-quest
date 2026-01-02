import { motion } from 'framer-motion';
import { Flame, Heart, Zap, Trophy } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { Progress } from '@/components/ui/progress';

export function StatsBar() {
  const { userProgress, getXpProgressPercent } = useGame();

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex items-center justify-between gap-3 rounded-2xl bg-card p-3 card-shadow"
    >
      {/* Streak */}
      <div className="flex items-center gap-2">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-streak/10"
        >
          <Flame className="h-5 w-5 text-streak" />
        </motion.div>
        <div className="hidden sm:block">
          <p className="text-xs text-muted-foreground">Streak</p>
          <p className="font-bold text-streak">{userProgress.streak}</p>
        </div>
        <span className="sm:hidden font-bold text-streak">{userProgress.streak}</span>
      </div>

      {/* XP */}
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-xp">
          <Zap className="h-5 w-5 text-secondary-foreground" />
        </div>
        <div className="hidden sm:block">
          <p className="text-xs text-muted-foreground">Total XP</p>
          <p className="font-bold text-secondary">{userProgress.totalXp}</p>
        </div>
        <span className="sm:hidden font-bold text-secondary">{userProgress.totalXp}</span>
      </div>

      {/* Level */}
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-level">
          <Trophy className="h-5 w-5 text-primary-foreground" />
        </div>
        <div className="flex-1 min-w-[80px]">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Level {userProgress.level}</p>
            <p className="text-xs font-medium text-primary">{Math.round(getXpProgressPercent())}%</p>
          </div>
          <Progress value={getXpProgressPercent()} variant="level" size="sm" className="mt-1" />
        </div>
      </div>

      {/* Hearts */}
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-hearts/10">
          <Heart className="h-5 w-5 text-hearts fill-hearts" />
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: userProgress.maxHearts }).map((_, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{
                scale: i < userProgress.hearts ? 1 : 0.8,
                opacity: i < userProgress.hearts ? 1 : 0.3,
              }}
            >
              <Heart
                className={`h-4 w-4 ${
                  i < userProgress.hearts ? 'text-hearts fill-hearts' : 'text-muted-foreground'
                }`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
