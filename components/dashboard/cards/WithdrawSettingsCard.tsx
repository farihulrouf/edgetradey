import { useState } from "react";
import { Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const WithdrawSettingsCard = () => { // Tambahkan 'export' di sini
  const [open, setOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [withdrawFee, setWithdrawFee] = useState("");

  const handleSave = () => {
    if (!selectedMethod) {
      toast.error("Please select a payment method");
      return;
    }
    if (!withdrawFee) {
      toast.error("Please enter withdraw fee");
      return;
    }
    toast.success("Settings saved successfully");
    setOpen(false);
  };

  const handleCancel = () => {
    setSelectedMethod("");
    setWithdrawFee("");
    setOpen(false);
  };

  return (
    <>
      <Card 
        className="w-48 cursor-pointer hover:shadow-lg transition-all duration-300 hover:border-primary/50"
        onClick={() => setOpen(true)}
      >
        <CardContent className="p-4 flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Settings className="w-6 h-6 text-primary" />
          </div>
          <p className="text-sm font-medium text-foreground">Setting Withdraw</p>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-md">
          <DialogHeader>
            <DialogTitle>Withdraw Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="payment-method">Payment Method</Label>
              <Select value={selectedMethod} onValueChange={setSelectedMethod}>
                <SelectTrigger id="payment-method">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="forex">Forex Bank LTD</SelectItem>
                  <SelectItem value="usdt">USDT</SelectItem>
                  <SelectItem value="btc">BTC</SelectItem>
                  <SelectItem value="eth">ETH</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="withdraw-fee">Withdraw Fee</Label>
              <Input
                id="withdraw-fee"
                type="number"
                placeholder="Enter fee amount"
                value={withdrawFee}
                onChange={(e) => setWithdrawFee(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

// Hapus 'export default WithdrawSettingsCard' dan ganti dengan:
export default WithdrawSettingsCard; // Tetap pertahankan default export jika perlu