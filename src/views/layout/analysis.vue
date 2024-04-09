<template>
  <div class="analysis-box">
    <div class="alert">提示信息</div>
    <!-- 健康信息 -->
    <div class="healthy-info">
      <h2 style="color: rgb(185,118,63);">健康信息</h2>
      <div class="info">
        <img src="@/assets/avatar.jpg" alt="">
        <div v-if="isLogin">
          <div class="my-info">
            <span>姓名：佚名</span>
            <span>年龄：30</span>
          </div>
          <div class="idenfiy">
            <span>患者</span>
          </div>
        </div>
        <span v-else @click="$router.push('/login')">去登录</span>
      </div>
      <ul>
        <li>
          <h4>肌肉活动</h4>
          <p>无力</p>
        </li>
        <li>
          <h4>关节活动</h4>
          <p>迟缓</p>
        </li>
        <li>
          <h4>呼吸状况</h4>
          <p>正常</p>
        </li>
        <li>
          <h4>皮肤健康</h4>
          <p>正常</p>
        </li>
      </ul>
    </div>
    <!-- 步态分析 -->
    <div class="upload-box">
      <input type="file" id="upload" class="upload" accept="video/*" @change="handleUpload">
      <label v-show="!filePreview" for="upload" class="upload-label">点击上传视频</label>
      <video v-show="filePreview" controls class="preview-image">
        <source :src="filePreview" type="video/mp4">
      </video>
      <div v-show="isMask" class="mask">
        <div class="line"></div>
      </div>
      <div v-if="isAfter" class="after-img">
        <img src="@/assets/body.jpg" alt="" @click="hanldeImgClick">
        <div class="after-line1">
          <span class="line-item"></span>
          <span>手腕无力</span>
        </div>
        <div class="after-line2">
          <span>脚踝虚弱</span>
          <span class="line-item"></span>
        </div>
      </div>
    </div>
    <EscortAdvice></EscortAdvice>
  </div>
</template>

<script>
import { gsap } from 'gsap'
import EscortAdvice from '@/components/EscortAdvice.vue'
import myAlert from '@/utils/alert.js'
export default {
  name: 'AnalysisPage',
  components: {
    EscortAdvice
  },
  data () {
    return {
      filePreview: '',
      isMask: false,
      isAfter: false
    }
  },
  computed: {
    isLogin () {
      return this.$store.getters.token
    }
  },
  methods: {
    handleUpload (event) {
      const file = event.target.files[0]
      // 处理上传逻辑
      // console.log(file)

      // 回显上传内容
      const reader = new FileReader()
      reader.onload = () => {
        this.filePreview = reader.result
        if (this.filePreview) {
          this.isMask = true
          myAlert(true, '上传成功')
        }
      }
      reader.readAsDataURL(file)
      setTimeout(() => {
        this.isMask = false
        this.isAfter = true
      }, 3000)
    },
    hanldeImgClick () {
      document.querySelector('.upload-label').click()
      this.isAfter = false
    }
  },
  mounted () {
    gsap.to('.line', {
      x: '400px',
      duration: 3, // 动画时长
      repeat: -1, // 重复的次数
      yoyo: true
    })
  },
  created () {
    // 在组件的 created 或 mounted 钩子中监听提醒消息
    this.$eventRemind.$on('remind', (data) => {
      // 处理收到的提醒消息
      console.log('步态分析里的' + data.content)
    })
  }
}
</script>

<style lang="less" scoped>
.analysis-box {
  display: flex;
  padding-top: 100px;
}
.healthy-info {
  width: 500px;
  height: 600px;
  padding: 30px;
  margin: 50px 0 0 180px;
  background-color: #fee1b5;
  border-radius: 10px;
  box-shadow: 15px 15px 15px 0 #ccc;
  .info {
    position: relative;
    display:flex;
    flex-direction:row;
    align-items:center;
    margin-top: 40px;
    width: 415px;
    height: 150px;
    padding: 30px;
    background-color: #fff;
    border-radius: 10px;
    img {
      float: left;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      margin-left: 25px;
      margin-right: 15px;
    }
    .my-info {
      display: flex;
      flex-direction: column;
    }
    .idenfiy {
      width: 50px;
      height: 25px;
      line-height: 25px;
      text-align: center;
      color: rgb(185,118,63);
      position: absolute;
      top: 5px;
      right: 5px;
      background-color: #fee1b5;
      border-radius: 10px;
    }
  }
  ul li {
    float: left;
    list-style: none;
    width: 200px;
    height: 100px;
    text-align: center;
    margin-top: 20px;
    margin-right: 20px;
    background-color: #fff;
    border-radius: 10px;
    h4 {
      margin: 20px 0;
      color: rgb(185,118,63);
    }
  }
}
.upload-box {
  position: relative;
  width: 400px;
  height: 600px;
  margin: 50px 0 0 50px;
  box-shadow: 15px 15px 15px 0 #ccc;
}
.upload-label {
  display: inline-block;
  width: 400px;
  height: 600px;
  line-height: 600px;
  text-align: center;
  padding: 10px 20px;
  color: #000;
  background-color: #fee1b5;
  opacity: 0.4;
  border-radius: 5px;
  cursor: pointer;
  border-radius: 10px;
}

.upload {
  display: none;
}

.preview-image {
  display: block;
  width: 400px;
  height: 100%;
}

.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // background-color: rgb(0, 106, 255);
  // opacity: 0.2;
  .line {
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 100%;
    border: 1px solid blue;
  }
}
.after-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
  .after-line1 {
    position: absolute;
    top: 280px;
    right: 25px;
    color: red;
  }
  .after-line2 {
    position: absolute;
    bottom: 70px;
    left: 80px;
    color: red;
  }
  .line-item {
      display: inline-block;
      width: 30px;
      height: 2px;
      border-top: 1px solid red;
    }
}
</style>
