<template>
  <nav>
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="money" />记账
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="statistics" />统计
    </router-link>
  </nav>
</template>

<script>
export default {
  name: "Nav"
};
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  // border: 1px red solid;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  > .item {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2px 0;
    font-size: 12px;
    > .icon {
      width: 32px;
      height: 32px;
    }
  }
  > .item.selected{
    color: red;
  }
}
</style>