// batteryStore.ts
import { defineStore } from 'pinia';

export const useBatteryStore = defineStore({
  id: 'batteryStore',
  state: () => ({
    batteryLevel: 100,
    charging: false,
  }),
  actions: {
    checkCharge() {
      if(this.batteryLevel >= 100){
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
    adjustBattery(speed: number) {
      if (this.batteryLevel <= 0 && speed > 0) {
        this.batteryLevel = 0;
      }
      this.batteryLevel -= (speed / 200);
      this.batteryLevel = Math.max(this.batteryLevel, 0);
    },
  },
});
