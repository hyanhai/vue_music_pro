<template>
  <div class="home_menu" v-if="$route.path=='/'">
    <div class="home_menu_sel">
      <div class="menu"><img src="../assets/img/menu@2x.png"/></div>
      <ul>
        <li>我的</li>
        <li class="bold">音乐馆</li>
        <li>发现</li>
      </ul>
      <div class="more"><img src="../assets/img/more@2x.png"></div>
    </div>
    <div class="home_menu_search">
      <span><i><img src="../assets/img/search@2x.png">搜索</i></span>
    </div>
  </div>
</template>
<script>
    export default {
        name: "home_menu"
    }
</script>
<style lang="scss" scoped="">
  @import "../assets/scss/public";
  .home_menu{
    z-index: 10;
    position: fixed;
    top: 0;
    width: 100%;
    height: 1.48rem;
    background: $basecolor;
    .home_menu_sel{
      height: 0.8rem;
      display: flex;
      flex-direction: row;
      padding: 0 0.2rem;
      align-items: center;
      .menu{
        flex: 0;
        img{
          width:0.3rem;
        }
      }
      ul{
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: center;
        li{
          font-size: 0.32rem;
          color: #fff;
          width: 1.2rem;
          &.bold{
            font-weight: bold;
          }
        }
      }
      .more{
        flex: 0;
        img{
          height:0.32rem;
        }
      }
    }
    .home_menu_search{
      height:0.58rem;
      margin: 0 0.12rem;
      background: rgba(0,0,0,0.2);
      border-radius: 0.04rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.28rem;
      i{
        font-style: normal;
        color:#fff;
      }
      img{
        height:0.22rem;
        margin-right: 0.1rem;
      }
    }
  }
</style>
