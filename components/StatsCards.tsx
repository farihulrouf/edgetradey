import { Card } from "@/components/ui/card";

const statsData = [
  {
    items: [
      { value: "55", label: "Total Users", color: "text-foreground" },
      { value: "$30,000.00", label: "Net Profit", color: "text-success" },
    ],
  },
  {
    items: [
      { value: "247", label: "Pending Deposit", color: "text-primary" },
      { value: "118", label: "Pending Withdrawal", color: "text-destructive" },
    ],
  },
  {
    items: [
      { value: "$30,000.00", label: "Total Deposit", color: "text-primary" },
      { value: "$30,000.00", label: "Total Withdrawal", color: "text-destructive" },
    ],
  },
];

export const StatsCards = () => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {statsData.map((card, idx) => (
        <Card key={idx} className="p-6 border-2 border-primary/30">
          <div className="flex justify-around items-center divide-x divide-border">
            {card.items.map((item, itemIdx) => (
              <div key={itemIdx} className="text-center flex-1 px-4 first:pl-0 last:pr-0">
                <div className={`text-3xl font-bold ${item.color} mb-1`}>{item.value}</div>
                <div className="text-xs text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};
