<template lang="pug">
div
  v-navigation-drawer(fixed clipped v-model="drawer" app)
    v-list(dense)
      v-list-tile(v-for="item in items" :key="item.text" @click="go(item.href)")
        v-list-tile-action
          v-icon {{ item.icon }}
        v-list-tile-content
          v-list-tile-title
            | {{ item.text }}
      v-subheader.mt-3.grey--text.text--darken-1 おすすめのオーナー
      v-list
        v-list-tile(v-for="item in items2" :key="item.text" avatar @click="")
          v-list-tile-avatar
            img(:src="`https://randomuser.me/api/portraits/men/${item.picture}.jpg`" alt="")
          v-list-tile-title(v-text="item.text")
      //- v-list-tile.mt-3(@click="")
      //-   v-list-tile-action
      //-     v-icon(color="grey darken-1") add_circle_outline
      //-   v-list-tile-title.grey--text.text--darken-1 Browse Channels
      v-list-tile(@click="go('/my-profile/edit')")
        v-list-tile-action
          v-icon(color="grey darken-1") settings
        v-list-tile-title.grey--text.text--darken-1 ユーザー設定
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
      { icon: 'trending_up', text: '人気の物件', href: '/' },
      { icon: 'history', text: '最近借りた物件', href: '/' },
      { icon: 'editor', text: '物件を登録', href: '/spaces/new' },
    ],
    items2: [
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
