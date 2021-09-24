<template>
  <drag style="left: 47%; top: 225px">
    <div class="blur-box setting-box">
      <div class="blur-box-content">
        <div class="avatar">
          <div>
            <span>用户</span>
            <span>User12345</span>
          </div>
          <img src="@/assets/images/setting/login.png" />
        </div>
        <ul>
          <li>
            <div class="item">
              <div class="child">
                <span class="label">
                  <img src="@/assets/images/setting/icon01.png" alt="" />
                </span>
                <span class="value" style="width: 135px">
                  <el-slider v-model="seeting.volume"></el-slider>
                </span>
                <span class="num">{{ seeting.volume }}</span>
              </div>
              <div>
                <span class="label">
                  <img src="@/assets/images/setting/icon02.png" alt="" />
                </span>
                <span class="value" style="width: 135px">
                  <el-slider v-model="seeting.soundEffect"></el-slider>
                </span>
                <span class="num">{{ seeting.soundEffect }}</span>
              </div>
            </div>
          </li>
          <li>
            <span class="label">曝光</span>
            <span class="value">
              <el-slider v-model="seeting.exposure"></el-slider>
            </span>
          </li>
          <li>
            <span class="label">色温</span>
            <span class="value">
              <el-slider v-model="seeting.colorTemperature"></el-slider>
            </span>
          </li>
          <li>
            <span class="label">饱和</span>
            <span class="value">
              <el-slider v-model="seeting.saturation"></el-slider>
            </span>
          </li>
          <li>
            <span class="label">对比</span>
            <span class="value">
              <el-slider v-model="seeting.comparison"></el-slider>
            </span>
          </li>
          <li>
            <span class="label">着色</span>
            <span class="value">
              <el-slider
                class="color-set"
                v-model="seeting.tinting"
              ></el-slider>
            </span>
          </li>
          <li>
            <span class="label">曝光</span>
            <span class="value"> 帧率显示 </span>
          </li>
        </ul>
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
import { ref } from "vue";
export default {
  components: { drag },
  setup(props, context) {
    console.log(props);
    let seeting = ref({
      volume: 50,
      soundEffect: 50,
      exposure: 90,
      saturation: 80,
      colorTemperature: 70,
      comparison: 70,
      tinting: 70,
    });

    const btnHandle = () => {
      context.emit("close");
    };

    return {
      seeting,
      btnHandle,
    };
  },
};
</script>

<style lang="less" scoped>
.blur-box {
  padding: 30px;
}
.avatar {
  display: flex;
  justify-content: flex-end;
  border-bottom: 2px solid rgba(140, 253, 249, 0.5);
  margin-bottom: 15px;
  padding-bottom: 10px;
  color: #fff;
  font-size: 14px;
  img {
    display: inline-block;
    margin-left: 10px;
    object-fit: contain;
  }
  span {
    display: block;
    text-align: right;
  }
}
ul {
  height: 420px;
  overflow: scroll;
  overflow-x: hidden;
  padding-right: 10px;
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 2px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(140, 253, 249, 0.48);
  }
  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 2px;
    background: rgba(140, 253, 249, 0.17);
  }
}
li {
  background: rgba(207, 207, 207, 0.2);
  border-radius: 12px;
  padding: 10px 18px;
  margin-bottom: 7px;
  img {
    vertical-align: middle;
  }
  .label {
    margin-right: 30px;
    color: #fff;
  }
  .value {
    width: 150px;
    vertical-align: middle;
    display: inline-block;
    color: #fff;
  }
  .num {
    color: #fff;
    font-size: 12px;
    margin-left: 13px;
  }
}
.btn-box {
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  button {
    width: 100px;
    height: 38px;
    border: none;
    border-radius: 12px;
    background: rgba(207, 207, 207, 0.2);
    font-size: 14px;
    color: #fff;
    text-align: center;
    cursor: pointer;
  }
  .btn2 {
    background: linear-gradient(
      174deg,
      rgba(14, 159, 255, 0.74) 0%,
      #4dfff3 100%
    );
  }
}
.color-set {
}
</style>