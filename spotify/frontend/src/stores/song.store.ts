// stores/spotify.ts
import { defineStore } from 'pinia';
import SpotifyWebApi from 'spotify-web-api-js';
import useSpotifyStore from './spotify.store';
import axios from 'axios';

let spotifyApi = new SpotifyWebApi();

const useSongStore = defineStore('song', {
  state: () => ({
    user_id                     : '',
    listOfPlaylist              : [] as any[],
    currentPlaylist             : {} as any,
    currentUser                 : {} as any,
    currentPlaylistTracks       : [] as any[],
    currentPlaylistId           : '',
    playState                   : false,
    currentPlaybackState        : null as any,
    repeatState                 : null as any,
    shuffleState                : null as any,
    currentlyPlaying            : {} as any,
    newReleases                 : [] as any,
    volume                      : 50,
    devices                     : [] as any,
    is_playing                  : false,
    currentPlayback             : {} as any,
    deviceId                    : '',
  }),
  getters:
  {
    getUserPlaylist             : (state) => state.listOfPlaylist,
    getCurrentUser              : (state) => state.currentUser,
    getShuffleState             : (state) => state.shuffleState,
    getCurrentPlaylist          : (state) => state.currentPlaylist,
    getCurrentPlaylistTracks    : (state) => state.currentPlaylistTracks,
    getCurrentPlayBackState     : (state) => state.currentPlaybackState,
    getMyCurrentPlayingTrack    : (state) => state.currentlyPlaying,
    getVolume                   : (state) => state.volume,
    getUserId                   : (state) => state.user_id,
    getDevices                  : (state) => state.devices,
    getIsPlaying                : (state) => state.is_playing,
    getCurrentPlayback          : (state) => state.currentPlayback,
    getDeviceId                 : (state) => state.deviceId,
  },
  actions:
  {
    setDeviceId(device_id) {
      this.deviceId = device_id;
    },
    setCurrentPlayback(data) {
      this.currentPlayback = data;
    },
    setUserPlaylist(playlists: any[])
    {
      this.listOfPlaylist = playlists;
    },
    setCurrentPlaylist(currentPlaylist: any)
    {
      this.currentPlaylist = currentPlaylist;
    },
    setCurrentUser(user: any)
    {
      this.currentUser = user;
    },
    setCurrentPlaylistTracks(tracks: any[])
    {
      this.currentPlaylistTracks = tracks;
    },
    setNextPlaylistId(id: string)
    {
      this.currentPlaylistId = id;
    },
    setCurrentPlaybackState(status: any)
    {
      this.currentPlaybackState = status;
    },
    setPlayState(status: boolean)
    {
      this.playState = status;
    },
    setRepeatState(status: any)
    {
      this.repeatState = status;
    },
    setShuffleState(status: any)
    {
      this.shuffleState = status;
    },
    setCurrentlyPlaying(item: any)
    {
      this.currentlyPlaying = item;
    },
    setVolume(newVolume: number)
    {
      this.volume = newVolume;
    },
    setIsPlaying(state: boolean) {
      this.is_playing = state;
    },
    async fetchDevices() {
      try {
        const response = await axios.get('/api/spotify/devices');
        console.log(response.data)
        this.devices = response.data.devices;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchCurrentUser()
    {
      try {
        const spotifyStore = useSpotifyStore();

        const response = await axios.get('/api/spotify/user');
        spotifyApi.setAccessToken(spotifyStore.getAccessToken);
        this.setCurrentUser(response.data.user)
      } catch (error) {
        console.error(error);
      }
    },
    async fetchUserPlaylist(limit: number, offset: number)
    {
      try {
        const response = await axios.post('/api/spotify/savedtracks', { limit, offset});

        this.setUserPlaylist(response.data.dataTracks);

      } catch (error) {
        console.error(error);
      }
    },
    async fetchCurrentPlaylist(id: string)
    {
      try {
        const response = await spotifyApi.getPlaylist(id);
        this.setCurrentPlaylist(response);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchNextPlaylistAndTracks()
    {
      try {
        const response = await spotifyApi.getPlaylist(this.currentPlaylistId);
        const getTracks = await spotifyApi.getPlaylistTracks(this.currentPlaylistId);
        this.setCurrentPlaylist(response);
        this.setCurrentPlaylistTracks(getTracks.items);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchCurrentPlayback()
    {
      try {
        const response = await spotifyApi.getMyCurrentPlaybackState();
        this.setCurrentPlaybackState(response);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchPlaylistTracks()
    {
      try {
        const userId = this.getCurrentUser.id;
        const response = await axios.get(`/api/spotify/playlisttracks?id=${userId}`);

        this.setCurrentPlaylistTracks(response.items);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchCurrentPlayingTrack()
    {
      try {
        const response = await spotifyApi.getMyCurrentPlayingTrack();
        this.setCurrentlyPlaying(response);
      } catch (error) {
        console.error(error);
      }
    },
    async playMusic(uri: string)
    {
      try {
        const spotifyStore = useSpotifyStore();

        const options = {
            "context_uri": uri,
            "offset": {
                "position": 5
            },
            "position_ms": 0
        }
        console.log(uri);
        await axios.put(`https://api.spotify.com/v1/me/player/play?device_id=${this.getDeviceId}`,
          options,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${spotifyStore.getAccessToken}`
            }
          }
        );
        spotifyApi.play(options, (data) => {
          console.log(data)
        });
      } catch (error) {
        console.error(error);
      }
    },
    async pauseMusic()
    {
      try {
        spotifyApi.pause();
      } catch (error) {
        console.error(error);
      }
    },
    async skipToNextTrack()
    {
      try {
        await spotifyApi.skipToNext();
        setTimeout(async () => {
          await this.fetchCurrentPlayingTrack();
        }, 100);
      } catch (error) {
        console.error(error);
      }
    },
    async skipToPrevTrack()
    {
      try {
        await spotifyApi.skipToPrevious();
        setTimeout(async () => {
          await this.fetchCurrentPlayingTrack();
        }, 100);
      } catch (error) {
        console.error(error);
      }
    },
    async setNewVolume(vol: number)
    {
      try {
        await axios.post('/api/spotify/volume', { vol } )
      } catch (error) {
        console.error(error);
      }
    },
    async getCurrentPlay() {
      try {
        const spotifyStore = useSpotifyStore();

        const res = await axios.get("https://api.spotify.com/v1/me/player", {
          headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + spotifyStore.getAccessToken
          }
        })
        console.log(res);
        this.setCurrentPlayback(res.data);
        // console.log(this.currentPlayback);
      } catch (error) {
        console.error(error);
      }
    },
  },
  persist: {
    storage: sessionStorage,
  }
});

export default useSongStore;
