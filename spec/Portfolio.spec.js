import Vue from 'vue';
import { mount } from '@vue/test-utils';

import Portfolio from '@/component/portfolio/Portfolio.vue';

var wrapper = null;
var vm = null;

beforeAll(() => {
  Vue.filter('currency', (value) => {
    return (value != null) ? value.toLocaleString() + ' €' : null;
  });

  wrapper = mount(Portfolio);

  vm = wrapper.vm;
});

afterAll(() => {
  wrapper.destroy();
});

xdescribe('Portfolio.vue', () => {
  it('Check', () => {
    expect(true).toBeTruthy();
  });
});
