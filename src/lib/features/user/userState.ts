import UserState from "@/lib/types/UserState";

const initialState: UserState = {
  authenticated: false,
  loading: {
    authLoading: true,
    initLoading: false,
    top5Loading: false
  },
  displayName: '',
  topArtists: [],
  topTracks: []
}

export default initialState;