<template>
  <div class="col-sm-12 col-md-8">
    <div class="panel panel-info">
      <div class="panel-heading">
        <h3 class="panel-title">
          Trade your Portfolios
        </h3>
      </div>
      <div class="panel-body">
        <h5>Your funds are</h5>
        <input
          type="text" 
          readonly 
          :value="fund | currency"
        >
        <h5>You can load and save your portfolios</h5>
        <h5>Close day to start a new day</h5>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      fund: Number
    },
  }
</script>

<style scoped>
  .panel-body {
    color: grey;
    background-color: rgb(245, 240, 240);
  }

  input {
    padding-left: 5px;
    font-size: 120%;
    width: 150px;
  }
</style>