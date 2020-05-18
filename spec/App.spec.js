import Vue from 'vue';
import { mount } from '@vue/test-utils';

import App from '@/App.vue';

var wrapper = null;
var vm = null;

beforeAll(() => {
  Vue.filter('currency', (value) => {
    return (value != null) ? value.toLocaleString() + ' €' : null;
  });

  wrapper = mount(App, {
    stubs: [
      'router-link',
      'router-view'
    ]
  });

  vm = wrapper.vm;
});

beforeEach(() => {
  vm.$data.stocks = [
    {id: 1, name: 'FaceBook', price: 100},
    {id: 2, name: 'Google', price: 200},
    {id: 3, name: 'Apple', price: 25},
    {id: 4, name: 'Twitter', price: 80},
    {id: 5, name: 'Microsoft', price: 120},
    {id: 6, name: 'Amazon', price: 30}    
  ];
});

afterAll(() => {
  wrapper.destroy();
});

describe('App.vue', () => {
  it('Check dataFileName', () => {
    expect(vm.$data.dataFileName).toBe('data.json');
  });

  it('Check findStocks()', () => {
    let id = 3;
    let stock = vm.findStock(id);
    expect(stock.name).toEqual('Apple');

    id = 10;
    stock = vm.findStock(id);
    expect(stock).toBeFalsy();
  });
});

/*
const wrapper = mount(App);

wrapper.find('button').trigger('click');
wrapper.find('button').html('Hello');

Wrapper.setData(...);

it('should contains', (done) => {
  const vm = wrapper.vm;
  const inputElement = vm.$el.querySelector('#name');
  const outputElement = vm.$el.querySelector('#output');
  inputElement.value = "Test"
  expect(outputElement.textContent).not.toContain(inputElement.value);
  inputElement.dispatchEvent(new Event('input'));

  vm.$nextTick(() => {
    expect(outputElement.textContent).toContain(inputElement.value);
    done();
  });
});
*/
