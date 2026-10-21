'use client';

import React from 'react';

interface ChaiCup3DProps {
  className?: string;
  fallback?: React.ReactNode;
}

export default function ChaiCup3D({ className, fallback }: ChaiCup3DProps) {
  if (fallback) {
    return <div className={className}>{fallback}</div>;
  }
  return null;
}
