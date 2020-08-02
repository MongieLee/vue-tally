<template>
  <div ref="chartWrapper" class="chartWrapper"></div>
</template>

<script>
import Echarts from "echarts";

export default {
  data() {
    return {
      chartDom: null,
    };
  },
  props: {
    options: { type: Object, required: true },
  },
  mounted() {
    this.chartDom = Echarts.init(this.$refs.chartWrapper);
    console.log(this.chartDom.setOption);

    console.log(`this.options`);
    console.log(this.options);

    this.chartDom.setOption(this.options);
  },
  watch: {
    options(newOptions) {
      this.chartDom.setOption(newOptions);
    },
  },
};
</script>

<style lang="scss" scoped>
.chartWrapper {
  height: 40vh;
}
</style>