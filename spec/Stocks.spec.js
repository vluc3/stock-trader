import Vue from 'vue';
import { mount } from '@vue/test-utils';

import Stocks from '@/component/stock/Stocks.vue';

var wrapper = null;
var vm = null;

beforeAll(() => {
  Vue.filter('currency', (value) => {
    return (value != null) ? value.toLocaleString() + ' €' : null;
  });

  wrapper = mount(Stocks);
  vm = wrapper.vm;
});

afterAll(() => {
  wrapper.destroy();
});

describe('Stocks.vue', () => {
  it('Check', () => {
    expect(true).toBeTruthy();
  });
});
