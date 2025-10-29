import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, Pencil } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CryptoDepositCardProps {
  cryptoName: string;
  network: string;
  walletAddress: string;
  onUpdate?: (data: CryptoDepositCardData) => void;
}

export interface CryptoDepositCardData {
  cryptoName: string;
  network: string;
  walletAddress: string;
}

// Ikon untuk cryptocurrency (gunakan ikon asli atau placeholder)
const CryptoIcon = ({ crypto }: { crypto: string }) => {
  const getCryptoIcon = (cryptoName: string) => {
    const icons: { [key: string]: string } = {
      BTC: "₿",
      ETH: "Ξ",
      USDT: "💵",
      USDC: "💲",
      BNB: "🟡",
      SOL: "🔴",
      XRP: "✕",
      ADA: "A",
      DOGE: "Ð",
    };
    return icons[cryptoName.toUpperCase()] || "₿";
  };

  return (
    <span className="w-6 h-6 flex items-center justify-center bg-muted rounded-full text-sm mr-2">
      {getCryptoIcon(crypto)}
    </span>
  );
};

// Ikon untuk network
const NetworkIcon = ({ network }: { network: string }) => {
  const getNetworkIcon = (networkName: string) => {
    const icons: { [key: string]: string } = {
      "TRC20": "🟣",
      "ERC20": "🔷", 
      "BEP20": "🟡",
      "Polygon": "🟣",
      "Arbitrum": "🔵",
      "Optimism": "🔴"
    };
    
    for (const [key, icon] of Object.entries(icons)) {
      if (networkName.includes(key)) {
        return icon;
      }
    }
    return "🌐";
  };

  return (
    <span className="w-6 h-6 flex items-center justify-center bg-muted rounded-full text-sm mr-2">
      {getNetworkIcon(network)}
    </span>
  );
};

// Ikon untuk wallet address
const WalletIcon = () => (
  <span className="w-6 h-6 flex items-center justify-center bg-muted rounded-full text-sm mr-2">
    🏦
  </span>
);

const NETWORKS = [
  "TRC20 (Tron)",
  "ERC20 (Ethereum)",
  "BEP20 (BSC)",
  "Polygon",
  "Arbitrum",
  "Optimism"
];

export const CryptoDepositCard = ({ 
  cryptoName, 
  network, 
  walletAddress,
  onUpdate 
}: CryptoDepositCardProps) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState({
    cryptoName,
    network,
    walletAddress
  });
  const [currentData, setCurrentData] = useState({
    cryptoName,
    network,
    walletAddress
  });
  const { toast } = useToast();

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    toast({
      title: "Copied!",
      description: `${fieldName} copied to clipboard`,
    });
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleEdit = () => {
    setEditData(currentData);
    setIsEditOpen(true);
  };

  const handleSave = () => {
    if (!editData.cryptoName.trim() || !editData.network.trim() || 
        !editData.walletAddress.trim()) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive",
      });
      return;
    }

    setCurrentData(editData);
    onUpdate?.(editData);
    setIsEditOpen(false);
    toast({
      title: "Updated!",
      description: "Crypto deposit information updated successfully",
    });
  };

  const InfoRow = ({ 
    label, 
    value, 
    fieldName, 
    icon 
  }: { 
    label: string; 
    value: string; 
    fieldName: string;
    icon: React.ReactNode;
  }) => (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div className="flex-1 flex items-center justify-between">
        <div className="flex items-center min-w-[140px]">
          {icon}
          <p className="text-sm text-muted-foreground">{label}:</p>
        </div>
        <p className="text-sm font-medium text-foreground flex-1 text-right mr-2 break-all">{value}</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 flex-shrink-0"
        onClick={() => copyToClipboard(value, fieldName)}
      >
        {copiedField === fieldName ? (
          <Check className="h-4 w-4 text-primary" />
        ) : (
          <Copy className="h-4 w-4 text-muted-foreground hover:text-primary" />
        )}
      </Button>
    </div>
  );

  return (
    <>
      <Card className="w-full max-w-2xl overflow-hidden bg-card border shadow-sm">
        {/* Header */}
        <div className="bg-[#D1D1D6] px-6 py-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Crypto Deposit Information</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleEdit}
            className="h-8 w-8"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 min-h-[280px]">
          <InfoRow 
            label="Crypto" 
            value={currentData.cryptoName}
            fieldName="Crypto"
            icon={<CryptoIcon crypto={currentData.cryptoName} />}
          />
          <InfoRow 
            label="Network" 
            value={currentData.network}
            fieldName="Network"
            icon={<NetworkIcon network={currentData.network} />}
          />
          <InfoRow 
            label="Wallet Address" 
            value={currentData.walletAddress}
            fieldName="Wallet Address"
            icon={<WalletIcon />}
          />
        </div>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Crypto Deposit Information</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="cryptoName">Crypto Name</Label>
              <Input
                id="cryptoName"
                value={editData.cryptoName}
                onChange={(e) => setEditData({ ...editData, cryptoName: e.target.value })}
                maxLength={50}
                placeholder="e.g., USDT, BTC, ETH"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="network">Network</Label>
              <Select
                value={editData.network}
                onValueChange={(value) => setEditData({ ...editData, network: value })}
              >
                <SelectTrigger id="network">
                  <SelectValue placeholder="Select network" />
                </SelectTrigger>
                <SelectContent>
                  {NETWORKS.map((net) => (
                    <SelectItem key={net} value={net}>
                      <div className="flex items-center">
                        <NetworkIcon network={net} />
                        <span>{net}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="walletAddress">Wallet Address</Label>
              <Input
                id="walletAddress"
                value={editData.walletAddress}
                onChange={(e) => setEditData({ ...editData, walletAddress: e.target.value })}
                maxLength={100}
                placeholder="Enter wallet address"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-blue-500">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};