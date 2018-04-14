<template lang="pug">
v-container(fluid style="min-height: 0;" grid-list-lg)
  v-layout(row wrap)
    v-flex(xs8 offset-xs2 v-for="(item, index) in items" :key="index")
      v-card.white--text(color="gray")
        v-card-title(primary-title)
          .headline {{item.title}}
          div
            | {{item.target}}
        v-card-actions
          v-btn(flat dark) 承認する

</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Action, Getter } from 'vuex-class'

@Component({
  components: {}
})
export default class extends Vue {
  @Action('bookingRequestList/load') loadBookings
  @Getter('bookingRequestList/items') items
  dialog = false

  created() {
    this.loadBookings()
  }

  open(item) {
    this.dialog = true
  }
}
</script>

<style scoped lang="sass">
</style>
