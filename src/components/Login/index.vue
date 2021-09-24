<template>
  <drag style="left: calc( 50% - 232px); top: calc( 50% - 180px)">
    <div class="blur-box login-box">
      <div class="blur-box-content">
        <div class="title-box">
          <div class="title">系统登录</div>
          <div class="subtitle">System login</div>
        </div>
        <div class="form">
          <div class="item">
            <span class="label">用户名</span>
            <input type="text" placeholder="请输入用户名" />
          </div>
          <div class="item">
            <span class="label">密 码</span>
            <input type="text" placeholder="请输入密码" />
          </div>
        </div>
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
export default {
  components: { drag },
  setup(props, { emit }) {
    console.log(props);
    const btnHandle = () => {
      emit("close");
    };
    return {
      btnHandle,
    };
  },
};
</script>

<style lang="less" scoped>
.login-box {
  padding: 30px;
}
.title-box {
  text-align: center;
  border-bottom: 2px solid rgba(140, 253, 249, 0.5);
  padding-bottom: 8px;
  .title {
    font-size: 16px;
    color: #fff;
    text-align: center;
  }
  .subtitle {
    font-size: 8px;
    color: #fff;
    text-align: center;
    opacity: 0.5;
  }
}
.form {
  margin-top: 35px;
  margin-bottom: 50px;
  .item {
    margin-bottom: 22px;
  }
  .label {
    width: 100px;
    display: inline-block;
    font-size: 14px;
    color: #fff;
    position: relative;
    &::before {
      display: inline-block;
      content: "";
      width: 5px;
      height: 5px;
      opacity: 1;
      background: linear-gradient(206deg, #0e9fff 0%, #4dfff3 100%);
      border-radius: 50%;
      position: absolute;
      top: 7px;
      left: -10px;
    }
  }
  input {
    width: 280px;
    height: 45px;
    border: none;
    background: rgba(207, 207, 207, 0.2);
    border-radius: 12px;
    font-size: 16px;
    color: #d6f6f5;
    line-height: 45px;
    padding: 0 20px;
  }
}
.btn-box {
  justify-content: space-around;
}
</style>