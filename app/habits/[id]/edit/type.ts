// app/habits/[id]/edit/type.ts

export type FrequencyType = 'DAILY' | 'WEEKLY' | 'CUSTOM';
export type PersonaType = 'DRILL_SERGEANT' | 'GENTLE_GUIDE' | 'STOIC_PHILOSOPHER' | 'HYPE_MAN';

export interface EditHabitData {
  id: string;
  title: string;
  description: string;
  time: string;
  frequency: FrequencyType;
  persona: PersonaType;
  isActive: boolean;
}