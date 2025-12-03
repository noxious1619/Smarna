// app/(auth)/signup/type.ts

import { LucideIcon } from "lucide-react";

export interface SocialOption {
  id: string;
  icon: LucideIcon | string; // Can be a component or a text character (like 'G')
  label: string;
}