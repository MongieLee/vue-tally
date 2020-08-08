<template>
  <Layout>
    <div class="top-bar">
      <div class="type">
        <span :class="{active:type==='pay'}" @click="changeType('pay')">支出</span>
        <span :class="{active:type==='income'}" @click="changeType('income')">收入</span>
      </div>

      <ul class="company-date">
        <li @click="changeCompanyDate('week')" :class="{active:companyDate==='week'}">周</li>
        <li @click="changeCompanyDate('month')" :class="{active:companyDate==='month'}">月</li>
        <li @click="changeCompanyDate('year')" :class="{active:companyDate==='year'}">年</li>
      </ul>
    </div>

    <div class="class-wrapper">
      {{getTimeText}}
      <div>{{type==='pay'?'总支出：':'总收入：'}}{{parseFloat(totalAmount).toFixed(2)}}</div>
    </div>
    <chart style="height: 23vh;" :options="lineChartOption"></chart>
    <chart :options="pieChartOption"></chart>
  </Layout>
</template>

<script>
import dayJs from "dayjs";
import chart from "../components/Chart";
const timeMap = {
  week: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  month: [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31"
  ],
  year: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
};
export default {
  components: { chart },
  name: "ReportForm",
  data() {
    return {
      type: "pay",
      companyDate: "month",
      currentList: [],
      totalAmount: 0,
      lineData: [],
      pieData: [] //[{value:1,name:'qqq'}],
    };
  },
  methods: {
    changeType(type) {
      this.type = type;
      this.getChartData();
    },
    changeCompanyDate(string) {
      this.companyDate = string;
      this.getChartData();
    },
    getChartData() {
      let payOrIncomeList = []; //记录最终所有支出or收入金额结果数组
      this.totalAmount = 0;
      let type = this.type;
      const nullLineData = {
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
        this.lineData = nullLineData[this.companyDate];
        this.pieData = nullPieData;
        return;
      }
      //如果没有账单数据
      let newArr;

      const handleTypeList = {
        week: () => {
          newArr = [];
          let o = [];
          let xxx = dayJs()
            .startOf("week")
            .add(1, "day");
          for (let i = 0; i < 7; i++) {
            o.push(xxx.add(i, "day").valueOf());
          }
          allRecord.map(v => {
            o.indexOf(
              dayJs(v.createTime)
                .hour(0)
                .minute(0)
                .second(0)
                .millisecond(0)
                .valueOf()
            ) >= 0 && newArr.push(v);
          }); //筛选
          if (newArr.length === 0) {
            this.lineData = nullLineData[this.companyDate];
            this.pieData = nullPieData;
            return
          }
          let tempPieData = {};
          newArr.map(value => {
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
          }
          //---------------------------------------------
          for (let i = 0; i < 7; i++) {
            newArr.map(v => {
              //得到本月31天每一天的账单数据
              if (!payOrIncomeList[i]) {
                payOrIncomeList[i] = [];
              }
              if (dayJs(v.createTime).day() === i) {
                if (i === 0) {
                  payOrIncomeList[6].push(v);
                } else {
                  payOrIncomeList[i - 1].push(v);
                }
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
        month: () => {
          let newArr2 = [];
          newArr = [];
          allRecord.map(v => {
            dayJs(v.createTime).year() === dayJs(new Date()).year() &&
              newArr2.push(v);
          }); //筛选出账单类别中所有属于本年的账单newArr
          newArr2.map(v => {
            dayJs(v.createTime).month() === dayJs(new Date()).month() &&
              newArr.push(v);
          }); //筛选出账单类别中所有属于本月的账单newArr
          if (newArr.length === 0) {
            this.lineData = nullLineData[this.companyDate];
            this.pieData = nullPieData;
            return
          }
          let tempPieData = {};
          newArr.map(value => {
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
        year: () => {
          newArr = [];
          allRecord.map(v => {
            dayJs(v.createTime).year() === dayJs(new Date()).year() &&
              newArr.push(v);
          }); //筛选出账单类别中所有属于本年的账单newArr

          let tempPieData = {};
          newArr.map(value => {
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
          }

          //折线图
          for (let i = 0; i < 12; i++) {
            newArr.map(v => {
              //得到本月31天每一天的账单数据
              if (!payOrIncomeList[i]) {
                payOrIncomeList[i] = [];
              }
              if (dayJs(v.createTime).month() === i) {
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
        }
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
    },
    lineChartOption() {
      return {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            animation: false
          }
        },
        grid: {
          top: 5
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLine: { onZero: true },
          data: timeMap[this.companyDate]
        },
        yAxis: {
          show: false
        },
        series: [
          {
            name: this.type === "pay" ? "支出" : "收入",
            data: this.lineData,
            type: "line"
          }
        ]
      };
    },
    pieChartOption() {
      let legendData = [];
      this.pieData.map(v => {
        legendData.push(v.name);
      });
      return {
        title: {
          text: "占比程度",
          subtext: "实时更新",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: legendData
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
    }
  },
  mounted() {
    this.getChartData();
  },

  created() {
    this.$store.commit("initRecordList");
  }
};
</script>

<style lang="scss" scoped>
$base-color: rgb(255, 218, 71);
.class-wrapper {
  font-size: 14px;
  padding: 10px 0 3px 35px;
  div {
    color: #999;
  }
}
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
#pieChart {
  height: 42vh;
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