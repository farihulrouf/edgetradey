import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Copy, Check, Trash } from "lucide-react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CryptoDepositCardProps {
  onUpdate?: (data: CryptoDepositCardData) => void;
  onAdd?: (data: CryptoDepositCardData) => void;
}

export interface CryptoDepositCardData {
  cryptoName: string;
  network: string;
  walletAddress: string;
  withdrawFee?: string;
}

const NETWORKS = [
  "TRC20 (Tron)",
  "ERC20 (Ethereum)",
  "BEP20 (BSC)",
  "Polygon",
  "Arbitrum",
  "Optimism",
];

const sampleCryptoData: CryptoDepositCardData[] = [
  {
    cryptoName: "USDT",
    network: "TRC20 (Tron)",
    walletAddress: "TQ5r8Xy9z0a1b2c3d4e5f6g7h8i9j0k1l2m3n4",
    withdrawFee: "1 USDT",
  },
  {
    cryptoName: "BTC",
    network: "ERC20 (Ethereum)",
    walletAddress: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
    withdrawFee: "0.0005 BTC",
  },
  {
    cryptoName: "ETH",
    network: "ERC20 (Ethereum)",
    walletAddress: "0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u",
    withdrawFee: "0.01 ETH",
  },
];

export const CryptoDepositCard = ({ onUpdate, onAdd }: CryptoDepositCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editData, setEditData] = useState<CryptoDepositCardData>({
    cryptoName: "",
    network: "",
    walletAddress: "",
    withdrawFee: "",
  });
  const [cryptoData, setCryptoData] = useState<CryptoDepositCardData[]>(sampleCryptoData);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isAddMode, setIsAddMode] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(text);
    toast({
      title: "Copied!",
      description: "Wallet address copied to clipboard",
    });
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const handleEdit = (index: number) => {
    setEditData(cryptoData[index]);
    setEditingIndex(index);
    setIsAddMode(false);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditData({
      cryptoName: "",
      network: "",
      walletAddress: "",
      withdrawFee: "",
    });
    setEditingIndex(null);
    setIsAddMode(true);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!editData.cryptoName.trim() || !editData.network.trim() || !editData.walletAddress.trim()) {
      toast({
        title: "Error",
        description: "Crypto Name, Network and Wallet Address are required",
        variant: "destructive",
      });
      return;
    }

    if (isAddMode) {
      const newData = [...cryptoData, editData];
      setCryptoData(newData);
      onAdd?.(editData);
      toast({
        title: "Added!",
        description: "New crypto deposit added successfully",
      });
    } else if (editingIndex !== null) {
      const updatedData = [...cryptoData];
      updatedData[editingIndex] = editData;
      setCryptoData(updatedData);
      onUpdate?.(editData);
      toast({
        title: "Updated!",
        description: "Crypto deposit information updated successfully",
      });
    }

    setIsDialogOpen(false);
    setEditingIndex(null);
    setIsAddMode(false);
  };

  const handleDelete = (index: number) => {
    const removed = cryptoData[index];
    const updatedData = cryptoData.filter((_, i) => i !== index);
    setCryptoData(updatedData);
    toast({
      title: "Deleted!",
      description: `${removed.cryptoName} has been removed.`,
    });
  };

  const formatWalletAddress = (address: string) => {
    if (address.length <= 7) return address;
    return `${address.slice(0, 7)}...`;
  };

  return (
    <>
      <Card className="w-full overflow-hidden bg-card border shadow-sm h-[320px]">
        {/* Header */}
        <div className="bg-[#D1D1D6] px-6 py-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            Crypto Deposit Information
          </h2>
          <Button
            onClick={handleAdd}
            className="bg-blue-500 hover:bg-blue-600 text-white"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Crypto
          </Button>
        </div>

        <div className="p-6 h-[calc(320px-80px)] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] text-[11px] xl2:text-[14px]">Crypto</TableHead>
                <TableHead className="text-[11px] xl2:text-[14px]">Network</TableHead>
                <TableHead className="text-[11px] xl2:text-[14px]">Wallet Address</TableHead>
                <TableHead className="text-right w-[120px] text-[11px] xl2:text-[14px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cryptoData.map((crypto, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium text-[11px] xl2:text-[14px]">{crypto.cryptoName}</TableCell>
                  <TableCell className="text-[11px] xl2:text-[14px]">{crypto.network}</TableCell>
                  <TableCell className="font-mono text-[11px] xl2:text-[14px]">
                    <div className="flex items-center justify-between">
                      <span>{formatWalletAddress(crypto.walletAddress)}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(crypto.walletAddress)}
                        className="h-6 w-6 ml-2"
                      >
                        {copiedAddress === crypto.walletAddress ? (
                          <Check className="h-3 w-3 text-green-500" />
                        ) : (
                          <Copy className="h-3 w-3 text-muted-foreground hover:text-primary" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(index)}
                      className="h-8 w-8"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(index)}
                      className="h-8 w-8"
                    >
                      <Trash className="h-4 w-4 text-red-500 hover:text-red-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{isAddMode ? "Add Crypto Deposit" : "Edit Crypto Deposit"}</DialogTitle>
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
                    <SelectItem key={net} value={net}>{net}</SelectItem>
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
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} className="bg-blue-500">{isAddMode ? "Add Crypto" : "Save Changes"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};