<template>
  <div>
    <div class="currentNumber">{{output}}</div>
    <div class="number-wrapper">
      <button @click="inputNumber">1</button>
      <button @click="inputNumber">2</button>
      <button @click="inputNumber">3</button>
      <button @click="inputNumber('delete')">X</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>+</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>-</button>
      <button>C</button>
      <button @click="inputNumber">0</button>
      <button>.</button>
      <button>确定</button>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class NumberPad extends Vue {
  output = "0";
  inputNumber(event: MouseEvent) {
    const button = event.target as HTMLButtonElement;
    const input = button.textContent;
    if (this.output.length === 16) {
      return;
    }
    if (this.output === "0") {
      if ("0123456789".indexOf(input) >= 0) {
        this.output = input;
      } else {
        this.output += input;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.currentNumber {
  text-align: right;
  padding: 10px;
  font-size: 20px;
  min-height: 50px;
}
.number-wrapper {
  display: flex;
  flex-wrap: wrap;
  button {
    height: 64px;
    width: 25%;
    border: none;
    color: white;
    &:not(:last-child) {
      background: rgb(72, 72, 106);
    }
    // $bgColor: #f2f2f2;
    // &:nth-child(1) {
    //   background: $bgColor;
    // }
    // &:nth-child(2),&:nth-child(5) {
    //   background: darken($bgColor,4%);
    // }
    // &:nth-child(3),&:nth-child(6),&:nth-child(9) {
    //   background: darken($bgColor,4*2%);
    // }
    // &:nth-child(4),&:nth-child(7),&:nth-child(10),&:nth-child(13){
    //     background:darken($bgColor, 4*3%)
    // }
    // &:nth-child(8),&:nth-child(11),&:nth-child(14){
    //     background:darken($bgColor, 4*5%)
    // }
    // &:nth-child(12),&:nth-child(15) {
    //   background: darken($bgColor,4*6%);
    // }
    &:last-child {
      background: rgb(98, 98, 147);
    }
  }
}
</style>