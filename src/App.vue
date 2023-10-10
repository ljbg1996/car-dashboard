<template>
    <header>
        <div id="app">    
            <div class="navigation" v-if="showNavigation">
                <h1 class="car">Here is the car app!</h1>
            </div>
            <router-link to="/driver" class="nav-button">Driver</router-link>
            <router-link to="/center" class="nav-button">Center</router-link>
            <router-link to="/codriver" class="nav-button">Co-Driver</router-link>
        </div>
    </header>
    <body>
        <router-view></router-view>
    </body>
  </template>
  
  <script setup>
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const showNavigation = computed(() => {
    return route.path === '/';
    });
  </script>
  
  <style>
    body {
        background-color: #1d0b46;
    }

    .car {
        color: rgb(255, 255, 255);
    }

    .nav-button {
        background-color: white;
        color: #1d0b46;
        border: none;
        padding: 10px;
        margin: 5px;
        text-decoration: none;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s;
    }

    .nav-button:hover {
        background-color: #e0e0e0;
    }
  </style>
  