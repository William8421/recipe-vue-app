<template>
  <div class="search-recipe-container">
    <h1>Recipe Search</h1>
    <form @submit.prevent="searchRecipes">
      <div>
        <label for="searchQuery">Keywords</label>
        <input v-model="searchQuery" id="searchQuery" type="text" required />
      </div>
      <div>
        <button type="button" @click="openCloseDietModal">Diets</button>
        <button type="button" @click="openCloseAllergiesModal">
          Allergies
        </button>
        <input
          v-model="calories"
          id="calories"
          type="number"
          placeholder="calories"
        />
      </div>
      <button class="submit-button" type="submit">Search Recipes</button>
    </form>

    <Modal :show="showDietModal" :closeModal="openCloseDietModal">
      <h2>Diets:</h2>
      <FilterOptions :options="dietOptions" v-model="selectedDiets" />
    </Modal>

    <Modal :show="showAllergiesModal" :closeModal="openCloseAllergiesModal">
      <h2>Allergies:</h2>
      <FilterOptions :options="allergies" v-model="selectedAllergies" />
    </Modal>

    <FilterDisplay title="Diets" :items="selectedDiets" />
    <FilterDisplay title="Allergies" :items="selectedAllergies" />

    <div v-if="recipes">
      <Recipes :recipes="recipes" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Recipe } from "../types/Types";
import axios from "axios";
import Modal from "../components/searchRecipe/Modal.vue";
import Recipes from "../components/searchRecipe/Recipe.vue";
import FilterOptions from "../components/searchRecipe/FilterOptions.vue";
import FilterDisplay from "../components/searchRecipe/FilterDisplay.vue";

export default defineComponent({
  components: {
    Modal,
    Recipes,
    FilterOptions,
    FilterDisplay,
  },
  data() {
    return {
      searchQuery: "",
      selectedDiets: [] as string[],
      selectedAllergies: [] as string[],
      calories: null as number | null,
      showDietModal: false,
      showAllergiesModal: false,
      recipes: null as Recipe | null,
      allergies: [
        "celery-free",
        "crustacean-free",
        "dairy-free",
        "egg-free",
        "fish-free",
        "gluten-free",
        "lupine-free",
        "mustard-free",
        "peanut-free",
        "sesame-free",
        "shellfish-free",
        "soy-free",
        "tree-Nut-free",
        "wheat-free",
      ],
      dietOptions: [
        "alcohol-free",
        "keto-friendly",
        "kidney-friendly",
        "kosher",
        "no-sugar",
        "paleo",
        "pescatarian",
        "pork-free",
        "red-meat-free",
        "sugar-conscious",
        "vegan",
        "vegetarian",
        "balanced",
        "high-fiber",
        "high-protein",
        "low-carb",
        "low-fat",
        "low-sodium",
      ],
    };
  },
  methods: {
    async searchRecipes() {
      try {
        const appId = process.env.VUE_APP_SEARCH_API_ID;
        const appKey = process.env.VUE_APP_SEARCH_API_KEY;

        let apiUrl = `https://api.edamam.com/search?app_id=${appId}&app_key=${appKey}&q=${this.searchQuery}`;

        if (this.selectedDiets.length > 0) {
          apiUrl += `&health=${this.selectedDiets.join("&")}`;
        }

        if (this.selectedAllergies.length > 0) {
          apiUrl += `&health=${this.selectedAllergies.join("&")}`;
        }
        if (this.calories) {
          apiUrl += `&calories=${this.calories}`;
        }

        const response = await axios.get(apiUrl);
        this.recipes = response.data.hits;
      } catch (error) {
        console.error("Error searching recipes:", error);
      }
    },

    openCloseDietModal() {
      this.showDietModal = !this.showDietModal;
    },
    openCloseAllergiesModal() {
      this.showAllergiesModal = !this.showAllergiesModal;
    },
  },

  // local storage
  beforeRouteLeave(to, from, next) {
    localStorage.setItem("recipes", JSON.stringify(this.recipes));
    next();
  },
  created() {
    const storedData = localStorage.getItem("recipes");
    if (storedData) {
      this.recipes = JSON.parse(storedData);
    }
  },
});
</script>