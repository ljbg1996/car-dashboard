<template>
  <div class="media-information">
    <div class="digital">
        <div class="info-container">
          <div class="controls">           
            <div class="media-controls">
              <button class="control-btn" @click="prevTrack"><i class="fas fa-step-backward"></i></button>
              <button class="control-btn" @click="togglePlay"><i class="fas fa-play" v-if="!mediaStore.isPlaying"></i><i class="fas fa-pause" v-if="mediaStore.isPlaying"></i></button>
              <button class="control-btn" @click="nextTrack"><i class="fas fa-step-forward"></i></button>
            </div>
          </div>
          <div class="info-item">
            <p class="label">Now Playing:</p>
            <p class="value"><strong>{{ artist }}</strong> - {{ title }}</p>
          </div>
          <div class="info-item">
            <p class="value">{{ album }}</p>
          </div>
          <div class="info-item">
            <p class="value">{{ formattedCurrentTime }} / {{ formattedTotalTime }}</p>
          </div>
          <div class="info-item">
            <p class="label">Upcoming Songs:</p>
            <ul>
              <li v-for="song in upcomingSongs" :key="song.index">
                <span class="upcoming-artist">{{ song.artist }}</span> - <span class="upcoming-title">{{ song.title }}</span>
              </li>
            </ul>
          </div>
          <div class="info-item">
            <label class="label" for="search">Search:</label>
            <p class="value"></p>
            <input type="text" class="search" id="search" v-model="searchQuery" @input="handleSearchQueryChange" placeholder="Search for songs..." />
          </div>
        </div>
    </div>
  </div>
</template>


<script setup>
import { defineProps, computed, ref } from 'vue';
import { useMediaStore } from '../stores/MediaStore.ts';

const mediaStore = useMediaStore();



const searchQuery = ref('');

const currentSong = computed(() => mediaStore.currentSong);

const artist = computed(() => currentSong.value.artist);
const title = computed(() => currentSong.value.title);
const album = computed(() => currentSong.value.album);
const totalTime = computed(() => currentSong.value.totalTime);
const upcomingSongs = computed(() => mediaStore.upcomingSongs);
const currentTime = computed(() => mediaStore.currentTime);


const handleSearchQueryChange = () => {
  mediaStore.setSearchQuery(searchQuery.value);
};

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const formattedCurrentTime = computed(() => {
  return formatTime(currentTime.value);
});

const formattedTotalTime = computed(() => {
  return formatTime(totalTime.value);
});

const togglePlay = () => {
  mediaStore.togglePlay();
};

const prevTrack = () => {
  mediaStore.prevTrack();
};

const nextTrack = () => {
  mediaStore.nextTrack();
};

</script>

<style scoped>
  .media-information {
    background: radial-gradient(circle, rgba(63, 63, 86, 1) 0%, rgba(19, 18, 34, 1) 100%);
    width: 280px;
    height: 280px;
    border: 3px solid #fff;
    border-radius: 50%;
    position: relative;
    box-shadow: 2px 2px 10px 2px #000a;
  }

  .digital {
    width: 230px;
    height: 230px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .info-container {
    position: absolute; 
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 0.5;
    overflow-x: auto; 
    white-space: nowrap; 
    width: 100%;
    width: 150px;
    height: 150px;
    overflow-y: scroll; 
    scrollbar-width: none; 
    -ms-overflow-style: none; 
  }
  .info-container::-webkit-scrollbar {
    display: none; 
  }

  .search{
    width: 100px;
  }
  
  .value {
    font-size: 10px;
    color: white;
    margin: 5px;
  }

  .label{
      font-size: 16px;
      color: white;
      font-weight: bold;
    }

  .info-item {
    margin: 0; 
    padding: 0;
  }


  .media-controls {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .control-btn {
    background-color: #ffffff;
    border: none;
    cursor: pointer;
    padding: 10px;
    margin: 5px;
    font-size: 10px;
    transition: background-color 0.3s;
  }

  .control-btn:hover {
    background-color: #e0e0e0;
  }

  .control-btn i {
    color: #333333;
  }

  .upcoming-title {
    font-size: 10px;
    color: white;
    margin-bottom: 5px;
    text-align: left;
    display: inline-block;
  }

  .upcoming-artist {
    font-size: 10px;
    color: white;
    font-weight: bold;
    margin-bottom: 5px;
    text-align: left;
    display: inline-block;
  }

  .info-item label {
    display: block; 
    text-align: center; 
    width: 100%; 
  }

  .info-item .search {
    display: block; 
    margin: 0 ; 
    margin-left: 10px;
    width: 80%; 
    top: 15px;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    text-align: center;
  }

</style>
