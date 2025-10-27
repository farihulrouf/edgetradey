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
  const cardClass = "p-4 flex flex-col gap-3 bg-white shadow-lg rounded-md"; // <-- konsisten dengan PendingDeposit

  return (
    <div className="flex flex-col gap-6 mt-4">
      {/* Active People */}
      <Card className={cardClass}>
        <h3 className="font-semibold text-sm mb-2 text-center">List of Active People</h3>
        <div className="grid grid-cols-3 text-xs font-medium text-muted-foreground bg-gray-100 px-2 py-1 rounded-t-md">
          <span>Status</span>
          <span>User</span>
          <span className="text-right">Margin Level</span>
        </div>
        {activePeople.map((person, idx) => (
          <div key={idx} className={`grid grid-cols-3 text-sm items-center ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} px-2 py-1`}>
            <div className={`w-2.5 h-2.5 rounded-full ${person.status ? "bg-green-500" : "bg-red-500"}`} />
            <span className="text-card-foreground">{person.user}</span>
            <span className="text-card-foreground text-right">{person.marginLevel}</span>
          </div>
        ))}
      </Card>

      {/* Margin Calls */}
      <Card className={cardClass}>
        <h3 className="font-semibold text-sm mb-2 text-center text-red-600">Margin Call</h3>
        <div className="grid grid-cols-3 text-xs font-medium text-muted-foreground bg-gray-100 px-2 py-1 rounded-t-md">
          <span>User</span>
          <span className="text-center">Margin</span>
          <span className="text-right">Margin Level</span>
        </div>
        {marginCalls.map((call, idx) => (
          <div key={idx} className={`grid grid-cols-3 text-sm items-center ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} px-2 py-1`}>
            <span className="text-card-foreground">{call.user}</span>
            <span className="text-red-600 text-center">{call.margin}</span>
            <span className="text-red-600 text-right">{call.marginLevel}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}
