import { motion } from 'framer-motion';
import { allBadges, Badge } from '@/data/learningData';
import { useGame } from '@/contexts/GameContext';
import { Card } from '@/components/ui/card';
import { Lock } from 'lucide-react';

export function Achievements() {
  const { userProgress } = useGame();

  const earnedBadgeIds = userProgress.badges.map(b => b.id);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Achievements</h2>
      <p className="text-muted-foreground">
        Earn badges by completing lessons and maintaining streaks!
      </p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {allBadges.map((badge, index) => {
          const isEarned = earnedBadgeIds.includes(badge.id);
          
          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className={`p-4 text-center transition-all ${
                  isEarned 
                    ? 'bg-secondary-light border-secondary/30' 
                    : 'opacity-60'
                }`}
              >
                <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl text-3xl ${
                  isEarned ? 'bg-secondary/20' : 'bg-muted'
                }`}>
                  {isEarned ? badge.icon : <Lock className="h-6 w-6 text-muted-foreground" />}
                </div>
                <h3 className={`mt-3 font-bold ${isEarned ? '' : 'text-muted-foreground'}`}>
                  {badge.name}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {badge.requirement}
                </p>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
