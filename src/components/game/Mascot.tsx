import { motion } from 'framer-motion';

interface MascotProps {
  mood?: 'happy' | 'thinking' | 'celebrating' | 'sad' | 'encouraging';
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Mascot({ mood = 'happy', message, size = 'md' }: MascotProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  const moodEmojis = {
    happy: '🦊',
    thinking: '🤔',
    celebrating: '🎉',
    sad: '😢',
    encouraging: '💪',
  };

  const moodAnimations = {
    happy: { rotate: [-3, 3, -3], transition: { repeat: Infinity, duration: 2 } },
    thinking: { y: [0, -5, 0], transition: { repeat: Infinity, duration: 1.5 } },
    celebrating: { scale: [1, 1.1, 1], rotate: [-5, 5, -5], transition: { repeat: Infinity, duration: 0.5 } },
    sad: { y: [0, 3, 0], transition: { repeat: Infinity, duration: 2 } },
    encouraging: { x: [0, 3, 0], transition: { repeat: Infinity, duration: 0.8 } },
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        className={`${sizeClasses[size]} flex items-center justify-center rounded-full bg-primary-light`}
        animate={moodAnimations[mood]}
      >
        <span className={size === 'lg' ? 'text-6xl' : size === 'md' ? 'text-4xl' : 'text-2xl'}>
          {moodEmojis[mood]}
        </span>
      </motion.div>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-[200px] rounded-2xl bg-card p-3 text-center text-sm font-medium card-shadow"
        >
          {message}
        </motion.div>
      )}
    </div>
  );
}
