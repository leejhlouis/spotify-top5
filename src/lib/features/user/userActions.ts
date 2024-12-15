import Action from "@/lib/types/Action";
import { Dispatch } from "react";

export const checkLoggedIn = async (dispatch: Dispatch<Action>) => {
  const response = await fetch('/api/auth/check');
  if (!response.ok) {
    return
  }
  const { loggedIn } = await response.json()
  dispatch({
    type: 'setAuthenticated',
    value: loggedIn
  })
  dispatch({
    type: 'setLoading',
    value: {
      authLoading: false
    }
  })
}

export const fetchProfile = async (dispatch: Dispatch<Action>) => {
  const response = await fetch('/api/profile');
  if (!response.ok) {
    return
  }
  const { displayName } = await response.json()
  dispatch({
    type: 'setDisplayName',
    value: displayName
  })
}

export const fetchTopArtists = async (dispatch: Dispatch<Action>) => {
  const response = await fetch('/api/top/artists');
  if (!response.ok) {
    return;
  }
  const { items } = await response.json();
  dispatch({
    type: 'setTopArtists',
    value: items
  });
}

export const fetchTopTracks = async (dispatch: Dispatch<Action>) => {
  const response = await fetch('/api/top/tracks');
  if (!response.ok) {
    return;
  }
  const { items } = await response.json();
  dispatch({
    type: 'setTopTracks',
    value: items
  });
}

export const setTop5Loading = (dispatch: Dispatch<Action>, value: boolean) => {
  dispatch({
    type: 'setLoading',
    value: {
      top5Loading: value
    }
  });
}