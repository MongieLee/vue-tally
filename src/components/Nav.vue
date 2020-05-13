<template>
  <div>
    <router-link to="/money">
      <svg>
        <use xlink:href="#label" />
      </svg>
      记账
    </router-link>
    <router-link to="/labels">标签</router-link>
    <router-link to="/statistics">统计</router-link>
  </div>
</template>

<script lang="ts">
const importAll = (requireContent: __WebpackModuleApi.RequireContext) =>
  requireContent.keys().forEach(requireContent);
try {
  importAll(require.context("../assets/icons", true, /\.svg$/));
} catch (error) {
  console.log(error);
}

export default {
  name: "Nav"
};
</script>

<style lang="scss" scoped>
div {
  border: 1px red solid;
  padding: 20px 0;
  & a {
    margin: 10px;
  }
}
</style>