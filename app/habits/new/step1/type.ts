// app/habits/new/step1/type.ts

export type FrequencyOption = 'DAILY' | 'WEEKLY' | 'CUSTOM';
export type DurationOption = '15_MIN' | '30_MIN' | '1_HOUR' | 'CUSTOM';

export interface HabitSetupFormData {
  name: string;
  description: string;
  goal: string;
  frequency: FrequencyOption;
  customDays: number[]; 
  duration: DurationOption;
}