import { motion } from 'framer-motion';
import { Play, CheckCircle, Star, Clock } from 'lucide-react';
import { Lesson, SkillNode } from '@/data/learningData';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useGame } from '@/contexts/GameContext';

interface LessonListProps {
  skill: SkillNode;
  onStartLesson: (lesson: Lesson) => void;
  onBack: () => void;
}

export function LessonList({ skill, onStartLesson, onBack }: LessonListProps) {
  const { userProgress } = useGame();

  const getLessonStatus = (lesson: Lesson, index: number) => {
    if (userProgress.completedLessons.includes(lesson.id)) return 'completed';
    
    // First uncompleted lesson is available
    const previousLessons = skill.lessons.slice(0, index);
    const allPreviousCompleted = previousLessons.every(l => 
      userProgress.completedLessons.includes(l.id)
    );
    
    return allPreviousCompleted ? 'available' : 'locked';
  };

  const completedCount = skill.lessons.filter(l => 
    userProgress.completedLessons.includes(l.id)
  ).length;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      {/* Header */}
      <Card className="p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light text-3xl">
            {skill.icon}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{skill.name}</h2>
            <p className="text-muted-foreground">{skill.description}</p>
            <div className="mt-2 flex items-center gap-2 text-sm">
              <span className="font-medium text-primary">
                {completedCount}/{skill.lessons.length} lessons
              </span>
              <Progress 
                value={(completedCount / skill.lessons.length) * 100} 
                className="w-24" 
                size="sm"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Lesson List */}
      <div className="space-y-3">
        {skill.lessons.map((lesson, index) => {
          const status = getLessonStatus(lesson, index);
          
          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                variant={status === 'completed' ? 'success' : 'interactive'}
                className={`p-4 ${status === 'locked' ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => status === 'available' && onStartLesson(lesson)}
              >
                <div className="flex items-center gap-4">
                  {/* Status Icon */}
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    status === 'completed' ? 'bg-primary text-primary-foreground' :
                    status === 'available' ? 'bg-secondary text-secondary-foreground' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {status === 'completed' ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : status === 'available' ? (
                      <Play className="h-6 w-6" />
                    ) : (
                      <Clock className="h-6 w-6" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-bold">{lesson.title}</h3>
                    <p className="text-sm text-muted-foreground">{lesson.description}</p>
                  </div>

                  {/* XP Badge */}
                  <div className="flex items-center gap-1 rounded-full bg-secondary-light px-3 py-1">
                    <Star className="h-4 w-4 text-secondary" />
                    <span className="font-bold text-secondary">{lesson.xp} XP</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Back Button */}
      <Button variant="outline" onClick={onBack} className="w-full">
        Back to Skills
      </Button>
    </motion.div>
  );
}
