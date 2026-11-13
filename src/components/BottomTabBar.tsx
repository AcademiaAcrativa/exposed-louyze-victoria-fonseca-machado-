import type { MouseEvent } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Flower2, Mail } from 'lucide-react';
import type { ActiveTab } from './ChoiceMenu';

interface BottomTabBarProps {
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab, clientX?: number, clientY?: number) => void;
  onBackToMenu: (clientX?: number, clientY?: number) => void;
}

export function BottomTabBar({
  activeTab,
  onChangeTab,
  onBackToMenu,
}: BottomTabBarProps) {
  const handleTabClick = (tab: ActiveTab, e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    onChangeTab(
      tab,
      e.clientX || rect.left + rect.width / 2,
      e.clientY || rect.top + rect.height / 2
    );
  };

  const handleBack = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    onBackToMenu(
      e.clientX || rect.left + rect.width / 2,
      e.clientY || rect.top + rect.height / 2
    );
  };

  return (
    <nav
      aria-label="Navegação principal"
      className="fixed bottom-0 left-0 right-0 z-40 px-3 pb-[max(0.65rem,env(safe-area-inset-bottom))] pt-2 bg-gradient-to-t from-[#3B0B08] via-[#4B110D]/95 to-transparent backdrop-blur-sm"
    >
      <div className="max-w-md mx-auto flex items-center justify-between gap-2 p-1.5 rounded-2xl bg-[#6A1B15]/95 border border-[#F5E7CC]/25 shadow-[0_10px_28px_rgba(12,2,2,0.6)]">
        {/* Back button */}
        <motion.button
          type="button"
          onClick={handleBack}
          whileTap={{ scale: 0.94 }}
          className="flex items-center justify-center gap-1.5 px-3 min-h-[44px] rounded-xl text-xs sm:text-sm font-serif text-[#F5E7CC]/90 hover:text-white hover:bg-[#80231C]/70 transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar</span>
        </motion.button>

        {/* Strictly ONLY the 2 requested tabs: Cartinha and Flores */}
        <div className="flex-1 grid grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={(e) => handleTabClick('letter', e)}
            className={`relative flex items-center justify-center gap-2 min-h-[44px] px-3 rounded-xl text-xs sm:text-sm font-serif font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'letter'
                ? 'text-[#4A1410]'
                : 'text-[#F5E7CC]/85 hover:text-[#F5E7CC]'
            }`}
          >
            {activeTab === 'letter' && (
              <motion.span
                layoutId="activeTabPill"
                transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                className="absolute inset-0 rounded-xl bg-[#F5E7CC] shadow-sm"
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Mail className="w-4 h-4" />
              <span>Cartinha</span>
            </span>
          </button>

          <button
            type="button"
            onClick={(e) => handleTabClick('flowers', e)}
            className={`relative flex items-center justify-center gap-2 min-h-[44px] px-3 rounded-xl text-xs sm:text-sm font-serif font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'flowers'
                ? 'text-[#4A1410]'
                : 'text-[#F5E7CC]/85 hover:text-[#F5E7CC]'
            }`}
          >
            {activeTab === 'flowers' && (
              <motion.span
                layoutId="activeTabPill"
                transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                className="absolute inset-0 rounded-xl bg-[#F5E7CC] shadow-sm"
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Flower2 className="w-4 h-4" />
              <span>Flores</span>
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
