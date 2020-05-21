<template>
  <Layout>
    <div class="top-bar">
      <div class="type">
        <span :class="{active:type==='pay'}" @click="changeType('pay')">支出</span>
        <span :class="{active:type==='income'}" @click="changeType('income')">收入</span>
      </div>

      <ul class="company-date">
        <li @click="change('week')" :class="{active:companyDate==='week'}">周</li>
        <li @click="change('month')" :class="{active:companyDate==='month'}">月</li>
        <li @click="change('year')" :class="{active:companyDate==='year'}">年</li>
      </ul>
    </div>
    <div>{{getTimeText}}</div>
    <div>{{type==='pay'?'总支出：':'总收入：'}}{{parseFloat(totalAmount).toFixed(2)}}</div>
    <div>{{type==='pay'?'平均支出：':'平均收入：'}}{{parseFloat(totalAmount/31).toFixed(2)}}</div>
    <div id="lineChart"></div>
    <div>
      <div id="pieChart" class="aaa"></div>
    </div>
  </Layout>
</template>

<script>
import dayJs from "dayjs";
import myChart from "@/lib/echarts.js";

export default {
  name: "ReportForm",
  data() {
    return {
      type: "pay",
      companyDate: "month",
      currentList: [],
      totalAmount: 0,
      lineData: [],
      pieData: [] //[{value:1,name:'qqq'}]
    };
  },
  methods: {
    changeType(type) {
      this.type = type;
      this.getLineData();
      // this.getPieData();
      myChart.createLineChart("lineChart", this.companyDate, this.lineData);
      myChart.createPieChart("pieChart", this.pieData);
    },
    change(string) {
      this.companyDate = string;
    },
    getLineData() {
      let payOrIncomeList = []; //记录最终所有支出or收入金额结果数组
      this.totalAmount = 0;
      let type = this.type;
      const nullRecordObj = {
        week: [0, 0, 0, 0, 0, 0, 0],
        month: [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        year: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      };
      const nullPieData = [{ value: 0, name: "暂无数据" }];
      let allRecord = JSON.parse(JSON.stringify(this.recordList)); //获取所有账单数据
      if (allRecord.length === 0) {
        this.lineData = nullRecordObj[this.companyDate];
        this.pieData = nullPieData;
        return;
      }
      //如果没有账单数据
      let newArr = [];

      const handleTypeList = {
        week() {
        },
        month: () => {
          allRecord.map(v => {
            dayJs(v.createTime).month() === dayJs(new Date()).month() &&
              newArr.push(v);
          }); //筛选出账单类别中所有属于本月的账单newArr

          let tempPieData = {};
          newArr.map((value) => {
            console.log(value.type === type);
            if (value.type === type) {
              let valueType = value.selectedTag.tagType;
              if (tempPieData[valueType] === undefined) {
                tempPieData[valueType] = value.amount;
              } else {
                tempPieData[valueType] += value.amount;
              }
            }
          });
          if (Object.keys(tempPieData).length === 0) {
            this.pieData = nullPieData;
          } else {
            let pieList = [];
            for (let item in tempPieData) {
              pieList.push({ value: tempPieData[item], name: item });
            }
            this.pieData = pieList;
            console.log(this.pieData);
          }

          for (let i = 0; i < 31; i++) {
            newArr.map(v => {
              //得到本月31天每一天的账单数据
              if (!payOrIncomeList[i]) {
                payOrIncomeList[i] = [];
              }
              if (dayJs(v.createTime).date() === i + 1) {
                payOrIncomeList[i].push(v);
              }
            });
          }
          payOrIncomeList.map((v, index) => {
            //31天每一天的总金额
            if (v.length === 0) {
              payOrIncomeList[index] = 0; //没有数据则当天为0
            } else {
              let count = 0;
              v.map(value => {
                //遍历有数据的那天
                if (value.type === type) {
                  count += parseFloat(value.amount);
                }
              });
              payOrIncomeList[index] = count;
            }
          });
          payOrIncomeList.map(value => {
            this.totalAmount += value;
          });
          this.lineData = payOrIncomeList;
        },
        year() {}
      };
      handleTypeList[this.companyDate]();
    }
  },
  computed: {
    getTimeText() {
      let timeMap = {
        week: "本周",
        month: "本月",
        year: "今年"
      };
      return timeMap[this.companyDate];
    },
    recordList() {
      return this.$store.state.recordList;
    }
  },
  mounted() {
    this.getLineData();
    myChart.createLineChart("lineChart", this.companyDate, this.lineData);
    myChart.createPieChart("pieChart", this.pieData);
  },

  created() {
    this.$store.commit("initRecordList");
  }
};
</script>

<style lang="scss" scoped>
$base-color: rgb(255, 218, 71);
.top-bar {
  background-color: $base-color;
  padding: 11px 0;
  .type {
    text-align: center;
    margin-bottom: 10px;
    span {
      border: 1px #333 solid;
      padding: 5px;
      &.active {
        background-color: #333;
        color: $base-color;
      }
    }
  }
}
#lineChart {
  width: 100vw;
  height: 17vh;
}
#pieChart {
  width: 100vw;
  height: 50vh;
}
.company-date {
  display: flex;
  margin: 0 20px;
  text-align: center;
  li {
    width: 33.3333%;
    border: 1px #333 solid;
    &.active {
      background-color: #333;
      color: $base-color;
    }
  }
}
</style>