'use client';

import { Home, Droplet, Utensils, Activity, MessageSquare, Camera, Trophy, History } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();
  
  const navItems = [
    { href: '/', icon: Home, label: 'Início' },
    { href: '/water', icon: Droplet, label: 'Água' },
    { href: '/food', icon: Utensils, label: 'Comida' },
    { href: '/exercise', icon: Activity, label: 'Exercício' },
    { href: '/chat', icon: MessageSquare, label: 'Chat' },
    { href: '/camera', icon: Camera, label: 'Câmera' },
    { href: '/challenges', icon: Trophy, label: 'Desafios' },
    { href: '/history', icon: History, label: 'Histórico' },
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-orange-200 shadow-lg z-50">
      <div className="flex justify-around items-center h-16 max-w-screen-xl mx-auto px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-200 ${
                isActive 
                  ? 'text-orange-500' 
                  : 'text-gray-500 hover:text-orange-400'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? 'scale-110' : ''}`} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
