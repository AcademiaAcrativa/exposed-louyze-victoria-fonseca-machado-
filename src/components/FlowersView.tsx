import { useState, type MouseEvent } from 'react';
import { motion } from 'motion/react';

interface FlowersViewProps {
  onSpawnHearts: (clientX?: number, clientY?: number) => void;
}

const LOVE_NOTES = [
  {
    text: 'Não importa quão difícil seja o meu dia, você sempre me faz sorrir.',
    tilt: '-rotate-2',
  },
  {
    text: 'Seu jeito de cuidar e estar presente significa o mundo pra mim.',
    tilt: 'rotate-2',
  },
  {
    text: 'Cada momento ao seu lado vira uma memória que eu guardo no coração.',
    tilt: 'rotate-1',
  },
  {
    text: 'Mesmo nos menores momentos contigo, tudo fica mais especial.',
    tilt: '-rotate-1',
  },
  {
    text: 'Seu amor deixa a minha vida muito mais bonita e cheia de sentido.',
    tilt: '-rotate-2',
  },
  {
    text: 'Só a sua presença já faz tudo ficar melhor.',
    tilt: 'rotate-2',
  },
];

function Rose({
  cx,
  cy,
  scale = 1,
  shade = 'deep',
}: {
  cx: number;
  cy: number;
  scale?: number;
  shade?: 'deep' | 'bright' | 'crimson';
}) {
  const palette =
    shade === 'bright'
      ? { outer: '#D92B2B', mid: '#B51A1A', inner: '#7E0C0C', highlight: '#F05B5B' }
      : shade === 'crimson'
        ? { outer: '#B81818', mid: '#8F0F0F', inner: '#5E0606', highlight: '#D93B3B' }
        : { outer: '#C91E1E', mid: '#9B1111', inner: '#680808', highlight: '#E54848' };

  return (
    <g transform={`translate(${cx}, ${cy}) scale(${scale})`}>
      <circle cx="0" cy="0" r="18" fill={palette.outer} />
      <path
        d="M-14,-4 C-15,-14 -4,-18 4,-16 C14,-14 17,-4 14,5 C11,14 0,17 -9,13 C-16,9 -15,1 -14,-4 Z"
        fill={palette.mid}
      />
      <path
        d="M-8,-6 C-6,-13 5,-13 10,-7 C13,-1 9,8 2,9 C-5,10 -11,4 -9,-2 C-7,-7 1,-8 4,-3 C6,1 2,5 -2,4"
        fill="none"
        stroke={palette.highlight}
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <circle cx="0" cy="0" r="4.5" fill={palette.inner} />
    </g>
  );
}

