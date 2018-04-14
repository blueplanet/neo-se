<template lang="pug">
div
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Action } from 'vuex-class'
import { thisExpression } from 'babel-types';

@Component({})
export default class extends Vue {
  @Action('neolink/checkState') checkState

  mounted() {
    this.checkState()
  }
}
</script>

<style scoped>
  input[type=file] {
    position: absolute;
    left: -99999px;
  }
</style>
