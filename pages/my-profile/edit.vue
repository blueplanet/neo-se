<template lang="pug">
v-container(fill-height grid-list-lg)
  v-layout(row wrap)
    v-flex(xs12 sm8 offset-sm2)
      v-card
        v-card-text(primary-title)
          v-text-field(label="Address" :value="address" disabled)

</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { State } from 'vuex-class'

@Component({
  components: {}
})
export default class extends Vue {
  @State(s => s.neolink.address) address
  valid: boolean
}
</script>

<style scoped lang="sass">
</style>
