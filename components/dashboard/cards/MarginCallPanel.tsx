// components/dashboard/MarginCallPanel.tsx
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
  return (
    <div className="flex flex-col gap-6 mt-4">
      {/* Active People */}
      <Card className="p-4 flex flex-col gap-3">
        <h3 className="font-semibold text-card-foreground">List of active people</h3>
        <div className="grid grid-cols-3 text-xs font-medium text-muted-foreground bg-muted/30 px-2 py-1 rounded">
          <span>Status</span>
          <span>User</span>
          <span className="text-right">Margin Level</span>
        </div>
        {activePeople.map((person, idx) => (
          <div key={idx} className="grid grid-cols-3 text-sm items-center">
            <div className={`w-2.5 h-2.5 rounded-full ${person.status ? "bg-success" : "bg-destructive"}`} />
            <span className="text-card-foreground">{person.user}</span>
            <span className="text-card-foreground text-right">{person.marginLevel}</span>
          </div>
        ))}
      </Card>

      {/* Margin Calls */}
      <Card className="p-4 flex flex-col gap-3">
        <h3 className="font-semibold text-destructive">Margin Call</h3>
        <div className="grid grid-cols-3 text-xs font-medium text-muted-foreground bg-muted/30 px-2 py-1 rounded">
          <span>User</span>
          <span className="text-center">Margin</span>
          <span className="text-right">Margin Level</span>
        </div>
        {marginCalls.map((call, idx) => (
          <div key={idx} className="grid grid-cols-3 text-sm items-center">
            <span className="text-card-foreground">{call.user}</span>
            <span className="text-destructive text-center">{call.margin}</span>
            <span className="text-destructive text-right">{call.marginLevel}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}
