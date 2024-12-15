export default interface UserState {
  authenticated: boolean
  displayName: string
  topArtists: []
  topTracks: []
  loading: {
    authLoading: boolean
    top5Loading: boolean
  }
}