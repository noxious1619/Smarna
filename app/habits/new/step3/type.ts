// app/habits/new/step3/type.ts

export type PersonaType = 'DRILL_SERGEANT' | 'GENTLE_GUIDE' | 'STOIC_PHILOSOPHER' | 'HYPE_MAN';
export type EmailLength = 'SHORT_PUNCHY' | 'LONG_MOTIVATIONAL';

export interface PersonaOption {
  id: PersonaType;
  name: string;
  emoji: string;
  description: string;
}

export interface PersonalityFormData {
  persona: PersonaType;
  includeQuotes: boolean;
  emailLength: EmailLength;
  languageStyle: 'CASUAL' | 'FORMAL' | 'ENERGETIC';
}