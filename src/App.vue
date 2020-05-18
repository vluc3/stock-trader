<template>
  <div class="container">
    <app-header
      :fund="fund">
    </app-header>
    <div class="row">
      <div class="col-xs-12">
        <transition name="slide" mode="out-in">
          <router-view
            :stocks="stocks"
            :portfolios="portfolios"
            :fund="fund"
            :findStock="findStock">
          </router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { eventBus } from './eventBus';

  import Header from "./component/Header.vue";
  import storedStocks from './data/stocks';

  export default {
    created() {
      eventBus.$on('onBuy', (id, quantity) => {
        this.buy(id, quantity);
      });

      eventBus.$on('onSell', (id, quantity) => {
        this.sell(id, quantity);
      });

      eventBus.$on('onCloseDay', () => {
        this.closeDay();
      });

      eventBus.$on('onLoad', () => {
        this.load();
      });

      eventBus.$on('onSave', () => {
        this.save();
      });
    },
    components: {
      appHeader: Header
    },
    data: function() {
      return {
        dataFileName: 'data.json',
        stocks: storedStocks,
        portfolios: [],
        fund: 10000
      }
    },
    methods: {
      buy(id, quantity) {
        let stock = this.findStock(id);
        let portfolio = this.findPortfolio(id);

        if (stock) {
          if (portfolio) {
            portfolio.price = stock.price,
            portfolio.quantity += quantity;
            portfolio.total += stock.price * quantity;
          } else {
            let portfolio = {
              id: id,
              name: stock.name,
              price: stock.price,
              quantity: quantity,
              total: stock.price * quantity
            };

            this.portfolios.push(portfolio);
          }

          this.fund -= stock.price * quantity;
        }
      },
      sell(id, quantity) {
        let stock = this.findStock(id);

        if (stock) {
          let portfolio = this.findPortfolio(id);

          if (portfolio) {
            if (portfolio.quantity > quantity) {
              portfolio.quantity -= quantity;
              portfolio.total -= stock.price * quantity;
            } else {
              this.portfolios.splice(this.portfolios.indexOf(portfolio), 1);
            }

            this.fund += stock.price * quantity;
          }
        }
      },
      load() {
        Vue.http.get(this.dataFileName)
          .then(response => response.json())
          .then(data => {
            if (data) {
              this.stocks = data.stocks;
              this.portfolios = data.portfolios;
              this.fund = data.fund;
            }
          });

        this.stocks.forEach(stock => {          
          eventBus.onStockPriceChange(stock.id, null, null);
        });
      },
      save() {
        let data = {};
        data.stocks = this.stocks;
        data.portfolios = this.portfolios;
        data.fund = this.fund;
        this.$http.put(this.dataFileName, data);
      },
      closeDay() {
        this.stocks.forEach(stock => {          
          let price = Math.round(stock.price * (Math.random() + 0.5));
          eventBus.onStockPriceChange(stock.id, stock.price, price);
          stock.price = price;
        });
      },
      findStock(id) {
        let result = this.stocks.find(stock => stock.id == id);
        return result;
      },
      findPortfolio(id) {
        return this.portfolios.find(portfolio => portfolio.id == id);
      }
    }
  };
</script>

<style>
  body {
    padding: 10px;
  }

  .slide-enter-active {
    animation: slide-in 300ms ease-out forwards;
  }

  .slide-leave-active {
    animation: slide-out 300ms ease-out forwards;
  }

  @keyframes slide-in {
    from {
      transform: translateY(-30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slide-out {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(-30px);
      opacity: 0;
    }
  }
</style>
