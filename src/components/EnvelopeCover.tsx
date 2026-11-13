import { useState, type MouseEvent } from 'react';
import { motion } from 'motion/react';

interface EnvelopeCoverProps {
  onOpen: (clientX?: number, clientY?: number) => void;
}

export function EnvelopeCover({ onOpen }: EnvelopeCoverProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleTap = (e: MouseEvent<HTMLButtonElement>) => {
    if (isOpening) return;
    setIsOpening(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX || rect.left + rect.width / 2;
    const y = e.clientY || rect.top + rect.height / 2;
    onOpen(x, y);
  };

  return (
    <motion.section
      key="cover"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.04, y: -16 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 min-h-[100dvh] w-full flex flex-col items-center justify-center px-6 py-10 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="mb-8 sm:mb-10"
      >
        <h1 className="font-script text-4xl sm:text-5xl md:text-6xl text-[#F5E7CC] tracking-wide drop-shadow-[0_3px_10px_rgba(0,0,0,0.35)]">
          Para você, Louyze
        </h1>
        <p className="mt-2 font-serif italic text-sm sm:text-base text-[#E6CEAC]/90">
          meu amor, de Luka com todo o coração
        </p>
      </motion.div>

      <motion.button
        type="button"
        onClick={handleTap}
        aria-label="Abrir cartinha de amor"
        initial={{ opacity: 0, y: 18, rotate: -3 }}
        animate={
          isOpening
            ? { scale: 1.08, rotate: 0, y: -12 }
            : {
                opacity: 1,
                y: [0, -7, 0],
                rotate: [-3, -2, -3],
              }
        }
        transition={
          isOpening
            ? { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
            : {
                opacity: { duration: 0.5, delay: 0.2 },
                y: { duration: 4.2, repeat: Infinity, ease: 'easeInOut' },
                rotate: { duration: 5.5, repeat: Infinity, ease: 'easeInOut' },
              }
        }
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.03 }}
        className="group relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5E7CC] rounded-2xl p-3 min-h-[44px] min-w-[44px]"
      >
        <div className="relative w-64 sm:w-72 md:w-80 aspect-[4/3] drop-shadow-[0_22px_36px_rgba(24,4,3,0.6)]">
          <svg
            viewBox="0 0 320 230"
            className="w-full h-full overflow-visible"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="envPaper" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F7EAD0" />
                <stop offset="55%" stopColor="#EFE0BE" />
                <stop offset="100%" stopColor="#E1C99F" />
              </linearGradient>
              <linearGradient id="envInner" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#E6D0A7" />
                <stop offset="100%" stopColor="#D7BC8D" />
              </linearGradient>
              <linearGradient id="envFlap" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FAF0DC" />
                <stop offset="100%" stopColor="#EBD5AF" />
              </linearGradient>
              <radialGradient id="waxGrad" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#D94545" />
                <stop offset="55%" stopColor="#A61C1C" />
                <stop offset="100%" stopColor="#6D0F0F" />
              </radialGradient>
            </defs>

            {/* Envelope base */}
            <rect
              x="12"
              y="22"
              width="296"
              height="188"
              rx="8"
              fill="url(#envPaper)"
              stroke="#D6B98B"
              strokeWidth="1.5"
            />

            {/* Side & bottom fold shading */}
            <polygon points="14,24 160,126 14,208" fill="#EBD7B4" opacity="0.65" />
            <polygon points="306,24 160,126 306,208" fill="#E4CCA3" opacity="0.7" />
            <polygon
              points="14,208 160,112 306,208"
              fill="url(#envInner)"
              stroke="#D4B788"
              strokeWidth="1"
            />

            {/* Top triangular flap */}
            <motion.g
              animate={isOpening ? { scaleY: -0.65, y: -14 } : { scaleY: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: '160px 24px' }}
            >
              <path
                d="M14,24 L160,136 L306,24 Z"
                fill="url(#envFlap)"
                stroke="#D4B788"
                strokeWidth="1.2"
              />
            </motion.g>

            {/* Dried golden floral sprig tucked behind wax seal */}
            <g transform="translate(154, 52) rotate(12)">
              <path
                d="M12,86 C14,62 18,36 28,6"
                fill="none"
                stroke="#B88743"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M16,58 C26,48 34,38 38,24"
                fill="none"
                stroke="#B88743"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M18,46 C8,36 4,24 6,14"
                fill="none"
                stroke="#B88743"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <circle cx="28" cy="6" r="4" fill="#E4BA6C" />
              <circle cx="38" cy="24" r="3.5" fill="#D9A852" />
              <circle cx="6" cy="14" r="3.5" fill="#E4BA6C" />
              <circle cx="22" cy="24" r="3" fill="#F0CF85" />
              <circle cx="32" cy="36" r="3" fill="#E4BA6C" />
              <circle cx="10" cy="30" r="2.8" fill="#D9A852" />
            </g>

            {/* Crimson heart wax seal */}
            <g transform="translate(160, 128)">
              <circle cx="0" cy="2" r="24" fill="rgba(75,12,10,0.28)" />
              <path
                d="M-22,-3 C-24,-14 -14,-23 -3,-22 C7,-24 19,-18 22,-6 C25,5 19,17 8,21 C-3,24 -17,19 -21,8 C-23,4 -22,0 -22,-3 Z"
                fill="url(#waxGrad)"
                stroke="#7A1212"
                strokeWidth="1.2"
              />
              <circle
                cx="0"
                cy="0"
                r="16.5"
                fill="none"
                stroke="#E46B6B"
                strokeOpacity="0.35"
                strokeWidth="1.4"
              />
              {/* Embossed heart inside seal */}
              <path
                d="M0,9 L-1.2,7.9 C-5.8,3.8 -8.8,1.1 -8.8,-2.2 C-8.8,-4.9 -6.7,-7 -4,-7 C-2.5,-7 -1,-6.3 0,-5.1 C1,-6.3 2.5,-7 4,-7 C6.7,-7 8.8,-4.9 8.8,-2.2 C8.8,1.1 5.8,3.8 1.2,7.9 Z"
                fill="#801111"
                stroke="#DF5D5D"
                strokeOpacity="0.45"
                strokeWidth="0.8"
              />
            </g>
          </svg>
        </div>

        <motion.span
          animate={{ opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="mt-5 inline-block font-script text-2xl sm:text-3xl text-[#F5E7CC] tracking-wide"
        >
          Toque para abrir!
        </motion.span>
      </motion.button>
    </motion.section>
  );
}
