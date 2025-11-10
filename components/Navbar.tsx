'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, TrendingUp, Trophy, Store } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Bot },
    { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { href: '/market', label: 'Event Market', icon: TrendingUp },
    { href: '/create-agent', label: 'Create Agent', icon: Store },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 glassmorphism border-b border-cyan-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/" 
            className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-magenta-500 bg-clip-text text-transparent"
            style={{ fontFamily: 'var(--font-orbitron)' }}
          >
            KALSH402
          </Link>

          <div className="hidden md:flex glassmorphism border border-primary/30 rounded-lg p-1 space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300
                    ${isActive 
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 glow-cyan' 
                      : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10'
                    }
                  `}
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-lg bg-purple-500/10 border border-purple-500/30">
              <span className="text-xs text-purple-400">Powered by</span>
              <span className="text-sm font-bold text-purple-300">x402</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
