import type { MouseEvent } from 'react';
import { motion } from 'motion/react';

export type ActiveTab = 'letter' | 'flowers';

interface ChoiceMenuProps {
  onSelect: (tab: ActiveTab, clientX?: number, clientY?: number) => void;
  onBackToEnvelope: (clientX?: number, clientY?: number) => void;
}

export function ChoiceMenu({ onSelect, onBackToEnvelope }: ChoiceMenuProps) {
  const handleSelect = (tab: ActiveTab, e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    onSelect(
      tab,
      e.clientX || rect.left + rect.width / 2,
      e.clientY || rect.top + rect.height / 2
    );
  };

  return (
    <motion.section
      key="menu"
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.97 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 min-h-[100dvh] w-full flex flex-col items-center justify-center px-5 py-10"
    >
      <div className="w-full max-w-xl mx-auto flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.5 }}
          className="font-script text-5xl sm:text-6xl text-[#F5E7CC] text-center drop-shadow-[0_3px_10px_rgba(0,0,0,0.35)]"
        >
          Pra você, Louyze
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.16, duration: 0.5 }}
          className="mt-2 font-serif italic text-sm sm:text-base text-[#E6CEAC]/90 text-center"
        >
          Escolha uma das surpresas abaixo
        </motion.p>

        {/* Strictly ONLY two options: Cartinha and Flores */}
        <div className="mt-10 w-full grid grid-cols-2 gap-4 sm:gap-8 max-w-md sm:max-w-lg">
          {/* Option 1: Cartinha */}
          <motion.button
            type="button"
            onClick={(e) => handleSelect('letter', e)}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, scale: 1.03 }}
            whileTap={{ scale: 0.94 }}
            className="group flex flex-col items-center justify-between p-4 sm:p-6 rounded-3xl bg-[#6F1E17]/75 border border-[#F5E7CC]/20 shadow-[0_14px_30px_rgba(20,4,3,0.4)] hover:bg-[#7D241C]/85 hover:border-[#F5E7CC]/45 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5E7CC] min-h-[44px]"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
              className="w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center"
            >
              <svg viewBox="0 0 160 150" className="w-full h-full drop-shadow-lg" aria-hidden="true">
                {/* Back tilted envelope */}
                <g transform="rotate(-9 80 75)">
                  <rect
                    x="22"
                    y="32"
                    width="110"
                    height="78"
                    rx="6"
                    fill="#E5CBA3"
                    stroke="#C7A678"
                    strokeWidth="1.5"
                  />
                  <path d="M22,34 L77,74 L132,34" fill="none" stroke="#C7A678" strokeWidth="1.4" />
                </g>
                {/* Front envelope */}
                <g transform="rotate(4 84 84)">
                  <rect
                    x="28"
                    y="46"
                    width="112"
                    height="78"
                    rx="6"
                    fill="#F5E6C8"
                    stroke="#D2B284"
                    strokeWidth="1.5"
                  />
                  <path d="M28,122 L84,82 L140,122" fill="#EAD3AE" stroke="#D2B284" strokeWidth="1" />
                  <path d="M28,48 L84,90 L140,48" fill="#FAF0DC" stroke="#D2B284" strokeWidth="1.2" />
                  {/* Heart seal */}
                  <path
                    d="M113,106 L111.7,104.8 C107.1,100.6 104,97.8 104,94.3 C104,91.5 106.2,89.3 109,89.3 C110.6,89.3 112.1,90 113,91.2 C113.9,90 115.4,89.3 117,89.3 C119.8,89.3 122,91.5 122,94.3 C122,97.8 118.9,100.6 114.3,104.8 Z"
                    fill="#C92A2A"
                  />
                </g>
              </svg>
            </motion.div>

            <div className="mt-2 text-center">
              <span className="block font-serif text-lg sm:text-xl font-semibold text-[#F5E7CC] group-hover:text-white">
                Cartinha
              </span>
              <span className="mt-0.5 block font-serif italic text-xs text-[#E6CEAC]/80">
                Ler mensagem
              </span>
            </div>
          </motion.button>

          {/* Option 2: Flores */}
          <motion.button
            type="button"
            onClick={(e) => handleSelect('flowers', e)}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, scale: 1.03 }}
            whileTap={{ scale: 0.94 }}
            className="group flex flex-col items-center justify-between p-4 sm:p-6 rounded-3xl bg-[#6F1E17]/75 border border-[#F5E7CC]/20 shadow-[0_14px_30px_rgba(20,4,3,0.4)] hover:bg-[#7D241C]/85 hover:border-[#F5E7CC]/45 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5E7CC] min-h-[44px]"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3.9, delay: 0.4, repeat: Infinity, ease: 'easeInOut' }}
              className="w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center"
            >
              <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-lg" aria-hidden="true">
                <g transform="rotate(10 80 84)">
                  {/* Kraft paper cone back */}
                  <polygon points="44,44 116,44 82,138" fill="#C99E67" stroke="#A57B47" strokeWidth="1.5" />
                  {/* Foliage */}
                  <ellipse cx="58" cy="48" rx="14" ry="7" transform="rotate(-35 58 48)" fill="#4D7C46" />
                  <ellipse cx="102" cy="48" rx="14" ry="7" transform="rotate(35 102 48)" fill="#3F6B3A" />
                  <ellipse cx="80" cy="36" rx="12" ry="8" fill="#54864D" />

                  {/* Roses */}
                  {[
                    { cx: 64, cy: 48, r: 15, c1: '#E6677B', c2: '#B83349' },
                    { cx: 96, cy: 48, r: 15, c1: '#ED7B8D', c2: '#C23B52' },
                    { cx: 80, cy: 38, r: 16, c1: '#D94B63', c2: '#9E1F35' },
                    { cx: 70, cy: 64, r: 14, c1: '#EC7488', c2: '#B83249' },
                    { cx: 92, cy: 65, r: 14, c1: '#DF586F', c2: '#A8263C' },
                    { cx: 81, cy: 56, r: 15, c1: '#F28B9C', c2: '#C83B54' },
                  ].map((rose, i) => (
                    <g key={i}>
                      <circle cx={rose.cx} cy={rose.cy} r={rose.r} fill={rose.c1} />
                      <path
                        d={`M${rose.cx - 6},${rose.cy - 2} C${rose.cx - 2},${rose.cy - 9} ${rose.cx + 7},${rose.cy - 7} ${rose.cx + 6},${rose.cy + 1} C${rose.cx + 5},${rose.cy + 7} ${rose.cx - 4},${rose.cy + 7} ${rose.cx - 3},${rose.cy + 1}`}
                        fill="none"
                        stroke={rose.c2}
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                    </g>
                  ))}

                  {/* Kraft wrap front folds */}
                  <polygon points="44,54 80,96 82,138" fill="#E3BC88" stroke="#B68B55" strokeWidth="1.2" />
                  <polygon points="116,54 80,96 82,138" fill="#D4AA73" stroke="#B68B55" strokeWidth="1.2" />

                  {/* Little heart badge on paper */}
                  <path
                    d="M81,96 L80.1,95.2 C76.9,92.3 74.8,90.4 74.8,88 C74.8,86 76.3,84.5 78.3,84.5 C79.4,84.5 80.4,85 81,85.8 C81.6,85 82.6,84.5 83.7,84.5 C85.7,84.5 87.2,86 87.2,88 C87.2,90.4 85.1,92.3 81.9,95.2 Z"
                    fill="#C92A2A"
                  />

                  {/* Satin red ribbon */}
                  <path d="M74,108 L89,108 L87,114 L76,114 Z" fill="#C92A2A" />
                  <path d="M81,112 L69,136 L75,138 L81,115 Z" fill="#B22020" />
                  <path d="M82,112 L94,136 L88,138 L82,115 Z" fill="#D63232" />
                  <ellipse cx="73" cy="111" rx="8" ry="4.5" transform="rotate(-18 73 111)" fill="#D93838" />
                  <ellipse cx="90" cy="111" rx="8" ry="4.5" transform="rotate(18 90 111)" fill="#D93838" />
                </g>
              </svg>
            </motion.div>

            <div className="mt-2 text-center">
              <span className="block font-serif text-lg sm:text-xl font-semibold text-[#F5E7CC] group-hover:text-white">
                Flores
              </span>
              <span className="mt-0.5 block font-serif italic text-xs text-[#E6CEAC]/80">
                Buquê especial
              </span>
            </div>
          </motion.button>
        </div>

        <motion.button
          type="button"
          onClick={(e) => onBackToEnvelope(e.clientX, e.clientY)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileTap={{ scale: 0.95 }}
          className="mt-10 px-5 py-2.5 min-h-[44px] rounded-full border border-[#F5E7CC]/30 text-xs sm:text-sm font-serif text-[#F5E7CC]/85 hover:text-[#F5E7CC] hover:border-[#F5E7CC]/60 transition-colors cursor-pointer"
        >
          Fechar envelope
        </motion.button>
      </div>
    </motion.section>
  );
}
