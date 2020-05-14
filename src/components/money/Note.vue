<template>
  <div class="note-wrapper">
    <label for="note">备注：</label>
    <input id="note" type="text" autocomplete="off" v-model="value" placeholder="点击填写备注..." />
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class extends Vue {
  value = "";
}
// export default {
//   name: "Note"
// };
</script>

<style lang="scss" scoped>
.note-wrapper {
  padding: 3px 10px 3px 15px;
  display: flex;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  background: #f5f5f5;
  input {
    margin-left: 10px;
    flex-grow: 1;
    border: none;
    padding: 5px 3px;
    background: transparent;
  }
}
</style>