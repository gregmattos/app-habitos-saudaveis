// Tipos principais do aplicativo de hábitos saudáveis

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  goals: string[];
  painPoints: string[];
  behaviorProfile: string;
  createdAt: string;
  onboardingCompleted: boolean;
}

export interface WaterLog {
  id: string;
  amount: number; // ml
  timestamp: string;
}

export interface MealLog {
  id: string;
  name: string;
  calories: number;
  foods: string[];
  imageUrl?: string;
  timestamp: string;
  method: 'manual' | 'chat' | 'camera' | 'barcode';
}

export interface ExerciseLog {
  id: string;
  type: string;
  duration: number; // minutos
  calories?: number;
  timestamp: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress: number;
  target: number;
}

export interface DailyStats {
  date: string;
  waterIntake: number; // ml
  waterGoal: number;
  caloriesConsumed: number;
  caloriesGoal: number;
  exerciseMinutes: number;
  exerciseGoal: number;
  streak: number;
}

export interface QuizAnswer {
  question: string;
  answer: string | string[];
}

export interface NotificationSettings {
  waterReminders: boolean;
  waterInterval: number; // minutos
  motivationalMessages: boolean;
  weeklyReport: boolean;
  achievements: boolean;
}

export type TabType = 'home' | 'water' | 'food' | 'exercise' | 'chat' | 'camera' | 'challenges' | 'history' | 'settings';
