<template>
  <div class="navbar-container">
    <div>
      <div class="burger-icon-container">
        <h1>Recipe App</h1>
      </div>
    </div>
    <div class="burger-icon" @click="toggleMenu">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>

    <nav :class="{ 'menu-open': isMenuOpen }">
      <div class="app-name">Recipe App</div>
      <div class="router-container">
        <router-link to="/" @click="closeMenu" class="router-link">
          <i class="fa-solid fa-house"></i> Home</router-link
        >
        <router-link
          :to="{ name: 'NutritionAnalysis' }"
          @click="closeMenu"
          class="router-link"
        >
          <i class="fa-brands fa-nutritionix"></i> Nutrition Analysis
        </router-link>
        <router-link
          :to="{ name: 'SearchRecipe' }"
          @click="closeMenu"
          class="router-link"
        >
          <i class="fa-solid fa-magnifying-glass"></i> Recipe Search
        </router-link>
        <router-link
          :to="{ name: 'FoodDatabase' }"
          @click="closeMenu"
          class="router-link"
        >
          <i class="fa-solid fa-database"></i> Food Database
        </router-link>
        <router-link
          :to="{ name: 'About' }"
          @click="closeMenu"
          class="router-link"
        >
          <i class="fa-solid fa-circle-info"></i> About
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    // toggle burger menu
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    // close burger menu on mobile screen when changing route
    closeMenu() {
      this.isMenuOpen = false;
    },
  },
});
</script>
