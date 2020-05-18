import Vue from 'vue';
import { mount } from '@vue/test-utils';

import Portfolios from '@/component/portfolio/Portfolios.vue';

var wrapper = null;
var vm = null;

beforeAll(() => {
  Vue.filter('currency', (value) => {
    return (value != null) ? value.toLocaleString() + ' €' : null;
  });

  wrapper = mount(Portfolios);

  vm = wrapper.vm;
});

afterAll(() => {
  wrapper.destroy();
});

describe('Portfolios.vue', () => {
  it('Check', () => {
    expect(true).toBeTruthy();
  });
});
