<template lang="pug">
div
  v-app(dark v-if="!connecting")
    Menu(v-if="isLoggedIn")
    v-alert(type="error" :value="true" v-else)
      | NEOLINKに接続できませんでした
    v-content
      nuxt
  v-app(dark v-else)
    | NEOLINKの状態を取得しています
</template>

<script lang="ts">
import Menu from '~/components/Menu.vue'
import { Component, Vue } from "nuxt-property-decorator";
import { State, Action } from 'vuex-class'

@Component({
  components: { Menu },
})
export default class Default extends Vue {
  @State(s => s.neolink.connecting) connecting: boolean
  @State(s => s.neolink.isLoggedIn) isLoggedIn: boolean
  @Action('neolink/checkState') checkState

  mounted() {
    this.checkState()
  }
}
</script>
