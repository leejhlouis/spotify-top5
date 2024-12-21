'use client'
import { createContext, useContext, useEffect, useReducer } from 'react'
import userReducer from '@/lib/features/user/userReducer'
import initialState from '@/lib/features/user/userState'
import { checkLoggedIn } from '@/lib/features/user/userActions'
import UserState from '@/lib/types/UserState'
import Action from '@/lib/types/Action'

const UserContext = createContext<UserState>(initialState)
const UserDispatchContext = createContext<React.Dispatch<Action>>(() => null)
export const useUser = () => useContext(UserContext)
export const useUserDispatch = () => useContext(UserDispatchContext)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, dispatch] = useReducer(userReducer, initialState)

  useEffect(() => {
    checkLoggedIn(dispatch)
  }, [])

  return (
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={dispatch}>{children}</UserDispatchContext.Provider>
    </UserContext.Provider>
  )
}
