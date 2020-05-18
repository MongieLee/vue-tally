<template>
  <div class="typeList-wrapper">
    <ul class="type-list">
      <li @click="selectedType('pay')" :class="selected==='pay' && 'selected'">支出</li>
      <li @click="selectedType('income')" :class="selected==='income' && 'selected'">收入</li>
    </ul>
    <span @click="backStatistics">
      <Icon name="close" />
    </span>
  </div>
</template>

<script>
export default {
  name: "Types",
  data() {
    return {
      selected: this.value
    };
  },
  props: ["value"],
  methods: {
    selectedType(type) {
      if (["pay", "income"].indexOf(type) === -1) {
        throw new Error("type is unknow.");
      }
      this.selected = type;
      this.$emit("update:value",this.selected);
    },
    backStatistics() {
      this.$router.push({ path: "/statistics" });
    }
  }
};
</script>

<style lang="scss" scoped>
.typeList-wrapper {
  position: relative;
  background-color: rgb(255, 218, 71);
  .type-list {
    display: flex;
    justify-content: center;
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px 10px 10px;
      position: relative;
      &.selected::after {
        content: "";
        display: block;
        width: 100%;
        border: 2px black solid;
        border-radius: 5px;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
  .icon {
    font-size: 5px;
    position: absolute;
    left: 10px;
    top: 20px;
    width: 22px;
    height: 22px;
  }
}
</style>