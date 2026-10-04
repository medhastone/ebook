'use client';

import React from 'react';

/**
 * MagneticButton (Clean CSS interactive button)
 * Pure, high-performance CSS hover & active transitions with zero JavaScript physics or mouse tracking.
 * Provides subtle scale, brightness enhancement, and tactile click response.
 */
interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
  maxTilt?: number;
  className?: string;
}

export function MagneticButton({
  children,
  className = '',
}: MagneticButtonProps) {
  return (
    <div
      className={`inline-block transform transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * TiltPhysicsCard (Clean CSS interactive card)
 * Clean, lightweight CSS hover elevation and illuminated border traces with zero 3D matrix tilts or mouse event listeners.
 */
interface TiltPhysicsCardProps {
  children: React.ReactNode;
  maxAngle?: number;
  className?: string;
  glowColor?: 'amber' | 'teal' | 'purple' | 'gold';
  enableGlare?: boolean;
}

export function TiltPhysicsCard({
  children,
  className = '',
  glowColor = 'amber',
}: TiltPhysicsCardProps) {
  const glowClass = {
    amber: 'hover:border-amber-400/80 hover:shadow-[0_12px_32px_rgba(232,135,30,0.18)]',
    teal: 'hover:border-teal-400/80 hover:shadow-[0_12px_32px_rgba(13,148,136,0.2)]',
    purple: 'hover:border-purple-400/80 hover:shadow-[0_12px_32px_rgba(168,85,247,0.2)]',
    gold: 'hover:border-yellow-400/80 hover:shadow-[0_12px_32px_rgba(250,204,21,0.22)]',
  }[glowColor];

  return (
    <div
      className={`relative transform transition-all duration-200 ease-out hover:-translate-y-1 ${glowClass} ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * AmbientPhysicsBackground
 * Static, non-blocking atmospheric gradient orbs for ambient visual depth.
 */
export function AmbientPhysicsBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Amber Orb Top Right */}
      <div 
        className="absolute -top-32 -right-32 w-[550px] h-[550px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(232, 135, 30, 0.45) 0%, rgba(232, 135, 30, 0) 70%)',
        }}
      />
      {/* Teal Orb Center Left */}
      <div 
        className="absolute top-1/3 -left-48 w-[650px] h-[650px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(13, 148, 136, 0.45) 0%, rgba(13, 148, 136, 0) 70%)',
        }}
      />
      {/* Subtle Indigo Orb Bottom */}
      <div 
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.35) 0%, rgba(99, 102, 241, 0) 70%)',
        }}
      />
    </div>
  );
}
