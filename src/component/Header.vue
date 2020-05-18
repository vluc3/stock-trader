<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <router-link to="/" class="navbar-brand">Stock Trader</router-link>
      </div>
      <div class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
          <router-link to="/portfolios" activeClass="active" tag="li">
            <a>Portfolios</a>
          </router-link>
          <router-link to="/stocks" activeClass="active" tag="li">
            <a>Stocks</a>
          </router-link>
        </ul>
        <strong class="navbar-text navbar-right">
          {{fund | currency}}
        </strong>
        <ul class="nav navbar-nav navbar-right">
          <li
            class="dropdown"
            :class="{open: isDropdownOpen}"
            @click="isDropdownOpen = ! isDropdownOpen">
            <a
              href="#"
              class="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false">
              Action
              <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li>
                <a href="#" @click="load">Load</a>
              </li>
              <li>
                <a href="#" @click="save">Save</a>
              </li>
              <li>
                <a href="#" @click="closeDay">Close day</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  import { eventBus } from '../eventBus';

  export default {
    props: {
      fund: Number
    },
    data() {
      return {
        isDropdownOpen: false
      };
    },
    methods: {
      load() {
        eventBus.onLoad();
      },
      save() {
        eventBus.onSave();
      },
      closeDay() {
        eventBus.onCloseDay();
      }
    }
  };
</script>

<style scoped>
  .navbar-default {
    background-color: rgb(245, 240, 240);
  }
</style>