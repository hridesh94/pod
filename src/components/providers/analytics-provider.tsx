"use client";

import { useEffect } from 'react';
import { GoogleAnalytics } from '@/components/analytics/google-analytics';

interface AnalyticsProviderProps {
  gaId?: string;
}

export const AnalyticsProvider = ({ gaId }: AnalyticsProviderProps) => {
  if (!gaId) {
    return null;
  }

  return <GoogleAnalytics measurementId={gaId} />;
};
