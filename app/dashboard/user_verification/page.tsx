import { UserVerification } from "@/components/dashboard/UserVerification"

export default function UserVerificationPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-center text-gray-600">Users Verification</h1>
      <UserVerification />
    </div>
  )
}
