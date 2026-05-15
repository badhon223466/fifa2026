import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LiveMatches from './components/LiveMatches';
import MatchSchedule from './components/MatchSchedule';
import NewsSection from './components/NewsSection';
import WatchSection from './components/WatchSection';
import BannerAd from './components/BannerAd';
import LeaderboardAd from './components/LeaderboardAd';
import TeamsAtoZ from './components/TeamsAtoZ';
import LeaguesSection from './components/LeaguesSection';
import Showcase from './components/Showcase';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import AdPlaceholder from './components/AdPlaceholder';
import AdminPanel from './components/AdminPanel';
import { useAdmin } from './hooks/useAdmin';
import { Lock } from 'lucide-react';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const { isAdmin } = useAdmin();

  useEffect(() => {
    // Simulate initial load for the premium feel
    const timer = setTimeout(() => setIsLoaded(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-brand-green selection:text-black scroll-smooth">
      <LoadingScreen isLoaded={isLoaded} />
      
      {isLoaded && (
        <>
          <Navbar onAdminClick={() => setIsAdminOpen(true)} />
          
          <main>
            <Hero />
            
            <WatchSection />

            <BannerAd />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
              <AdPlaceholder position="in-content" />
            </div>

            <LiveMatches />
            
            <LeaderboardAd />

            <MatchSchedule />
            <NewsSection />
            <TeamsAtoZ />
            <LeaguesSection />
            <Showcase />
            
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
              <AdPlaceholder position="footer" />
            </div>
          </main>

          <Footer />
          
          <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
          
          {/* Admin Floating Trigger */}
          {isAdmin && (
            <button 
              onClick={() => setIsAdminOpen(true)}
              className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-neutral-900 border border-neutral-800 rounded-full flex items-center justify-center text-brand-green hover:bg-brand-green hover:text-black transition-all shadow-2xl"
              title="Admin Settings"
            >
              <Lock size={20} />
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default App;
