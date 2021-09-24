<template>
  <!-- 动画路径 -->
  <div
    class="blur-box animate-path-box"
    style="right: 35px; top: 225px; padding-bottom: 15px"
  >
    <div class="blur-box-content" @click="show.manage = !show.manage"></div>
  </div>
  <!-- 动画管理 -->
  <div
    v-show="show.manage"
    class="blur-box animate-manage-box"
    style="right: 350px; top: 225px; padding-top: 10px"
  >
    <div class="blur-box-content" @click="show.add = !show.add"></div>
  </div>
  <!-- 添加动画 -->
  <div
    v-show="show.add"
    class="blur-box animate-add-box"
    style="right: 660px; top: 225px; padding-top: 25px"
  >
    <div
      class="blur-box-content"
      @click="
        show.upset = !show.upset;
        show.edit = !show.edit;
      "
    ></div>
  </div>
  <!-- 修改动画 -->
  <div
    v-show="show.upset"
    class="blur-box animate-upset-box"
    style="right: 660px; top: 628px; padding-top: 25px"
  >
    <div class="blur-box-content"></div>
  </div>
  <!-- 编辑动画 -->
  <div
    v-show="show.edit"
    class="blur-box animate-edit-box"
    style="right: 1006px; top: 226px; padding-top: 25px"
  >
    <div class="blur-box-content"></div>
  </div>
</template>

<script>
import { reactive, watch } from "vue";
export default {
  setup() {
    let show = reactive({
      manage: false,
      add: false,
      upset: false,
      edit: false,
    });
    watch(
      () => show.manage,
      (newval) => {
        if (!newval) {
          show.add = false;
          show.upset = false;
          show.edit = false;
        }
      }
    );
    watch(
      () => show.add,
      (newval) => {
        if (!newval) {
          show.upset = false;
          show.edit = false;
        }
      }
    );

    return {
      show,
    };
  },
};
</script>

<style lang="less" scoped>
.blur-box {
  position: absolute;
}
</style>