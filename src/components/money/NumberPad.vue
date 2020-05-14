<template>
  <div>
    <div class="output-wrapper">
      <span :class="{operatoring:operator==='+'||operator==='-'}">
        {{output}}
        <span v-show="operator==='+'||operator==='-'" class="operatorNumber">{{newNumber}}</span>
      </span>
    </div>
    <div class="number-wrapper">
      <button @click="inputNumber">1</button>
      <button @click="inputNumber">2</button>
      <button @click="inputNumber">3</button>
      <button @click="removeOne">X</button>
      <button @click="inputNumber">4</button>
      <button @click="inputNumber">5</button>
      <button @click="inputNumber">6</button>
      <button @click="add">+</button>
      <button @click="inputNumber">7</button>
      <button @click="inputNumber">8</button>
      <button @click="inputNumber">9</button>
      <button @click="minus">-</button>
      <button @click="clear">C</button>
      <button @click="inputNumber">0</button>
      <button @click="inputNumber">.</button>
      <button v-if="['+','-'].indexOf(operator)===-1">确定</button>
      <button v-else @click="result">=</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      output: "0",
      operator: "",
      oldNumber: "0",
      newNumber: "0"
    };
  },
  methods: {
    checkOutput(checkNumber) {
      if (this.output.length === 10) {
        return;
      }

      if (this.output === "0") {
        if ("0123456789".indexOf(checkNumber) >= 0) {
          this.output = checkNumber;
        } else if (checkNumber === ".") {
          this.output += checkNumber;
        }
        return;
      }
      if (this.output.indexOf(".") >= 0 && checkNumber === ".") {
        console.log("有.了不能再加了");
        return;
      }
      return true;
    },

    checkOperator(checkNumber) {
      if (this.newNumber.length === 10) {
        console.log("我不行了");

        return;
      }

      if (this.newNumber === "0") {
        if ("0123456789".indexOf(checkNumber) >= 0) {
          console.log("1111");
          this.newNumber = checkNumber;
        } else if (
          checkNumber === "." &&
          this.newNumber.indexOf(checkNumber) === -1
        ) {
          this.newNumber += checkNumber;
          console.log("222");
        }

        return;
      }

      if (this.newNumber.indexOf(".") >= 0 && checkNumber === ".") {
        return;
      }
      console.log("121221");

      return true;
    },
    inputNumber() {
      const input = event.target.textContent;

      if (this.operator === "+") {
        if (!this.checkOperator(input)) {
          return;
        }
        this.newNumber += input;
      } else if (this.operator === "-") {
        if (!this.checkOperator(input)) {
          return;
        }
        this.newNumber += input;
      } else {
        if (!this.checkOutput(input)) {
          return;
        }
        this.output += input;
      }
    },

    removeOne() {
      if (!this.operator) {
        if (this.output.length === 1) {
          this.output = "0";
        } else {
          this.output = this.output.slice(0, -1);
        }
      } else {
        if (this.newNumber.length === 1) {
          this.newNumber = "0";
        } else {
          this.newNumber = this.newNumber.slice(0, -1);
        }
      }
    },
    clear() {
      this.output = "0";
      this.newNumber = "0";
      this.operator = "";
    },
    add() {
      if (this.output.indexOf("-") >= 0) {
        this.output = this.output.slice(0, -1) + "+";
        this.operator = "+";
        return;
      }
      if (this.operator === "+") {
        this.result();
        return;
      }
      this.operator = "+";
      this.output += "+";
      this.newNumber = "0";
    },
    minus() {
      if (this.output.indexOf("+") >= 0) {
        this.output = this.output.slice(0, -1) + "-";
        this.operator = "-";
        return;
      }
      if (this.operator === "-") {
        this.result();
        return;
      }
      this.operator = "-";
      this.output += "-";
      this.newNumber = "0";
    },
    result() {
      if (this.operator === "+") {
        this.output = (
          parseFloat(this.output) + parseFloat(this.newNumber)
        ).toFixed(2).toString();
      } else if (this.operator === "-") {
        this.output = (
          parseFloat(this.output) - parseFloat(this.newNumber)
        ).toFixed(2).toString();
      }
      this.newNumber = "0";
      this.operator = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.output-wrapper {
  text-align: right;
  padding: 5px 20px;
  font-size: 50px;
  line-height: 1;
  .operatoring {
    font-size: 35px;
    display: flex;
    flex-direction: column;
  }
  .operatorNumber {
    font-size: 15px;
    color: rgba(141, 137, 137, 0.555);
  }
}
.number-wrapper {
  display: flex;
  flex-wrap: wrap;
  button {
    height: 64px;
    width: 25%;
    border: 2px #ffd708 double ;
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