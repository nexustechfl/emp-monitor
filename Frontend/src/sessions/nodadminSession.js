import { create } from 'zustand'
import { setSessionCookie, clearSessionCookie } from '../lib/sessionCookie'

const useNonAdminSession = create((set) => ({
  nonAdmin: null,
  setNonAdmin: (nonAdmin) => {
    if (nonAdmin) setSessionCookie(nonAdmin)
    set({ nonAdmin })
  },
  clearNonAdmin: () => {
    clearSessionCookie()
    set({ nonAdmin: null })
  },
}))

export default useNonAdminSession