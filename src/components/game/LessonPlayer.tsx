import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Zap, Check, AlertCircle } from 'lucide-react';
import { Question, Lesson } from '@/data/learningData';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useGame } from '@/contexts/GameContext';
import { Mascot } from './Mascot';

interface LessonPlayerProps {
  lesson: Lesson;
  onComplete: () => void;
  onExit: () => void;
}

export function LessonPlayer({ lesson, onComplete, onExit }: LessonPlayerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);
  const [showComplete, setShowComplete] = useState(false);
  const [fillBlankAnswer, setFillBlankAnswer] = useState('');

  const { userProgress, addXp, loseHeart, completeLesson } = useGame();

  const currentQuestion = lesson.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / lesson.questions.length) * 100;

  const handleAnswerSelect = (answer: string | number) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null && currentQuestion.type !== 'fill-blank') return;
    
    const answerToCheck = currentQuestion.type === 'fill-blank' 
      ? fillBlankAnswer.trim().toLowerCase()
      : selectedAnswer;
    
    const correctAnswer = typeof currentQuestion.correctAnswer === 'string'
      ? currentQuestion.correctAnswer.toLowerCase()
      : currentQuestion.correctAnswer;
    
    const correct = answerToCheck === correctAnswer;
    setIsCorrect(correct);
    setIsAnswered(true);

    if (correct) {
      setEarnedXp(prev => prev + currentQuestion.xp);
      addXp(currentQuestion.xp);
    } else {
      loseHeart();
    }
  };

  const handleContinue = () => {
    if (currentQuestionIndex < lesson.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setFillBlankAnswer('');
      setIsAnswered(false);
      setIsCorrect(false);
    } else {
      completeLesson(lesson.id);
      setShowComplete(true);
    }
  };

  if (showComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex min-h-screen flex-col items-center justify-center p-6 gradient-hero"
      >
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="text-center"
        >
          <Mascot mood="celebrating" size="lg" />
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-4xl font-bold text-primary"
          >
            Lesson Complete! 🎉
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex items-center justify-center gap-2 text-2xl"
          >
            <div className="flex items-center gap-2 rounded-2xl bg-secondary-light px-6 py-3">
              <Zap className="h-8 w-8 text-secondary" />
              <span className="font-bold text-secondary">+{earnedXp} XP</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8"
          >
            <Button size="xl" onClick={onComplete}>
              Continue Learning
            </Button>
          </motion.div>
        </motion.div>

        {/* Confetti effect */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: window.innerHeight + 20,
              rotate: 0,
            }}
            animate={{ 
              y: -20,
              rotate: 720,
              opacity: [1, 1, 0],
            }}
            transition={{ 
              duration: 2 + Math.random(),
              delay: Math.random() * 0.5,
              ease: 'easeOut',
            }}
            className="fixed text-2xl"
            style={{ left: Math.random() * 100 + '%' }}
          >
            {['🎉', '⭐', '🌟', '✨', '🎊'][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur p-4 border-b">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onExit}>
            <X className="h-5 w-5" />
          </Button>
          
          <Progress value={progress} className="flex-1" variant="lesson" size="md" />
          
          <div className="flex items-center gap-1">
            {Array.from({ length: userProgress.maxHearts }).map((_, i) => (
              <Heart
                key={i}
                className={`h-5 w-5 transition-all ${
                  i < userProgress.hearts 
                    ? 'text-hearts fill-hearts' 
                    : 'text-muted-foreground'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="flex-1 p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="mx-auto max-w-2xl space-y-6"
          >
            {/* Question Type Badge */}
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-accent-light px-3 py-1 text-sm font-medium text-accent">
                {currentQuestion.type === 'multiple-choice' && 'Choose the answer'}
                {currentQuestion.type === 'fill-blank' && 'Fill in the blank'}
                {currentQuestion.type === 'predict-output' && 'Predict the output'}
                {currentQuestion.type === 'bug-fix' && 'Fix the bug'}
              </span>
            </div>

            {/* Question */}
            <h2 className="text-2xl font-bold">{currentQuestion.question}</h2>

            {/* Code Block */}
            {currentQuestion.code && (
              <Card className="overflow-hidden bg-foreground text-primary-foreground">
                <pre className="p-4 text-sm overflow-x-auto">
                  <code>{currentQuestion.code}</code>
                </pre>
              </Card>
            )}

            {/* Answer Options */}
            {currentQuestion.type === 'fill-blank' ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={fillBlankAnswer}
                  onChange={(e) => setFillBlankAnswer(e.target.value)}
                  disabled={isAnswered}
                  placeholder="Type your answer..."
                  className="w-full rounded-xl border-2 border-border bg-card p-4 text-lg font-mono focus:border-primary focus:outline-none disabled:opacity-50"
                  autoFocus
                />
              </div>
            ) : (
              <div className="space-y-3">
                {currentQuestion.options?.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={!isAnswered ? { scale: 1.02 } : {}}
                    whileTap={!isAnswered ? { scale: 0.98 } : {}}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={isAnswered}
                    className={`w-full rounded-xl border-2 p-4 text-left transition-all ${
                      isAnswered
                        ? index === currentQuestion.correctAnswer
                          ? 'border-primary bg-primary-light'
                          : selectedAnswer === index
                          ? 'border-destructive bg-destructive/10'
                          : 'border-border opacity-50'
                        : selectedAnswer === index
                        ? 'border-primary bg-primary-light'
                        : 'border-border hover:border-muted-foreground'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg font-bold ${
                        isAnswered
                          ? index === currentQuestion.correctAnswer
                            ? 'bg-primary text-primary-foreground'
                            : selectedAnswer === index
                            ? 'bg-destructive text-destructive-foreground'
                            : 'bg-muted'
                          : selectedAnswer === index
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}>
                        {isAnswered ? (
                          index === currentQuestion.correctAnswer ? (
                            <Check className="h-5 w-5" />
                          ) : selectedAnswer === index ? (
                            <X className="h-5 w-5" />
                          ) : (
                            String.fromCharCode(65 + index)
                          )
                        ) : (
                          String.fromCharCode(65 + index)
                        )}
                      </div>
                      <span className="font-medium">{option}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Explanation */}
            <AnimatePresence>
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card variant={isCorrect ? 'success' : 'warning'} className="p-4">
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <Check className="h-6 w-6 text-primary" />
                      ) : (
                        <AlertCircle className="h-6 w-6 text-secondary" />
                      )}
                      <div>
                        <p className={`font-bold ${isCorrect ? 'text-primary' : 'text-secondary'}`}>
                          {isCorrect ? 'Correct! 🎉' : 'Not quite right'}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {currentQuestion.explanation}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 border-t bg-background/95 backdrop-blur p-4">
        <div className="mx-auto max-w-2xl">
          {!isAnswered ? (
            <Button
              size="xl"
              className="w-full"
              disabled={selectedAnswer === null && fillBlankAnswer.trim() === ''}
              onClick={handleSubmit}
            >
              Check Answer
            </Button>
          ) : (
            <Button
              size="xl"
              className="w-full"
              variant={isCorrect ? 'default' : 'secondary'}
              onClick={handleContinue}
            >
              Continue
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
