'use client'

import { Button } from "@/components/ui/button";
import { MarginCallPanel } from "./cards/MarginCallPanel";

const activePeople = [
  { user: "Kutay Can", marginLevel: "%400", status: true },
  { user: "Ahmet Amca", marginLevel: "%74", status: true },
];

const marginCalls = [
  { user: "Kutay Can", margin: "$123.01", marginLevel: "%95" },
  { user: "Ahmet Amca", margin: "$23.01", marginLevel: "%74" },
];

export const ActionPanel = () => {
  return (
    <aside
  className="w-full py-2 sticky top-16 overflow-y-auto flex flex-col gap-6 p-4"
  style={{ height: 'calc(100vh - 4rem)' }}
>
  <MarginCallPanel activePeople={activePeople} marginCalls={marginCalls} />

  <div className="flex flex-col gap-2.5">
    <Button className="w-full bg-primary hover:bg-primary/90" size="lg">Refresh Data</Button>
    <Button className="w-full bg-primary hover:bg-primary/90" size="lg">New Trader</Button>
    <Button className="w-full bg-primary hover:bg-primary/90" size="lg">Edit Trader User</Button>
    <Button className="w-full bg-primary hover:bg-primary/90" size="lg">Block Trader</Button>
    <Button className="w-full bg-primary hover:bg-primary/90" size="lg">Delete Trader</Button>
  </div>
</aside>

  );
};
