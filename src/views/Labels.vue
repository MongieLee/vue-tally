<template>
  <div class="tags-wrapper">
    <div class="action-bar">
      <span>返回::请选择标签</span>
      <span>完成</span>
    </div>
    <div class="selectedTag">
      <span>
        <span>选中标签：</span>
        <span>名字</span>
      </span>
      <span>所属类别</span>
    </div>
    <div class="tag-item-wrapper">
      <p>吃喝</p>
      <ul class="item-container">
        <li class="tagItem" v-for="value in tagsList.food" :key="value.id">
          <span>{{value.name}}</span>
          <Icon :name="value.iconName" />
        </li>
      </ul>

      <p>玩乐</p>
      <ul class="item-container">
        <li class="tagItem" v-for="value in tagsList.play" :key="value.id">
          <span>{{value.name}}</span>
          <Icon :name="value.iconName" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang='ts'>
import tagsModel from "@/models/userTagsModels.js";
import allTagsModel from "@/models/allTagsModel.js";
allTagsModel.init();
const tagsList = allTagsModel.fetch();

export default {
  name: "Label",
  data() {
    return {
      tagsList,
      selected: null
    };
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
    }
  }
}
</style>