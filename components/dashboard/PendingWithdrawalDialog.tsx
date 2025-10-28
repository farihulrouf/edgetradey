import { useState } from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

interface WithdrawalRequest {
  userId: string;
  type: "Bank" | "Crypto";
  time: string;
  amount: string;
  receiverAddress: string;
}

const mockData: WithdrawalRequest[] = [
  { userId: "1846456", type: "Bank", time: "07/09/2025\n10:45:56", amount: "$100.00", receiverAddress: "TR12 3456 7890 1234" },
  { userId: "1846456", type: "Crypto", time: "07/09/2025\n10:45:56", amount: "$200.00", receiverAddress: "TQx9kYvX2aPz6h4GmJb1n" },
  { userId: "1846456", type: "Bank", time: "07/09/2025\n10:45:56", amount: "$100.00", receiverAddress: "TR12 3456 7890 1234" },
  { userId: "1846456", type: "Crypto", time: "07/09/2025\n10:45:56", amount: "$200.00", receiverAddress: "TQx9kYvX2aPz6h4GmJb1n" },
  { userId: "1846456", type: "Bank", time: "07/09/2025\n10:45:56", amount: "$100.00", receiverAddress: "TR12 3456 7890 1234" },
  { userId: "1846456", type: "Crypto", time: "07/09/2025\n10:45:56", amount: "$200.00", receiverAddress: "TQx9kYvX2aPz6h4GmJb1n" },
  { userId: "1846456", type: "Bank", time: "07/09/2025\n10:45:56", amount: "$100.00", receiverAddress: "TR12 3456 7890 1234" },
  { userId: "1846456", type: "Crypto", time: "07/09/2025\n10:45:56", amount: "$200.00", receiverAddress: "TQx9kYvX2aPz6h4GmJb1n" },
  { userId: "1846456", type: "Bank", time: "07/09/2025\n10:45:56", amount: "$100.00", receiverAddress: "TR12 3456 7890 1234" },
  { userId: "1846456", type: "Crypto", time: "07/09/2025\n10:45:56", amount: "$200.00", receiverAddress: "TQx9kYvX2aPz6h4GmJb1n" },
];

export function PendingWithdrawalDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [withdrawals] = useState<WithdrawalRequest[]>(mockData);

  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address);
    toast.success("Address copied to clipboard");
  };

  const handleDecline = () => {
    toast.error("Withdrawals declined");
  };

  const handleApprove = () => {
    toast.success("Withdrawals approved");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 flex flex-row items-center justify-between space-y-0">
          <DialogTitle className="text-xl font-semibold">Pending Withdrawal</DialogTitle>
          <div className="flex items-center gap-2 mr-4">
            <Button
              onClick={handleDecline}
              className="bg-destructive hover:bg-destructive/90 text-white"
            >
              Decline
            </Button>
            <Button
              onClick={handleApprove}
              className="bg-success hover:bg-success/90 text-white bg-green-500 "
            >
              Approve
            </Button>
          </div>
        </DialogHeader>

        <div className="px-6 pb-6">
          <div className="rounded-lg overflow-hidden">
            {/* Header Table Grey */}
            <div className="grid grid-cols-[100px_80px_140px_100px_1fr_40px] gap-4 px-4 py-3 font-medium text-sm bg-gray-300">
              <div>User ID</div>
              <div>Type</div>
              <div>Time</div>
              <div>Amount</div>
              <div>Receiver Address</div>
              <div></div>
            </div>

            <div className="max-h-[400px] overflow-y-auto">
              {withdrawals.map((withdrawal, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-[100px_80px_140px_100px_1fr_40px] gap-4 px-4 py-3 text-sm border-t ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                  }`}
                >
                  <div className="flex items-center">{withdrawal.userId}</div>
                  <div className="flex items-center">{withdrawal.type}</div>
                  <div className="flex items-center whitespace-pre-line text-xs leading-tight">
                    {withdrawal.time}
                  </div>
                  <div className="flex items-center">{withdrawal.amount}</div>
                  <div className="flex items-center font-mono text-xs">
                    {withdrawal.receiverAddress}
                  </div>
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                      onClick={() => handleCopy(withdrawal.receiverAddress)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
