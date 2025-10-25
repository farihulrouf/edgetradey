'use client'

import React, { useEffect, useRef } from "react";

type GLContainerProps = {
  components: Record<string, React.ComponentType<any>>;
};

export const GLContainer: React.FC<GLContainerProps> = ({ components }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let layout: any;

    const loadGoldenLayout = async () => {
      const mod = await import("@annotationhub/react-golden-layout");
      const GoldenLayout = mod.default;

      // abaikan type checking di sini, karena library tidak ekspor tipe Config
      const config = {
        content: [
          {
            type: "row",
            content: [
              {
                type: "react-component",
                component: "TradersTable",
                title: "Traders Table",
              },
              {
                type: "react-component",
                component: "StatsCards",
                title: "Stats Cards",
              },
            ],
          },
        ],
      } as any;

      if (containerRef.current) {
        layout = new GoldenLayout(config, containerRef.current);
        Object.entries(components).forEach(([key, comp]) => {
          layout.registerComponent(key, comp);
        });
        layout.init();
      }
    };

    loadGoldenLayout();

    return () => {
      if (layout) layout.destroy?.();
    };
  }, [components]);

  return <div ref={containerRef} style={{ width: "100%", height: "600px" }} />;
};
