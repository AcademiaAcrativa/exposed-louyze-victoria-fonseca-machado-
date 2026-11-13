/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useRef, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import {
  AmbientHearts,
  createHeartBurst,
  HeartBurstOverlay,
  type HeartBurstItem,
} from './components/HeartBurstOverlay';
import { EnvelopeCover } from './components/EnvelopeCover';
import { ChoiceMenu, type ActiveTab } from './components/ChoiceMenu';
import { LetterView } from './components/LetterView';
import { FlowersView } from './components/FlowersView';
import { BottomTabBar } from './components/BottomTabBar';

type ScreenState = 'cover' | 'menu' | ActiveTab;

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('cover');
  const [hearts, setHearts] = useState<HeartBurstItem[]>([]);
  const transitionTimerRef = useRef<number | null>(null);

  const spawnHearts = useCallback((clientX?: number, clientY?: number, count = 26) => {
    const xPercent =
      typeof clientX === 'number' && window.innerWidth > 0
        ? (clientX / window.innerWidth) * 100
        : 50;
    const yPercent =
      typeof clientY === 'number' && window.innerHeight > 0
        ? (clientY / window.innerHeight) * 100
        : 55;

    const batch = createHeartBurst(xPercent, yPercent, count);
    const batchIds = new Set(batch.map((h) => h.id));

    setHearts((prev) => [...prev.slice(-45), ...batch]);

    window.setTimeout(() => {
      setHearts((prev) => prev.filter((item) => !batchIds.has(item.id)));
    }, 2200);
  }, []);

  const navigateWithHearts = useCallback(
    (nextScreen: ScreenState, clientX?: number, clientY?: number, delayMs = 240) => {
      spawnHearts(clientX, clientY, 28);

      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
      }

      transitionTimerRef.current = window.setTimeout(() => {
        setScreen(nextScreen);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, delayMs);
    },
    [spawnHearts]
  );

  const handleOpenEnvelope = useCallback(
    (clientX?: number, clientY?: number) => {
      navigateWithHearts('menu', clientX, clientY, 320);
    },
    [navigateWithHearts]
  );

  const handleSelectOption = useCallback(
    (tab: ActiveTab, clientX?: number, clientY?: number) => {
      if (tab === screen) {
        spawnHearts(clientX, clientY, 20);
        return;
      }
      navigateWithHearts(tab, clientX, clientY, 240);
    },
    [navigateWithHearts, screen, spawnHearts]
  );

  const handleBackToMenu = useCallback(
    (clientX?: number, clientY?: number) => {
      navigateWithHearts('menu', clientX, clientY, 200);
    },
    [navigateWithHearts]
  );

  const handleBackToEnvelope = useCallback(
    (clientX?: number, clientY?: number) => {
      navigateWithHearts('cover', clientX, clientY, 220);
    },
    [navigateWithHearts]
  );

  const isTabScreen = screen === 'letter' || screen === 'flowers';

  return (
    <main className="burgundy-canvas relative min-h-[100dvh] w-full overflow-x-hidden flex flex-col">
      {/* Subtle drifting ambient hearts */}
      <AmbientHearts />

      {/* Celebratory floating heart bursts on every option tap */}
      <HeartBurstOverlay hearts={hearts} />

      <div className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {screen === 'cover' && (
            <EnvelopeCover key="cover" onOpen={handleOpenEnvelope} />
          )}

          {screen === 'menu' && (
            <ChoiceMenu
              key="menu"
              onSelect={handleSelectOption}
              onBackToEnvelope={handleBackToEnvelope}
            />
          )}

          {screen === 'letter' && (
            <LetterView key="letter" onSpawnHearts={spawnHearts} />
          )}

          {screen === 'flowers' && (
            <FlowersView key="flowers" onSpawnHearts={spawnHearts} />
          )}
        </AnimatePresence>
      </div>

      {/* Persistent thumb-friendly bottom tab switcher when inside Cartinha or Flores */}
      {isTabScreen && (
        <BottomTabBar
          activeTab={screen}
          onChangeTab={handleSelectOption}
          onBackToMenu={handleBackToMenu}
        />
      )}
    </main>
  );
}
