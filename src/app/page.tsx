'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserProfile, getTodayStats, getAchievements } from '@/lib/storage';
import type { UserProfile, DailyStats, Achievement } from '@/lib/types';
import BottomNav from '@/components/custom/bottom-nav';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Droplet, Utensils, Activity, Flame, Trophy, Plus } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<DailyStats | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userProfile = getUserProfile();
    
    if (!userProfile || !userProfile.onboardingCompleted) {
      router.push('/onboarding');
      return;
    }

    setProfile(userProfile);
    setStats(getTodayStats());
    setAchievements(getAchievements().filter(a => a.unlockedAt));
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!profile || !stats) return null;

  const waterProgress = (stats.waterIntake / stats.waterGoal) * 100;
  const caloriesProgress = (stats.caloriesConsumed / stats.caloriesGoal) * 100;
  const exerciseProgress = (stats.exerciseMinutes / stats.exerciseGoal) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-2xl font-bold mb-1">Olá, {profile.name}! ☀️</h1>
          <p className="text-orange-100">Vamos manter a constância hoje</p>
          
          {/* Streak Counter */}
          <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/30 p-3 rounded-full">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-orange-100">Sequência Atual</p>
                <p className="text-2xl font-bold">{stats.streak} dias</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-orange-100">Continue assim!</p>
              <p className="text-sm font-semibold">🔥 Você está incrível!</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto p-4 space-y-4">
        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          <Button
            onClick={() => router.push('/water')}
            className="h-24 bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white flex flex-col items-center justify-center space-y-2 rounded-2xl shadow-lg"
          >
            <Droplet className="w-6 h-6" />
            <span className="text-xs font-medium">Água</span>
          </Button>
          
          <Button
            onClick={() => router.push('/food')}
            className="h-24 bg-gradient-to-br from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white flex flex-col items-center justify-center space-y-2 rounded-2xl shadow-lg"
          >
            <Utensils className="w-6 h-6" />
            <span className="text-xs font-medium">Refeição</span>
          </Button>
          
          <Button
            onClick={() => router.push('/exercise')}
            className="h-24 bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white flex flex-col items-center justify-center space-y-2 rounded-2xl shadow-lg"
          >
            <Activity className="w-6 h-6" />
            <span className="text-xs font-medium">Exercício</span>
          </Button>
        </div>

        {/* Daily Progress */}
        <Card className="p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Progresso de Hoje</h2>
          
          <div className="space-y-6">
            {/* Water */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Droplet className="w-5 h-5 text-blue-500" />
                  <span className="font-medium text-gray-700">Água</span>
                </div>
                <span className="text-sm text-gray-600">
                  {stats.waterIntake}ml / {stats.waterGoal}ml
                </span>
              </div>
              <Progress value={waterProgress} className="h-3" />
            </div>

            {/* Calories */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Utensils className="w-5 h-5 text-orange-500" />
                  <span className="font-medium text-gray-700">Calorias</span>
                </div>
                <span className="text-sm text-gray-600">
                  {stats.caloriesConsumed} / {stats.caloriesGoal} kcal
                </span>
              </div>
              <Progress value={caloriesProgress} className="h-3" />
            </div>

            {/* Exercise */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-gray-700">Exercício</span>
                </div>
                <span className="text-sm text-gray-600">
                  {stats.exerciseMinutes} / {stats.exerciseGoal} min
                </span>
              </div>
              <Progress value={exerciseProgress} className="h-3" />
            </div>
          </div>
        </Card>

        {/* Recent Achievements */}
        {achievements.length > 0 && (
          <Card className="p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Conquistas Recentes</h2>
              <Trophy className="w-6 h-6 text-yellow-500" />
            </div>
            <div className="space-y-3">
              {achievements.slice(0, 3).map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-2xl">
                    🏆
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{achievement.title}</p>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Motivational Message */}
        <Card className="p-6 bg-gradient-to-br from-orange-100 to-yellow-100 border-orange-200 shadow-lg">
          <p className="text-center text-gray-800 font-medium">
            💪 "Cada gota conta, cada passo importa. Você está construindo a melhor versão de si mesma!"
          </p>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}
