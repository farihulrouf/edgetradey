'use client'

import { BankingCard } from "@/components/dashboard/cards/BankingCard"
import { CryptoDepositCard } from "./cards/CryptoDepositCard";

export const DepositSetup = () => {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-lg font-semibold text-card-foreground mb-6">
        Deposit Setup
      </h2>

      {/* Container dengan grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Kotak kiri - Banking Card */}
        <div className="w-full">
          <BankingCard
            bankName="Forex Bank LTD"
            accountName="Forex Trading Platform"
            accountNumber="1234567890"
            iban="TR12 3456 7890 1234 5678 9012 3456 78"
            swiftCode="FRXBTRIX"
          />
        </div>

        {/* Kotak kanan - Crypto Deposit Card */}
        <div className="w-full">
          <CryptoDepositCard />
        </div>

      

      </div>
    </div>
  );
};