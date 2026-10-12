/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { GameProvider, useGame } from './GameContext';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { DailyChallengeModal } from './DailyChallengeModal';
import { BadgeModal } from './BadgeModal';
import { CertificateModal } from './CertificateModal';
import { SearchModal } from './SearchModal';
import { OnboardingModal } from './OnboardingModal';
import { ToastContainer } from './ToastContainer';
import { HomeView } from './HomeView';
import { LearnView } from './LearnView';
import { ChallengesView } from './ChallengesView';
import { DetectiveView } from './DetectiveView';
import { SkillTreeView } from './SkillTreeView';
import { ProgressView } from './ProgressView';
import { ProfileView } from './ProfileView';

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
