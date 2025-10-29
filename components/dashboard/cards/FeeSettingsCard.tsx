import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface FeeSettingsCardProps {
  text?: string;
}

const FeeSettingsCard = ({ text = "Withdraw Bank Fee" }: FeeSettingsCardProps) => {
  const [fee, setFee] = useState("0.01");

  const handleFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setFee(value);
    }
  };

  const handleSave = () => {
    if (fee === "") {
      toast.error("Please enter withdrawal fee");
      return;
    }
    toast.success(`Withdrawal fee saved: ${fee}%`);
  };

  return (
    <Card className="w-full max-w-2xl shadow-md border-border/50">
      <CardHeader className="pb-3 pt-5 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">{text}</CardTitle>
        {/* Fixed width container untuk preview agar tidak bergerak */}
        <div className="min-w-[120px] h-10 flex items-center justify-end">
          <div className="rounded-lg bg-green-50 border border-green-200 px-3 py-2">
            <p className="text-sm text-green-800 whitespace-nowrap">
              Preview: <span className="font-semibold text-green-600">{fee}%</span>
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pb-5">
        <div className="space-y-2">
          <Label htmlFor="fee" className="text-sm font-medium">
            Fee Percentage (%)
          </Label>
          <div className="flex items-center gap-3">
            <Input
              id="fee"
              type="text"
              inputMode="decimal"
              placeholder="Enter fee percentage"
              value={fee}
              onChange={handleFeeChange}
              className="h-10 text-sm flex-1"
            />
            <Button 
              onClick={handleSave} 
              className="h-10 text-sm bg-blue-600 hover:bg-blue-700 whitespace-nowrap min-w-[120px]"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeeSettingsCard;