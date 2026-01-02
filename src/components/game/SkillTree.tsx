import { motion } from 'framer-motion';
import { Lock, Check, Star, ChevronRight } from 'lucide-react';
import { SkillNode } from '@/data/learningData';
import { Progress } from '@/components/ui/progress';

interface SkillTreeProps {
  skills: SkillNode[];
  onSkillClick: (skill: SkillNode) => void;
}

export function SkillTree({ skills, onSkillClick }: SkillTreeProps) {
  const getStatusStyles = (status: SkillNode['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-primary border-primary text-primary-foreground';
      case 'in-progress':
        return 'bg-card border-primary border-2 text-foreground cursor-pointer hover:scale-105';
      case 'available':
        return 'bg-card border-border text-foreground cursor-pointer hover:scale-105 hover:border-primary';
      case 'locked':
        return 'bg-muted border-border text-muted-foreground opacity-60';
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 py-4">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative w-full max-w-md"
        >
          {/* Connection line to next skill */}
          {index < skills.length - 1 && (
            <div className="absolute left-1/2 top-full h-4 w-1 -translate-x-1/2 bg-border" />
          )}

          <motion.button
            onClick={() => skill.status !== 'locked' && onSkillClick(skill)}
            disabled={skill.status === 'locked'}
            className={`w-full rounded-2xl border p-4 transition-all card-shadow ${getStatusStyles(skill.status)}`}
            whileHover={skill.status !== 'locked' ? { scale: 1.02 } : {}}
            whileTap={skill.status !== 'locked' ? { scale: 0.98 } : {}}
          >
            <div className="flex items-center gap-4">
              {/* Icon */}
              <div className={`flex h-14 w-14 items-center justify-center rounded-xl text-2xl ${
                skill.status === 'completed' ? 'bg-primary-foreground/20' :
                skill.status === 'locked' ? 'bg-muted' : 'bg-primary-light'
              }`}>
                {skill.status === 'locked' ? (
                  <Lock className="h-6 w-6" />
                ) : skill.status === 'completed' ? (
                  <Check className="h-6 w-6" />
                ) : (
                  <span>{skill.icon}</span>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold">{skill.name}</h3>
                  {skill.status === 'completed' && (
                    <div className="flex items-center gap-1 rounded-full bg-primary-foreground/20 px-2 py-0.5 text-xs">
                      <Star className="h-3 w-3 fill-current" />
                      <span>Mastered</span>
                    </div>
                  )}
                </div>
                <p className="text-sm opacity-80">{skill.description}</p>
                
                {/* Progress bar for in-progress skills */}
                {skill.status === 'in-progress' && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span>Level {skill.level}/{skill.maxLevel}</span>
                      <span>{Math.round((skill.xpEarned / skill.xpRequired) * 100)}%</span>
                    </div>
                    <Progress 
                      value={(skill.xpEarned / skill.xpRequired) * 100} 
                      variant="level" 
                      size="sm" 
                    />
                  </div>
                )}
              </div>

              {/* Arrow */}
              {skill.status !== 'locked' && skill.status !== 'completed' && (
                <ChevronRight className="h-6 w-6 text-muted-foreground" />
              )}
            </div>
          </motion.button>
        </motion.div>
      ))}
    </div>
  );
}
