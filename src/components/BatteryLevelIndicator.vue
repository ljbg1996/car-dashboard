<template>
  <div class="battery-level-indicator">
    <div class="lines">
        <div class="line" style="transform: rotate(30deg)"></div>
        <div class="line" style="transform: rotate(60deg)"></div>
        <div class="line" style="transform: rotate(90deg)"></div>
        <div class="line" style="transform: rotate(120deg)"></div>
        <div class="line" style="transform: rotate(150deg)"></div>
        <div class="line" style="transform: rotate(180deg)"></div>
        <div class="line" style="transform: rotate(210deg)"></div>
        <div class="line" style="transform: rotate(240deg)"></div>
        <div class="line" style="transform: rotate(270deg)"></div>
        <div class="line" style="transform: rotate(300deg)"></div>
        <div class="line" style="transform: rotate(330deg)"></div>
    </div>
    <div class="digital" :style="{ background: batteryGradient }">
      <p class="value">{{ formattedBatteryLevel }}%</p>
    </div>
    <div class="indicator" :style="{ transform: `rotate(${indicatorTransform}deg)` }"></div>
    <div class="red-battery" v-if="isDangerLevel">
      <div class="red-battery-body"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useCarStore } from '../stores/CarStore.ts';
import {  useBatteryStore } from '../stores/BatteryStore.ts';

const carStore = useCarStore();
const batteryStore = useBatteryStore();
const formattedBatteryLevel = computed(() => {
  return carStore.batteryLevel.toFixed(1);
});

const batteryGradient = computed(() => {
  return `linear-gradient(to top, rgba(64, 218, 29, ${carStore.batteryLevel / 100}), rgba(0, 255, 0, 0))`;
});

const indicatorTransform = computed(() => {
  return -30 - 300 * (1 - carStore.batteryLevel / 100);
});

const isDangerLevel = computed(() => {
  return carStore.batteryLevel < 20;
});
</script>

<style scoped>
.battery-level-indicator {
  background: radial-gradient(circle, rgba(63, 63, 86, 1) 0%, rgba(19, 18, 34, 1) 100%);
  width: 200px;
  height: 200px;
  border: 3px solid #fff;
  border-radius: 50%;
  position: relative;
  box-shadow: 2px 2px 10px 2px #000a;
}


.digital {
  background: linear-gradient(to top, #00ff00, rgba(0, 255, 0, 0));
  width: 50px;
  height: 50px;
  position: absolute;
  left: 75px;
  top: 75px;
  border: 2px solid #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.value {
  font-size: 14px;
  color: rgb(255, 255, 255);
  z-index: 3;
}

.indicator {
  border-bottom: 5px solid #C1B3B3;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -10px;
  transform: rotate(180deg);
  transition: transform 1s ease-in-out;
  z-index: 2;

  &::before {
    content: '';
    display: block;
    border-bottom: 80px solid transparent;
    border-right: 10px solid #c4c3c3;
    position: absolute;
    left: -10px;
    top: 5px;
  }

  &::after {
    content: '';
    display: block;
    border-bottom: 80px solid transparent;
    border-left: 10px solid #ffffff;
    position: absolute;
    top: 5px;
  }
}

.line {
  position: absolute;
  left: 50%;
  top: 50%;
  padding-top: 78px;
  margin-left: -2px;
  transform-origin: top center;

  &::after {
    content: '';
    display: block;
    width: 3px;
    height: 23px;
    background: #fff;
  }
}


.red-battery {
  position: absolute;
  top: 4px; 
  left: 1px; 
  width: 40px;
  height: 20px;
  display: flex;
}

.red-battery-body {
  background-color: red;
  width: 20px;
  height: 14px;
  border-radius: 2px;
  position: relative;
  top: 165px;
  right: -90px;
  border: 2px solid white;
}


.red-battery-body::before {
  content: '';
  position: absolute;
  top: 0px;
  right: -5px;
  width: 3px;
  height: 10px;
  background-color: red;
  border-right: 2px solid white; 
  border-top: 2px solid white;
  border-bottom: 2px solid white;
}

</style>
