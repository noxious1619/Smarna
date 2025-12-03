"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import s from './style.module.css';
import { HabitSetupFormData, FrequencyOption, DurationOption } from './type';

// Initial state for the form
const initialData: HabitSetupFormData = {
  name: '',
  description: '',
  goal: '',
  frequency: 'DAILY',
  customDays: [],
  duration: '30_MIN',
};

// Data for rendering options
const DURATION_OPTIONS: { value: DurationOption, label: string }[] = [
  { value: '15_MIN', label: '15 Minutes' },
  { value: '30_MIN', label: '30 Minutes' },
  { value: '1_HOUR', label: '1 Hour' },
  { value: 'CUSTOM', label: 'Custom' },
];

const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export default function HabitSetupPage() {
  const [formData, setFormData] = useState<HabitSetupFormData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDayToggle = (index: number) => {
    setFormData(prev => {
      const isSelected = prev.customDays.includes(index);
      return {
        ...prev,
        customDays: isSelected
          ? prev.customDays.filter(day => day !== index) // Remove
          : [...prev.customDays, index].sort(),       // Add and Sort
      };
    });
  };

  return (
    <div className={s.container}>
      <div className={s.formCard}>
        
        <div className={s.header}>
          <p className="text-sm text-zinc-500 font-medium">Step 1 of 3</p>
          <h1 className={s.stepTitle}>Habit Setup</h1>
          <p className={s.stepSubtitle}>Define the habit clearly to set its routine basics.</p>
          
          <div className={s.progressContainer}>
            <div className={s.progressBar}></div>
          </div>
        </div>

        <form>
          {/* Habit Name / Goal */}
          <div className={s.formGrid}>
            
            <div className={`${s.formGroup} ${s.half}`}>
              <label className={s.label} htmlFor="name">Habit Name/Title</label>
              <input 
                id="name"
                name="name"
                type="text"
                placeholder="e.g. Morning Jog"
                className={s.input}
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className={`${s.formGroup} ${s.half}`}>
              <label className={s.label} htmlFor="goal">Goal/Outcome</label>
              <input 
                id="goal"
                name="goal"
                type="text"
                placeholder="e.g. Lose 5lbs"
                className={s.input}
                value={formData.goal}
                onChange={handleChange}
              />
            </div>

            {/* Description */}
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="description">Habit Description</label>
              <textarea 
                id="description"
                name="description"
                placeholder="e.g. Run 5km around the park"
                className={`${s.input} ${s.textarea}`}
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {/* Frequency Selection */}
            <div className={`${s.formGroup} ${s.half}`}>
              <label className={s.label}>Frequency</label>
              <select 
                name="frequency"
                className={s.select}
                value={formData.frequency}
                onChange={handleChange}
              >
                <option value="DAILY">Daily</option>
                <option value="WEEKLY">Weekly</option>
                <option value="CUSTOM">Custom Days</option>
              </select>
            </div>

            {/* Duration/Time Commitment */}
            <div className={`${s.formGroup} ${s.half}`}>
              <label className={s.label}>Duration/Time Commitment</label>
              <select 
                name="duration"
                className={s.select}
                value={formData.duration}
                onChange={handleChange}
              >
                {DURATION_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Custom Day Selection (Conditional Rendering) */}
            {formData.frequency === 'CUSTOM' && (
              <div className={s.formGroup}>
                <label className={s.label}>Select Days:</label>
                <div className={s.dayGrid}>
                  {WEEKDAYS.map((day, index) => (
                    <div 
                      key={day + index}
                      className={`${s.dayBtn} ${formData.customDays.includes(index) ? s.dayBtnActive : ''}`}
                      onClick={() => handleDayToggle(index)}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
          </div>

          <div className={s.actions}>
            {/* Hardcoded link for now. In a real app, this would pass formData via state/context */}
            <Link href="/habits/new/step2">
              <button type="button" className={s.nextBtn}>
                Next Step
              </button>
            </Link>
          </div>
        </form>

      </div>
    </div>
  );
}