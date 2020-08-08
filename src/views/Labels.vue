<template>
  <div class="tags-wrapper">
    <div class="action-bar">
      <span @click="back">
        <Icon name="back" />
        <span class="backFont">请选择标签</span>
      </span>
      <span @click="submitTag">完成</span>
    </div>
    <div class="selectedTag">
      <span>
        <span>已选中标签：</span>
        <span>{{selectedTag.name}}</span>
      </span>
      <span>{{selectedTag.tagType}}</span>
    </div>
    <div class="tag-item-wrapper">
      <p>吃喝</p>
      <ul class="item-container">
        <li
          class="tagItem"
          v-for="(value,index) in allTagsList.foods"
          :key="index"
          :class="{highLight:value.name===selectedTag.name && value.tagType === selectedTag.tagType}"
          @click="changeSelected(value)"
        >
          <span>{{value.name}}</span>
          <Icon :name="value.iconName" />
        </li>
      </ul>

      <p>日常</p>
      <ul class="item-container">
        <li
          class="tagItem"
          v-for="(value,index) in allTagsList.life"
          :key="index"
          :class="{highLight:value.name===selectedTag.name && value.tagType === selectedTag.tagType}"
          @click="changeSelected(value)"
        >
          <span>{{value.name}}</span>
          <Icon :name="value.iconName" />
        </li>
      </ul>

      <p>娱乐</p>
      <ul class="item-container">
        <li
          class="tagItem"
          v-for="(value,index) in allTagsList.play"
          :class="{highLight:value.name===selectedTag.name && value.tagType === selectedTag.tagType}"
          :key="index"
          @click="changeSelected(value)"
        >
          <span>{{value.name}}</span>
          <Icon :name="value.iconName" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Label",
  data() {
    return {
      selectedTag: {
        id: 0,
        name: "餐饮",
        iconName: "food",
        tagType: "吃喝"
      }
    };
  },
  computed: {
    allTagsList() {
      return this.$store.state.allTagsList;
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    changeSelected(value) {
      this.selectedTag = value;
    },
    submitTag() {
      const currentTag = this.selectedTag;
      let tempB = true;
      this.$store.state.userSelectedTag.map(v => {
        if (v.name === currentTag.name && v.tagType === currentTag.tagType) {
          this.$message({
            message: "不能添加重复标签！",
            type: `error`,
            customClass: `changeWidth`,
          });
          tempB = false;
        }
      });
      if (tempB) {
        this.$store.commit("saveUserSelectedTag", currentTag);
        this.$router.go(-1);
      }
    }
  }
};
</script>
<style lang="scss">
.changeWidth {
  min-width: 30vw;
}
</style>
<style lang="scss" scoped>
.tags-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  .action-bar {
    background-color: rgb(255, 218, 71);
    font-size: 16px;
    display: flex;
    padding: 15px 10px;
    justify-content: space-between;
    .backFont {
      margin-left: 15px;
    }
  }
  .selectedTag {
    padding: 10px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px #ddd solid;
  }
  .tag-item-wrapper {
    overflow: auto;
    p {
      color: #6d6a6a;
      font-size: 14px;
      padding: 10px 0 15px;
      text-align: center;
    }
    flex-grow: 1;
    // flex-wrap: wrap;
    .item-container {
      display: flex;
      flex-wrap: wrap;
      .tagItem {
        width: 25%;
        display: flex;
        flex-direction: column-reverse;
        justify-content: center;
        align-items: center;
        padding: 10px;
        span {
          margin-top: 5px;
          font-size: 12px;
        }
      }
      .highLight {
        .icon {
          background: rgb(255, 218, 71);
        }
      }
      .icon {
        background: #f5f5f5;
        height: 40px;
        width: 40px;
        padding: 10px;
        border-radius: 50%;
      }
    }
  }
}
</style>