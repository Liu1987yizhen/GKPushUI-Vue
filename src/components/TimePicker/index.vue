<template>
  <div class="time-picker">
    <div class="time-txt">
      <span class="txt"><span class="num">{{timeTxt}}</span>{{timeTxt > 12 ? 'PM' : 'AM'}}</span>
      <span class="point"></span>
    </div>
    <div class="bar-box">
      <el-slider v-model="time" :show-tooltip="false" :marks="marks">
      </el-slider>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed} from "vue";
export default {
  setup() {
    let time = ref(0);
    let marks = ref({
      0: "00:00",
      5: "",
      10: "",
      15: "",
      20: "",
      25: "06:00",
      30: "",
      35: "",
      40: "",
      45: "",
      50: "12:00",
      55: "",
      60: "",
      65: "",
      70: "",
      75: "18:00",
      80: "",
      85: "",
      90: "",
      95: "",
      100: "24:00",
    });

    onMounted(() => {
      let markstops = document.getElementsByClassName("el-slider__stop");
      markstops.forEach((element, index) => {
        if (index % 5 == 0) {
          element.style.transform = "scale(1.5)";
        }
      });
    });

    const timeTxt = computed(()=> {
        return ((time.value / 100) * 24).toFixed(0)
    })

    return {
      time,
      marks,
      timeTxt
    };
  },
};
</script>

<style lang="less" scoped>
.time-picker {
  background: none;
}
.bar-box {
  background: rgba(255, 255, 255, 0.4);
  border-radius: 15px;
  padding: 0 20px;
  /deep/ .el-slider .el-slider__marks-text {
    color: #fff;
    margin-top: 25px;
  }
  /deep/ .el-slider__runway {
    height: 3px;
    margin: 5px 0 20px 0;
  }
  /deep/ .el-slider__stop {
    top: 10px;
  }
  /deep/ .el-slider__bar {
    display: none;
  }
  /deep/ .el-slider__button-wrapper {
    top: -33px;
    border: none;
    .el-slider__button {
      width: 11px;
      height: 8px;
      background: url(~@/assets/images/icon10.png) center no-repeat;
      border-radius: 0;
      border: none;
    }
  }
}

.time-txt {
    width: 55px;
    height: 55px;
    background: url(~@/assets/images/time-bg.png) center no-repeat;
    background-size: cover;
    font-size: 12px;
    line-height: 55px;
    text-align: center;
    color: #fff;
    position: absolute;
    left: -70px;
    top: -10px;
    .num {
        font-size: 22px;
    }
}
</style>