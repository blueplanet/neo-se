<template lang="pug">
v-app(dark)
  Menu
  v-content
    nuxt
</template>

<script lang="ts">
import Menu from '~/components/Menu.vue'
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  components: { Menu },
})
export default class Default extends Vue {
}
</script>
