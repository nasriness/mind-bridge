import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { NavTab, Specialist, JournalEntry } from './types';
import { INITIAL_JOURNAL_ENTRY, INITIAL_JOURNAL_ENTRIES } from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { EmergencyModal } from './components/EmergencyModal';
import { BreathingModal } from './components/BreathingModal';
import { BookingModal } from './components/BookingModal';

import { DashboardView } from './views/DashboardView';
import { LandingView } from './views/LandingView';
import { CompanionView } from './views/CompanionView';
import { DirectoryView } from './views/DirectoryView';
import { AnalyticsView } from './views/AnalyticsView';
import { JournalView } from './views/JournalView';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [isEmergencyOpen, setIsEmergencyOpen] = useState<boolean>(false);
  const [isBreathingOpen, setIsBreathingOpen] = useState<boolean>(false);
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null);
  
  const [journalPrompt, setJournalPrompt] = useState<string>('"How did that make you feel in the moment?"');
  const [recentJournal, setRecentJournal] = useState<JournalEntry>(INITIAL_JOURNAL_ENTRY);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(INITIAL_JOURNAL_ENTRIES);

  // Scroll Progress Indicator for Smooth Scrolling Feedback
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleSelectSpecialist = (s: Specialist) => {
    setSelectedSpecialist(s);
  };

  const handleSaveJournalEntry = (entry: JournalEntry) => {
    setRecentJournal(entry);
    setJournalEntries((prev) => [entry, ...prev.filter((e) => e.id !== entry.id)]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafbfe] text-slate-900 selection:bg-indigo-600 selection:text-white relative overflow-x-hidden font-sans">
      
      {/* Top Animated Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 z-50 origin-left shadow-sm"
        style={{ scaleX }}
      />

      {/* Luminous Ambient Floating Light Orbs */}
      <div className="fixed top-[-10rem] left-[10%] w-[45rem] h-[45rem] bg-indigo-200/40 rounded-full blur-[120px] pointer-events-none animate-aurora"></div>
      <div className="fixed top-[35%] right-[5%] w-[40rem] h-[40rem] bg-purple-200/35 rounded-full blur-[130px] pointer-events-none animate-aurora" style={{ animationDelay: '4s' }}></div>
      <div className="fixed bottom-[-5rem] left-[25%] w-[42rem] h-[42rem] bg-sky-200/35 rounded-full blur-[140px] pointer-events-none animate-aurora" style={{ animationDelay: '8s' }}></div>

      {/* Animated 3D Floating Decorative Glass Objects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Floating Glass Orb 1 */}
        <motion.div 
          animate={{ 
            y: [0, -25, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[18%] left-[4%] w-24 h-24 rounded-full bg-gradient-to-br from-white/80 to-indigo-100/60 backdrop-blur-xl border border-white/90 shadow-xl shadow-indigo-500/10 flex items-center justify-center opacity-70 hidden md:flex"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500/30 blur-sm"></div>
        </motion.div>

        {/* Floating Ring/Donut Object */}
        <motion.div 
          animate={{ 
            y: [0, 30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[55%] right-[3%] w-28 h-28 rounded-full border-4 border-indigo-400/20 backdrop-blur-md opacity-60 hidden md:block"
        >
          <div className="w-full h-full rounded-full border-2 border-dashed border-purple-400/30"></div>
        </motion.div>

        {/* Floating Sparkle Pebble Badge */}
        <motion.div 
          animate={{ 
            y: [0, -18, 0],
            x: [0, 10, 0]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[20%] left-[3%] px-4 py-2 rounded-2xl bg-white/80 border border-slate-200/80 shadow-lg backdrop-blur-xl text-indigo-600 font-bold text-xs flex items-center gap-2 opacity-80 hidden lg:flex"
        >
          <span className="material-symbols-outlined text-sm animate-spin" style={{ animationDuration: '6s' }}>sparkles</span>
          <span>MindBridge AI • Active</span>
        </motion.div>
      </div>

      {/* Clean Subtle Grid Pattern Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#e2e8f033_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f033_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none"></div>

      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
      />

      {/* Main View Router with Motion Page Animations */}
      <main className="flex-1 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.995 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {activeTab === 'dashboard' && (
              <DashboardView
                setActiveTab={setActiveTab}
                onOpenEmergency={() => setIsEmergencyOpen(true)}
                onOpenBreathing={() => setIsBreathingOpen(true)}
                setJournalPrompt={setJournalPrompt}
                recentJournal={recentJournal}
              />
            )}

            {activeTab === 'overview' && (
              <LandingView
                setActiveTab={setActiveTab}
                onOpenEmergency={() => setIsEmergencyOpen(true)}
              />
            )}

            {activeTab === 'companion' && (
              <CompanionView
                setActiveTab={setActiveTab}
                onOpenBreathing={() => setIsBreathingOpen(true)}
                onOpenEmergency={() => setIsEmergencyOpen(true)}
                onSelectSpecialist={handleSelectSpecialist}
              />
            )}

            {activeTab === 'directory' && (
              <DirectoryView
                onSelectSpecialist={handleSelectSpecialist}
              />
            )}

            {activeTab === 'analytics' && (
              <AnalyticsView
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === 'journal' && (
              <JournalView
                initialPrompt={journalPrompt}
                entries={journalEntries}
                onSaveEntry={handleSaveJournalEntry}
                setActiveTab={setActiveTab}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer onOpenEmergency={() => setIsEmergencyOpen(true)} />

      {/* Popups & Modals */}
      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
        onOpenBreathing={() => setIsBreathingOpen(true)}
      />

      <BreathingModal
        isOpen={isBreathingOpen}
        onClose={() => setIsBreathingOpen(false)}
      />

      <BookingModal
        specialist={selectedSpecialist}
        onClose={() => setSelectedSpecialist(null)}
      />

    </div>
  );
}

export default App;


