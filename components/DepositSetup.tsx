'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const DepositSetup = () => {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-lg font-semibold text-card-foreground mb-6">
        Deposit Setup
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Kotak 1 */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Bank Deposit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-24 flex items-center justify-center text-muted-foreground">
              (Kosong)
            </div>
          </CardContent>
        </Card>

        {/* Kotak 2 */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Crypto Deposit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-24 flex items-center justify-center text-muted-foreground">
              (Kosong)
            </div>
          </CardContent>
        </Card>

        {/* Kotak 3 */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Deposit Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-24 flex items-center justify-center text-muted-foreground">
              (Kosong)
            </div>
          </CardContent>
        </Card>

        {/* Kotak 4 */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Deposit Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-24 flex items-center justify-center text-muted-foreground">
              (Kosong)
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
