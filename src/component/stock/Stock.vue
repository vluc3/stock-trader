<template>
  <div class="col-sm-6 col-md-4">
    <div class="panel panel-success">
      <div class="panel-heading">
        <h3 class="panel-title">
          <span class="pull-left">
            <strong>
              {{stock.name}}
            </strong>
            <span v-if="priceTradeoff != null">
              ({{(priceTradeoff > 0) ? '+' : ''}}{{priceTradeoff | currency}})
            </span>
          </span>
          <span class="pull-right">
            <strong>
              {{stock.price | currency}}
            </strong>
          </span>
        </h3>
      </div>
      <div class="panel-body">
        <div class="pull-left">
          <input
            type="number"
            class="form-control"
            min="1" max="9999"
            v-model="quantity"
            :class="{'quantity-error': quantity && ! validQuantity || insufficientFund}"
            placeholder="Quantity"
          >
        </div>
        <div class="pull-right">
          <button
            class="btn btn-success"
            :disabled="! validQuantity || insufficientFund"
            @click="buy">
            {{buyLabel}}
            <span v-if="validQuantity && ! insufficientFund">
              {{this.quantity * this.stock.price | currency}}
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { eventBus } from '../../eventBus';

  export default {
    created() {
      eventBus.$on('onStockPriceChange', (id, oldPrice, newPrice) => {
        if (id == this.stock.id) {
          if (newPrice != null) {
            this.priceTradeoff = newPrice - oldPrice;
          } else {
            this.priceTradeoff = null;
          }
        }
      });
    },
    props: {
      stock: Object,
      fund: Number
    },
    data() {
      return {
        quantity: null,
        priceTradeoff: null
      }
    },
    computed: {
      validQuantity() {
        try {
          let quantity = Number.parseInt(this.quantity);
          return Number.isInteger(quantity) && quantity > 0;
        } catch (error) {
          return false;
        }
      },
      insufficientFund() {
        return this.quantity * this.stock.price > this.fund;
      },
      buyLabel() {
        if (this.quantity) {
          return (! this.validQuantity) ? 'Invalid quantity' :
            (this.insufficientFund) ? 'Insufficient fund' : 'Buy';
        } else {
          return 'Buy';
        }
      }
    },
    methods: {
      buy() {
        let quantity = Number.parseInt(this.quantity);
        eventBus.onBuy(this.stock.id, quantity);
        this.quantity = null;
      }
    }
  }
</script>

<style scoped>
  .panel-body {
    background-color: rgb(245, 240, 240);
  }

  .panel-heading {
    height: 36px;
  }

  .quantity-error {
    border: 1px solid maroon    
  }
</style>