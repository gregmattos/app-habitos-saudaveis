'use client';

import BottomNav from '@/components/custom/bottom-nav';
import { Card } from '@/components/ui/card';
import { Construction } from 'lucide-react';

export default function ExercisePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 pb-20">
      <div className="max-w-screen-xl mx-auto p-4">
        <Card className="p-8 text-center">
          <Construction className="w-16 h-16 mx-auto text-orange-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Página de Exercícios</h1>
          <p className="text-gray-600">Em desenvolvimento - Módulo 2</p>
        </Card>
      </div>
      <BottomNav />
    </div>
  );
}
