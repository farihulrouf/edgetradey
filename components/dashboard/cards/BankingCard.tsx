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

interface BankingCardProps {
  bankName: string;
  accountName: string;
  accountNumber: string;
  iban: string;
  swiftCode: string;
  onUpdate?: (data: BankingCardData) => void;
}

export interface BankingCardData {
  bankName: string;
  accountName: string;
  accountNumber: string;
  iban: string;
  swiftCode: string;
}

export const BankingCard = ({ 
  bankName, 
  accountName, 
  accountNumber, 
  iban, 
  swiftCode,
  onUpdate 
}: BankingCardProps) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState({
    bankName,
    accountName,
    accountNumber,
    iban,
    swiftCode
  });
  const [currentData, setCurrentData] = useState({
    bankName,
    accountName,
    accountNumber,
    iban,
    swiftCode
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
    if (!editData.bankName.trim() || !editData.accountName.trim() || 
        !editData.accountNumber.trim() || !editData.iban.trim() || 
        !editData.swiftCode.trim()) {
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
      description: "Bank information updated successfully",
    });
  };

  const InfoRow = ({ 
    label, 
    value, 
    fieldName,
  }: { 
    label: string; 
    value: string; 
    fieldName: string;
  }) => (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div className="flex-1 flex items-center justify-between">
        <div className="flex items-center min-w-[140px]">
          <p className="text-sm text-muted-foreground">{label}:</p>
        </div>
        <p className="text-sm font-medium text-foreground flex-1 text-right mr-2">{value}</p>
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
      <Card className="w-full max-w-2xl overflow-hidden bg-card border shadow-sm h-[320px]">
        {/* Header */}
        <div className="bg-[#D1D1D6] px-6 py-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Bank Deposit Information</h2>
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
        <div className="p-6">
          <InfoRow 
            label="Bank Name" 
            value={currentData.bankName}
            fieldName="Bank Name"
          />
          <InfoRow 
            label="Account Name" 
            value={currentData.accountName}
            fieldName="Account Name"
          />
          <InfoRow 
            label="Account Number" 
            value={currentData.accountNumber}
            fieldName="Account Number"
          />
          <InfoRow 
            label="IBAN" 
            value={currentData.iban}
            fieldName="IBAN"
          />
          <InfoRow 
            label="Swift Code" 
            value={currentData.swiftCode}
            fieldName="Swift Code"
          />
        </div>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Bank Information</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="bankName">Bank Name</Label>
              <Input
                id="bankName"
                value={editData.bankName}
                onChange={(e) => setEditData({ ...editData, bankName: e.target.value })}
                maxLength={100}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountName">Account Name</Label>
              <Input
                id="accountName"
                value={editData.accountName}
                onChange={(e) => setEditData({ ...editData, accountName: e.target.value })}
                maxLength={100}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                value={editData.accountNumber}
                onChange={(e) => setEditData({ ...editData, accountNumber: e.target.value })}
                maxLength={50}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="iban">IBAN</Label>
              <Input
                id="iban"
                value={editData.iban}
                onChange={(e) => setEditData({ ...editData, iban: e.target.value })}
                maxLength={50}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="swiftCode">Swift Code</Label>
              <Input
                id="swiftCode"
                value={editData.swiftCode}
                onChange={(e) => setEditData({ ...editData, swiftCode: e.target.value })}
                maxLength={20}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600" onClick={handleSave}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};