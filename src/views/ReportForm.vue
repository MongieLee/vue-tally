<template>
  <Layout>
    <div class="top-bar">
      <div class="type">
        <span :class="{active:type==='pay'}" @click="heihei('pay')">支出</span>
        <span :class="{active:type==='income'}" @click="heihei('income')">收入</span>
      </div>

      <ul class="company-date">
        <!-- <li @click="change('week')" :class="{active:companyDate==='week'}">周</li> -->
        <li @click="change('month')" :class="{active:companyDate==='month'}">月</li>
        <!-- <li @click="change('year')" :class="{active:companyDate==='year'}">年</li> -->
      </ul>
    </div>
    <div>{{getText}}</div>
    <div>总支出：{{parseFloat(xxx).toFixed(2)}}</div>
    <div>平均支出：{{parseFloat(xxx/31).toFixed(2)}}</div>
    <div id="main"></div>
    <div>
      <span>消费占比</span>
      <div id="ppp" class="aaa"></div>
    </div>
    {{getBing}}
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
      xxx: 0,
      pingList: [] //[{value:1,name:'qqq'}]
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
    },
    getBing() {
      console.log("1111111111111111");
      let o = JSON.parse(JSON.stringify(this.recordList));
      if (o.length === 0) {
        return [{ value: 0, name: "暂无数据" }];
      }
      let q = {};
      o.map((v, index) => {
        let leixing = v.selectedTag.tagType;
        if (!q[leixing]) {
          q[leixing] = v.amount;
        } else {
          q[leixing] += parseFloat(v.amount);
        }
      });
      console.log("zeshiq:", q);
      let i = [];
      for (let key in q) {
        i.push({ value: q[key], name: key });
      }
      console.log(i);
      return i;
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
  console.log(this.getBing)
    //////////////////////////////////////////////
    var myChart2 = this.$echarts.init(document.getElementById("ppp"));
    myChart2.setOption({
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },

      visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
          colorLightness: [0, 1]
        }
      },
      series: [
        {
          backgroundColor: '#2c343c',
          name: "消费类型",
          type: "pie",
          radius: "55%",
          center: ["50%", "50%"],
          data:
            //  this.getBing,
            [
              { value: 334, name: "草拟" },
              { value: 222, name: "妈妈" }
            ],
          // [
          //   { value: 335, name: "直接访问" },
          //   { value: 310, name: "邮件营销" }
          // ],
          // .sort(function(a, b) {
          //   return a.value - b.value;
          // }),
          roseType: "radius",
          label: {
            color: "rgba(255, 255, 255, 0.3)"
          },
          labelLine: {
            lineStyle: {
              color: "rgba(255, 255, 255, 0.3)"
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          },
          itemStyle: {
            color: "#c23531"
          },

          animationType: "scale",
          animationEasing: "elasticOut",
          animationDelay: function(idx) {
            return Math.random() * 200;
          }
        }
      ]
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
#main {
  width: 100vw;
  height: 17vh;
}
.aaa {
  width: 100vw;
  height: 50vh;
  margin-top: -5vh;
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