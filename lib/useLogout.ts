'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const useLogout = () => {
  const router = useRouter()

  const logout = () => {
    // Hapus session / token di localStorage / cookies
    localStorage.removeItem('token')

    // Tampilkan toast
    toast.success('Logged out successfully')

    // Redirect ke /login tanpa reload full page
    router.push('/login')
  }

  return logout
}
