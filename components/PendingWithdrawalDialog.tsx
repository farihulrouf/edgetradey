'use client'

import { useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { X, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

interface PendingWithdrawalDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const PendingWithdrawalDialog = ({ open, onOpenChange }: PendingWithdrawalDialogProps) => {
  const { toast } = useToast()
  const [selectedRow, setSelectedRow] = useState<number | null>(null)
  const [confirmApproveOpen, setConfirmApproveOpen] = useState(false)

  const withdrawals = [
    { userId: "1846456", type: "Bank", time: "07/09/2025\n10:45:56", amount: "$100.00", receiverAddress: "TR12 3456 7890 1234" },
    { userId: "1846456", type: "Crypto", time: "07/09/2025\n10:45:56", amount: "$200.00", receiverAddress: "TQx9kYvX2aPz6h4GmJb1n" },
    { userId: "1846456", type: "Bank", time: "07/09/2025\n10:45:56", amount: "$100.00", receiverAddress: "TR12 3456 7890 1234" },
    { userId: "1846456", type: "Crypto", time: "07/09/2025\n10:45:56", amount: "$200.00", receiverAddress: "TQx9kYvX2aPz6h4GmJb1n" },
  ]

  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address)
    toast({
      title: "Copied!",
      description: "Address copied to clipboard",
    })
  }

  const handleDecline = () => {
    toast({
      title: "Declined",
      description: "Withdrawal requests declined",
      variant: "destructive",
    })
  }

  const handleApprove = () => {
    setConfirmApproveOpen(true)
  }

  const confirmApprove = () => {
    setConfirmApproveOpen(false)
    toast({
      title: "Approved",
      description: "Withdrawal requests approved successfully ✅",
    })
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[900px] p-0 gap-0 max-h-[90vh]">
          {/* Header */}
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold">Pending Withdrawal</h2>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                className="bg-muted hover:bg-muted/80"
                onClick={handleDecline}
              >
                Decline
              </Button>
              <Button onClick={handleApprove}>Approve</Button>
              <button
                onClick={() => onOpenChange(false)}
                className="ml-2 rounded-sm opacity-70 hover:opacity-100 transition-opacity"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-auto max-h-[calc(90vh-80px)]">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>User ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Receiver Address</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {withdrawals.map((withdrawal, index) => {
                  const isSelected = selectedRow === index
                  const bgClass = isSelected ? "bg-blue-100 hover:bg-blue-200" : index % 2 === 0 ? "bg-background hover:bg-muted/50" : "bg-muted/30 hover:bg-muted/50"
                  return (
                    <TableRow
                      key={index}
                      className={`${bgClass} cursor-pointer transition-colors`}
                      onClick={() => setSelectedRow(index)}
                    >
                      <TableCell className="font-medium">{withdrawal.userId}</TableCell>
                      <TableCell>{withdrawal.type}</TableCell>
                      <TableCell className="text-xs whitespace-pre-line">{withdrawal.time}</TableCell>
                      <TableCell>{withdrawal.amount}</TableCell>
                      <TableCell className="font-mono text-sm">{withdrawal.receiverAddress}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 bg-primary/10 hover:bg-primary/20"
                          onClick={(e) => {
                            e.stopPropagation() // jangan trigger row selection
                            handleCopy(withdrawal.receiverAddress)
                          }}
                        >
                          <Copy className="h-4 w-4 text-primary" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>

      {/* ✅ Konfirmasi Approve */}
      <AlertDialog open={confirmApproveOpen} onOpenChange={setConfirmApproveOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve Withdrawals</AlertDialogTitle>
          </AlertDialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to approve all selected withdrawals? This action cannot be undone.
          </p>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmApprove}>Yes, Approve</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
