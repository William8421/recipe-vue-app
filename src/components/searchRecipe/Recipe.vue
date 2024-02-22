<template>
  <div class="recipes">
    <h2>Recipes</h2>
    <div class="card" v-for="recipe in recipes" :key="recipe.recipe.uri">
      <h3>{{ recipe.recipe.label }}</h3>
      <img :src="recipe.recipe.image" :alt="recipe.recipe.label" />
      <h2>Health labels</h2>
      <div class="health-labels">
        <span
          v-for="healthLabel in recipe.recipe.healthLabels"
          :key="healthLabel"
          class="label"
        >
          {{ healthLabel }}
        </span>
      </div>
      <h2>Ingredients</h2>
      <div class="card-ingredients" v-if="recipe.showIngredients">
        <div
          v-for="ingredient in recipe.recipe.ingredientLines"
          :key="ingredient"
        >
          <span>- {{ ingredient }}</span>
        </div>
        <h2>Nutrients</h2>
        <div class="card-nutrients">
          <div>
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
          </div>
          <div v-for="nutrient in ['Protein', 'Fat', 'Carbs']" :key="nutrient">
            <div v-if="nutrientValue(recipe, nutrient)">
              <strong> {{ nutrient }}:</strong>
              <span>{{ nutrientValue(recipe, nutrient) }}g</span>
            </div>
          </div>
        </div>
      </div>
      <div class="arrow-icons" @click="toggleMoreInfo(recipe)">
        <i v-if="!recipe.showIngredients" class="fa-solid fa-angles-down"></i>
        <i v-else class="fa-solid fa-angles-up" style="color: #88ab8e"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["recipes"],
  methods: {
    toggleMoreInfo(recipe) {
      recipe.showIngredients = !recipe.showIngredients;
    },
    nutrientValue(recipe, nutrientLabel) {
      const nutrientData = recipe.recipe.digest.find(
        (digestData) => digestData.label === nutrientLabel
      );
      return nutrientData ? Math.round(nutrientData.total) : null;
    },
  },
};
</script>