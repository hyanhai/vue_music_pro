<template>
  <div class="palyer_mv">
    <video :src="mvboxs" :poster ="mvposter" controls></video>
  </div>
</template>
<script>
    var i = 0;
    export default {
        name: "",
        data(){
          return{
            mvid:this.mvid,
            mvboxs:[],
            mvposter:[]
          }
        },
        created(){
        },
        mounted(){
          this.mvid = this.$route.params.id;
          this.$http.get("https://api.imjad.cn/cloudmusic/?type=mv&id="+this.mvid+"&br=128000").then(response=>{
            this.mvboxs = response.body.data.brs[480];
            this.mvposter = response.body.data.cover;
          })

          axios.get("https://api.imjad.cn/cloudmusic/?type=mv&id="+this.mvid+"&br=128000").then(response=>{
            console.log(response.body);
          })

//          this.$http.get("/api/mv?mvid="+this.mvid).then(res=>{
//            console.log(res.body);
//            this.mvboxs = res.body.data.brs[480];
//            this.mvposter = res.body.data.cover;
//          })
        },
      watch: {
          '$route': function () {
            //2. $route发生变化时再次赋值listId
            this.mvid = this.$route.params.id;
          }
        }
    }
</script>
<style lang="scss" scoped="">
  @import "../assets/scss/public";
  .palyer_mv{
    width: 100%;
    video{
      width: 100%;
      .IIV::-webkit-media-controls-play-button,.IIV::-webkit-media-controls-start-playback-button {
        opacity: 0;
        pointer-events: none;
        width: 5px;
      }
    }
  }
</style>
