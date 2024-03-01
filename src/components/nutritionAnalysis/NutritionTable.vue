<template>
  <div v-if="nutritionData" class="results">
    <h2>Ingredients</h2>
    <table class="result-table">
      <thead>
        <tr>
          <th>Quantity</th>
          <th>Unit</th>
          <th>Food</th>
          <th>Calories</th>
          <th>Weight</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ingredient, index) in calculatedIngredients" :key="index">
          <td>{{ ingredient.quantity }}</td>
          <td>{{ ingredient.measure }}</td>
          <td>{{ ingredient.foodMatch }}</td>
          <td>{{ ingredient.calories.toFixed(1) }} kcal</td>
          <td>{{ ingredient.weight.toFixed(1) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
// functions from the Vue framework
import { defineComponent } from "vue";
// types
import { NutritionData, NutritionMethods } from "../../types/Types";
export default defineComponent({
  // Declaring component props
  props: {
    nutritionData: Object as () => NutritionData | null,
  },
  // Calculating Computed Properties for Calculated Ingredients
  computed: {
    calculatedIngredients(this: NutritionMethods) {
      // Return an empty array if no nutrition data is available
      if (!this.nutritionData) return [];
      // Map ingredients for display in the table
      return this.nutritionData.ingredients.map((ingredient) => ({
        quantity: ingredient.parsed[0].quantity,
        measure: ingredient.parsed[0].measure,
        foodMatch: ingredient.parsed[0].foodMatch,
        weight: parseFloat(ingredient.parsed[0].weight.toFixed(1)),
        calories: parseFloat(
          ingredient.parsed[0].nutrients.ENERC_KCAL.quantity.toFixed(1)
        ),
      }));
    },
  },
});
</script>