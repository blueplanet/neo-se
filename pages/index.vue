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
        v-card-actions
          v-btn(flat color="green" @click.native.stop="dialog = true") 借りる
    v-dialog(v-model="dialog" persistent max-width="500px")
      v-card
        v-card-title
          span.headline 借りる
        v-card-text
          v-container(grid-list-md)
            v-layout(wrap)
              v-flex(xs12)
                v-text-field(label="アドレス" required)
          small *indicates required field
        v-card-actions
          v-spacer
          v-btn(color="blue darken-1" flat @click.native="dialog = false") Close
          v-btn(color="blue darken-1" flat @click.native="dialog = false") Save

</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Action, Getter } from 'vuex-class'

@Component({
  components: {}
})
export default class extends Vue {
  @Action('spaceList/load') loadSpaces
  @Getter('spaceList/items') items
  dialog = false

  created() {
    this.loadSpaces()
  }
}
</script>

<style scoped lang="sass">
</style>
