"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Save, Trash2, ArrowLeft } from 'lucide-react';
import s from './style.module.css';
import { EditHabitData } from './type';

// Simulate fetching existing data for "Morning Jog"
const MOCK_EXISTING_DATA: EditHabitData = {
  id: '1',
  title: 'Morning',
  description: 'Run 5km around the central park to boost metabolism.',
  time: '06:30',
  frequency: 'DAILY',
  persona: 'DRILL_SERGEANT',
  isActive: true,
};

export default function EditHabitPage({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState<EditHabitData>(MOCK_EXISTING_DATA);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Handle Checkbox
    if (type === 'checkbox') {
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({ ...prev, [name]: checked }));
        return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert("Habit updated successfully!");
      // In real app: router.push('/dashboard');
    }, 1000);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this habit? This cannot be undone.")) {
      alert("Habit deleted.");
      // In real app: router.push('/dashboard');
    }
  };

  return (
    <div className={s.container}>
      <div className={s.editCard}>
        
        {/* Header */}
        <div className={s.header}>
          <div>
            <h1 className={s.title}>Edit Habit</h1>
            <p className={s.subtitle}>Update details for "{MOCK_EXISTING_DATA.title}"</p>
          </div>
          <Link href="/dashboard" className={s.cancelBtn}>
             <ArrowLeft size={20} />
          </Link>
        </div>

        <form onSubmit={handleSave}>
          
          {/* SECTION 1: BASICS */}
          <div className={s.sectionTitle}>Basic Details</div>
          <div className={s.formGrid}>
            <div className={`${s.formGroup} ${s.fullWidth}`}>
              <label className={s.label}>Habit Name</label>
              <input 
                name="title"
                type="text"
                className={s.input}
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className={`${s.formGroup} ${s.fullWidth}`}>
              <label className={s.label}>Description & Goal</label>
              <textarea 
                name="description"
                className={s.textarea}
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* SECTION 2: SCHEDULE */}
          <div className={s.sectionTitle}>Schedule & Timing</div>
          <div className={s.formGrid}>
            <div className={s.formGroup}>
              <label className={s.label}>Reminder Time</label>
              <input 
                name="time"
                type="time"
                className={s.input}
                value={formData.time}
                onChange={handleChange}
              />
            </div>

            <div className={s.formGroup}>
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
          </div>

          {/* SECTION 3: MOTIVATION */}
          <div className={s.sectionTitle}>Motivation</div>
          <div className={s.formGrid}>
            <div className={`${s.formGroup} ${s.fullWidth}`}>
              <label className={s.label}>AI Persona Tone</label>
              <select 
                name="persona"
                className={s.select}
                value={formData.persona}
                onChange={handleChange}
              >
                <option value="DRILL_SERGEANT">The Drill Sergeant (Tough Love)</option>
                <option value="GENTLE_GUIDE">The Gentle Guide (Supportive)</option>
                <option value="STOIC_PHILOSOPHER">The Stoic (Logical)</option>
                <option value="HYPE_MAN">The Hype Man (Energetic)</option>
              </select>
            </div>
          </div>

          {/* SECTION 4: STATUS */}
          <div className={s.statusRow}>
            <div>
              <div className={s.statusLabel}>Active Status</div>
              <div className={s.statusDesc}>Uncheck to pause reminders temporarily.</div>
            </div>
            <input 
              name="isActive"
              type="checkbox"
              className={s.toggleInput}
              checked={formData.isActive}
              onChange={handleChange}
            />
          </div>

          {/* ACTION BAR */}
          <div className={s.actions}>
            <button type="button" onClick={handleDelete} className={s.deleteBtn}>
              <Trash2 size={18} /> Delete Habit
            </button>

            <div className="flex gap-4 items-center">
              <Link href="/dashboard" className={s.cancelBtn}>
                Cancel
              </Link>
              <button type="submit" className={s.saveBtn} disabled={isSaving}>
                <Save size={18} /> {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}