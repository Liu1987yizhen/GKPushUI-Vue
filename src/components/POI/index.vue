<template>
  <!-- 兴趣点位 -->
  <div
    @click="show.manage = !show.manage"
    class="blur-box interest-box"
    style="right: 35px; top: 225px; padding-bottom: 10px"
  >
    <div class="blur-box-content"></div>
  </div>
  <!-- 兴趣点管理 -->
  <div
    v-show="show.manage"
    @click="show.add = !show.add"
    class="blur-box interest-manage-box"
    style="right: 350px; top: 225px; padding-top: 10px"
  >
    <div class="blur-box-content"></div>
  </div>
  <!-- 编辑兴趣点 -->
  <div
    v-show="show.add"
    @click="show.upset = !show.upset"
    class="blur-box interest-edit-box"
    style="right: 660px; top: 225px; padding-top: 25px"
  >
    <div class="blur-box-content"></div>
  </div>
  <!-- 增改兴趣点 -->
  <div
    v-show="show.upset"
    class="blur-box interest-upset-box"
    style="right: 970px; top: 225px; padding-top: 25px"
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
    });
    watch(
      () => show.manage,
      (newval) => {
        if (!newval) {
          show.add = false;
          show.upset = false;
        }
      }
    );
    watch(
      () => show.add,
      (newval) => {
        if (!newval) {
          show.upset = false;
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