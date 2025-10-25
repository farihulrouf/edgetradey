'use client';

import React, { useRef, useEffect } from 'react';
import GoldenLayout from '@annotationhub/react-golden-layout';

interface GoldenLayoutWrapperProps {
  config: any;
  components: Record<string, React.ComponentType<any>>;
}

export const GoldenLayoutWrapper: React.FC<GoldenLayoutWrapperProps> = ({ config, components }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // paksa tipe any supaya TypeScript tidak error
    const layout = new (GoldenLayout as any)(containerRef.current, config as any);

    Object.keys(components).forEach(key => {
      layout.registerComponent(key, components[key]);
    });

    layout.init();

    return () => layout.destroy?.();
  }, [config, components]);

  return <div ref={containerRef} style={{ width: '100%', height: '600px' }} />;
};
