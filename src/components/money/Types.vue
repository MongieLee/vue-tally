<template>
  <div class="typeList-wrapper">
    <ul class="type-list">
      <li @click="selectedType('pay')" :class="selected==='pay' && 'selected'">支出</li>
      <li @click="selectedType('income')" :class="selected==='income' && 'selected'">收入</li>
    </ul>
    <span @click="backLabels">
      <Icon name="close" />
    </span>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class Types extends Vue {
  selected = "pay"; //pay为支出，income为收入
  selectedType(type: string) {
    if (["pay", "income"].indexOf(type) === -1) {
      throw new Error("type is unknow.");
    }
    this.selected = type;
  }
  backLabels() {
    this.$router.push({ path: "/labels" });
  }
}
// export default {
//   name: "Types",
//   data() {
//     return {
//       selected: "pay" //pay为支出，income为收入
//     };
//   },
//   methods: {
//     selectedType(type) {
//         if(!type in ['pay','income']){
//             throw new Error('type is unknow.')
//         }
//       this.selected = type;
//     },
//     backLabels(){
//       this.$router.push({ path: "/labels" });
//     }
//   }
// };
</script>

<style lang="scss" scoped>
.typeList-wrapper {
  position: relative;
  .type-list {
    display: flex;
    justify-content: center;
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px 5px 10px;
      position: relative;
      &.selected::after {
        content: "";
        display: block;
        width: 100%;
        border: 2px rgb(255, 215, 8) solid;
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