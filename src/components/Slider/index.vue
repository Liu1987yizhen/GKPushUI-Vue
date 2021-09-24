<template>
  <div class="slider-box">
    <span class="label">{{ label }}</span>
    <span class="value">
      <el-slider v-model="val" @change="changeVal"></el-slider>
    </span>
  </div>
</template>

<script>
import { toRef, ref } from "vue";
export default {
  props: ["value", "label"],
  setup(props, context) {
    const defaultVal = toRef(props, "value");
    let val = ref(defaultVal.value);
    const changeVal = () => {
      context.emit("change", val.value);
    };
    return {
      changeVal,
      val,
    };
  },
};
</script>

<style lang="less" scoped>
.slider-box {
  background: rgba(207, 207, 207, 0.2);
  border-radius: 12px;
  padding: 10px 18px;
  margin-bottom: 7px;
  .label {
    margin-right: 30px;
    color: #fff;
    width: 30%;
  }
  .value {
    width: 65%;
    vertical-align: middle;
    display: inline-block;
    color: #fff;
  }
  /deep/ .el-slider__runway {
    height: 2px;
    background-color: rgba(140, 253, 249, 0.22);
  }
  /deep/ .el-slider__bar {
    height: 2px;
    background-color: #fff;
  }
  /deep/ .el-slider__button {
    background: url(~@/assets/images/icon10.png) center no-repeat;
    border: none;
  }
  /deep/ .el-slider__button-wrapper {
    top: -25px;
  }
}
</style>