<template lang="pug">
div
  v-navigation-drawer(fixed clipped v-model="drawer" app)
    v-list(dense)
      v-list-tile(@click="go('/')")
        v-list-tile-action
          v-icon trending_up
        v-list-tile-content
          v-list-tile-title 人気の物件
      v-list-tile(@click="go('/')")
        v-list-tile-action
          v-icon history
        v-list-tile-content
          v-list-tile-title 最近借りた物件
      v-subheader.mt-3.grey--text.text--darken-1 オーナーメニュー
      v-list-tile(@click="go('/my/spaces')")
        v-list-tile-action
          v-icon home
        v-list-tile-title 物件一覧
      v-list-tile(@click="go('/my/spaces/new')")
        v-list-tile-action
          v-icon editor
        v-list-tile-title 物件を登録
      v-list-tile(@click="go('/my/booking-requests')")
        v-list-tile-action
          v-icon event
        v-list-tile-title 予約管理
      v-list-tile(@click="go('/my-profile/edit')")
        v-list-tile-action
          v-icon(color="grey darken-1") settings
        v-list-tile-title.grey--text.text--darken-1 アカウント
  v-toolbar(color="green" dense fixed clipped-left app)
    v-toolbar-side-icon(@click.stop="drawer = !drawer")
    v-icon.mx-3 fab fa-youtube
    v-toolbar-title.mr-5.align-center
      nuxt-link(to="/" tag="span").title NEO SE
    v-spacer
    v-layout(row align-center style="max-width: 650px")
      v-text-field(placeholder="検索する..." single-line append-icon="search" :append-icon-cb="() => {}" color="white" hide-details)
</template>

<script>
export default {
  data: () => ({
    drawer: true,
    items: [
      { picture: Math.floor(Math.random()* 100), text: '土屋 広幸' },
      { picture: Math.floor(Math.random()* 100), text: '安部川 紀' },
      { picture: Math.floor(Math.random()* 100), text: '夢野 陽一朗' },
      { picture: Math.floor(Math.random()* 100), text: 'うわ まさき' },
      { picture: Math.floor(Math.random()* 100), text: '養父 佳人' }
    ],
  }),
  methods: {
    go(href) {
      this.$router.push(href)
    }
  },
}
</script>
