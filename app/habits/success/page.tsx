"use client";

import React from 'react';
import Link from 'next/link';
import { Check, ArrowRight, Calendar, Clock } from 'lucide-react';
import s from './style.module.css';

export default function SuccessPage() {
  
  // Hardcoded summary data (In a real app, this would come from the API response)
  const summary = {
    habitName: "Morning Jog",
    startDate: "Tomorrow",
    firstReminder: "06:30 AM",
    personaName: "The Drill Sergeant"
  };

  return (
    <div className={s.container}>
      <div className={s.successCard}>
        
        {/* Animated Icon */}
        <div className={s.iconWrapper}>
          <Check size={40} strokeWidth={3} />
        </div>

        <h1 className={s.title}>Habit Locked In!</h1>
        <p className={s.subtitle}>
          Your new routine is set. We've scheduled your first accountability email.
        </p>

        {/* Summary Ticket */}
        <div className={s.summaryTicket}>
          
          <div className={s.ticketLabel}>HABIT</div>
          <div className={s.ticketValue}>{summary.habitName}</div>

          <div className={s.ticketRow}>
            <div className={s.ticketItem}>
              <div className={s.ticketLabel}>STARTS</div>
              <div className="flex items-center gap-2 font-semibold">
                <Calendar size={14} className="text-indigo-400" /> 
                {summary.startDate}
              </div>
            </div>
            
            <div className={s.ticketItem}>
              <div className={s.ticketLabel}>REMINDER</div>
              <div className="flex items-center gap-2 font-semibold">
                <Clock size={14} className="text-indigo-400" />
                {summary.firstReminder}
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-zinc-700">
            <div className={s.ticketLabel}>ACCOUNTABILITY PARTNER</div>
            <div className="text-sm text-zinc-300">
              Managed by <span className="text-white font-bold">{summary.personaName}</span>
            </div>
          </div>

        </div>

        {/* Action Button */}
        <Link href="/dashboard" className={s.dashboardBtn}>
          Go to Dashboard <ArrowRight size={20} />
        </Link>

      </div>
    </div>
  );
}