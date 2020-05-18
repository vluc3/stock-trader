import Vue from 'vue';

export const eventBus = new Vue({
  methods: {
    onBuy(id, quantity) {
      this.$emit('onBuy', id, quantity);
    },
    onSell(id, quantity) {
      this.$emit('onSell', id, quantity);
    },
    onCloseDay() {
      this.$emit('onCloseDay');
    },
    onLoad() {
      this.$emit('onLoad');
    },
    onSave() {
      this.$emit('onSave');
    },
    onStockPriceChange(id, oldPrice, newPrice) {
      this.$emit('onStockPriceChange', id, oldPrice, newPrice);
    }
  }
});
