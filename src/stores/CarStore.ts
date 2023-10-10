// carStore.ts
import { defineStore } from 'pinia';

export const useCarStore = defineStore({
  id: 'carStore',
  state: () => ({
    speed: 0,
    batteryLevel: 100,
    charging: false,
  }),
  actions: {
    increaseSpeed() {
      if (this.speed < 250 && this.batteryLevel > 0) {
        this.speed += 5;
      }
    },
    decreaseSpeed() {
      if (this.speed > 0) {
        this.speed -= 5;
      }
    },
    checkCharge() {
      if(this.speed !== 0 || this.batteryLevel >= 100){
        this.charging = false;
      }else{
        this.charging = true;
      }
    },
    chargeBattery() {
      if(this.charging) {
        this.batteryLevel += 0.1;
        this.batteryLevel = Math.min(this.batteryLevel, 100);
      }
    },
    adjustBattery() {
      if (this.batteryLevel <= 0 && this.speed > 0) {
        this.speed -= 5;
        this.speed = Math.max(this.speed, 0);
      }
      this.batteryLevel -= (this.speed / 200);
      this.batteryLevel = Math.max(this.batteryLevel, 0);
    },
  },
});
