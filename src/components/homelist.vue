<template>
  <div class="homelist">
    <div class="banner swiper-container">
      <ul class="swiper-wrapper">
        <li v-for="banner_img in banner_imgs" class="swiper-slide"><a><img :src="banner_img"></a></li>
      </ul>
      <div class="swiper-pagination"></div>
    </div>
    <div class="gq_fl">
      <ul>
        <li><img src="../assets/img/people.png"><p>歌手</p></li>
        <li><img src="../assets/img/paihang.png"><p>排行</p></li>
        <li><img src="../assets/img/diantai.png"><p>电台</p></li>
        <li><img src="../assets/img/fenlei.png"><p>分类歌单</p></li>
        <li><img src="../assets/img/shipin.png"><p>视频MV</p></li>
        <li><img src="../assets/img/zhuanji.png"><p>数字专辑</p></li>
      </ul>
    </div>
    <div class="gedantuijian">
      <span><h2>歌单推荐</h2><a><img src="../assets/img/moreb@2x.png"></a></span>
      <ul>
        <li v-for="(msrc,index) in msrcs" v-if="index<=6" :style="index==2?'margin:0':''" @click="goPlayer(msrc.songs[0].id)"><span><img :src="msrc.songs[0].al.picUrl"></span><p><em>{{msrc.songs[0].name}}</em><i></i></p></li>
      </ul>
    </div>
    <div class="meirituijian">
      <span><h2>每日为你推荐.30首</h2><a><img src="../assets/img/moreb@2x.png"></a></span>
      <ul>
        <li v-for="(dmsrc,index) in dmsrcs" v-if="index<4" @click="goPlayer(dmsrc.songs[0].id)"><span><img :src="dmsrc.songs[0].al.picUrl"></span><span><h2>{{dmsrc.songs[0].name}}</h2><em>{{dmsrc.songs[0].ar[0].name}}</em></span><span><img src="../assets/img/more2@2x.png"></span></li>
      </ul>
    </div>
    <div class="xingesudi">
      <span><h2>新歌速递</h2><a><img src="../assets/img/moreb@2x.png"></a></span>
      <div class="ulscol">
        <ul :style="getliwidth">
          <li v-for="(nmsrc,index) in nmsrcs" @click="goPlayer(nmsrc.songs[0].id)">
            <span><img :src="nmsrc.songs[0].al.picUrl"></span>
            <p>{{nmsrc.songs[0].name}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="mvtuijian">
      <span><h2>MV推荐</h2><a><img src="../assets/img/moreb@2x.png"></a></span>
      <ul>
        <li v-for="mvsrc in mvsrcs" @click="gomv(mvsrc.data.id)">
          <span><img :src="mvsrc.data.cover"></span>
          <p>{{mvsrc.data.name}}</p>
          <em>{{mvsrc.data.artistName}}</em>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import Swiper from "swiper"
  import "../../static/swiper-3.4.2.min.css"
    export default {
        name: "homelist",
        props:[],
        data(){
          return{
            id:[516228031,5365883,525278369,493041258 ,28391019,509518010],
            did:[189396,5242760,346576,279111,300339,79638,353653,5267292,507996849,431791474,29457190],
            nid:[501133611,494642831,516823036,482827935,471411141],
            mid:[5477179,467401,5491028,5291029],
            msrcs:[],
            dmsrcs:[],
            nmsrcs:[],
            mvsrcs:[],
            isthree:false,
            banner_imgs:["https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/226493.jpg","https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/227054.jpg","https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/226901.jpg","https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/226879.jpg","https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/225683.jpg","https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/226363.jpg","https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/226503.jpg"]
          }
        },
        created(){
          for(var i in this.id){
            this.$http.get("https://api.imjad.cn/cloudmusic/?type=detail&id="+this.id[i]+"&br=128000").then(response=>{
//              console.log(response.body.songs[0]);
              this.msrcs.push(response.body);
            });
          }
          for(var i in this.did){
            this.$http.get("https://api.imjad.cn/cloudmusic/?type=detail&id="+this.did[i]+"&br=128000").then(response=>{
//              console.log(response.body.songs[0]);
              this.dmsrcs.push(response.body);
            });
          }
          for(var i in this.nid){
            this.$http.get("https://api.imjad.cn/cloudmusic/?type=detail&id="+this.nid[i]+"&br=128000").then(response=>{
//              console.log(response.body.songs[0]);
              this.nmsrcs.push(response.body);
            });
          }
          for(var i in this.mid) {
            this.$http.get("https://api.imjad.cn/cloudmusic/?type=mv&id="+this.mid[i]+"&br=128000").then(response => {
              this.mvsrcs.push(response.body);
            })
          }
        },
      methods:{
        goPlayer:function(id) {
          this.$router.push({ name: 'player', params: { id: id }});
        },
        gomv:function(id) {
          this.$router.push({ name: 'mv', params: { id: id }});
        }

      },
      mounted(){
        var swiper = new Swiper('.swiper-container', {
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets'
          },
          paginationClickable: true,
          loop: true,
          speed: 600,
          autoplay: true,
          onTouchEnd: function() {
            swiper.startAutoplay()
          }
        })
      },
      computed:{
        getliwidth(){
          return 'width:'+this.nmsrcs.length*2.5+'rem';
        }
      }
    }
