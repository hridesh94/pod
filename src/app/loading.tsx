import React from 'react';

export default function Loading() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-16 h-8">
          <div className="absolute top-0 left-0 w-4 h-8 bg-primary-500 animate-pulse rounded-full"></div>
          <div className="absolute top-2 left-6 w-4 h-6 bg-accent-500 animate-pulse delay-75 rounded-full"></div>
          <div className="absolute top-4 left-12 w-4 h-4 bg-primary-900 animate-pulse delay-150 rounded-full"></div>
        </div>
        <p className="text-sm font-medium text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}