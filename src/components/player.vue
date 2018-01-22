<template>
  <div class="palyer">
    <div class="back" @click="goback"><img src="../assets/img/back.png"></div>
    <div class="palyer_header">
      <span><a></a><h2>{{this.playerboximg[0].name}}</h2><a></a></span>
      <span><p>{{this.playerboximg[0].ar[0].name}}</p></span>
    </div>
    <!--播放图片-->
    <div class="palyerfm" :class="{img_sco:isco}">
      <img :src="this.playerboximg[0].al.picUrl">
    </div>
    <!--播放图片-->

    <!--歌词-->
    <div class="playerlyc">
      <ul :style="" ref="abc" id="show_gc" :style="classtop">
        <li v-for="(playerlyrcs,index) in playerlyrc">{{playerlyrcs}}</li>
      </ul>
    </div>
    <!--歌词-->

    <!--时间进度条-->
    <div class="player_progress">
      <span class="player_now">{{start_time}}</span>
      <div class="player_progress_box"><span id="progress"></span></div>
      <span class="player_time">{{player_time}}</span>
    </div>
    <!--时间进度条-->

    <!--播放控制-->
    <div class="play_setting">
      <div class="last_song"><img src="../assets/img/shangyishou.png"></div>
      <div :class="{paly_control:istrue,play:isplay}" @click="toggleimg"></div>
      <div class="next_song"><img src="../assets/img/xiays.png"></div>
    </div>
    <!--播放控制-->

    <div class="playerbg"><img :src="this.playerboximg[0].al.picUrl"></div>
    <audio id="player" @timeupdate="show()" controls="controls" height="100" width="100" style="display: none">
      <source :src="this.playerbox[0].url" type="audio/mp3" duration/>
      <embed height="100" width="100" :src="this.playerbox[0].url" />
    </audio>
  </div>
