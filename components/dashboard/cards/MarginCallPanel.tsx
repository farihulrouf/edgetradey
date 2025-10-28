'use client'

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
  const cardClass =
    "p-2 flex flex-col gap-3 bg-white shadow-lg rounded-md h-[250px]";

  return (
    <div className="flex flex-col gap-3 mt-2">
      {/* ================= Active People ================= */}
      <Card className={cardClass}>
        <h3 className="font-semibold text-md mb-2 text-center">
          List of Active People
        </h3>

        {/* Header */}
        <div className="grid grid-cols-3 text-xs font-medium text-black bg-gray-300 px-2 h-11 items-center rounded-t-md">
          <span>Status</span>
          <span>User</span>
          <span className="text-right whitespace-nowrap">Margin Level</span>
        </div>

        {/* Rows */}
        <div className="overflow-y-auto">
          {activePeople.map((person, idx) => {
            const isLast = idx === activePeople.length - 1;
            return (
              <div
                key={idx}
                className={`grid grid-cols-3 text-[11px] items-center px-2 h-11
                ${idx % 2 === 0 ? "bg-white" : "bg-gray-200"}
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
        <div className="grid grid-cols-3 text-[11px] font-medium bg-gray-200 px-2 h-11 items-center rounded-t-md">
          <span>User</span>
          <span className="text-center">Margin</span>
          <span className="text-right whitespace-nowrap">Margin Level</span>
        </div>

        {/* Rows */}
        <div className="overflow-y-auto">
          {marginCalls.map((call, idx) => {
            const isLast = idx === marginCalls.length - 1;
            return (
              <div
                key={idx}
                className={`grid grid-cols-3 text-[11px] items-center px-2 h-11
                ${idx % 2 === 0 ? "bg-white" : "bg-gray-200"}
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
