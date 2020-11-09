<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div>{{loginInfo.status}}</div>
  <div>{{loginInfoGetter.status}}</div>
  <button @click="clickHandler">点击</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {useStore} from '../lib'
import { storeOptions } from './store/global-module';
export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore<typeof storeOptions>()
    const loginInfo = store.state.state.loginInfo
    const loginInfoGetter = store.getters.loginInfo
    const clickHandler = () => {
      store.dispatch('setLoginInfo', {
        'status': '退出登录'
      })
    }
    return {
      loginInfo,
      clickHandler,
      loginInfoGetter
    }
  },
  components: {
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
