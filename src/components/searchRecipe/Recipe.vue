<template>
  <div class="recipes">
    <h2>Recipes</h2>
    <div class="cards-container">
      <div
        class="recipe-card"
        v-for="recipe in recipes"
        :key="recipe.recipe.uri"
      >
        <h3>{{ recipe.recipe.label }}</h3>
        <div class="recipe-card-body">
          <img :src="recipe.recipe.image" :alt="recipe.recipe.label" />
          <div class="health-labels">
            <h2>Health</h2>
            <div class="health-labels-body">
              <span
                v-for="healthLabel in recipe.recipe.healthLabels"
                :key="healthLabel"
                class="label"
              >
                {{ healthLabel }}
              </span>
            </div>
          </div>
        </div>
        <div class="recipe-hidden-body">
          <div class="card-ingredients" v-if="recipe.showIngredients">
            <h2>Ingredients</h2>
            <div
              v-for="ingredient in recipe.recipe.ingredientLines"
              :key="ingredient"
            >
              <span>- {{ ingredient }}</span>
            </div>
          </div>
          <div class="card-nutrients" v-if="recipe.showIngredients">
            <h2>Nutrients</h2>
            <div>
              <strong>serving:</strong>
              <span>{{ recipe.recipe.yield }}</span>
            </div>
            <div>
              <strong>Calories:</strong
              ><span
                >{{
                  Math.round(recipe.recipe.calories / recipe.recipe.yield)
                }}
                kcal</span
              >
            </div>
            <div
              class="more-info"
              v-for="nutrient in ['Protein', 'Fat', 'Carbs']"
              :key="nutrient"
            >
              <div v-if="nutrientValue(recipe, nutrient)">
                <strong> {{ nutrient }}:</strong>
                <span>{{ nutrientValue(recipe, nutrient) }}g</span>
              </div>
            </div>
          </div>
        </div>
        <div class="arrow-icons" @click="toggleMoreInfo(recipe)">
          <i v-if="!recipe.showIngredients" class="fa-solid fa-angles-down"></i>
          <i v-else class="fa-solid fa-angles-up"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// functions from the Vue framework
import { defineComponent } from "vue";
// types
import { Recipe } from "../../types/Types";

export default defineComponent({
  props: ["recipes"],
  methods: {
    toggleMoreInfo(recipe: Recipe) {
      recipe.showIngredients = !recipe.showIngredients;
    },
    nutrientValue(recipe: Recipe, nutrientLabel: string) {
      const nutrientData = recipe.recipe.digest.find(
        (digestData) => digestData.label === nutrientLabel
      );
      return nutrientData ? Math.round(nutrientData.total) : null;
    },
  },
});
</script>