<template>
  <Layout>
    <div>
      <div class="record-title">
        <Icon class="qqq" :name="recordItem.selectedTag.iconName" />
        <span>{{recordItem.selectedTag.name}}</span>
        <span class="click-item" @click="back">
          <Icon name="back" class="hh" />
        </span>
      </div>
      <div class="info-wrapper">
        <div>
          <span class="info-title">类型：</span>
          {{recordItem.type}}
        </div>
        <div>
          <span class="info-title">金额：</span>
          {{recordItem.amount}}
        </div>
        <div>
          <span class="info-title">时间：</span>
          {{createTime}}
        </div>
        <div>
          <span class="info-title">备注：</span>
          {{recordItem.note}}
        </div>
      </div>
      <div class="delete">
        <button @click="deleteItem">删除</button>
      </div>
    </div>
  </Layout>
</template>

<script>
import dayJs from "dayjs";

export default {
  data() {
    return {
      recordItem: null
    };
  },
  computed: {
    createTime() {
      return dayJs(this.recordItem.createTime).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  created() {
    this.$store.commit("initRecordList");
    const { day, id } = this.$route.params;
    this.recordItem = JSON.parse(localStorage.getItem("paihaoxude"))[day][id];
    this.recordItem.type === "income"
      ? (this.recordItem.type = "收入")
      : (this.recordItem.type = "支出");
    if (this.recordItem.note === "") this.recordItem.note = "-";
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    deleteItem() {
      this.$confirm("此操作将永久删除该账单记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let arr = JSON.parse(localStorage.getItem("recordList"));

          arr.map(v => {
            if (
              dayJs(v.createTime).valueOf() ===
              dayJs(this.recordItem.createTime).valueOf()
            ) {
              arr.splice(arr.indexOf(v), 1);
            }
          });
          localStorage.setItem("recordList", JSON.stringify(arr));
          this.$router.go(-1);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="scss">
.el-message-box {
  width: 300px;
}
.el-button--primary,
.el-button--primary:hover {
  background-color: red;
  border: none;
}
</style>
<style lang="scss" scoped>
::v-deep .el-message-box {
  width: 200px;
}
.record-title {
  font-size: 17px;
  padding: 6px 0;
  background-color: rgb(255, 218, 71);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  .qqq {
    width: 40px;
    height: 40px;
    background-color: #fff;
    padding: 5px;
    border-radius: 50%;
    margin-bottom: 5px;
  }
  .click-item {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    .icon {
      width: 30px;
      height: 30px;
    }
  }
}
.info-wrapper {
  font-size: 16px;
  .info-title {
    color: #a6a6a6;
  }
  div {
    margin-left: 20px;
    margin-right: 5px;
    border-bottom: 1px #f5f5f5 solid;
    padding: 10px 0;
  }
}
.delete {
  button {
    min-width: 100%;
    border: none;
    padding: 10px;
    background-color: transparent;
    border-bottom: 1px #f5f5f5 solid;
  }
}
</style>