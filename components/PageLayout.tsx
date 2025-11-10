import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';

type PageLayoutProps = {
  children: React.ReactNode;
};

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ParticleBackground />
      <Navbar />
      {/* HERE IS YOUR CONSISTENT LAYOUT:
        - pt-24 (for navbar)
        - max-w-7xl
        - px-4 (for mobile)
        - pb-12 (for footer spacing)
      */}
      <main className="relative z-10 max-w-7xl mx-auto pt-24 pb-12 px-4">
        {children}
      </main>
      <Footer />
    </div>
  );
}