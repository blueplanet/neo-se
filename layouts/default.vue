<template lang="pug">
v-app(dark)
  Menu(v-if="isLoggedIn")
  v-alert(type="error" :value="true" v-else)
    | NEO LINKが見つかりませんでした
  v-content
    nuxt
</template>

<script lang="ts">
import Menu from '~/components/Menu.vue'
import { Component, Vue } from "nuxt-property-decorator";
import { State, Action } from 'vuex-class'

@Component({
  components: { Menu },
})
export default class Default extends Vue {
  @State(s => s.neolink.isLoggedIn) isLoggedIn: boolean
  @Action('neolink/checkState') checkState

  mounted() {
    this.checkState()
  }
}
</script>
