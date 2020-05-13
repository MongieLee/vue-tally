<template>
  <svg>
    <use :xlink:href="'#'+name" />
  </svg>
</template>

<script lang='ts'>
const importAll = (requireContent: __WebpackModuleApi.RequireContext) =>
  requireContent.keys().forEach(requireContent);
try {
  importAll(require.context("../assets/icons", true, /\.svg$/));
} catch (error) {
  console.log(error);
}

export default {
  name: "Icon",
  props: ["name"]
};
</script>

<style lang="scss" scoped>
</style>