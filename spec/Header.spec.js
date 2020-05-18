import Vue from 'vue';
import { mount } from '@vue/test-utils';

import Header from '@/component/Header.vue';

var wrapper = null;
var vm = null;

beforeAll(() => {
  Vue.filter('currency', (value) => {
    return (value != null) ? value.toLocaleString() + ' €' : null;
  });

  wrapper = mount(Header, {
    stubs: [
      'router-link',
    ]
  });

  vm = wrapper.vm;
});

afterAll(() => {
  wrapper.destroy();
});

describe('Header.vue', () => {
  it('Check initial props.fund', () => {
    let fund = 10000;

    wrapper = mount(Header, {
      propsData: {
        fund: 10000
      },
      stubs: [
        'router-link'
      ]
    });

    vm = wrapper.vm;
    expect(vm.$props.fund).toEqual(fund);
  });
});
