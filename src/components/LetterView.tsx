import type { MouseEvent } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

interface LetterViewProps {
  onSpawnHearts: (clientX?: number, clientY?: number) => void;
}

export function LetterView({ onSpawnHearts }: LetterViewProps) {
  const handleHeartTap = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    onSpawnHearts(
      e.clientX || rect.left + rect.width / 2,
      e.clientY || rect.top + rect.height / 2
    );
  };

  return (
    <motion.section
      key="letter"
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.97 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 w-full max-w-2xl mx-auto px-4 pt-6 pb-24 sm:px-6 sm:pt-10"
    >
      {/* Top quiet header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center mb-5"
      >
        <h1 className="font-script text-4xl sm:text-5xl text-[#F5E7CC] drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
          Para Louyze
        </h1>
      </motion.div>

      {/* Scalloped parchment sheet inspired by screenshots 4 & 5 */}
      <div className="relative mx-auto w-full max-w-lg drop-shadow-[0_20px_38px_rgba(20,4,3,0.55)]">
        {/* Top scalloped edge */}
        <div className="scalloped-edge-top" aria-hidden="true" />

        <div className="parchment-paper relative px-6 py-7 sm:px-10 sm:py-9 text-[#3A1410] overflow-hidden">
          {/* Decorative corner ribbon & star doodle (top right) */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-5 pointer-events-none select-none flex items-center gap-2">
            <svg width="46" height="40" viewBox="0 0 60 52" aria-hidden="true">
              {/* Vintage red bow */}
              <path
                d="M30,24 C18,10 6,14 10,25 C13,32 23,29 30,25 Z"
                fill="#B82520"
                stroke="#861512"
                strokeWidth="1.2"
              />
              <path
                d="M30,24 C42,10 54,14 50,25 C47,32 37,29 30,25 Z"
                fill="#C92E28"
                stroke="#861512"
                strokeWidth="1.2"
              />
              <path d="M27,26 L18,46 L24,44 L30,28 Z" fill="#9E1B17" />
              <path d="M33,26 L42,46 L36,44 L30,28 Z" fill="#B82520" />
              <circle cx="30" cy="25" r="4.5" fill="#D93832" stroke="#861512" strokeWidth="1" />
            </svg>
          </div>

          {/* Vintage postage stamp motif */}
          <div
            className="mb-5 inline-flex flex-col items-center justify-center px-3 py-1.5 border border-dashed border-[#8E2A23]/45 bg-[#FAF0DC]/70 rotate-[-2deg]"
            aria-hidden="true"
          >
            <span className="font-serif text-[10px] tracking-[0.18em] uppercase text-[#8E2A23]">
              Com amor
            </span>
            <span className="font-script text-base leading-none text-[#8E2A23] mt-0.5">
              Luka &amp; Louyze
            </span>
          </div>

          {/* Exact romantic letter text from the user */}
          <div className="relative z-10 space-y-5 font-serif text-[15.5px] sm:text-[16.5px] leading-[1.8] text-[#3A1410]">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.45 }}
            >
              oi meu amor… olha desde que vc chegou na minha vida todos os meus dias tem sido
              melhores, sabe eu nunca fui uma pessoa legal nem simpática kkkk mas quando eu
              conheci vc eu senti alguma coisa nn sei kkk sabe logo de cara… e eu to realmente me
              esforçando pra ter algo sério com vc.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.45 }}
            >
              Quero melhorar junto contigo,ter momentos bons e não quero ser só mais um sabe?
              Quero ser o garoto certo pra vc! Ontem eu sonhei com vc skskksks aí foi o melhor
              sonho da minha vida… espero que um dia eu possa te ver,te beijar,te abraçar e nos
              finalmente podermos ficar um do lado do outro… eu te amo muito garota e a cada dia a
              cada minuto eu só amo mais e mais….
            </motion.p>
          </div>

          {/* Signature & interactive wax-heart button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.45 }}
            className="relative z-10 mt-8 pt-5 border-t border-[#8E2A23]/20 flex flex-wrap items-center justify-between gap-4"
          >
            <div>
              <p className="font-script text-2xl sm:text-3xl text-[#7A1812] leading-snug">
                Ass : luka seu futuro marido
              </p>
            </div>

            <motion.button
              type="button"
              onClick={handleHeartTap}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.92 }}
              className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-full bg-[#8E1B16] text-[#F5E7CC] font-serif text-xs sm:text-sm font-medium shadow-md hover:bg-[#A3221C] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8E1B16]"
            >
              <Heart className="w-4 h-4 fill-[#FF6B81] text-[#FF6B81]" />
              <span>Mandar amor</span>
            </motion.button>
          </motion.div>

          {/* Bottom-left botanical tulips illustration inspired by screenshot 4 & 5 */}
          <div
            className="mt-4 flex items-end justify-between pointer-events-none select-none"
            aria-hidden="true"
          >
            <svg width="84" height="66" viewBox="0 0 110 86" className="-ml-2 -mb-3 opacity-90">
              {/* Stems */}
              <path d="M24,84 C26,64 20,46 18,30" stroke="#4D6E3E" strokeWidth="2.5" fill="none" />
              <path d="M40,84 C42,60 44,44 46,22" stroke="#456637" strokeWidth="2.5" fill="none" />
              <path d="M56,84 C60,66 66,52 72,36" stroke="#537843" strokeWidth="2.5" fill="none" />
              {/* Leaves */}
              <path d="M32,82 C16,68 12,56 14,48 C24,56 30,68 32,82 Z" fill="#5A7D49" />
              <path d="M48,82 C64,66 72,58 76,50 C64,54 54,66 48,82 Z" fill="#4D6E3E" />
              {/* Tulip 1 */}
              <path
                d="M10,28 C10,16 18,12 18,12 C18,12 26,16 26,28 C26,34 22,38 18,38 C14,38 10,34 10,28 Z"
                fill="#A8201A"
              />
              <path d="M18,12 C21,20 20,30 18,38 C15,30 15,20 18,12 Z" fill="#D1362F" />
              {/* Tulip 2 */}
              <path
                d="M36,20 C36,8 46,4 46,4 C46,4 56,8 56,20 C56,27 51,31 46,31 C41,31 36,27 36,20 Z"
                fill="#B82520"
              />
              <path d="M46,4 C50,12 49,23 46,31 C42,23 42,12 46,4 Z" fill="#E04B44" />
              {/* Tulip 3 */}
              <path
                d="M64,34 C64,23 72,20 72,20 C72,20 80,23 80,34 C80,40 76,44 72,44 C68,44 64,40 64,34 Z"
                fill="#961A15"
              />
              <path d="M72,20 C75,27 74,36 72,44 C69,36 69,27 72,20 Z" fill="#C9322C" />
            </svg>

            {/* Little hand-drawn hearts doodle */}
            <svg width="48" height="36" viewBox="0 0 60 44" className="opacity-75">
              <path
                d="M18,30 C11,24 8,20 8,16 C8,13 10.5,11 13,11 C15,11 16.8,12.2 18,14 C19.2,12.2 21,11 23,11 C25.5,11 28,13 28,16 C28,20 25,24 18,30 Z"
                fill="none"
                stroke="#9E241C"
                strokeWidth="1.8"
              />
              <path
                d="M42,22 C37,18 35,15 35,12.5 C35,10.5 36.6,9 38.5,9 C39.8,9 41,9.8 42,11 C43,9.8 44.2,9 45.5,9 C47.4,9 49,10.5 49,12.5 C49,15 47,18 42,22 Z"
                fill="none"
                stroke="#9E241C"
                strokeWidth="1.6"
              />
            </svg>
          </div>
        </div>

        {/* Bottom scalloped edge */}
        <div className="scalloped-edge-bottom" aria-hidden="true" />
      </div>
    </motion.section>
  );
}
