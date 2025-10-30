// CryptoFeeSettings.tsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Pencil } from "lucide-react";

const feeSchema = z.object({
  depositFee: z.string()
    .trim()
    .nonempty({ message: "Deposit fee is required" })
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, { message: "Must be a valid positive number" }),
  withdrawalFee: z.string()
    .trim()
    .nonempty({ message: "Withdrawal fee is required" })
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, { message: "Must be a valid positive number" }),
});

type FeeFormData = z.infer<typeof feeSchema>;

const CryptoFeeSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [depositFee, setDepositFee] = useState("1.0");
  const [withdrawalFee, setWithdrawalFee] = useState("0.5");

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FeeFormData>({
    resolver: zodResolver(feeSchema),
    defaultValues: { depositFee, withdrawalFee },
  });

  const onSubmit = async (data: FeeFormData) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setDepositFee(data.depositFee);
    setWithdrawalFee(data.withdrawalFee);

    toast.success("Crypto fee settings saved successfully", {
      description: `Deposit: ${data.depositFee}, Withdrawal: ${data.withdrawalFee}`,
    });

    setIsLoading(false);
    setOpen(false);
  };

  return (
    <Card className="w-full shadow-[var(--shadow-elevated)] border-border/50 transition-all duration-300 hover:shadow-[var(--shadow-card)]">
      {/* Header dengan background #D1D1D6 dan padding lebih kecil */}
      <CardHeader
        className="border-b border-border/50 rounded-t-lg"
        style={{ backgroundColor: "#D1D1D6", padding: "0.5rem 1rem" }}
      >
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">Crypto Fee setting</CardTitle>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" onClick={() => reset({ depositFee, withdrawalFee })}>
                <Pencil className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Crypto Fee Settings</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
                <div className="space-y-1">
                  <Label htmlFor="crypto-depositFee" className="text-sm font-medium text-foreground">
                    Deposit Fee
                  </Label>
                  <Input
                    id="crypto-depositFee"
                    type="text"
                    placeholder="0.00"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary h-8 py-1.5"
                    {...register("depositFee")}
                  />
                  {errors.depositFee && <p className="text-xs text-destructive mt-1">{errors.depositFee.message}</p>}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="crypto-withdrawalFee" className="text-sm font-medium text-foreground">
                    Withdrawal Fee
                  </Label>
                  <Input
                    id="crypto-withdrawalFee"
                    type="text"
                    placeholder="0.00"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary h-8 py-1.5"
                    {...register("withdrawalFee")}
                  />
                  {errors.withdrawalFee && <p className="text-xs text-destructive mt-1">{errors.withdrawalFee.message}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent shadow-md hover:shadow-lg transition-all duration-300"
                >
                  {isLoading ? "Saving..." : "Save Settings"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent className="pt-3 space-y-3">
        <div className="flex justify-between">
          <p className="text-sm font-medium text-muted-foreground">Deposit Fee</p>
          <p className="text-base font-semibold text-foreground">{depositFee}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm font-medium text-muted-foreground">Withdrawal Fee</p>
          <p className="text-base font-semibold text-foreground">{withdrawalFee}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CryptoFeeSettings;
