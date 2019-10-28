<template>
  <div class="home">
    <!-- navBar -->
    <van-nav-bar title="首页" fixed />
    <!-- tab栏 -->
    <div class="mytabs">
      <van-tabs v-model="activeTab">
        <!-- {{activeTab}} -->
        <van-tab v-for="(item,index) in channelList" :key="index" :title="item.name">
          <!-- 下拉加载更多 PullRefresh -->
          <!-- 因为 拖拽有效的区域是在 标签之间，所以list 要写在 Pull 标签内 -->
          <van-pull-refresh v-model="item.pull" @refresh="onRefresh">
            <!-- <p>刷新次数: {{ count }}</p> -->
            <!-- list列表: 上拉加载更多 -->
            <van-list
              v-model="item.up"
              :finished="item.finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <van-cell class=mycell v-for="(subitem,subindex) in item.articleList" :key="subindex" title-class="mytitle" :title="subitem.title">
                <template slot="label">
                  <!-- 图片：宫格 -->
              <van-grid :border="false" :column-num="3" >
                <van-grid-item v-for ="(imgitem,imgindex) in subitem.cover.images" :key="imgindex">
                  <!-- 图片的懒加载 -->
                  <van-image lazy-load :src="imgitem" />
                  </van-grid-item>
                </van-grid>
                <!-- 评论，作者，评论数 -->
                  <van-cell title="作者">
                    <template slot="title" >
                      <div class="myitem">
                      <span>{{subitem.aut_name}}</span>
                      <span>{{subitem.comm_count}}评论</span>
                      <span>{{subitem.pubdate}}</span>
                      </div>
                    </template>
                    <template slot="default">
                      <van-icon name="cross" />
                    </template>
                  </van-cell>
                </template>
              </van-cell>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
      <!-- 添加一个小图标 -->
      <div class="my-icon">
        <van-icon @click="openPop" name="wap-nav" />
      </div>
    </div>
     <!-- 频道管理组件 弹出层  封装成一个组件-->
    <channelpop :channelList="channelList" v-model="show" />
  </div>
</template>

<script>
// 导入获取频道的方法
import { apiGetChannelList } from '@/api/getChannelList'
import { getAticle } from '@/api/aticle'
// 导入 面板插件
import channelpop from '@/components/channelPop'

export default {
  data () {
    return {
      // 获取到的频道列表数据,每个频道里面都有对应的文章内容
      channelList: [],
      loading: false,
      finished: false,
      // pullrefresh
      isLoading: false,
      // 保存文章 数据
      // articleList: [],
      // 被选中tap 的下标 默认0
      activeTab: 0,
      // 是否包含 置顶 0是不包含
      with_top: 0,
      // 控制面板的显示与隐藏
      show: false
    }
  },
  methods: {
    // 获取文章数据
    // 页面一打开的时候 和下拉触底的时候 list默认被加载出来
    async onLoad () {
      // 被点击的 频道对象 当前被点击的item
      let channel = this.channelList[this.activeTab]
      let channelId = channel.id
      // console.log(channel)
      let timestamp
      console.log(timestamp)
      // 判断：是否是第一次请求
      if (channel.timestamp === 0) {
        timestamp = Date.now()
      } else {
        timestamp = channel.timestamp
      }
      // 页面一打开的时候获取 文章数据
      try {
        let res = await getAticle(this.$http2, {
          url: '/articles',
          method: 'get',
          params: {
            channel_id: channelId,
            timestamp: timestamp,
            with_top: 0
          }
        })
        console.log('根据频道 对应的 文章数据----------------------')
        console.log(res)
        // 保存到channel中
        channel.articleList = [...channel.articleList, ...res.results]
        channel.timestamp = res.pre_timestamp

        // 判断数据返回是否为空  会默认触底 加载, 所以pre_timestamp 就会为null  会一直显示加载动画
        if (res.pre_timestamp === null) {
        // 说明数据已经加载完成
          channel.finished = true
        }

        // 底部会一直有 圈圈加载动画
        // 要再次加载 要把v-model的true 手动改为false才能再次 触发onLoad方法
        // 加载中，loading为true，表示正在发送异步请求，此时不会触发load事件
        // 第一页 加载完了，所以要手动设置为 false
        channel.up = false
      } catch {
        this.$toast.fail('获取数据失败')
      }
    },
    // 下拉刷新
    onRefresh () {
      // 得到当前频道
      let channel = this.channelList[this.activeTab]
      channel.articleList = []
      channel.pull = false
      // 手动获取数据
      // 将实际戳设置为0
      channel.timestamp = 0
      this.onLoad()
      channel.up = false
      this.$toast('刷新成功')
    },
    // 得到所有 频道 的数据
    async getChannelList () {
      try {
        // 获取用户数据
        let user = this.$store.state.user
        // 没有登录
        if (!user) {
          let channeles = JSON.parse(window.loaclStorage.getItem('channeles'))
          if (channeles) {
            this.channelList = channeles
          } else {
            // 从服务器 获取   暂时还没有得到验证
            let res = await apiGetChannelList(this.$http, {
              url: 'user/channels',
              method: 'get'
            })
            console.log(res)
            // 将返回的数据 渲染 到页面上
            this.channelList = res.channels
          }
        } else {
          // 已经登录 从服务器获取
          let res = await apiGetChannelList(this.$http, {
            url: 'user/channels',
            method: 'get'
          })
          console.log('登录后 获取到 所有的频道数据-----------------')
          console.log(res)
          // 将返回的数据 渲染 到页面上
          this.channelList = res.channels
        }
        // 给 频道数据 添加 属性
        this.addProtoChannelList()
      } catch {
        // catch 不是。 出来的
        this.$toast('请求失败')
      }
    },
    // 给频道数据 添加属性
    addProtoChannelList () {
      this.channelList.forEach(item => {
        this.$set(item, 'pull', false)
        this.$set(item, 'finished', false)
        this.$set(item, 'up', false)
        this.$set(item, 'articleList', [])
        this.$set(item, 'timestamp', 0)
      })
    },

    // 打开面板
    openPop () {
      this.show = true
    }
  },
  // 打开页面就加载频道数据created 能做的mounted 也能做
  created () {
    this.getChannelList()
  },
  components: {
    // 导入之后, 这里是把channelpop当成组件
    channelpop
  }
}
</script>

<style lang='less' scoped>
.van-nav-bar.van-hairline--bottom {
    background: #3296fa;
    .van-nav-bar__title.van-ellipsis {
        color: #fff;
        // 首页字体是白色
    }
}
.mytabs {
  // margin-top: 46px;
  position: relative;
  // margin-bottom: 46px;
  .my-icon {
    position: fixed;
    top: 46px;
    right: 0;
    width: 10%;
    line-height: 44px;
    text-align: center;
    font-size: 26px;
    z-index: 1000;
  }
}
.home /deep/ .van-tabs__wrap {
  width: 90% !important;
  position: fixed;
  // 设置1000 会挡住面板的遮罩层
  z-index: 100;
  top: 46px;
  left: 0;
}
.home {
  margin-top: 92px;
  // 因为home 组件有内部的样式 所以外部的 home影响不了内部的样式
  //使用深度选择器的 也相当于是设置了组件内部的样式 所以外部样式影响不了
  // 最后就剩list组件被影响了 (或者找到list的类名直接设置margin-top也可以实现)
}
.mytitle {
  font-size: 16px;
  font-weight: 700
}
.myitem {
 font-size:14px;
    font-weight: 400 !important;
 span {
    margin: 0 10px
    }
}
</style>
