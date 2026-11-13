import { AnimatePresence, motion } from 'motion/react';

export interface HeartBurstItem {
  id: number;
  startX: number; // viewport %
  startY: number; // viewport %
  driftX: number; // px
  riseY: number; // px
  size: number; // px
  rotation: number;
  delay: number;
  duration: number;
  color: string;
}

const HEART_COLORS = [
  '#E63946',
  '#FF4D6D',
  '#FF758F',
  '#C9184A',
  '#F5E7CC',
  '#FFB3C1',
  '#D62828',
];

export function createHeartBurst(
  originXPercent = 50,
  originYPercent = 55,
  count = 26
): HeartBurstItem[] {
  const now = Date.now();
  return Array.from({ length: count }, (_, i) => {
    const spreadAcrossScreen = i % 3 === 0;
    const startX = spreadAcrossScreen
      ? 10 + Math.random() * 80
      : Math.min(92, Math.max(8, originXPercent + (Math.random() - 0.5) * 34));
    const startY = spreadAcrossScreen
      ? 35 + Math.random() * 55
      : Math.min(90, Math.max(15, originYPercent + (Math.random() - 0.5) * 20));

    return {
      id: now + i + Math.random(),
      startX,
      startY,
      driftX: (Math.random() - 0.5) * 180,
      riseY: -(150 + Math.random() * 260),
      size: 16 + Math.random() * 22,
      rotation: (Math.random() - 0.5) * 55,
      delay: Math.random() * 0.22,
      duration: 1.05 + Math.random() * 0.75,
      color: HEART_COLORS[i % HEART_COLORS.length],
    };
  });
}

function HeartSvg({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      aria-hidden="true"
      className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.28)]"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

export function HeartBurstOverlay({ hearts }: { hearts: HeartBurstItem[] }) {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      aria-hidden="true"
    >
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{
              opacity: 0,
              scale: 0.25,
              x: 0,
              y: 0,
              rotate: 0,
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.3, 1.15, 0.95, 0.65],
              x: heart.driftX,
              y: heart.riseY,
              rotate: heart.rotation,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              position: 'absolute',
              left: `${heart.startX}%`,
              top: `${heart.startY}%`,
              willChange: 'transform, opacity',
            }}
          >
            <HeartSvg size={heart.size} color={heart.color} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

const AMBIENT_ITEMS = [
  { left: '8%', top: '18%', size: 12, duration: 9, delay: 0 },
  { left: '86%', top: '14%', size: 14, duration: 11, delay: 1.5 },
  { left: '16%', top: '76%', size: 10, duration: 10, delay: 2.2 },
  { left: '90%', top: '68%', size: 13, duration: 12, delay: 0.8 },
  { left: '50%', top: '8%', size: 10, duration: 13, delay: 3 },
  { left: '28%', top: '42%', size: 9, duration: 14, delay: 1.2 },
  { left: '74%', top: '38%', size: 11, duration: 11.5, delay: 2.7 },
];

export function AmbientHearts() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {AMBIENT_ITEMS.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0.08, y: 0 }}
          animate={{
            opacity: [0.06, 0.18, 0.06],
            y: [-10, 12, -10],
            rotate: [-6, 6, -6],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            left: item.left,
            top: item.top,
          }}
        >
          <HeartSvg size={item.size} color="#F5E7CC" />
        </motion.div>
      ))}
    </div>
  );
}
