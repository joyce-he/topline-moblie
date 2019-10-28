<template>
 <div>
      <!-- 频道管理组件 弹出层  封装成一个组件-->
      <!-- :value='value' -->
      <van-popup
        v-model="value"
        @input="$emit('index',true)"
        position="bottom"
        :style="{ height: '80%' }">
      <div>
      <!-- 标题 : cell表格-->
        <van-cell title="我的频道">
          <template slot="default">
             <van-button v-if="iconshow===false" @click="iconshow=true" class="fonts" plain type="warning" size="small" round>编辑</van-button>
             <van-button v-if="iconshow===true" @click="iconshow=false" class="fonts" plain type="warning" size="small" round>完成</van-button>
            <!-- <button v-if="iconshow===false" class="editBtn" @click="iconshow===true" >编辑</button> -->
            <!-- <button v-if="iconshow===true" class="editBtn" @click="iconshow===false" >完成</button> -->
          </template>
        </van-cell>
        <!-- 频道内容 :宫格-->
        <van-grid>
          <van-grid-item class="channelItem" v-for="(item,index) in channelList" :key="index" text="文字">
                <template slot="text">
              <div class="channeltext">{{item.name}}</div>
              <van-icon v-show="iconshow" class="channelIcon" name="clear" />
            </template>
            </van-grid-item>
        </van-grid>
        <van-cell title="频道推荐">
          <!-- <template slot="default">
            <button class="editBtn" @click="iconShow=true">编辑</button>
          </template> -->
        </van-cell>
        <!-- 推荐内容 :宫格-->
        <van-grid>
          <van-grid-item class="channelItem" v-for="(item,index) in 8" :key="index" >
            <template slot="text">
             <div class="channeltext">文字</div>
              <!-- <van-icon v-show="iconshow" class="channelIcon" name="clear" /> -->
            </template>
            </van-grid-item>

        </van-grid>
      </div>
      </van-popup>
</div>
</template>

<script>
export default {
  // 父组件 通过v-model 传过来的 值在这边是value
  // props 是有s 的
  props: ['value', 'channelList'],
  data () {
    return {
      iconshow: false
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.editBtn {
border-radius: 15px;
background-color: #fff;
color: red;
border:0.5px solid red;
width: 40%;
line-height: 27px;
}
.channelItem {
  position: relative;
  .channeltext {
    color: #999;
    font-size: 14px;
  }
  .channelIcon {
    position: absolute;
    top: 0;
    right: 0;
    color: #ccc;
  }
}
.fonts {
    font-size: 16px;
}
</style>
