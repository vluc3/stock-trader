<template>
  <div class="col-sm-8 col-md-6">
    <div class="panel panel-info">
      <div class="panel-heading">
        <h3 class="panel-title">
          <span class="pull-left">
            <strong>
              {{portfolio.name}}
            </strong>
            ({{portfolio.quantity}})
            <span class="arrow">►</span>
            <strong>
              {{portfolio.total | currency}} 
            </strong>            
            <span class="arrow">►</span>
            {{portfolio.price | currency}}
            ({{(priceTradeoff > 0) ? '+' : ''}}{{priceTradeoff | currency}})
          </span>
          <span class="pull-right">
            <strong>
              {{stockPrice | currency}}
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
            :class="{'quantity-error': quantity && ! validQuantity || insufficientQuantity}"
            placeholder="Quantity"
          >
        </div>
        <div class="pull-right">
          <button
            class="btn btn-info"
            :disabled="! validQuantity || insufficientQuantity"
            @click="sell">
            {{sellLabel}}
            <span v-if="validQuantity && ! insufficientQuantity">
              {{this.quantity * this.stockPrice | currency}}
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
    props: {
      portfolio: Object,
      fund: Number,
      findStock: Function
    },
    data() {
      return {
        quantity: null
      }
    },
    computed: {
      stockPrice() {
        let stock = this.findStock(this.portfolio.id);
        return (stock) ? stock.price : null;
      },
      priceTradeoff() {        
        return (this.stockPrice) ? this.portfolio.price - this.stockPrice : null;
      },
      validQuantity() {
        try {
          let quantity = Number.parseInt(this.quantity);
          return Number.isInteger(quantity) && quantity > 0;
        } catch (error) {
          return false;
        }
      },
      insufficientQuantity() {
        return this.quantity > this.portfolio.quantity;
      },
      sellLabel() {
        if (this.quantity) {
          return (! this.validQuantity) ? 'Invalid quantity' :
            (this.insufficientQuantity) ? 'Insufficient quantity' : 'Sell';
        } else {
          return 'Sell';
        }
      }
    },
    methods: {
      sell() {
        let quantity = Number.parseInt(this.quantity);
        eventBus.onSell(this.portfolio.id, quantity);
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

  .arrow {
    margin: 0 1px 0 3px;
    font-size: 80%;
  }
</style>