<template lang="pug">
div
  v-text-field(
    prepend-icon="attach_file"
    single-line=""
    v-model="filename"
    :label="label"
    :required="required"
    @click.native="onFocus"
    ref="fileTextField"
  )
  input(type="file"
    ref="fileInput"
    @change="onFileChange"
  )
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'

@Component({})
export default class extends Vue {
  @Prop() label: string
  @Prop() required: string
  filename: string = ''

  onFocus () {
    const fileInput: any = this.$refs.fileInput
    fileInput.click()
  }

  onFileChange ($event) {
    const files = $event.target.files || $event.dataTransfer.files
    if (files) {
      if (files.length > 0) {
        this.filename = files[0].name
        this.$emit('formData', files[0])
      } else {
        this.filename = ''
      }
    } else {
      this.filename = $event.target.value.split('\\').pop()
    }
  }
}
</script>

<style scoped>
  input[type=file] {
    position: absolute;
    left: -99999px;
  }
</style>
