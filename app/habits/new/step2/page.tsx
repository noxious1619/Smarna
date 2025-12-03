"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import s from './style.module.css';
import { SchedulingFormData } from './type';

// Default data (Today's date for start date)
const initialData: SchedulingFormData = {
  reminderTime: '08:00',
  timeZone: 'Asia/Kolkata',
  startDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD
  endDate: '',
};

const TIMEZONES = [
  'Asia/Kolkata',
  'America/New_York',
  'Europe/London',
  'Australia/Sydney',
  'UTC'
];

export default function SchedulingPage() {
  const [formData, setFormData] = useState<SchedulingFormData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className={s.container}>
      <div className={s.formCard}>
        
        <div className={s.header}>
          <p className="text-sm text-zinc-500 font-medium">Step 2 of 3</p>
          <h1 className={s.stepTitle}>Scheduling</h1>
          <p className={s.stepSubtitle}>Lock in when reminders should arrive and for how long.</p>
          
          {/* Progress Bar (66%) */}
          <div className={s.progressContainer}>
            <div className={s.progressBar}></div>
          </div>
        </div>

        <form>
          <div className={s.formGrid}>
            
            {/* Reminder Time */}
            <div className={`${s.formGroup} ${s.half}`}>
              <label className={s.label} htmlFor="reminderTime">Preferred Reminder Time</label>
              <input 
                id="reminderTime"
                name="reminderTime"
                type="time"
                className={s.input}
                value={formData.reminderTime}
                onChange={handleChange}
              />
            </div>

            {/* Time Zone */}
            <div className={`${s.formGroup} ${s.half}`}>
              <label className={s.label} htmlFor="timeZone">Time Zone</label>
              <select 
                id="timeZone"
                name="timeZone"
                className={s.select}
                value={formData.timeZone}
                onChange={handleChange}
              >
                {TIMEZONES.map(tz => (
                  <option key={tz} value={tz}>{tz}</option>
                ))}
              </select>
            </div>

            {/* Start Date */}
            <div className={`${s.formGroup} ${s.half}`}>
              <label className={s.label} htmlFor="startDate">Start Date</label>
              <input 
                id="startDate"
                name="startDate"
                type="date"
                className={s.input}
                value={formData.startDate}
                onChange={handleChange}
              />
            </div>

            {/* End Date (Optional) */}
            <div className={`${s.formGroup} ${s.half}`}>
              <label className={s.label} htmlFor="endDate">End Date / Review (Optional)</label>
              <input 
                id="endDate"
                name="endDate"
                type="date"
                className={s.input}
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className={s.actions}>
            {/* Back Button */}
            <Link href="/habits/new/step1">
              <button type="button" className={s.backBtn}>
                Back
              </button>
            </Link>

            {/* Next Button */}
            <Link href="/habits/new/step3">
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