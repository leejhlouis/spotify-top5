import Action from '@/lib/types/Action'
import UserState from '@/lib/types/UserState'

export default function userReducer(state: UserState, action: Action): UserState {
  switch (action.type) {
    case 'setAuthenticated':
      return {
        ...state,
        authenticated: action.value as boolean
      }
    case 'setLoading':
      return {
        ...state,
        loading: {
          ...state.loading,
          ...(action.value as object)
        }
      }
    case 'setDisplayName':
      return {
        ...state,
        displayName: action.value as string
      }
    case 'setTopArtists':
      return {
        ...state,
        topArtists: action.value as []
      }
    case 'setTopTracks':
      return {
        ...state,
        topTracks: action.value as []
      }
    default:
      return state
  }
}
