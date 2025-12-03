"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import s from './style.module.css';
import { PersonalityFormData, PersonaOption } from './type';

// --- MOCK PERSONAS ---
const PERSONAS: PersonaOption[] = [
  {
    id: 'DRILL_SERGEANT',
    name: 'The Drill Sergeant',
    emoji: '🫡',
    description: 'No excuses. Tough love. High intensity motivation to get you moving.'
  },
  {
    id: 'GENTLE_GUIDE',
    name: 'The Gentle Guide',
    emoji: '🌿',
    description: 'Supportive, kind, and understanding. Focuses on progress, not perfection.'
  },
  {
    id: 'STOIC_PHILOSOPHER',
    name: 'The Stoic',
    emoji: '🏛️',
    description: 'Logical and grounded. Reminds you of your duty and the power of discipline.'
  },
  {
    id: 'HYPE_MAN',
    name: 'The Hype Man',
    emoji: '🔥',
    description: 'Pure energy and enthusiasm! Celebrates every small win like a championship.'
  }
];

const initialData: PersonalityFormData = {
  persona: 'DRILL_SERGEANT',
  includeQuotes: true,
  emailLength: 'SHORT_PUNCHY',
  languageStyle: 'CASUAL',
};

export default function PersonalityPage() {
  const [formData, setFormData] = useState<PersonalityFormData>(initialData);

  const handlePersonaSelect = (id: any) => {
    setFormData(prev => ({ ...prev, persona: id }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className={s.container}>
      <div className={s.formCard}>
        
        <div className={s.header}>
          <p className="text-sm text-zinc-500 font-medium">Step 3 of 3</p>
          <h1 className={s.stepTitle}>Personality & Style</h1>
          <p className={s.stepSubtitle}>Who do you want in your corner?</p>
          
          <div className={s.progressContainer}>
            <div className={s.progressBar}></div>
          </div>
        </div>

        <form>
          
          {/* 1. Persona Grid */}
          <label className={s.sectionLabel}>Choose your Accountability Partner</label>
          <div className={s.personaGrid}>
            {PERSONAS.map((p) => (
              <div 
                key={p.id}
                className={`${s.personaCard} ${formData.persona === p.id ? s.activePersona : ''}`}
                onClick={() => handlePersonaSelect(p.id)}
              >
                <div className={s.personaEmoji}>{p.emoji}</div>
                <div>
                  <div className={s.personaTitle}>{p.name}</div>
                  <div className={s.personaDesc}>{p.description}</div>
                </div>
              </div>
            ))}
          </div>

          <div className={s.optionsGrid}>
            
            {/* 2. Email Length */}
            <div>
              <label className={s.sectionLabel}>Email Length</label>
              <div className={s.radioGroup}>
                <label className={`${s.radioLabel} ${formData.emailLength === 'SHORT_PUNCHY' ? s.radioLabelActive : ''}`}>
                  <input 
                    type="radio" 
                    name="emailLength" 
                    value="SHORT_PUNCHY"
                    checked={formData.emailLength === 'SHORT_PUNCHY'}
                    onChange={handleChange}
                    className={s.radioInput}
                  />
                  <span>Short & Punchy</span>
                </label>
                <label className={`${s.radioLabel} ${formData.emailLength === 'LONG_MOTIVATIONAL' ? s.radioLabelActive : ''}`}>
                  <input 
                    type="radio" 
                    name="emailLength" 
                    value="LONG_MOTIVATIONAL"
                    checked={formData.emailLength === 'LONG_MOTIVATIONAL'}
                    onChange={handleChange}
                    className={s.radioInput}
                  />
                  <span>Detailed & Motivational</span>
                </label>
              </div>
            </div>

            {/* 3. Language Style */}
            <div>
              <label className={s.sectionLabel}>Language Style</label>
              <div className={s.radioGroup}>
                <label className={`${s.radioLabel} ${formData.languageStyle === 'CASUAL' ? s.radioLabelActive : ''}`}>
                  <input 
                    type="radio" 
                    name="languageStyle" 
                    value="CASUAL"
                    checked={formData.languageStyle === 'CASUAL'}
                    onChange={handleChange}
                    className={s.radioInput}
                  />
                  <span>Casual & Friendly</span>
                </label>
                <label className={`${s.radioLabel} ${formData.languageStyle === 'FORMAL' ? s.radioLabelActive : ''}`}>
                  <input 
                    type="radio" 
                    name="languageStyle" 
                    value="FORMAL"
                    checked={formData.languageStyle === 'FORMAL'}
                    onChange={handleChange}
                    className={s.radioInput}
                  />
                  <span>Direct & Professional</span>
                </label>
              </div>
            </div>

          </div>

          {/* 4. Quote Toggle */}
          <div className={s.checkboxContainer}>
            <div>
              <div className="font-semibold text-white">Include Motivational Quotes?</div>
              <div className="text-sm text-zinc-500">Adds a famous quote relevant to your habit.</div>
            </div>
            <input 
              type="checkbox" 
              name="includeQuotes"
              checked={formData.includeQuotes}
              onChange={handleChange}
              className={s.checkbox}
            />
          </div>

          <div className={s.actions}>
            {/* Back to Step 2 */}
            <Link href="/habits/new/step2">
              <button type="button" className={s.backBtn}>
                Back
              </button>
            </Link>

            {/* Finish -> Preview Page */}
            <Link href="/habits/preview">
              <button type="button" className={s.finishBtn}>
                Generate Preview
              </button>
            </Link>
          </div>

        </form>

      </div>
    </div>
  );
}