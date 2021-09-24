<template>
  <!-- 视点 -->
  <div
    @click="show.manage = !show.manage"
    class="blur-box viewpoint-box"
    style="right: 35px; top: 225px; padding-bottom: 10px"
  >
    <div class="blur-box-content"></div>
  </div>
  <!-- 视点管理 -->
  <div
    v-show="show.manage"
    @click="show.add = !show.add"
    class="blur-box viewpoint-manage-box"
    style="right: 350px; top: 225px; padding-top: 10px"
  >
    <div class="blur-box-content"></div>
  </div>
  <!-- 增改视点 -->
  <div
    v-show="show.add"
    class="blur-box viewpoint-upset-box"
    style="right: 660px; top: 225px; padding-top: 25px"
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
    });
    watch(
      () => show.manage,
      (newval) => {
        if (!newval) {
          show.add = false;
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