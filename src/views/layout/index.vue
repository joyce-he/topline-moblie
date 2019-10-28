<template>
  <div>
    <router-view />
    <van-tabbar>
      <van-tabbar-item router-to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item router-to="" icon="chat-o">评论</van-tabbar-item>
      <van-tabbar-item router-to="" icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item router-to="" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
// .van-nav-bar.van-hairline--bottom {
//   background: #3296fa;
//   .van-nav-bar__title.van-ellipsis {
//     color: #fff;
//   }
//  }
// .mytop {
//   position: fixed;
//   z-index: 10000;
//   width: 100%;
// }
</style>
