<template>
  <div>
    <app-stock
      v-for="stock in stocks"
      :key="stock.id"
      :stock="stock"
      :fund="fund">
    </app-stock>
  </div>
</template>

<script>
  import Stock from './Stock.vue';

  export default {
    props: {
      stocks: Array,
      fund: Number
    },
    components: {
      appStock: Stock
    }
  }
</script>