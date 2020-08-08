<template>
  <Layout>
    <div class="data-container">
      <div class="text-title">
        <span>轻记账(Vue)</span>
      </div>
      <div class="time-and-count">
        <el-date-picker :editable='falsy' :clearable='falsy' v-model="currentAt" type="month" placeholder="选择月"></el-date-picker>
        <div>
          <span>收入：{{currentIncome.toFixed(2)}}</span>
          <span>支出：{{currentPay.toFixed(2)}}</span>
        </div>
      </div>

      <div class="data-wrapper">
        <div class="null-content" v-if="finalBill.length===0">
          <Icon name="no-data" />
          <span name="traffic">暂无数据,快去记一笔吧~</span>
        </div>
        <div class="dataDetail" v-else>
          <div v-for="(value,index) in finalBill" :key="index">
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
                <span class="tag-type">{{item.selectedTag.name}}</span>
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
export default {
  name: "Statistics",
  data() {
    return {
      falsy:false,
      currentAt: new Date(),
      currentIncome: 0,
      currentPay: 0,
      finalBill: []
    };
  },
  watch: {
    currentAt: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          const { recordList } = this;
          this.currentPay = 0;
          this.currentIncome = 0;
          if (!(recordList.length === 0)) {
            let currentMonthList = JSON.parse(
              JSON.stringify(recordList)
            ).filter(item => {
              if (
                //判断每条账单数据的年份和月份，筛选出当前月份的账单
                dayJs(item.createTime).get("month") ===
                  dayJs(this.currentAt).get("month") &&
                dayJs(item.createTime).get("year") ===
                  dayJs(this.currentAt).get("year")
              ) {
                return item;
              }
            });
            let dayList = [];
            currentMonthList.map(v => {
              const day = dayJs(v.createTime).get("date") - 1; //获取每条数据的日期，然后筛选出每一天的账单
              if (!dayList[day]) {
                dayList[day] = [];
                dayList[day].push(v);
              } else {
                dayList[day].push(v);
              }
            });
            dayList.map(everyDay => {
              everyDay.sort(
                (a, b) =>
                  dayJs(b.createTime).valueOf() - dayJs(a.createTime).valueOf()
                //根据时间将每一天的账单排序
              );
              everyDay.map(record => {
                if (record.type === "pay") {
                  this.currentPay += parseFloat(record.amount); //计算这个月的总支出
                } else if (record.type === "income") {
                  this.currentIncome += parseFloat(record.amount); //计算这个月的总收入
                }
              });
            });
            localStorage.setItem("finalBill", JSON.stringify(dayList));
            this.finalBill = dayList;
          }
        });
      }
    }
  },
  computed: {
    getMonth() {
      return dayJs(this.currentAt).get("month");
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
      return objMap[dayJs(this.currentAt).get("day")];
    },
    getYear() {
      return dayJs(this.currentAt).year();
    },
    recordList() {
      return this.$store.state.recordList;
    }
  },
  methods: {
    getDate(index) {
      let objMap = {
        "0": "日",
        "1": "一",
        "2": "二",
        "3": "三",
        "4": "四",
        "5": "五",
        "6": "六"
      };
      if (!this.finalBill[index]) {
        return;
      } else {
        return `${this.getMonth + 1}月${index+1}号 星期${
          objMap[dayJs(this.finalBill[index][0].createTime).get("day")]
        }`;
      }
    },
    getDayPay(arr) {
      if (!arr) return;
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
  .dataDetail {
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