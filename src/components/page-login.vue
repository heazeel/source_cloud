<!--
 * @Description: 登录页模板
 * @Author: linjia
 * @Date: 2020-04-14 15:36:27
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-12-18 11:32:48
 -->
<template>
  <div class="page-login">
    <img class="antwork-logo" src="@/assets/logo_antwork.png" alt="antwork_logo">
    <div class="main-contain">
      <div class="left-part">
        <div class="title">
          <p>
            <slot name="title">
              登录
            </slot>
          </p>
          <hr>
        </div>
      </div>
      <div class="right-part">
        <div class="logo-part">
          <img src="@/assets/logo_source_cloud_login.png" alt="source_cloud_logo">
          <p>源云</p>
        </div>
        <div class="form-part">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageLogin',
};
</script>

<style lang="less" scoped>
@border-radius: 6px;
.page-login {
  position: relative;
  height: 100%;
  width: 100%;
  background: url('../assets/bg_login.jpg') no-repeat;
  background-size: cover;
  .antwork-logo {
    margin: 44px 62px;
    transition: .5s;
  }
  .main-contain {
    width: 998px;
    height: 560px;
    box-sizing: border-box;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background-color: white;
    border-radius: @border-radius;
    transition: .5s;
    p {
      font-size: 26px;
      font-weight: 600;
      line-height: 37px;
      letter-spacing: 3px;
      margin: 0;
    }
    .left-part {
      width: 420px;
      height: 100%;
      background: url('../assets//bg_login_window.jpg') no-repeat;
      float: left;
      color: white;
      border-radius: @border-radius 0 0 @border-radius;
      transition: .5s;
      div.title {
        overflow: hidden;
        margin: 64px 72px;
        hr {
          margin: 0;
          border: 0;
          width: 86px;
          height: 2px;
          background: white;
        }
      }
    }
    .right-part {
      float: left;
      width: calc(100% - 420px);
      height: 100%;
      box-sizing: border-box;
      position: relative;
      transition: .5s;
      .logo-part {
        color: #26415B;
        width: 90px;
        margin: 81px auto 30px;
        text-align: center;
        transition: .5s;
        img {
          margin-bottom: 14px;
        }
      }
    }
  }
  @media screen and (max-width: 1500px) {
    .antwork-logo {
      width: 100px;
      margin: 30px 40px;
    }
    .main-contain {
      width: 858px;
      height: 480px;
      .left-part {
        width: 360px;
        div.title {
          margin: 30px 40px;
        }

      }
      .right-part {
        width: calc(100% - 360px);
        .logo-part {
          margin: 46px auto 18px;
        }
      }
    }
  }
}
</style>
