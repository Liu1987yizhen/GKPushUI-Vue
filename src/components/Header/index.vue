<template>
  <div class="header">
    <div class="logo">
      <img src="@/assets/images/logo.png" alt="" srcset="" />
    </div>
    <!-- 顶部导航 -->
    <span
      class="arrow-left arrow prev-menu"
      @click="
        () => {
          if (leftShif > 0) leftShif--;
        }
      "
    ></span>
    <div class="nav">
      <ul :style="'transform: translateX(' + leftShif * -195 + 'px)'">
        <li
          class="nav01"
          @click="navActive = 0"
          :class="{ on: navActive == 0 }"
          @mouseenter="navHoverHandle"
          @mouseleave="navOutHandle"
        >
          <dl>
            <dd>园区规划1</dd>
            <dd>综合态势</dd>
            <dd>智慧建造</dd>
            <dd>智慧楼宇</dd>
          </dl>
        </li>
        <li
          class="nav02"
          @click="navActive = 1;toolClickHandle(11)"
          :class="{ on: navActive == 1 }"
          @mouseenter="navHoverHandle"
          @mouseleave="navOutHandle"
        >
          <dl>
            <dd>园区规划2</dd>
            <dd>综合态势</dd>
            <dd>智慧建造</dd>
            <dd>智慧楼宇</dd>
          </dl>
        </li>
        <li
          class="nav03"
          @click="navActive = 2"
          :class="{ on: navActive == 2 }"
          @mouseenter="navHoverHandle"
          @mouseleave="navOutHandle"
        >
          <dl>
            <dd>园区规划3</dd>
            <dd>综合态势</dd>
            <dd>智慧建造</dd>
            <dd>智慧楼宇</dd>
          </dl>
        </li>
        <li
          class="nav03"
          @click="navActive = 3"
          :class="{ on: navActive == 3 }"
          @mouseenter="navHoverHandle"
          @mouseleave="navOutHandle"
        >
          <dl>
            <dd>园区规划4</dd>
            <dd>综合态势</dd>
            <dd>智慧建造</dd>
            <dd>智慧楼宇</dd>
          </dl>
        </li>
        <li
          class="nav03"
          @click="navActive = 4"
          :class="{ on: navActive == 4 }"
          @mouseenter="navHoverHandle"
          @mouseleave="navOutHandle"
        >
          <dl>
            <dd>园区规划</dd>
            <dd>综合态势</dd>
            <dd>智慧建造</dd>
            <dd>智慧楼宇</dd>
          </dl>
        </li>
        <li
          class="nav03"
          @click="navActive = 5"
          :class="{ on: navActive == 5 }"
          @mouseenter="navHoverHandle"
          @mouseleave="navOutHandle"
        >
          <dl>
            <dd>园区规划</dd>
            <dd>综合态势</dd>
            <dd>智慧建造</dd>
            <dd>智慧楼宇</dd>
          </dl>
        </li>
        <li class="nav04"></li>
      </ul>
    </div>
    <span
      class="arrow-right arrow next-menu"
      @click="
        () => {
          if (leftShif < menuout) leftShif++;
        }
      "
    ></span>
    <!-- 工具栏 -->
    <div class="tool">
      <span class="line" style="margin-right: 22px"></span>
      <span
        class="arrow-left arrow prev-tool"
        @click="
          () => {
            if (toolLeftShif > 0) toolLeftShif--;
          }
        "
      ></span>
      <div class="tool-wrap">
        <ul :style="'transform: translateX(' + toolLeftShif * -50 + 'px)'">
          <li
            class="tool01"
            :class="{ on: toolActives.includes(0) }"
            @click="toolClickHandle(0)"
          ></li>
          <li
            class="tool02"
            :class="{ on: toolActives.includes(1) }"
            @click="toolClickHandle(1)"
          ></li>
          <li
            class="tool03"
            :class="{ on: toolActives.includes(2) }"
            @click="toolClickHandle(2)"
          ></li>
          <li
            class="tool04"
            :class="{ on: toolActives.includes(3) }"
            @click="toolClickHandle(3)"
          ></li>
          <li
            class="tool05"
            :class="{ on: toolActives.includes(4) }"
            @click="toolClickHandle(4)"
          ></li>
          <li
            class="tool06"
            :class="{ on: toolActives.includes(5) }"
            @click="toolClickHandle(5)"
          ></li>
          <li
            class="tool07"
            :class="{ on: toolActives.includes(6) }"
            @click="toolClickHandle(6)"
          ></li>
          <li
            class="tool08"
            :class="{ on: toolActives.includes(7) }"
            @click="toolClickHandle(7)"
          ></li>
          <li
            class="tool09"
            :class="{ on: toolActives.includes(8) }"
            @click="toolClickHandle(8)"
          ></li>
        </ul>
      </div>
      <span
        class="arrow-right arrow next-tool"
        style="margin-right: 22px"
        @click="
          () => {
            if (toolLeftShif < toolout) toolLeftShif++;
          }
        "
      ></span>
      <span class="line"></span>
      <div
        class="setting"
        :class="{ on: toolActives.includes(9) }"
        @click="toolClickHandle(9)"
      ></div>
      <div
        class="switch"
        :class="{ on: toolActives.includes(10) }"
        @click="toolClickHandle(10)"
      ></div>
    </div>
  </div>
</template>

<script>
import { ref, toRefs } from "vue";
export default {
  setup(props, context) {
    let navActive = ref(0);
    let menuout = 2;
    let leftShif = ref(0);
    let toolout = 3;
    let toolLeftShif = ref(0);
    let prop = toRefs(props);
    console.log(prop);

    const navHoverHandle = (e) => {
      let els = e.target.children;
      if (els.length > 0) {
        els[0].style.display = "block";
      }
    };
    const navOutHandle = (e) => {
      let els = e.target.children;
      if (els.length > 0) {
        els[0].style.display = "none";
      }
    };

    let toolActives = ref([]);
    const toolClickHandle = (n) => {
      let index = toolActives.value.findIndex((item) => item == n);
      if (index > -1) {
        toolActives.value.splice(index, 1);
      } else {
        if (n == 5 || n == 6 || n == 7 || n == 8) {
          for (let i = 5; i <= 8; i++) {
            if (toolActives.value.includes(i)) {
              let j = toolActives.value.findIndex((item) => item == i);
              toolActives.value.splice(j, 1);
            }
          }
        }
        toolActives.value.push(n);
      }
      context.emit("active", toolActives.value);
    };

    return {
      navActive,
      navHoverHandle,
      navOutHandle,
      leftShif,
      menuout,
      toolout,
      toolLeftShif,
      toolActives,
      toolClickHandle,
    };
  },
};
</script>

<style>
</style>
