// app/dashboard/type.ts

export type HabitStatus = 'ACTIVE' | 'PAUSED';

export interface Persona {
  name: string;
  avatar: string; // Emoji or image URL
  style: string;  // e.g., "Drill Sergeant"
}

export interface Habit {
  id: string;
  title: string;
  time: string;       // "08:00 AM"
  frequency: string;  // "Mon - Fri"
  // streak: number; <--- REMOVED
  status: HabitStatus;
  persona: Persona;
  description: string; // Shown in Modal
}

export interface UserStats {
  totalHabits: number;
  perfectDays: number;
  currentStreak: number;
}