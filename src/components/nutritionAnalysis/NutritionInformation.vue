<template>
  <div class="values">
    <!-- label -->
    <span>
      <strong>
        {{ label }}
      </strong>
      <!-- total Nutrients -->
      {{ Math.round(quantity) }}
      {{ unit }}
    </span>
    <!-- total daily -->
    <span>
      <strong> {{ Math.round(totalQuantity) }}{{ totalUnit }} </strong>
    </span>
  </div>
</template>

<script lang="ts">
import { NutritionData } from "../../types/Types";
export default {
  props: {
    label: String,
    quantity: Number,
    unit: String,
    totalQuantity: Number,
    totalUnit: String,
    nutritionData: Object as () => NutritionData | null,
  },
};
</script>