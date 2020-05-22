<template>
  <Layout>
    <div class="top-bar">
      <div class="type">
        <span @click="heihei('pay')">支出</span>
        <span @click="heihei('income')">收入</span>
      </div>

      <ul class="company-date">
        <li @click="change('week')" :class="{active:companyDate==='week'}">周</li>
        <li @click="change('month')" :class="{active:companyDate==='month'}">月</li>
        <li @click="change('year')" :class="{active:companyDate==='year'}">年</li>
      </ul>
    </div>
    <div>{{getText}}</div>
    <div>总支出：{{xxx}}</div>
    <div>平均支出：{{parseFloat(xxx/31).toFixed(2)}}</div>
    <div id="main"></div>
    <div>
      <span>消费占比</span>
    </div>
  </Layout>
</template>

<script>
import dayJs from "dayjs";
export default {
  name: "ReportForm",
  data() {
    return {
      type: "pay",
      companyDate: "month",
      currentList: [],
      xxx: 0
    };
  },
  methods: {
    heihei(s) {
      this.type = s;
      var myChart = this.$echarts.init(document.getElementById("main"));
      // 绘制图表
      myChart.setOption(
        {
          title: {},
          tooltip: {
            trigger: "axis",
            axisPointer: {
              animation: false
            }
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            axisLine: { onZero: true },
            data: [
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
            ]
          },
          yAxis: {
            show: false
          },
          series: [{ name: "收入", data: this.getCurrentList, type: "line" }]
        },
        true
      );
    },
    change(string) {
      this.companyDate = string;
    }
  },
  computed: {
    getText() {
      let o = {
        week: "本周",
        month: "本月",
        year: "今年"
      };
      return o[this.companyDate];
    },
    recordList() {
      return this.$store.state.recordList;
    },
    getCurrentList() {
      this.xxx = 0;
      let type = this.type; //获取统计类别
      console.log(this.type);
      let m = JSON.parse(JSON.stringify(this.recordList)); //获取所有账单数据

      let o = []; //最终支出||收入金额结果数组
      let newArr = [];
      if (m.length === 0) {
        for (let i = 0; i < 31; i++) {
          o[i] = 0;
        }
        return o; //如果没有数据则返回空的数据
      }

      if (this.companyDate === "month") {
        m.map(v => {
          dayJs(v.createTime).month() === dayJs(new Date()).month() &&
            newArr.push(v);
        }); //筛选出账单类别中所有属于本月的账单

        for (let i = 0; i < 31; i++) {
          newArr.map(v => {
            //得到本月31天每一天的账单数据
            if (!o[i]) {
              o[i] = [];
            }
            if (dayJs(v.createTime).date() === i + 1) {
              o[i].push(v);
            }
          });
        }
        o.map((v, index) => {
          //31天每一天的总金额
          if (v.length === 0) {
            o[index] = 0;
          } else {
            let count = 0;
            v.map(q => {
              if (q.type === this.type) {
                count += parseFloat(q.amount);
              }
            });
            o[index] = count;
          }
        });
        console.log(o);
        o.map(a => {
          this.xxx += a;
        });
      }
      return o;
    }
  },
  mounted() {
    var myChart = this.$echarts.init(document.getElementById("main"));
    // 绘制图表
    myChart.setOption({
      title: {},
      tooltip: {
        trigger: "axis",
        axisPointer: {
          animation: false
        }
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        axisLine: { onZero: true },
        data: [
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
        ]
      },
      yAxis: {
        show: false
      },
      series: [{ name: "支出", data: this.getCurrentList, type: "line" }]
    });
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
  }
}
#main {
  width: 100vw;
  height: 200px;
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