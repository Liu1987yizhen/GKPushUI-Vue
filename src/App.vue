<template>
  <router-view></router-view>
</template>

<style lang="less">
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
</style>