</script>
<style scoped="" lang="scss">
  @import "../assets/scss/public";
  .homelist{
    margin-top: 1.48rem;
    display: flex;
    flex-direction: column;
    .banner{
      width: 100%;
      ul{
        li{
          img{
            width: 100%;
          }
        }
      }
    }
    .gq_fl{
      ul{
        display: block;
        clear: both;
        margin: 0.3rem 0;
        li{
          float: left;
          width: calc(100%/3);
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-bottom: 0.5rem;
          img{
            height: 0.54rem;
            width: 0.54rem;
            flex: 0;
            margin-left: 0.3rem;
          }
          p{
            flex: 1;
            text-align: left;
            margin-left: 0.2rem;
            font-size: 0.26rem;
          }
        }
      }
    }
    .gedantuijian{
      display: flex;
      flex-direction: column;
      span{
        height: 0.8rem;
        line-height: 0.8rem;
        position: relative;
        h2{
          font-size: 0.34rem;
          display: block;
          width: 100%;
        }
        a{
          position: absolute;
          right: 0.3rem;
          top:0;
          line-height: 0.8rem;
          height:0.8rem;
          img{
            height:0.34rem;
            vertical-align: middle;
          }
        }
      }
      ul{
        display: block;
        li{
          float: left;
          width: calc((100% - 0.1rem)/3);
          overflow: hidden;
          &:nth-child(2n+3),&:nth-child(2){
            margin: 0 0.05rem;
          }
          span{
            display: flex;
            overflow: hidden;
            width:calc(100vw/3);
            height:calc(100vw/3);
            align-items: center;
            justify-content: center;
            &:hover{
              img{
                width: 110%;
              }
            }
            img{
              transition: all 0.5s;
              width: 100%;
            }
          }
          p{
            display: block;
            height:0.6rem;
            text-align: left;
            margin-left: 0.1rem;
            em{
              font-style: normal;
              font-size: 0.28rem;
              margin-top: 0.1rem;
              display: block;
            }
            i{

            }
          }
        }
      }
    }
    .meirituijian{
      margin-top: 0.4rem;
      display: flex;
      flex-direction: column;
      span{
        height: 0.8rem;
        line-height: 0.8rem;
        position: relative;
        h2{
          font-size: 0.34rem;
          display: block;
          width: 100%;
        }
        a{
          position: absolute;
          right: 0.3rem;
          top:0;
          line-height: 0.8rem;
          height:0.8rem;
          img{
            height:0.34rem;
            vertical-align: middle;
          }
        }
      }
      ul{
        overflow: hidden;
        li{
          height:1.2rem;
          margin-bottom: 0.05rem;
          span{
            float: left;
            height:1.2rem;
            &:first-child{
              flex: 0;
              width: 1.2rem;
              overflow: hidden;
              img{
                height: 1.2rem;
              }
            }
            &:nth-child(2){
              margin-left: 0.2rem;
              line-height: inherit;
              display: flex;
              flex-direction: column;
              justify-content: center;
              h2{
                font-size: 0.30rem;
              }
              em{
                text-align: left;
                font-style: normal;
                width: 100%;
                display: block;
                color: $basecolor1;
                margin-top: 0.1rem;
                font-size: 0.24rem;
              }

            }
            &:last-child{
              float: right;
              display: flex;
              align-items: center;
              margin-right: 0.4rem;
                img{
                  width: 0.4rem;
                }
            }
          }
        }
      }
    }
    .xingesudi{
      margin-top: 0.4rem;
      display: flex;
      flex-direction: column;
      span{
        height: 0.8rem;
        line-height: 0.8rem;
        position: relative;
        h2{
          font-size: 0.34rem;
          display: block;
          width: 100%;
        }
        a{
          position: absolute;
          right: 0.3rem;
          top:0;
          line-height: 0.8rem;
          height:0.8rem;
          img{
            height:0.34rem;
            vertical-align: middle;
          }
        }
      }
      .ulscol{
        overflow-x: scroll;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        &::-webkit-scrollbar{
          display: none;
        }
        ul{
          display: block;
          li{
            width: calc(100vw/3);
            float: left;
            span{
              display: block;
              height: calc(100vw/3);
              img{
                height: 100%;
              }
            }
            p{
              display: block;
              text-align: left;
              height: 0.4rem;
              line-height: 0.4rem;
              padding-left: 0.2rem;
              font-size: 0.24rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
    }
    .mvtuijian{
      margin-top: 0.4rem;
      display: flex;
      flex-direction: column;
      span{
        height: 0.8rem;
        line-height: 0.8rem;
        position: relative;
        h2{
          font-size: 0.34rem;
          display: block;
          width: 100%;
        }
        a{
          position: absolute;
          right: 0.3rem;
          top:0;
          line-height: 0.8rem;
          height:0.8rem;
          img{
            height:0.34rem;
            vertical-align: middle;
          }
        }
      }
      ul{
        li{
          width: calc((100vw - 0.1rem)/2);
          float: left;
          margin-bottom: 0.4rem;
          &:nth-child(2n+1){
            margin-right: 0.05rem;
          }
          &:nth-child(2n){
            margin-left: 0.05rem;
          }
          span{
            display: flex;
            width: calc((100vw - 0.1rem)/2);
            height: calc((100vw - 0.1rem)/2);
            overflow: hidden;
            align-items: center;
            justify-content: center;
            img{
              height: 100%;
            }
          }
          p{
            display: block;
            font-size: 0.24rem;
            text-align: left;
            margin-left: 0.1rem;
            height:0.4rem;
            line-height: 0.4rem;
          }
          em{
            display: block;
            text-align: left;
            margin-left: 0.1rem;
            font-style: normal;
            font-size: 0.2rem;
            color: $basecolor1;
          }
        }
      }
    }
  }
</style>
