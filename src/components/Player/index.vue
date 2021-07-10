<!-- 监控播放器 尝试失败 -->
<template>
    <video-player
      class="video-player vjs-custom-skin"
      ref="videoPlayer"
      :options="playerOptions"
      :playsinline="true"
      customEventName="customstatechangedeventname"
      @play="onPlayerPlay"
      @pause="onPlayerPause"
      @ended="onPlayerEnded"
      @ready="playerReadied"
      @statechanged="playerStateChanged"
      @playing="onPlayerPlaying"
      @waiting="onPlayerWaiting"
      @loadeddata="onPlayerLoadeddata"
      @timeupdate="onPlayerTimeupdate"
      @canplay="onPlayerCanplay"
      @canplaythrough="onPlayerCanplaythrough"
    >
    </video-player>
  
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import 'videojs-flash'
// import SWF_URL from 'videojs-swf/dist/video-js.swf'
import { videoPlayer } from 'vue-video-player'
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "player",
   components: {
    videoPlayer
  },
  data() {
    //这里存放数据
    return {
      // 视频播放
      video: "hellow video",
      playerOptions: {
        height: '260',
        language: 'en',
        playbackRates: [0.5, 1.0, 1.5, 2.0],
        sources: [{
          type: "rtmp/flv",
          src: "rtmp://49.234.96.251:1936/live/test"
        }],
        techOrder: ['flash'],
        autoplay: false,
        controls: true,
        poster: "../../assets/images/video2.jpg",
        notSupportedMessage: '不支持的视频格式'
      }
      }
  },
  //监听属性 类似于data概念
  computed: {
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 播放回调
    onPlayerPlay(player) {
      console.log(player)
    },
    // 暂停回调
    onPlayerPause(player) {
      console.log(player)
    },
    // 视频播放结束回调
    onPlayerEnded(player) {
      console.log(player)
    },
    // DOM元素上的readyState更改导致播放停止
    onPlayerWaiting(player) {
      console.log(player)
    },
    // 已开始播放回调
    onPlayerPlaying(player) {
      console.log(player)
    },
    // 当播放器在当前播放位置下载数据时触发
    onPlayerLoadeddata($event) {
      console.log($event)
    },
    // 当前播放位置发生变化时触发。
    onPlayerTimeupdate($event) {
      console.log($event)
    },
    //媒体的readyState为HAVE_FUTURE_DATA或更高
    onPlayerCanplay($event) {
      console.log($event)
    },
    //媒体的readyState为HAVE_ENOUGH_DATA或更高。这意味着可以在不缓冲的情况下播放整个媒体文件。
    onPlayerCanplaythrough($event) {
      console.log($event)
    },
    //播放状态改变回调
    playerStateChanged($event) {
      console.log($event)
    },
    //将侦听器绑定到组件的就绪状态。与事件监听器的不同之处在于，如果ready事件已经发生，它将立即触发该函数。。
    playerReadied($event) {
      console.log($event)
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
.video-player-custom {
  width: 100%;
  height: 180px;
  // vidoeUI重写
  /deep/ .video-js {
    width: 100%;
    height: 100%;
    padding: 0;
    overflow: hidden;
    // 播放器
    .vjs-tech{
    object-fit: cover;
    }
    // 播放按钮
    .vjs-big-play-button {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2em;
      height: 2em;
      margin-top: -1em;
      margin-left: -1em;
      font-size: 2em;
      line-height: 2em;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.45);
      outline: none;
    }
    // 封面
    .vjs-poster {
      width: 100%;
      height: 100%;
      background-size: cover;
    }
  }
}
</style>