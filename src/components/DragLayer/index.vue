<template>
  <keep-alive>
    <div ref="drag" class="drag">
      <slot></slot>
    </div>
  </keep-alive>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  setup() {
    const drag = ref();
    onMounted(() => {
      // //点击某物体时，用drag对象即可，move和up是全局区域，
      // 也就是整个文档通用，应该使用document对象而不是drag对象(否则，采用drag对象时物体只能往右方或下方移动)
      drag.value.onmousedown = function (event) {
        event = event || window.event; //兼容IE浏览器
        if (event.target.className.includes("el-slider")) return;
        if (event.target.className.includes("btn")) return;
        //    鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
        var diffX = event.clientX - drag.value.offsetLeft;
        var diffY = event.clientY - drag.value.offsetTop;
        if (typeof drag.value.setCapture !== "undefined") {
          drag.value.setCapture();
        }
        document.onmousemove = function (event) {
          event = event || window.event;
          var moveX = event.clientX - diffX;
          var moveY = event.clientY - diffY;
          if (moveX < 0) {
            moveX = 0;
          } else if (moveX > window.innerWidth - drag.value.offsetWidth) {
            moveX = window.innerWidth - drag.value.offsetWidth;
          }
          if (moveY < 0) {
            moveY = 0;
          } else if (moveY > window.innerHeight - drag.value.offsetHeight) {
            moveY = window.innerHeight - drag.value.offsetHeight;
          }
          drag.value.style.left = moveX + "px";
          drag.value.style.top = moveY + "px";
        };
        document.onmouseup = function () {
          this.onmousemove = null;
          this.onmouseup = null;
          //修复低版本ie bug
          if (typeof drag.value.releaseCapture != "undefined") {
            drag.value.releaseCapture();
          }
        };
      };
    });
    return {
      drag,
    };
  },
};
</script>

<style scoped>
.drag {
  position: absolute;
}
</style>