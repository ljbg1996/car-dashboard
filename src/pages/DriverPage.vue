<template>
    <div class="car">
      <div class="components">
        <Speedometer :speed="carStore.speed" />
        <MediaInformation
          :songList="songList"
        />
        <BatteryLevelIndicator :batteryLevel="carStore.batteryLevel" />
      </div>
      <div class="components-speed">
        <button @click="increaseSpeed">Speed +</button>
        <button @click="chargeBattery" :disabled="chargeCondition">Charge</button>
        <button @click="decreaseSpeed">Speed -</button>
        <h1> </h1>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onUnmounted, computed } from 'vue';
  import Speedometer from '../components/Speedometer.vue';
  import BatteryLevelIndicator from '../components/BatteryLevelIndicator.vue';
  import MediaInformation from '../components/MediaInformation.vue';

  import { useCarStore } from '../stores/CarStore.ts';
  import {  useBatteryStore } from '../stores/BatteryStore.ts';


  const carStore = useCarStore();
  const batteryStore = useBatteryStore();

  
  let batteryInterval;
  let chargeInterval;

  const startBatteryDrain = () => {
    if (batteryInterval) {
      clearInterval(batteryInterval);
    }
  
    if (carStore.speed === 0) {
      return;
    }  
    batteryInterval = setInterval(carStore.adjustBattery, 100);
  };
  
  
  const chargeBattery = () => {
    if (chargeInterval) {
      clearInterval(chargeInterval);
      chargeInterval = null; 
    } else {
        carStore.checkCharge();
        chargeInterval = setInterval(() => {
            if (!carStore.charging) {
            clearInterval(chargeInterval);
            chargeInterval = null; 
            } else {
            carStore.chargeBattery();
            }
        }, 100);
    }
  };
  
  onUnmounted(() => {
    if (batteryInterval) {
      clearInterval(batteryInterval);
    }
    if (chargeInterval){
        clearInterval(chargeInterval);
    }
  });
  
  const increaseSpeed = () => {
    carStore.increaseSpeed();
    startBatteryDrain();
  };
  
  const decreaseSpeed = () => {
    carStore.decreaseSpeed();
    startBatteryDrain();
  };
  
  const chargeCondition = computed(() => {
    carStore.checkCharge();
    return !carStore.charging;
  });
  
  </script>
  
  <style>
  .car {
    text-align: center;
  }
  
  .components {
    display: flex;
    justify-content: space-between;
    align-items: center; 
    margin: 20px 0;
  }
  
  .components > * {
    margin: 0 5px; 
  }
  
  .buttons {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
  
  .car{
    color: #ffffff;
  }
  
  .components-speed {
    display: flex; 
    justify-content: center; 
  }
  
  button {
    padding: 10px;
    margin: 50px;
    cursor: pointer;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #e0e0e0;
  }
  
  
  </style>
  