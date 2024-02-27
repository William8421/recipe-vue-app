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
        <router-link to="/" @click="toggleMenu" class="router-link">
          <i class="fa-solid fa-house"></i> Home</router-link
        >
        <router-link
          :to="{ name: 'NutritionAnalysis' }"
          @click="toggleMenu"
          class="router-link"
        >
          <i class="fa-brands fa-nutritionix"></i> Nutrition Analysis
        </router-link>
        <router-link
          :to="{ name: 'SearchRecipe' }"
          @click="toggleMenu"
          class="router-link"
        >
          <i class="fa-solid fa-magnifying-glass"></i> Recipe Search
        </router-link>
        <router-link
          :to="{ name: 'FoodDatabase' }"
          @click="toggleMenu"
          class="router-link"
        >
          <i class="fa-solid fa-database"></i> Food Database
        </router-link>
        <router-link
          :to="{ name: 'About' }"
          @click="toggleMenu"
          class="router-link"
        >
          <i class="fa-solid fa-circle-info"></i> About
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
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
  },
};
</script>