</template>
<script>
    var i = 0;
    export default {
        name: "",
        data(){
          return{
            playerid:this.playerid,
            playerbox:[],
            playerboximg:[],
            playerlyrc:[],
            playertime:[],
            classtop:'',
            istrue:true,
            isplay:true,
            isplaying:false,
            isco:false,
            start_time:'00:00',
            end_time:''
          }
        },
        created(){
        },
        mounted(){
          this.$nextTick(function () {
          });
          this.playerid = this.$route.params.id;
          this.$http.get("https://api.imjad.cn/cloudmusic/?type=song&id="+this.playerid+"&br=128000").then(response=>{
            this.playerbox.push(response.body.data[0]);
          })
          this.$http.get("https://api.imjad.cn/cloudmusic/?type=detail&id="+this.playerid+"&br=128000").then(response=>{
            this.playerboximg.push(response.body.songs[0]);
          })
          this.$http.get("https://api.imjad.cn/cloudmusic/?type=lyric&id="+this.playerid+"&br=128000").then(response=>{
            //取出歌词
            var arr=response.body.lrc.lyric.match(/(\[\d{2}:\d{2}\.\d{2}\])(.[^\[\]]*)?/g);
            for(var i=0;i<arr.length;i++){
              /^(\[\d{2}:\d{2}\.\d{2}\])(.[^\[\]]*)?$/.exec(arr[i]);
              var time = RegExp.$1;
              var lyc = RegExp.$2;
              var min = Number(String(time.match(/\[\d*/i)).slice(1));
              var sec = Number(String(time.match(/\:\d*/i)).slice(1));
              var times = min * 60 + sec;
              this.playertime.push(times);
              this.playerlyrc.push(lyc);
            }
            this.player_time = time.slice(1,6);

          })
          console.log("hellow");
          this.show();
        },
      methods:{
        show:function () {
          let player=document.querySelector('#player');
          let showgc=document.querySelector('#show_gc');
          let progress=document.querySelector('#progress');
          let ptimes = player.currentTime;
          let btimes = player.duration;
          if(ptimes>=this.playertime[i]){
            this.classtop = "top:"+-i*0.4+"rem";
             i++;
          }

          let ps = (parseInt(parseInt(ptimes)/60)<10)?'0'+parseInt(parseInt(ptimes)/60):parseInt(parseInt(ptimes)/60);
          let pm = (parseInt(ptimes)%60<10)?'0'+parseInt(ptimes)%60:parseInt(ptimes)%60;

          this.start_time = ps+':'+pm;
          progress.style = "width:"+100/btimes*ptimes+"%";
        },
        goback:function () {
          this.$router.go(-1);
        },
        toggleimg:function () {
          let player=document.querySelector('#player');
          this.isplay = !this.isplay;
          this.isco = !this.isplay;
          if(this.isplaying==false){
            player.play();
            this.isplaying = true;
          }else {
            player.pause();
            this.isplaying = false;
          }
        },
        autoplay:function () {
          var audio = document.getElementById('audio');
          audio.play();
        }
      },
      watch: {
          '$route': function () {
            //2. $route发生变化时再次赋值listId
            this.listId = this.$route.params.id;
          }
        }
    }
</script>
<style lang="scss" scoped="">
  @import "../assets/scss/public";
  .palyer{
    width: 100%;
    height:100%;
    background: black;
    overflow: hidden;
    position: relative;
    .back{
      position: absolute;
      left:0.3rem;
      top: 0.3rem;
      z-index: 10;
      img{
        width: 0.4rem;
        height:0.4rem;
      }
    }
    .palyer_header{
      display: flex;
      flex-direction: column;
      overflow: hidden;
      margin-top: 0.2rem;
      span{
        display: flex;
        height: 0.6rem;
        line-height: 0.6rem;
        p{
          margin: 0 auto;
          position: relative;
          display:block;
          font-size:0.26rem;
          color: #fff;
          &:before{
            content: "";
            position: absolute;
            left:1rem;
            width: 0.6rem;
            height: 0.02rem;
            background: rgba(255,255,255,0.5);
            top:0.3rem;
          }
          &:after{
            content: "";
            position: absolute;
            right:1rem;
            width: 0.6rem;
            height: 0.02rem;
            background: rgba(255,255,255,0.5);
            top:0.3rem;
          }
        }
        a{
          flex: 0;
        }
        h2{
          flex: 1;
          text-align: center;
          font-size: 0.34rem;
          color: #fff;
        }
      }
    }
    .playerlyc{
      position: relative;
      height: 0.4rem;
      overflow: hidden;
      ul{
        position: absolute;
        left:50%;
        transform: translateX(-50%);
        li{
          font-size:0.26rem;
          color: rgba(255,255,255,0.3);
          line-height: 0.4rem;
          text-align: center;
        }
      }
    }
    .player_progress{
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 0 0.3rem;
      .player_now,.player_time{
        font-size: 0.24rem;
        color: rgba(255,255,255,0.6);
      }
      .player_progress_box{
        width: 76%;
        height:0.04rem;
        background: rgba(255,255,255,0.2);
        border-radius: 0.4rem;
        margin: 0.4rem auto;
        position: relative;
        span{
          position: absolute;
          left:0;
          background: $basecolor;
          height:0.04rem;
          border-radius: 0.04rem;
          transition: all .5s;
        }
      }
    }
    .play_setting{
      display: flex;
      flex-direction: row;
      align-items: center;
      position: relative;
      z-index: 10;
      justify-content: center;
      .last_song,.next_song{
        img{
          height: 0.77rem;
        }
      }
      .paly_control{
        width: 1.16rem;
        height: 1.16rem;
        background-repeat: no-repeat;
        background-size: cover;
        background-image: url("../assets/img/zanting.png");
        transition: all .5s;
        margin: 0 0.7rem;
        &.play{
          background-image: url("../assets/img/bofang.png");
        }
      }
    }
    .playerbg{
      width: 100%;
      height:100%;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      position: absolute;
      top:0;
      left:0;
      img{
        filter: blur(20px);
        opacity: 0.2;
      }
    }
    .palyerfm{
      margin: 1rem auto 0.4rem auto;
      width: 6.0rem;
      height: 6.0rem;
      border-radius: 6.0rem;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      border:0.2rem solid rgba(255,255,255,0.2);
      overflow: hidden;
      &.img_sco{
        animation: rodat 20s linear infinite;
      }
      img{
        width: 100%;
      }
    }
  }

  @keyframes rodat {
    0%{transform:rotate(0deg)}
    100%{transform:rotate(360deg)  }
  }
</style>
