<template lang="pug">
v-container(fill-height grid-list-lg)
  v-layout(row wrap)
    v-flex(xs12 sm6 md4 v-for="item in items" key="index")
      v-card
        v-card-media(src="https://source.unsplash.com/featured/?house" height="200px" cover)
        v-card-title(:primary-title="item.title")
          //- v-list
          //-   v-list-tile
          //-     v-list-tile-avatar(size="36")
          //-       img(src="https://randomuser.me/api/portraits/men/88.jpg" alt="")
          //-     v-list-tile-title(v-text="'テキスト 太郎'")
          div
            v-avatar(size="36").mr-2
              img(src="https://randomuser.me/api/portraits/men/88.jpg" alt="")
            span(v-text="'テキスト 太郎'")
          div.mt-3
            h3.headline.mb-0 {{item.title}}
            //- div {{item.description}}
        //- v-card-body
        v-card-actions
          v-btn(flat="" color="green") 借りる
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: {}
})
export default class Index extends Vue {
  items

  created() {
    this.items = [
      {title: '鎌倉の古民家、駅徒歩15分でまるまる一軒家で過ごせます', description: '趣味で警官をしている人がサプライズで訪問してくれる特典つき！みんなも鎌倉の古民家で開発合宿しませんか？？ ミニストップまで徒歩１２分！ 包丁の切れ味はちょっと悪いけど最高のロケーションですよ。 物置に何か隠してあるけど見つかると事件になるので、絶対に見ないで下さい。wi-foも完備だよ！'},
      {title: '鎌倉の古民家、駅徒歩15分でまるまる一軒家で過ごせます', description: '趣味で警官をしている人がサプライズで訪問してくれる特典つき！みんなも鎌倉の古民家で開発合宿しませんか？？ ミニストップまで徒歩１２分！ 包丁の切れ味はちょっと悪いけど最高のロケーションですよ。 物置に何か隠してあるけど見つかると事件になるので、絶対に見ないで下さい。wi-foも完備だよ！'},
      {title: '鎌倉の古民家、駅徒歩15分でまるまる一軒家で過ごせます', description: '趣味で警官をしている人がサプライズで訪問してくれる特典つき！みんなも鎌倉の古民家で開発合宿しませんか？？ ミニストップまで徒歩１２分！ 包丁の切れ味はちょっと悪いけど最高のロケーションですよ。 物置に何か隠してあるけど見つかると事件になるので、絶対に見ないで下さい。wi-foも完備だよ！'},
      {title: '鎌倉の古民家、駅徒歩15分でまるまる一軒家で過ごせます', description: '趣味で警官をしている人がサプライズで訪問してくれる特典つき！みんなも鎌倉の古民家で開発合宿しませんか？？ ミニストップまで徒歩１２分！ 包丁の切れ味はちょっと悪いけど最高のロケーションですよ。 物置に何か隠してあるけど見つかると事件になるので、絶対に見ないで下さい。wi-foも完備だよ！'},
    ]
  }
}
</script>

<style scoped lang="sass">
</style>
