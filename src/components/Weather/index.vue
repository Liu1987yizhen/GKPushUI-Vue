<template>
  <div class="weather" @click="showTc = !showTc">
    <img
      :src="require('@/assets/images/weather/icon(' + weatherActive + ').png')"
      alt=""
    />
  </div>
  <drag style="right: 34px; top: 226px" class="drag-box" v-show="showTc">
    <div class="blur-box weather-box" style="padding: 30px">
      <div class="blur-box-content">
        <div class="ico-box">
          <ul>
            <li
              class="btn"
              @click="weatherActive = 1"
              :class="{ on: weatherActive == 1 }"
            >
              <img src="@/assets/images/weather/icon(1).png" alt="" />
            </li>
            <li
              class="btn"
              @click="weatherActive = 2"
              :class="{ on: weatherActive == 2 }"
            >
              <img src="@/assets/images/weather/icon(2).png" alt="" />
            </li>
            <li
              class="btn"
              @click="weatherActive = 3"
              :class="{ on: weatherActive == 3 }"
            >
              <img src="@/assets/images/weather/icon(3).png" alt="" />
            </li>
            <li
              class="btn"
              @click="weatherActive = 4"
              :class="{ on: weatherActive == 4 }"
            >
              <img src="@/assets/images/weather/icon(4).png" alt="" />
            </li>
            <li
              class="btn"
              @click="weatherActive = 5"
              :class="{ on: weatherActive == 5 }"
            >
              <img src="@/assets/images/weather/icon(5).png" alt="" />
            </li>
            <li
              class="btn"
              @click="weatherActive = 6"
              :class="{ on: weatherActive == 6 }"
            >
              <img src="@/assets/images/weather/icon(6).png" alt="" />
            </li>
            <li
              class="btn"
              @click="weatherActive = 7"
              :class="{ on: weatherActive == 7 }"
            >
              <img src="@/assets/images/weather/icon(7).png" alt="" />
            </li>
            <li
              class="btn"
              @click="weatherActive = 8"
              :class="{ on: weatherActive == 8 }"
            >
              <img src="@/assets/images/weather/icon(8).png" alt="" />
            </li>
            <li
              class="btn"
              @click="weatherActive = 9"
              :class="{ on: weatherActive == 9 }"
            >
              <img src="@/assets/images/weather/icon(9).png" alt="" />
            </li>
            <li
              class="btn"
              @click="weatherActive = 10"
              :class="{ on: weatherActive == 10 }"
            >
              <img src="@/assets/images/weather/icon(10).png" alt="" />
            </li>
            <li
              class="btn"
              @click="weatherActive = 11"
              :class="{ on: weatherActive == 11 }"
            >
              <img src="@/assets/images/weather/icon(11).png" alt="" />
            </li>
          </ul>
        </div>
        <Slider :value="50" label="阳光" @change="valueChange" />
        <Slider :value="70" label="雨量" @change="valueChange" />
        <div class="btn-box">
          <button class="btn1" @click="btnHandle">取消</button>
          <button class="btn2" @click="btnHandle">确认</button>
        </div>
      </div>
    </div>
  </drag>
</template>

<script>
import drag from "../DragLayer";
import Slider from "../Slider";
import { ref } from "vue";
export default {
  components: { drag, Slider },
  emits: ["close"],
  setup(props, { emit }) {
    console.log(props);
    const valueChange = (e) => {
      console.log(e);
    };

    let showTc = ref(false);

    let weatherActive = ref(1);

    const btnHandle = () => {
      emit("close");
    };

    return {
      valueChange,
      weatherActive,
      showTc,
      btnHandle,
    };
  },
};
</script>

<style lang="less" scoped>
.weather-box {
  width: 270px;
}
.weather {
  cursor: pointer;
  img {
    position: absolute;
    right: 16px;
  }
}
.ico-box {
  ul {
    margin-bottom: 15px;
    li {
      width: 47px;
      height: 47px;
      display: inline-block;
      background: url(~@/assets/images/weather/bg.png) center no-repeat;
      background-size: cover;
      position: relative;
      margin: 0 5px 5px 0;
      cursor: pointer;
      img {
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .on {
      background: url(~@/assets/images/weather/bg-active.png) center no-repeat;
      background-size: cover;
    }
  }
}
@media screen and (min-width: 3277px) {
  .drag-box {
    left: 136px !important;
    top: 300px !important;
    right: auto !important;
  }
}
</style>