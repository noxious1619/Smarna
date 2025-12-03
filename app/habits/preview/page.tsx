"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { RefreshCw, Edit2, CheckCircle, ArrowRight } from 'lucide-react';
import s from './style.module.css';
import { EmailPreviewData } from './type';

// Mock Data simulating what the AI generated based on "Drill Sergeant" persona
const SAMPLE_PREVIEWS: EmailPreviewData[] = [
  {
    senderName: "David Goggins (AI)",
    senderEmail: "coach@smarna.ai",
    avatar: "😠",
    subject: "WAKE UP! It's 6:30 AM ⏰",
    body: `Listen to me. 

The alarm didn't go off so you could hit snooze. It went off because you made a promise to yourself.

It's 6:30 AM. The pavement is waiting. 5km isn't going to run itself, and neither are you. While you're thinking about how warm the bed is, someone else is out there getting stronger.

Don't think. Just lace up.

I'll see you at the finish line.`
  },
  {
    senderName: "David Goggins (AI)",
    senderEmail: "coach@smarna.ai",
    avatar: "😠",
    subject: "No Excuses. Only Results.",
    body: `You said you wanted to change. You said you wanted to be better.

Well, here is your chance. It's time for your Morning Jog.

Pain is weakness leaving the body. Fatigue is just a suggestion. Get out there and dominate the path. Do not return until that 5km is done.

Stay Hard.`
  }
];

export default function PreviewPage() {
  const [versionIndex, setVersionIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Toggle between the two sample variations
  const handleRegenerate = () => {
    setIsAnimating(true);
    // Simulate API delay for effect
    setTimeout(() => {
      setVersionIndex(prev => (prev === 0 ? 1 : 0));
      setIsAnimating(false);
    }, 600);
  };

  const currentEmail = SAMPLE_PREVIEWS[versionIndex];

  return (
    <div className={s.container}>
      <div className={s.glassContainer}>
        
        <div className={s.header}>
          <h1 className={s.title}>Preview Your Routine</h1>
          <p className={s.subtitle}>This is exactly what you'll see in your inbox tomorrow.</p>
        </div>

        {/* --- EMAIL SIMULATION CARD --- */}
        <div className={s.emailPaper} style={{ opacity: isAnimating ? 0.5 : 1, transition: 'opacity 0.3s' }}>
          
          {/* Email Header */}
          <div className={s.emailHeader}>
            <div className={s.metaRow}>
              <div className={s.senderInfo}>
                <div className={s.senderAvatar}>{currentEmail.avatar}</div>
                <div>
                  <span className={s.senderName}>{currentEmail.senderName}</span>
                  <span className={s.senderEmail}>{currentEmail.senderEmail}</span>
                </div>
              </div>
              <span className={s.timestamp}>06:30 AM</span>
            </div>
            <div className={s.subjectLine}>{currentEmail.subject}</div>
          </div>

          {/* Email Body */}
          <div className={s.emailBody}>
            {currentEmail.body}
            
            <div className={s.signature}>
              Sent via Smarna • Your Accountability Partner
            </div>
          </div>

        </div>

        {/* --- ACTIONS --- */}
        <div className={s.actions}>
          
          <div className={s.secondaryActions}>
            <button className={s.outlineBtn} onClick={handleRegenerate}>
              <RefreshCw size={18} className={isAnimating ? 'animate-spin' : ''} />
              Regenerate
            </button>
            <Link href="/habits/new/step1" className={s.outlineBtn}>
              <Edit2 size={18} />
              Edit
            </Link>
          </div>

          <Link href="/habits/success" className={s.confirmBtn}>
            Confirm & Activate <ArrowRight size={20} />
          </Link>
          
        </div>

      </div>
    </div>
  );
}