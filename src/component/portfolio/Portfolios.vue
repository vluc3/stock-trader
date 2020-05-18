<template>
  <div>
    <app-portfolio
      v-for="portfolio in portfolios"
      :key="portfolio.id"
      :portfolio="portfolio"
      :fund="fund"
      :findStock="findStock">
    </app-portfolio>
  </div>
</template>

<script>
  import Portfolio from './Portfolio.vue';

  export default {
    props: {
      portfolios: Array,
      fund: Number,
      findStock: Function
    },
    components: {
      appPortfolio: Portfolio  
    }
  }
</script>
