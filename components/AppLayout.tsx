import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen">
      <ParticleBackground />
      <Navbar />
      
      {/* THIS IS THE FIX:
        - No 'max-w-7xl' or 'mx-auto'
        - Just responsive padding that lets the content fill the screen.
      */}
      <main className="relative z-10 w-full pt-24 pb-12 px-4 md:px-6 lg:px-8">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}