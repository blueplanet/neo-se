<template lang="pug">
v-container(fill-height grid-list-lg)
  v-layout(row wrap)
    v-flex(xs12 sm6 md4 v-for="(item, index) in items" :key="index")
      v-card
        v-card-media(:src="item.image" height="200px" cover)
        v-card-title
          div
            v-avatar(size="36").mr-2
              img(src="https://randomuser.me/api/portraits/men/88.jpg" alt)
            span(v-text="'テキスト 太郎'")
          div.mt-3
            h3.headline.mb-0 {{item.title}}
            //- div {{item.description}}
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Action, Getter } from 'vuex-class'

@Component({
  components: {}
})
export default class extends Vue {
  @Action('mySpaceList/load') loadSpaces
  @Getter('mySpaceList/items') items
  dialog = false

  created() {
    this.loadSpaces()
  }

  open(item) {
    this.dialog = true
  }
}
</script>

<style scoped lang="sass">
</style>
