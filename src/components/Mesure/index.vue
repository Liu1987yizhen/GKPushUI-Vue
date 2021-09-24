<template>
  <drag style="left: calc( 50% - 200px); top: 85%">
    <div class="blur-box measure-box" style="padding: 15px 0">
      <div class="blur-box-content">
        <div class="left-line"></div>
        <ul>
          <li class="btn" @click="menuActive = 1" :class="{ on: menuActive == 1 }">
            <div class="ico-box">
              <img
                :src="
                  require(`@/assets/images/mesure/icon01${
                    menuActive == 1 ? '-on' : ''
                  }.png`)
                "
                alt=""
              />
            </div>
            <div class="label">面积测量</div>
          </li>
          <li class="btn" @click="menuActive = 2" :class="{ on: menuActive == 2 }">
            <div class="ico-box">
              <img
                :src="
                  require(`@/assets/images/mesure/icon02${
                    menuActive == 2 ? '-on' : ''
                  }.png`)
                "
                alt=""
              />
            </div>
            <div class="label">长度测量</div>
          </li>
          <li class="btn" @click="menuActive = 3" :class="{ on: menuActive == 3 }">
            <div class="ico-box">
              <img
                :src="
                  require(`@/assets/images/mesure/icon03${
                    menuActive == 3 ? '-on' : ''
                  }.png`)
                "
                alt=""
              />
            </div>
            <div class="label">周长测量</div>
          </li>
          <li class="btn" @click="menuActive = 4" :class="{ on: menuActive == 4 }">
            <div class="ico-box">
              <img
                :src="
                  require(`@/assets/images/mesure/icon04${
                    menuActive == 4 ? '-on' : ''
                  }.png`)
                "
                alt=""
              />
            </div>
            <div class="label">坐标测量</div>
          </li>
          <li class="btn" @click="menuActive = 5" :class="{ on: menuActive == 5 }">
            <div class="ico-box"></div>
            <div class="label">扩展功能</div>
          </li>
          <li class="btn" @click="menuActive = 6" :class="{ on: menuActive == 6 }">
            <div class="ico-box"></div>
            <div class="label">扩展功能</div>
          </li>
        </ul>
      </div>
    </div>
  </drag>
</template>

<script>
import drag from "../DragLayer";
import { ref } from "vue";
export default {
  components: { drag },
  setup() {
    let menuActive = ref(1);
    return {
      menuActive,
    };
  },
};
</script>

<style lang="less" scoped>
.blur-box-content {
  padding: 0 20px;
}
.left-line {
  width: 3px;
  height: 29px;
  opacity: 1;
  background: linear-gradient(0deg, #0e9fff, #4dfff3);
  border-radius: 1px;
  position: absolute;
  top: 20px;
  left: 0;
}
ul {
  display: flex;
  white-space: nowrap;
  li {
    display: inline-block;
    text-align: center;
    margin-right: 20px;
    .ico-box {
      width: 46px;
      height: 46px;
      background: url(~@/assets/images/mesure/bg.png) center no-repeat;
      background-size: cover;
      position: relative;
      img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .label {
      font-size: 12px;
      color: #ffffff;
    }
  }
  .on {
    .ico-box {
      background: url(~@/assets/images/mesure/bg-on.png) center no-repeat;
      background-size: cover;
    }
    .label {
        color: #8cfdf9;
    }
  }
}
</style>