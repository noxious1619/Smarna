// Shared Layout for Login/Signup
import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // We just pass the children through. 
    // The specific pages (Login/Signup) already handle their own centering and background colors.
    <>
      {children}
    </>
  );
}