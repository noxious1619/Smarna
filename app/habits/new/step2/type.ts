// app/habits/new/step2/type.ts

export interface SchedulingFormData {
  reminderTime: string; // e.g., "08:00"
  timeZone: string;     // e.g., "Asia/Kolkata"
  startDate: string;    // YYYY-MM-DD
  endDate: string;      // YYYY-MM-DD
}