export function FlowersView({ onSpawnHearts }: FlowersViewProps) {
  const [bloomCount, setBloomCount] = useState(0);

  const handleBouquetTap = (e: MouseEvent<HTMLButtonElement>) => {
    setBloomCount((c) => c + 1);
    const rect = e.currentTarget.getBoundingClientRect();
    onSpawnHearts(
      e.clientX || rect.left + rect.width / 2,
      e.clientY || rect.top + rect.height / 2
    );
  };

  const handleNoteTap = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    onSpawnHearts(
      e.clientX || rect.left + rect.width / 2,
      e.clientY || rect.top + rect.height / 2
    );
  };

  return (
    <motion.section
      key="flowers"
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.97 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 w-full max-w-5xl mx-auto px-4 pt-6 pb-24 sm:px-6 sm:pt-10"
    >
      {/* Desktop 3-column layout (notes left, bouquet center, notes right) / Mobile stacked */}
      <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-5">
        {/* Left notes on desktop */}
        <div className="hidden lg:flex lg:col-span-4 flex-col gap-5 items-end">
          {LOVE_NOTES.slice(0, 3).map((note, idx) => (
            <motion.button
              key={idx}
              type="button"
              onClick={handleNoteTap}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.16 + idx * 0.08 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.94 }}
              className={`max-w-[260px] px-4 py-3 rounded-xl bg-[#F5E7CC] text-[#4A1410] font-serif text-sm font-medium leading-snug text-center shadow-[0_8px_18px_rgba(20,4,3,0.38)] cursor-pointer ${note.tilt}`}
            >
              {note.text}
            </motion.button>
          ))}
        </div>

        {/* Center iconic arched crimson bouquet card inspired by screenshot 3 */}
        <div className="lg:col-span-4 flex flex-col items-center">
          <motion.button
            type="button"
            onClick={handleBouquetTap}
            aria-label="Tocar no buquê de rosas para soltar corações"
            animate={
              bloomCount > 0
                ? { scale: [1, 1.05, 1], rotate: [0, -2, 2, 0] }
                : { y: [0, -5, 0] }
            }
            transition={
              bloomCount > 0
                ? { duration: 0.45 }
                : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }
            }
            whileTap={{ scale: 0.95 }}
            className="relative w-full max-w-[300px] sm:max-w-[320px] rounded-t-[150px] rounded-b-3xl bg-gradient-to-b from-[#9E1F19] to-[#7C1511] border-[1.5px] border-[#F5E7CC]/75 px-5 pt-7 pb-6 shadow-[0_22px_40px_rgba(20,4,3,0.55)] flex flex-col items-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5E7CC]"
          >
            {/* Lush red rose bouquet illustration */}
            <div className="w-56 h-64 sm:w-60 sm:h-68">
              <svg viewBox="0 0 240 270" className="w-full h-full drop-shadow-[0_12px_18px_rgba(20,4,3,0.45)]" aria-hidden="true">
                {/* Kraft paper wrap back */}
                <polygon
                  points="44,86 120,44 196,86 154,205 86,205"
                  fill="#CFA36D"
                  stroke="#9C713E"
                  strokeWidth="1.5"
                />
                <polygon points="58,92 120,60 182,92 146,195 94,195" fill="#DFB682" />

                {/* Deep green foliage leaves */}
                <ellipse cx="64" cy="96" rx="22" ry="10" transform="rotate(-38 64 96)" fill="#2F592C" />
                <ellipse cx="176" cy="96" rx="22" ry="10" transform="rotate(38 176 96)" fill="#284F26" />
                <ellipse cx="90" cy="66" rx="18" ry="9" transform="rotate(-20 90 66)" fill="#386834" />
                <ellipse cx="150" cy="66" rx="18" ry="9" transform="rotate(20 150 66)" fill="#346130" />
                <ellipse cx="120" cy="56" rx="14" ry="10" fill="#3F743A" />

                {/* Small baby's-breath / warm gold accents */}
                {[
                  [78, 72],
                  [162, 72],
                  [56, 114],
                  [184, 114],
                  [120, 62],
                ].map(([bx, by], i) => (
                  <g key={i}>
                    <circle cx={bx} cy={by} r="2.8" fill="#FAF0DC" />
                    <circle cx={bx + 5} cy={by - 4} r="2.2" fill="#F5E7CC" />
                    <circle cx={bx - 4} cy={by + 4} r="2" fill="#FAF0DC" />
                  </g>
                ))}

                {/* Layered cluster of red roses */}
                <Rose cx={94} cy={80} scale={0.95} shade="crimson" />
                <Rose cx={146} cy={80} scale={0.95} shade="deep" />
                <Rose cx={120} cy={72} scale={1.04} shade="bright" />

                <Rose cx={74} cy={104} scale={0.95} shade="deep" />
                <Rose cx={166} cy={104} scale={0.95} shade="crimson" />
                <Rose cx={104} cy={98} scale={1.05} shade="bright" />
                <Rose cx={138} cy={98} scale={1.02} shade="deep" />

                <Rose cx={88} cy={126} scale={0.98} shade="bright" />
                <Rose cx={152} cy={126} scale={0.96} shade="deep" />
                <Rose cx={120} cy={120} scale={1.1} shade="crimson" />

                <Rose cx={106} cy={142} scale={0.92} shade="deep" />
                <Rose cx={136} cy={142} scale={0.92} shade="bright" />

                {/* Kraft paper wrap front folds */}
                <polygon
                  points="44,108 120,164 120,248 84,232"
                  fill="#E7C18E"
                  stroke="#B68A54"
                  strokeWidth="1.2"
                />
                <polygon
                  points="196,108 120,164 120,248 156,232"
                  fill="#D6AC75"
                  stroke="#B68A54"
                  strokeWidth="1.2"
                />
                <polygon
                  points="86,184 120,164 154,184 146,242 94,242"
                  fill="#CFA36D"
                  stroke="#A87C48"
                  strokeWidth="1"
                />

                {/* Satin red bow */}
                <g transform="translate(120, 198)">
                  {/* Flowing ribbon tails */}
                  <path d="M-4,4 L-26,48 L-14,52 L0,8 Z" fill="#A61818" />
                  <path d="M4,4 L26,48 L14,52 L0,8 Z" fill="#C92424" />
                  {/* Bow loops */}
                  <path
                    d="M0,0 C-18,-18 -38,-8 -30,8 C-24,18 -8,10 0,2 Z"
                    fill="#D92E2E"
                    stroke="#8E1212"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M0,0 C18,-18 38,-8 30,8 C24,18 8,10 0,2 Z"
                    fill="#E33B3B"
                    stroke="#8E1212"
                    strokeWidth="1.2"
                  />
                  {/* Center knot */}
                  <rect x="-7" y="-6" width="14" height="12" rx="4" fill="#B51B1B" stroke="#7A0E0E" strokeWidth="1" />
                </g>
              </svg>
            </div>

            <h1 className="mt-1 font-script text-3xl sm:text-4xl text-[#FAF0DC] tracking-wide">
              Flores pra Louyze
            </h1>
            <span className="mt-1 font-serif italic text-xs text-[#F5E7CC]/80">
              Toque no buquê
            </span>
          </motion.button>
        </div>

        {/* Right notes on desktop */}
        <div className="hidden lg:flex lg:col-span-4 flex-col gap-5 items-start">
          {LOVE_NOTES.slice(3, 6).map((note, idx) => (
            <motion.button
              key={idx}
              type="button"
              onClick={handleNoteTap}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.22 + idx * 0.08 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.94 }}
              className={`max-w-[260px] px-4 py-3 rounded-xl bg-[#F5E7CC] text-[#4A1410] font-serif text-sm font-medium leading-snug text-center shadow-[0_8px_18px_rgba(20,4,3,0.38)] cursor-pointer ${note.tilt}`}
            >
              {note.text}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Mobile / tablet clean love notes grid below bouquet */}
      <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5 lg:hidden max-w-lg mx-auto">
        {LOVE_NOTES.map((note, idx) => (
          <motion.button
            key={idx}
            type="button"
            onClick={handleNoteTap}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 + idx * 0.06 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full min-h-[44px] px-4 py-3 rounded-xl bg-[#F5E7CC] text-[#4A1410] font-serif text-[13.5px] font-medium leading-snug text-center shadow-[0_8px_18px_rgba(20,4,3,0.38)] cursor-pointer ${note.tilt}`}
          >
            {note.text}
          </motion.button>
        ))}
      </div>
    </motion.section>
  );
}
