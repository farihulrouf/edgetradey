'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface Withdrawal {
  user: string;
  type: string;
  onCheck?: () => void;
}

interface PendingWithdrawalProps {
  withdrawals: Withdrawal[];
}

export const PendingWithdrawal = ({ withdrawals }: PendingWithdrawalProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // 1 detik loading
    return () => clearTimeout(timer);
  }, []);

  const renderSkeletonRow = () => (
    <div className="flex items-center justify-between text-xs bg-gray-200 animate-pulse" style={{ minHeight: "44px" }}>
      <span className="flex-1 px-2 h-3 bg-gray-300 rounded"></span>
      <span className="flex-1 text-center h-3 bg-gray-300 rounded"></span>
      <div className="flex justify-end flex-1 px-2">
        <span className="h-6 w-16 bg-gray-300 rounded"></span>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-md p-2 h-[230px] shadow-lg ring-1 ring-white/50">
      <h3 className="font-semibold text-center text-md mb-3">Pending Withdrawal</h3>
      <div className="space-y-0">
        <div className="flex items-center justify-between text-xs font-medium px-2 rounded-t-lg h-8 bg-gray-200">
          <span className="flex-1">User</span>
          <span className="flex-1 text-center">Type</span>
          <span className="flex-1 text-right">Action</span>
        </div>

        <div>
          {loading
            ? Array(3)
                .fill(0)
                .map((_, idx) => <div key={idx}>{renderSkeletonRow()}</div>)
            : withdrawals.map((w, idx) => {
                const rowBg = idx % 2 === 0 ? "bg-white" : "bg-gray-100";
                const rowRounded = idx === withdrawals.length - 1 ? "rounded-b-lg" : "";
                return (
                  <div
                    key={idx}
                    className={`flex items-center justify-between text-xs ${rowBg} ${rowRounded}`}
                    style={{ minHeight: "44px" }}
                  >
                    <span className="flex-1 px-2">{w.user}</span>
                    <span className="flex-1 text-center">{w.type}</span>
                    <div className="flex justify-end flex-1 px-2">
                      <Button
                        size="sm"
                        className="h-6 text-xs px-4 bg-blue-500 hover:bg-blue-600"
                        onClick={w.onCheck}
                      >
                        Check
                      </Button>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}
