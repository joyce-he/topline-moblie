<template>
  <div class="login">
    <!-- 页面顶部 -->
    <van-nav-bar title="登录" />
    <!-- 输入框 van-cell-group一行 -> van-field -->
    <van-cell-group>
      <van-field
        v-model="user.mobile"
        placeholder="请输入手机号"
        :error-message="errmsg.mobile"
      >
        <template slot="left-icon">
          <i class="iconfont icon-shouji"></i>
        </template>
      </van-field>
      <van-field
        v-model="user.code"
        placeholder="请输入验证码"
        :error-message="errmsg.code"
      >
        <template slot="left-icon">
          <i class="iconfont icon-icon--"></i>
        </template>
        <!-- 发送验证码按钮 -->
        <van-button type="primary" slot="button" size="small" round
          >发送验证码</van-button
        >
      </van-field>
    </van-cell-group>
    <van-cell-group>
      <div class="login-btn">
        <van-button slot="button" class="btn" type="info" size="large" @click="login">登录</van-button>
      </div>
    </van-cell-group>
  </div>
</template>

<script>
// 按需 导入 本地保存的方法
import { setUserLocal } from '@/utils/userlocal.js'
export default {
  data () {
    return {
      // 登录数据
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      // 错误的验证信息
      errmsg: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    login () {
      // 参数的验证
      if (!this.validData()) {
        return
      }
      this.$http({
        url: '/authorizations',
        method: 'post',
        data: this.user
      }).then(res => {
        // 保存到 localStorage 中
        // window.localStorage.setItem('user', JSON.stringify(res.data.data))
        setUserLocal(res)
        this.$router.push('/home')
      }).catch(err => {
        console.log(err)
        console.log('登录失败')
      })
    },
    // 验证user 中的参数是否 为空
    validData () {
      if (this.mobile.trim().length === 0) {
        this.errmsg.mobile = '手机号不能为空'
        return false
      }
      if (this.code.trim().length !== 11) {
        this.errmsg.code = '手机号必须是11位'
        return false
      }
      // 将错误信息 重置为空
      this.errmsg.mobile = ''
      if (this.user.code.trim().length === 0) {
        this.errmsg.code = '验证码不能为空'
        return false
      }
      this.errmsg.code = ''
      // 以上都不符合条件的话 返回true
      return true
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar.van-hairline--bottom {
  background: #3296fa;
  .van-nav-bar__title.van-ellipsis {
    color: #fff;
  }
}
.icon-shouji {
  font-size: 18px;
}
.icon-icon-- {
  font-size: 25px;
}
.login-btn {
  margin: 15px;
  .btn {
    border-radius: 5px;
  }
}
</style>
