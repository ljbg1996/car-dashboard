import { defineStore } from 'pinia';

export const useMediaStore = defineStore({
  id: 'media',
  state: () => ({
    songList: [{ artist: 'The Beatles', title: 'Let It Be', album: 'Let It Be', totalTime: 243, index: 0 },
    { artist: 'Queen', title: 'Bohemian Rhapsody', album: 'A Night at the Opera', totalTime: 354, index: 1 },
    { artist: 'Adele', title: 'Hello', album: '25', totalTime: 295, index: 2 },
    { artist: 'Ed Sheeran', title: 'Shape of You', album: '÷', totalTime: 233, index: 3 },
    { artist: 'Taylor Swift', title: 'Love Story', album: 'Fearless', totalTime: 239, index: 4 },
    { artist: 'Elton John', title: 'Rocket Man', album: 'Honky Château', totalTime: 270, index: 5 },
    { artist: 'Billy Joel', title: 'Piano Man', album: 'Piano Man', totalTime: 337, index: 6 },
    { artist: 'Michael Jackson', title: 'Thriller', album: 'Thriller', totalTime: 357, index: 7 },
    { artist: 'Madonna', title: 'Like a Virgin', album: 'Like a Virgin', totalTime: 220, index: 8 },
    { artist: 'Bruno Mars', title: 'Uptown Funk', album: 'Uptown Special', totalTime: 270, index: 9 },
    { artist: 'Beyoncé', title: 'Halo', album: 'I Am... Sasha Fierce', totalTime: 263, index: 10 },
    { artist: 'Rihanna', title: 'Diamonds', album: 'Unapologetic', totalTime: 225, index: 11 },
    { artist: 'Coldplay', title: 'Viva la Vida', album: 'Viva la Vida or Death and All His Friends', totalTime: 242, index: 12 },
    { artist: 'Maroon 5', title: 'Moves Like Jagger', album: 'Hands All Over', totalTime: 201, index: 13 },
    { artist: 'Katy Perry', title: 'Firework', album: 'Teenage Dream', totalTime: 227, index: 14 },
    { artist: 'Justin Timberlake', title: 'Can\'t Stop the Feeling!', album: 'Trolls', totalTime: 266, index: 15 },
    { artist: 'Lady Gaga', title: 'Poker Face', album: 'The Fame', totalTime: 235, index: 16 },
    { artist: 'Ariana Grande', title: 'Thank U, Next', album: 'Thank U, Next', totalTime: 207, index: 17 },
    { artist: 'John Legend', title: 'All of Me', album: 'Love in the Future', totalTime: 270, index: 18 },
    { artist: 'Sam Smith', title: 'Stay With Me', album: 'In the Lonely Hour', totalTime: 211, index: 19 },
    { artist: 'Shawn Mendes', title: 'Stitches', album: 'Handwritten', totalTime: 208, index: 20 },
    { artist: 'Dua Lipa', title: 'New Rules', album: 'Dua Lipa', totalTime: 209, index: 21 },
    { artist: 'Camila Cabello', title: 'Havana', album: 'Camila', totalTime: 216, index: 22 },
    { artist: 'Drake', title: 'In My Feelings', album: 'Scorpion', totalTime: 217, index: 23 },
    { artist: 'The Weeknd', title: 'Blinding Lights', album: 'After Hours', totalTime: 200, index: 24 }], 
    currentSongIndex: 0, 
    currentTime: 0, 
    isPlaying: false, 
    intervalId: null as number | null, 
    searchQuery: '',
  }),
  getters: {
    currentSong: (state) => state.songList[state.currentSongIndex],
    upcomingSongs: (state) => {
      const query = state.searchQuery.toLowerCase();

      if (query === '') {
        return state.songList.slice(state.currentSongIndex + 1, state.currentSongIndex + 11);
      }

      return state.songList
        .filter(song => (song.title.toLowerCase().includes(query) || song.artist.toLowerCase().includes(query)) && song.index !== state.currentSongIndex);
    },
  },
  actions: {
    setSearchQuery(query: string) {
        this.searchQuery = query;
      },
    setSongList(songs:any) {
      this.songList = songs;
    },
    togglePlay() {
      this.isPlaying = !this.isPlaying;

      if (this.isPlaying) {
        this.intervalId = setInterval(() => {
          if (this.currentTime >= this.currentSong.totalTime) {
            this.nextTrack();
          } else {
            this.currentTime += 1;
          }
        }, 1000);
      } else {
        clearInterval(this.intervalId as number);
      }
    },

    prevTrack() {
      clearInterval(this.intervalId as number);
      this.currentTime = 0;

      this.currentSongIndex -= 1;

      if (this.currentSongIndex < 0) {
        this.currentSongIndex = this.songList.length - 1;
      }

      if (this.isPlaying) {
        this.intervalId = setInterval(() => {
          this.currentTime += 1;
        }, 1000);
      }
    },

    nextTrack() {
      clearInterval(this.intervalId as number);
      this.currentTime = 0;

      this.currentSongIndex += 1;

      if (this.currentSongIndex >= this.songList.length - 1) {
        this.currentSongIndex = 0;
      }

      if (this.isPlaying) {
        this.intervalId = setInterval(() => {
          this.currentTime += 1;
        }, 1000);
      }
    },
  },
});
