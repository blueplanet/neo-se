<template lang="pug">
v-container(fill-height grid-list-lg)
  v-layout(row wrap)
    v-flex(xs12 sm8 offset-sm2)
      v-card
        v-card-text(primary-title)
          v-form(v-model="valid" ref="form" lazy-validation)
            v-text-field(label="物件名" v-model="name" :rules="nameRules" :counter="10" required)
            v-text-field(label="概要" :textarea="true" v-model="description" :rules="descriptionRules" required)
            //- file-input(v-model="filename" @formData="formData")
        v-card-actions
          v-btn(flat color="green" @click="submit") 保存
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { State, Action } from 'vuex-class'
import { createSpace } from '~/lib/nse'
import FileInput from '~/components/FileInput.vue'

@Component({
  components: {
    FileInput
  },
})
export default class extends Vue {
  @State(s => s.neolink.address) address
  created() {
  }
  valid: boolean = false
  name: string = ''
  nameRules = [
    v => !!v || '物件名は必須です',
    v => (v && v.length <= 10) || '物件名は10文字以内'
  ]
  description: string = ''
  descriptionRules = [
    v => !!v || '特徴は必須です',
    v => (v && v.length <= 100) || '特徴は100文字以内'
  ]
  filename: string = ''
  formData = (file) => { this.file = file }
  file

  submit () {
    const form: any = this.$refs.form
    // if (form.validate()) {
      // TODO: submit data
      createSpace(this.address, this.name, this.description)
    // }
  }
}
</script>

<style scoped lang="sass">
</style>
