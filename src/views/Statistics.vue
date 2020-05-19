<template>
  <Layout>
    <div class="top-bar">
      <span>大象记账</span>
      <div>1</div>
    </div>
    <!-- 54 -->
  </Layout>
</template>

<script>
import dayJs from "dayjs";
console.log(dayJs());

const q = dayJs(new Date());
console.log(q);
export default {
  name: "Statistics",
  data() {
    return {
      test: window.localStorage.getItem("recordList")
    };
  },
  created() {
    this.$store.commit("initRecordList");
  }
};
</script>

<style lang="scss" scoped>
.top-bar {
  border: 1px red solid;
  background-color: rgb(255, 218, 71);
  display: flex;
  flex-direction:column;
  align-items:center;
  span{
    font-size:18px;
    font-weight: bold;
  }
}
</style>