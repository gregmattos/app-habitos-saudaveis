// Sistema de armazenamento local com sincronização futura

import type { UserProfile, WaterLog, MealLog, ExerciseLog, Achievement, DailyStats, NotificationSettings } from './types';

const STORAGE_KEYS = {
  USER_PROFILE: 'healthapp_user_profile',
  WATER_LOGS: 'healthapp_water_logs',
  MEAL_LOGS: 'healthapp_meal_logs',
  EXERCISE_LOGS: 'healthapp_exercise_logs',
  ACHIEVEMENTS: 'healthapp_achievements',
  DAILY_STATS: 'healthapp_daily_stats',
  NOTIFICATION_SETTINGS: 'healthapp_notification_settings',
} as const;

// Helper para verificar se está no browser
const isBrowser = typeof window !== 'undefined';

// User Profile
export const getUserProfile = (): UserProfile | null => {
  if (!isBrowser) return null;
  const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
  return data ? JSON.parse(data) : null;
};

export const saveUserProfile = (profile: UserProfile): void => {
  if (!isBrowser) return;
  localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
};

// Water Logs
export const getWaterLogs = (): WaterLog[] => {
  if (!isBrowser) return [];
  const data = localStorage.getItem(STORAGE_KEYS.WATER_LOGS);
  return data ? JSON.parse(data) : [];
};

export const addWaterLog = (log: WaterLog): void => {
  if (!isBrowser) return;
  const logs = getWaterLogs();
  logs.push(log);
  localStorage.setItem(STORAGE_KEYS.WATER_LOGS, JSON.stringify(logs));
};

// Meal Logs
export const getMealLogs = (): MealLog[] => {
  if (!isBrowser) return [];
  const data = localStorage.getItem(STORAGE_KEYS.MEAL_LOGS);
  return data ? JSON.parse(data) : [];
};

export const addMealLog = (log: MealLog): void => {
  if (!isBrowser) return;
  const logs = getMealLogs();
  logs.push(log);
  localStorage.setItem(STORAGE_KEYS.MEAL_LOGS, JSON.stringify(logs));
};

// Exercise Logs
export const getExerciseLogs = (): ExerciseLog[] => {
  if (!isBrowser) return [];
  const data = localStorage.getItem(STORAGE_KEYS.EXERCISE_LOGS);
  return data ? JSON.parse(data) : [];
};

export const addExerciseLog = (log: ExerciseLog): void => {
  if (!isBrowser) return;
  const logs = getExerciseLogs();
  logs.push(log);
  localStorage.setItem(STORAGE_KEYS.EXERCISE_LOGS, JSON.stringify(logs));
};

// Achievements
export const getAchievements = (): Achievement[] => {
  if (!isBrowser) return [];
  const data = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
  return data ? JSON.parse(data) : initializeAchievements();
};

export const updateAchievement = (id: string, progress: number): void => {
  if (!isBrowser) return;
  const achievements = getAchievements();
  const achievement = achievements.find(a => a.id === id);
  if (achievement) {
    achievement.progress = progress;
    if (progress >= achievement.target && !achievement.unlockedAt) {
      achievement.unlockedAt = new Date().toISOString();
    }
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
  }
};

// Daily Stats
export const getTodayStats = (): DailyStats => {
  if (!isBrowser) return getDefaultDailyStats();
  const today = new Date().toISOString().split('T')[0];
  const allStats = getAllDailyStats();
  const todayStats = allStats.find(s => s.date === today);
  return todayStats || getDefaultDailyStats();
};

export const getAllDailyStats = (): DailyStats[] => {
  if (!isBrowser) return [];
  const data = localStorage.getItem(STORAGE_KEYS.DAILY_STATS);
  return data ? JSON.parse(data) : [];
};

export const updateDailyStats = (stats: DailyStats): void => {
  if (!isBrowser) return;
  const allStats = getAllDailyStats();
  const index = allStats.findIndex(s => s.date === stats.date);
  if (index >= 0) {
    allStats[index] = stats;
  } else {
    allStats.push(stats);
  }
  localStorage.setItem(STORAGE_KEYS.DAILY_STATS, JSON.stringify(allStats));
};

// Notification Settings
export const getNotificationSettings = (): NotificationSettings => {
  if (!isBrowser) return getDefaultNotificationSettings();
  const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATION_SETTINGS);
  return data ? JSON.parse(data) : getDefaultNotificationSettings();
};

export const saveNotificationSettings = (settings: NotificationSettings): void => {
  if (!isBrowser) return;
  localStorage.setItem(STORAGE_KEYS.NOTIFICATION_SETTINGS, JSON.stringify(settings));
};

// Defaults
const getDefaultDailyStats = (): DailyStats => ({
  date: new Date().toISOString().split('T')[0],
  waterIntake: 0,
  waterGoal: 2000, // 2L
  caloriesConsumed: 0,
  caloriesGoal: 1800,
  exerciseMinutes: 0,
  exerciseGoal: 30,
  streak: 0,
});

const getDefaultNotificationSettings = (): NotificationSettings => ({
  waterReminders: true,
  waterInterval: 120, // 2 horas
  motivationalMessages: true,
  weeklyReport: true,
  achievements: true,
});

const initializeAchievements = (): Achievement[] => [
  {
    id: 'first_water',
    title: 'Primeira Gota',
    description: 'Registre sua primeira ingestão de água',
    icon: 'droplet',
    progress: 0,
    target: 1,
  },
  {
    id: 'water_streak_7',
    title: 'Onda de 7 Dias',
    description: 'Mantenha sua meta de água por 7 dias seguidos',
    icon: 'waves',
    progress: 0,
    target: 7,
  },
  {
    id: 'first_meal',
    title: 'Primeira Refeição',
    description: 'Registre sua primeira refeição',
    icon: 'utensils',
    progress: 0,
    target: 1,
  },
  {
    id: 'exercise_10',
    title: 'Movimento Ativo',
    description: 'Complete 10 sessões de exercício',
    icon: 'activity',
    progress: 0,
    target: 10,
  },
  {
    id: 'streak_30',
    title: 'Mestre da Constância',
    description: 'Mantenha uma sequência de 30 dias',
    icon: 'flame',
    progress: 0,
    target: 30,
  },
];

// Limpar todos os dados (útil para desenvolvimento)
export const clearAllData = (): void => {
  if (!isBrowser) return;
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
};
