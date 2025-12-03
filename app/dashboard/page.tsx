"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Clock, X, Zap } from "lucide-react";
import s from "./style.module.css";
import { Habit, HabitStatus } from "./type";

// --- HARDCODED MOCK DATA ---
const INITIAL_HABITS: Habit[] = [
  {
    id: '1',
    title: 'Morning Jog',
    time: '06:30 AM',
    frequency: 'Daily',
    status: 'ACTIVE',
    description: 'Run 5km around the central park to boost metabolism.',
    persona: { name: 'David Goggins', avatar: '😠', style: 'Drill Sergeant' }
  },
  {
    id: '2',
    title: 'Deep Work',
    time: '09:00 AM',
    frequency: 'Mon - Fri',
    status: 'ACTIVE',
    description: 'No phone, no email. Just 2 hours of pure coding.',
    persona: { name: 'Steve Jobs', avatar: '🤔', style: 'Visionary' }
  },
  {
    id: '3',
    title: 'Read Book',
    time: '09:00 PM',
    frequency: 'Daily',
    status: 'PAUSED',
    description: 'Read at least 10 pages of non-fiction.',
    persona: { name: 'Calm Monk', avatar: '🧘', style: 'Gentle Guide' }
  }
];

export default function DashboardPage() {
  // State for the habit list, filters, and the modal popup
  const [habits, setHabits] = useState<Habit[]>(INITIAL_HABITS);
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'PAUSED'>('ALL');
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);

  // --- ACTIONS ---

  // Function to toggle the status of a habit (Active/Paused)
  const toggleHabit = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents the card from opening the modal
    setHabits(prev => prev.map(h => {
      if (h.id === id) {
        return { ...h, status: h.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' };
      }
      return h;
    }));
  };

  // Logic to filter the habits based on the selected tab
  const filteredHabits = habits.filter(h => {
    if (filter === 'ALL') return true;
    return h.status === filter;
  });

  return (
    <div className={s.container}>
      
      {/* --- RIGHT SIDEBAR (The Glass User Hub) --- */}
      <aside className={s.sidebar}>
        
        {/* User Profile */}
        <div className={s.userCard}>
          <div className={s.avatar}>D</div>
          <div>
            <div className={s.userName}>Dishant</div>
            <Link href="/profile" className={s.userEditLink}>Edit Profile</Link>
          </div>
        </div>

        {/* Next Up Widget */}
        <div>
          <div className={s.widgetTitle}>Next Up</div>
          <div className={s.nextUpCard}>
            <div className={s.nextUpTime}>In 1 hr 20 mins</div>
            <div className="font-bold text-white">Morning Jog</div>
            <div className="text-xs text-zinc-500 mt-1">David Goggins is waiting...</div>
          </div>
        </div>
      </aside>


      {/* --- LEFT MAIN CONTENT (The Glass Habit Deck) --- */}
      <main className={s.mainContent}>
        
        {/* Header */}
        <header className={s.header}>
          <div>
            <h1 className={s.greeting}>Good Morning, Dishant</h1>
            <p className={s.date}>Tuesday, December 3rd</p>
          </div>
          <Link href="/habits/new/step1" className={s.addBtn}>
            + New Habit
          </Link>
        </header>

        {/* Filters */}
        <div className={s.filterBar}>
          {(['ALL', 'ACTIVE', 'PAUSED'] as const).map((tab) => (
            <button 
              key={tab}
              onClick={() => setFilter(tab)}
              className={`${s.filterTab} ${filter === tab ? s.activeTab : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Empty State */}
        {filteredHabits.length === 0 && (
          <div className="text-zinc-500 py-10">No {filter.toLowerCase()} habits found. Click + New Habit to start your journey!</div>
        )}

        {/* Habit Grid */}
        <div className={s.habitGrid}>
          {filteredHabits.map((habit) => (
            <div 
              key={habit.id} 
              className={s.habitCard}
              style={{ opacity: habit.status === 'PAUSED' ? 0.6 : 1 }}
              onClick={() => setSelectedHabit(habit)}
            >
              <div className={s.cardHeader}>
                <div className={s.cardTime}>
                  <Clock size={14} /> {habit.time}
                </div>
                {/* Toggle Switch */}
                <button 
                  className={`${s.toggleBtn} ${habit.status === 'ACTIVE' ? s.toggleOn : ''}`}
                  onClick={(e) => toggleHabit(habit.id, e)}
                >
                  <span className={`${s.toggleHandle} ${habit.status === 'ACTIVE' ? s.toggleHandleOn : ''}`} />
                </button>
              </div>

              <h3 className={s.cardTitle}>{habit.title}</h3>
              <div className="text-zinc-500 text-sm mb-4">{habit.frequency}</div>

            </div>
          ))}
        </div>

      </main>


      {/* --- MODAL OVERLAY (Detailed Habit View) --- */}
      {selectedHabit && (
        <div className={s.modalOverlay} onClick={() => setSelectedHabit(null)}>
          <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
            
            <button className={s.modalClose} onClick={() => setSelectedHabit(null)}>
              <X size={24} />
            </button>

            <h2 className="text-3xl font-bold mb-2">{selectedHabit.title}</h2>
            <div className="text-zinc-400 flex items-center gap-2 mb-6">
               <Clock size={16} /> {selectedHabit.time} • {selectedHabit.frequency}
            </div>

            <p className="text-zinc-300 leading-relaxed text-lg">
              {selectedHabit.description}
            </p>

            {/* Persona Section */}
            <div className={s.modalPersona}>
              <div className="text-2xl">{selectedHabit.persona.avatar}</div>
              <div>
                <div className="text-sm text-zinc-500 uppercase font-bold tracking-wider">Motivation Style</div>
                <div className="font-semibold text-white">
                  {selectedHabit.persona.name} ({selectedHabit.persona.style})
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-8 pt-6 border-t border-zinc-800">
               <div className="text-zinc-500 text-sm">
                 Current Status: <span className="text-white font-bold">{selectedHabit.status}</span>
               </div>
               <Link href={`/habits/${selectedHabit.id}/edit`} className={s.editBtn}>
                 Edit Habit
               </Link>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}