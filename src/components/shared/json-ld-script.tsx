"use client";

import React from 'react';
import Script from 'next/script';

export const JsonLdScript = ({ data }: { data: any }) => {
  return (
    <Script
      id="json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      strategy="afterInteractive"
    />
  );
};
