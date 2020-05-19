<template>
  <Layout>
    <div class="data-container">
      <div class="text-title">
        <span>大象记账</span>
      </div>
      <div class="time-and-count">
        <el-date-picker class="xxx" v-model="currentM" type="month" placeholder="选择月"></el-date-picker>
        <div>
          <span>收入:{{currentIncome}}</span>
          <span>支出:{{currentPay}}</span>
        </div>
      </div>

      <div>
        <div class="null-content" v-if="groupedList.length===0">
          <Icon name="add" />
          <span name="traffic">暂无数据</span>
        </div>
        <div v-else>
          <ul>
            <li class="list-item" v-for="(item,index) in groupedList" :key="index">
              <Icon :name="item.selectedTag.iconName" />
              <span class="tag-type">{{item.selectedTag.tagType}}</span>
              <span class="amount">{{item.type==='pay'?'-'+item.amount:item.amount}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import dayJs from "dayjs";
import "element-ui/lib/theme-chalk/index.css";

export default {
  name: "Statistics",
  data() {
    return {
      currentM: new Date(),
      currentIncome: 0,
      currentPay: 0
    };
  },
  computed: {
    recordList() {
      return this.$store.state.recordList;
    },
    groupedList() {
      const { recordList } = this;
      this.currentPay = 0;
      this.currentIncome = 0;
      let currentList = JSON.parse(JSON.stringify(recordList)).filter(item => {
        if (
          dayJs(item.createTime).get("month") ===
          dayJs(this.currentM).get("month")
        ) {
          return item;
        }
      });

      if (currentList.length !== 0) {
        currentList.map(v => {
          if (v.type === "pay") {
            this.currentPay += parseInt(v.amount);
          } else if (v.type === "income") {
            this.currentIncome += parseInt(v.amount);
          }
        });
      }

      return currentList;
    }
  },
  created() {
    this.$store.commit("initRecordList");
  }
};
</script>

<style lang="scss" scoped>
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
  width: 30vw;
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
  span{
    margin-right: 20px;
  }
}

.null-content {
  display: flex;
  flex-direction: column;
  color: #999;
  justify-content: center;
  align-items: center;
  height: 100%;
  .icon {
    width: 80px;
    height: 80px;
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