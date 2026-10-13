/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DailyChallengeModal } from './components/DailyChallengeModal';
import { BadgeModal } from './components/BadgeModal';
import { CertificateModal } from './components/CertificateModal';
import { SearchModal } from './components/SearchModal';
import { OnboardingModal } from './components/OnboardingModal';
import { ToastContainer } from './components/ToastContainer';
import { HomeView } from './views/HomeView';
import { LearnView } from './views/LearnView';
import { ChallengesView } from './views/ChallengesView';
import { DetectiveView } from './views/DetectiveView';
import { SkillTreeView } from './views/SkillTreeView';
import { ProgressView } from './views/ProgressView';
import { ProfileView } from './views/ProfileView';

const MainAppContent: React.FC = () => {
  const { currentView } = useGame();

  return (
    <div className="min-h-screen flex flex-col bg-[#070b18] text-slate-100 academy-grid">
      <Navbar />

      <main className="flex-1">
        {currentView === 'home' && <HomeView />}
        {currentView === 'learn' && <LearnView />}
        {currentView === 'challenges' && <ChallengesView />}
        {currentView === 'detective' && <DetectiveView />}
        {currentView === 'skilltree' && <SkillTreeView />}
        {currentView === 'progress' && <ProgressView />}
        {currentView === 'profile' && <ProfileView />}
      </main>

      <Footer />

      {/* Global Modals & Overlays */}
      <OnboardingModal />
      <SearchModal />
      <DailyChallengeModal />
      <BadgeModal />
      <CertificateModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <MainAppContent />
    </GameProvider>
  );
}
