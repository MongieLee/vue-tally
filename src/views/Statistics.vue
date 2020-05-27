<template>
  <Layout>
    <div class="data-container">
      <div class="text-title">
        <span>轻记账</span>
      </div>
      <div class="time-and-count">
        <el-date-picker class="xxx" v-model="currentM" type="month" placeholder="选择月"></el-date-picker>
        <div>
          <span>收入：{{currentIncome.toFixed(2)}}</span>
          <span>支出：{{currentPay.toFixed(2)}}</span>
        </div>
      </div>

      <div class="data-wrapper">
        <div class="null-content" v-if="groupedList.length===0">
          <Icon name="no-data" />
          <span name="traffic">暂无数据,快去记一笔吧~</span>
        </div>
        <div class="jjj" v-else>
          <div v-for="(value,index) in paixuhoude" :key="index">
            <div v-if="value!==undefined" class="day-info">
              <span>{{getDate(index)}}</span>
              <span>
                <span>{{getDayIncome(value)?`收入：${getDayIncome(value)}`:null}}</span>
                <span>{{getDayPay(value)?`支出：${getDayPay(value)} `:null}}</span>
              </span>
            </div>
            <div v-if="value!==undefined">
              <router-link
                :to="`/statistics/details/${index}/${index2}`"
                class="list-item"
                v-for="(item,index2) in value"
                :key="index2"
              >
                <Icon :name="item.selectedTag.iconName" />
                <span class="tag-type">{{item.selectedTag.tagType}}</span>
                <span class="amount">{{item.type==='pay'?'- '+item.amount:item.amount}}</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <router-view />
    </div>
  </Layout>
</template>

<script>
import dayJs from "dayjs";
// import "element-ui/lib/theme-chalk/index.css";

export default {
  name: "Statistics",
  data() {
    return {
      currentM: new Date(),
      currentIncome: 0,
      currentPay: 0,
      paixuhoude: null
    };
  },
  computed: {
    getMonth() {
      return dayJs(this.currentM).get("month");
    },
    getDay() {
      let objMap = {
        "1": "一",
        "2": "二",
        "3": "三",
        "4": "四",
        "5": "五",
        "6": "六",
        "7": "七"
      };
      return objMap[dayJs(this.currentM).get("day")];
    },

    recordList() {
      return this.$store.state.recordList;
    },
    groupedList() {
      const { recordList } = this;
      if (recordList.length === 0) {
        return recordList;
      }
      this.currentPay = 0;
      this.currentIncome = 0;
      let currentMonthList = JSON.parse(JSON.stringify(recordList)).filter(
        item => {
          if (
            dayJs(item.createTime).get("month") ===
            dayJs(this.currentM).get("month")
          ) {
            return item;
          }
        }
      );
      let xxx = [];
      currentMonthList.map(v => {
        let day = dayJs(v.createTime).get("date");
        if (!xxx[day]) {
          xxx[day] = [];
          xxx[day].push(v);
        } else {
          xxx[day].push(v);
        }
      });
      xxx.map(w => {
        w.sort(
          (a, b) =>
            dayJs(b.createTime).valueOf() - dayJs(a.createTime).valueOf()
          //  dayJs(a.createTime).valueOf() - dayJs(b.createTime).valueOf()
        );
        w.map(k => {
          if (k.type === "pay") {
            this.currentPay += parseFloat(k.amount);
          } else if (k.type === "income") {
            this.currentIncome += parseFloat(k.amount);
          }
        });
      });
      localStorage.setItem("paihaoxude", JSON.stringify(xxx));
      this.paixuhoude = xxx;
      return this.paixuhoude;
    }
  },
  methods: {
    getDate(index) {
      let objMap = {
        "1": "一",
        "2": "二",
        "3": "三",
        "4": "四",
        "5": "五",
        "6": "六",
        "7": "七"
      };
      if (!this.paixuhoude[index]) {
        return;
      } else {
        console.log(this.paixuhoude[index][0].createTime, "---");
        console.log(
          "星期几",
          dayJs(this.paixuhoude[index][0].createTime).get("day")
        );
        return `${this.getMonth + 1}月${index}号 星期${
          objMap[dayJs(this.paixuhoude[index][0].createTime).get("day")]
        }`;
      }
    },
    getDayPay(arr) {
      if (!arr) return;
      console.log(arr);
      let pay = 0;
      arr.map(v => {
        if (v.type === "pay") {
          pay += v.amount;
        }
      });
      return pay.toFixed(2);
    },
    getDayIncome(arr) {
      if (!arr) return;

      let inCome = 0;
      arr.map(v => {
        if (v.type === "income") inCome += v.amount;
      });
      return inCome.toFixed(2);
    }
  },
  created() {
    this.$store.commit("initRecordList");
  }
};
</script>
<style lang="scss">
.el-month-table td.current:not(.disabled) .cell,
.el-month-table td.today .cell {
  color: red;
}
</style>
<style lang="scss" scoped>
::v-deep .el-month-table td.current:not(.disabled) .cell {
  color: red;
}
.data-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.text-title {
  background-color: rgb(255, 218, 71);
  text-align: center;
  padding: 12px 0 0;
  font-size: 20px;
}

.el-date-editor.el-input {
  width: 120px;
  ::v-deep input {
    background-color: transparent;
    color: #000;
    border: none;
  }
}

.time-and-count {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(255, 218, 71);
  span {
    margin-right: 13px;
  }
}

.data-wrapper {
  height: 70vh;
  flex-grow: 1;
  .jjj {
    display: flex;
    flex-direction: column-reverse;
    > div {
      > .day-info {
        padding: 3px 15px 3px 10px;
        border-bottom: 1px #f5f5f5 solid;
        font-size: 14px;
        color: #999;
        display: flex;
        justify-content: space-between;
      }
      span:nth-child(1) {
        margin-right: 5px;
      }
    }
  }
  .null-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    color: #999;
    justify-content: center;
    align-items: center;
    .icon {
      width: 80px;
      height: 80px;
    }
    span {
      font-size: 14px;
    }
  }
}

.list-item {
  padding: 5px 8px;
  display: flex;
  align-items: center;
  border-bottom: 1px #f5f5f5 solid;
  position: relative;
  .icon {
    height: 40px;
    width: 40px;
    color: rgb(255, 218, 71);
    border-radius: 50%;
    background-color: #f5f5f5;
    padding: 10px;
  }
  .tag-type {
    margin-left: 20px;
  }
  .amount {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>