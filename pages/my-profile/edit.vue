<template lang="pug">
v-container(fill-height grid-list-lg)
  v-layout(row wrap)
    v-flex(xs12)
      v-form(v-model="valid")
        v-text-field(label="名前" v-model="name" :rules="nameRules" :counter="10" required)

</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Action, Getter } from 'vuex-class'

@Component({
  components: {}
})
export default class extends Vue {

  created() {
  }
}
</script>

<style scoped lang="sass">
</style>
