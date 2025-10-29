'use client'

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

interface ActivePerson {
  user: string;
  marginLevel: string;
  status: boolean;
}

interface MarginCall {
  user: string;
  margin: string;
  marginLevel: string;
}

interface Props {
  activePeople: ActivePerson[];
  marginCalls: MarginCall[];
}

export const MarginCallPanel = ({ activePeople, marginCalls }: Props) => {
  const [loading, setLoading] = useState(true);
  const cardClass = "p-2 flex flex-col gap-3 bg-white shadow-lg rounded-md h-[250px]";

  // Simulasi loading 1.5 detik
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const renderSkeletonRow = () => (
    <div className="grid grid-cols-3 h-11 px-2 items-center animate-pulse">
      <div className="w-2.5 h-2.5 bg-gray-300 rounded-full" />
      <div className="h-3 bg-gray-300 rounded col-span-1"></div>
      <div className="h-3 bg-gray-300 rounded col-span-1 text-right"></div>
    </div>
  );

  return (
    <div className="flex flex-col gap-3 mt-2">
      {/* ================= Active People ================= */}
      <Card className={cardClass}>
        <h3 className="font-semibold text-md mb-2 text-center">
          List of Active People
        </h3>

        {/* Header */}
        <div className="grid grid-cols-3 text-xs font-medium text-black bg-[#D1D1D6] px-2 h-11 items-center rounded-t-md">
          <span>Status</span>
          <span>User</span>
          <span className="text-right whitespace-nowrap">Margin Level</span>
        </div>

        {/* Rows */}
        <div className="overflow-y-auto">
          {loading
            ? Array(4)
                .fill(0)
                .map((_, idx) => <div key={idx}>{renderSkeletonRow()}</div>)
            : activePeople.map((person, idx) => {
                const isLast = idx === activePeople.length - 1;
                return (
                  <div
                    key={idx}
                    className={`grid grid-cols-3 text-[11px] items-center px-2 h-11
                    ${idx % 2 === 0 ? "bg-white" : "bg-[#EFEFF4]"}
                    ${isLast ? "rounded-b-md" : ""}`}
                  >
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
                        person.status ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                    <span className="text-card-foreground">{person.user}</span>
                    <span className="text-card-foreground text-right whitespace-nowrap">
                      {person.marginLevel}
                    </span>
                  </div>
                );
              })}
        </div>
      </Card>

      {/* ================= Margin Call ================= */}
      <Card className={cardClass}>
        <h3 className="font-semibold text-md mb-2 text-center text-red-600">
          Margin Call
        </h3>

        {/* Header */}
        <div className="grid grid-cols-3 text-[11px] font-medium bg-[#D1D1D6] px-2 h-11 items-center rounded-t-md">
          <span>User</span>
          <span className="text-center">Margin</span>
          <span className="text-right whitespace-nowrap">Margin Level</span>
        </div>

        {/* Rows */}
        <div className="overflow-y-auto">
          {loading
            ? Array(4)
                .fill(0)
                .map((_, idx) => <div key={idx}>{renderSkeletonRow()}</div>)
            : marginCalls.map((call, idx) => {
                const isLast = idx === marginCalls.length - 1;
                return (
                  <div
                    key={idx}
                    className={`grid grid-cols-3 text-[11px] items-center px-2 h-11
                    ${idx % 2 === 0 ? "bg-white" : "bg-[#EFEFF4]"}
                    ${isLast ? "rounded-b-md" : ""}`}
                  >
                    <span className="text-card-foreground">{call.user}</span>
                    <span className="text-red-600 text-center">{call.margin}</span>
                    <span className="text-red-600 text-right whitespace-nowrap">
                      {call.marginLevel}
                    </span>
                  </div>
                );
              })}
        </div>
      </Card>
    </div>
  );
};
