import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
    <aside className="w-72 border-l border-border bg-background p-4 space-y-4">
      <Card className="p-4">
        <h3 className="font-semibold mb-4 text-card-foreground">List of active people</h3>
        <div className="space-y-3">
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
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold mb-4 text-destructive">Margin Call</h3>
        <div className="space-y-3">
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
        </div>
      </Card>

      <div className="space-y-2.5">
        <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
          Refresh Data
        </Button>
        <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
          New Trader
        </Button>
        <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
          Edit Trader User
        </Button>
        <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
          Block Trader
        </Button>
        <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
          Delete Trader
        </Button>
      </div>
    </aside>
  );
};
