export default interface UserState {
  authenticated: boolean
  displayName: string
  topArtists: []
  topTracks: []
  loading: {
    authLoading: boolean
    initLoading: boolean
  }
}