import Home from './component/Home.vue';
import Portfolios from './component/portfolio/Portfolios.vue';
import Stocks from './component/stock/Stocks.vue';

export const routes = [
  {path: '/', component: Home},
  {path: '/portfolios', component: Portfolios},
  {path: '/stocks', component: Stocks}
];