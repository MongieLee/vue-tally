<template>
  <div class="tags-wrapper">
    <div class="action-bar">
      <span @click="back">
        <Icon name="back" />
        <span>请选择标签</span>
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
          v-for="value in allTagsList.foods"
          :class="{highLight:selectedTag.name===value.name&&selectedTag.tagType===value.tagType}"
          :key="value.id"
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
          v-for="value in allTagsList.life"
          :key="value.id"
          :class="{highLight:selectedTag.name===value.name&&selectedTag.tagType===value.tagType}"
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
          v-for="value in allTagsList.play"
          :key="value.id"
          :class="{highLight:selectedTag.name===value.name&&selectedTag.tagType===value.tagType}"
          @click="changeSelected(value)"
        >
          <span>{{value.name}}</span>
          <Icon :name="value.iconName" />
        </li>
      </ul>
    </div>
    {{selectedTag}}
  </div>
</template>

<script>
import userTagsModel from "@/models/userTagsModel.js";
import allTagsModel from "@/models/allTagsModel.js";
allTagsModel.init();
const allTagsList = allTagsModel.fetch();

export default {
  name: "Label",
  data() {
    return {
      allTagsList,
      selectedTag: allTagsModel.defalutTag
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    changeSelected(value) {
      this.selectedTag = value;
    },
    submitTag() {
      const currentTagsList = userTagsModel.fetch();
      let q = true;
      currentTagsList.map(m => {
        console.log(m);
        if (
          m.name === this.selectedTag.name &&
          m.tagType === this.selectedTag.tagType
        ) {
          alert("不能重复添加标签");
          q = false;
        }
      });
      console.log(q);
      if (!q) {
        return;
      }
      currentTagsList[currentTagsList.length - 1].id += 1;
      this.selectedTag.id = currentTagsList.length - 2;
      currentTagsList.splice(currentTagsList.length - 1, 0, this.selectedTag);
      userTagsModel.save(JSON.stringify(currentTagsList));
      this.$router.push("/money");
    }
  },
  created() {
    for (let value in this.allTagsList) {
      this.allTagsList[value].map(item => {
        if (item.name === this.selectedTag.name) {
          this.selectedTag = item;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.tags-wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .action-bar {
    background-color: #f88;
    font-size: 20px;
    display: flex;
    padding: 10px;
    justify-content: space-between;
  }
  .selectedTag {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px #ddd solid;
  }
  .tag-item-wrapper {
    overflow: auto;
    p {
      color: #6d6a6a;
      font-size: 14px;
      padding: 10px 0 20px;
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
        padding: 20px;
      }
      .highLight {
        color: blue;
      }
    }
  }
}
</style>