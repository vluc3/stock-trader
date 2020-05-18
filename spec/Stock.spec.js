import Vue from 'vue';
import { mount } from '@vue/test-utils';

import Stock from '@/component/stock/Stock.vue';

var wrapper = null;
var vm = null;

beforeAll(() => {
  Vue.filter('currency', (value) => {
    return (value != null) ? value.toLocaleString() + ' €' : null;
  });

  wrapper = mount(Stock);
  vm = wrapper.vm;
});

afterAll(() => {
  wrapper.destroy();
});

xdescribe('Stock.vue', () => {
  it('Check buy button event', () => {
    console.log('vm:', vm);
    let buy = jest.spyOn(vm, 'buy');
    wrapper.find('button').trigger('click');
    expect(buy).toHaveBeenCalled();
  });
});
