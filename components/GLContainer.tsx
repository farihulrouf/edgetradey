'use client'

import dynamic from "next/dynamic";
import React from "react";

// Dynamic import agar SSR tidak memanggil class ES6 secara langsung
const GoldenLayoutComponent = dynamic(
  () => import("@annotationhub/react-golden-layout").then(mod => mod.default),
  { ssr: false }
);

type GLContainerProps = {
  components: Record<string, React.ComponentType<any>>
};

export const GLContainer: React.FC<GLContainerProps> = ({ components }) => {
  const config = {
    content: [
      {
        type: "row",
        content: [
          {
            type: "react-component",
            component: "TradersTable",
            title: "Traders Table"
          },
          {
            type: "react-component",
            component: "StatsCards",
            title: "Stats Cards"
          }
        ]
      }
    ]
  };

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <GoldenLayoutComponent config={config} components={components} />
    </div>
  );
};
