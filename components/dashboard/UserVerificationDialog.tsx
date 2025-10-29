'use client'

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface UserVerificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: any; // user bisa undefined jika mode add
  mode: "add" | "edit";
}

export const UserVerificationDialog = ({ open, onOpenChange, user, mode }: UserVerificationDialogProps) => {
  const [accountType, setAccountType] = useState<"standard" | "premium">("standard");
  const [addCreditAmount, setAddCreditAmount] = useState("");
  const [removeCreditAmount, setRemoveCreditAmount] = useState("");

  const [formData, setFormData] = useState({
    nameSurname: "",
    idNo: "",
    email: "",
    dateOfBirth: "",
    phone: "",
    password: "",
    leverage: "",
    balance: "",
  });

  // Set default data saat user berubah atau mode add
  useEffect(() => {
    if (mode === "edit" && user) {
      setFormData({
        nameSurname: user.name,
        idNo: user.userId.toString(),
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        phone: user.phone,
        password: "",
        leverage: user.leverage || "200",
        balance: user.balance || "$1000",
      });
      setAccountType(user.accountType?.toLowerCase() === "premium" ? "premium" : "standard");
    } else if (mode === "add") {
      setFormData({
        nameSurname: "",
        idNo: "",
        email: "",
        dateOfBirth: "",
        phone: "",
        password: "",
        leverage: "200",
        balance: "$1000",
      });
      setAccountType("standard");
    }
  }, [user, mode]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log(mode === "add" ? "Add user data" : "Update user data", formData, accountType);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1100px] p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 flex justify-between items-center">
          <DialogTitle className="text-lg font-medium">{mode === "add" ? "Add User" : "Edit User"}</DialogTitle>
         
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6 p-6">
          {/* Left Column - User Form */}
          <div className="bg-muted rounded-lg p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name Surname</Label>
                <Input value={formData.nameSurname} onChange={(e) => handleInputChange("nameSurname", e.target.value)} className="bg-background"/>
              </div>
              <div className="space-y-2">
                <Label>ID No</Label>
                <Input value={formData.idNo} onChange={(e) => handleInputChange("idNo", e.target.value)} className="bg-background"/>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} className="bg-background"/>
              </div>
              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <Input value={formData.dateOfBirth} onChange={(e) => handleInputChange("dateOfBirth", e.target.value)} className="bg-background"/>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} className="bg-background"/>
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input value={formData.password} onChange={(e) => handleInputChange("password", e.target.value)} className="bg-background"/>
            </div>
            <div className="space-y-2">
              <Label>Leverage(1-200)</Label>
              <Input value={formData.leverage} onChange={(e) => handleInputChange("leverage", e.target.value)} className="bg-background"/>
            </div>
            <div className="space-y-2">
              <Label>Balance</Label>
              <Input value={formData.balance} onChange={(e) => handleInputChange("balance", e.target.value)} className="bg-background"/>
            </div>
            <div className="flex gap-3 pt-2">
              <Button onClick={handleSave} className="flex-1 bg-blue-600 py-2">{mode === "add" ? "Add User" : "Save Changes"}</Button>
              {mode === "edit" && <Button variant="secondary" className="flex-1">Cancel</Button>}
            </div>
          </div>

          {/* Right Column - Actions */}
          <div className="space-y-6">
            <div className="bg-muted rounded-lg p-6 text-center space-y-4">
              <p className="text-sm text-muted-foreground">Download the file uploaded by user</p>
              <div className="flex gap-3">
                <Button variant="secondary" className="flex-1">Download</Button>
                <Button className="flex-1 bg-blue-600 py-2">Verify User</Button>
              </div>
              <div className="pt-2">
                <p className="text-sm text-muted-foreground mb-2">
                  Account Type : <span className="text-foreground font-medium">{accountType === "standard" ? "Standard Active" : "Premium Active"}</span>
                </p>
                <div className="flex gap-3">
                  <Button variant={accountType === "standard" ? "default" : "secondary"} onClick={() => setAccountType("standard")} className="flex-1 bg-blue-600 py-2">Standard</Button>
                  <Button variant={accountType === "premium" ? "default" : "secondary"} onClick={() => setAccountType("premium")} className="flex-1">Premium</Button>
                </div>
              </div>
            </div>

            <div className="bg-muted rounded-lg p-6 space-y-4">
              <Button className="bg-blue-600 py-2">Credit</Button>
              <div className="space-y-2">
                <Label>Add Credit</Label>
                <div className="flex gap-2">
                  <Input placeholder="Enter Amount" value={addCreditAmount} onChange={(e) => setAddCreditAmount(e.target.value)} className="bg-background"/>
                  <Button className="bg-blue-600 py-2">Add Credit</Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Remove Credit</Label>
                <div className="flex gap-2">
                  <Input placeholder="Enter Amount" value={removeCreditAmount} onChange={(e) => setRemoveCreditAmount(e.target.value)} className="bg-background"/>
                  <Button className="bg-blue-600 py-2">Remove Credit</Button>
                </div>
              </div>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              User Verification info displayed here
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
