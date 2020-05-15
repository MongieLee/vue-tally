<template>
  <div class="tags">
    <ul class="currentTags">
      <li
        v-for="item in tagsList"
        :key="item.id"
        @click="item.name==='add'?addItem():selectedItem(item)"
        :class="{highlight:selectedTag.indexOf(item)>=0}"
      >
        <Icon :name="item.iconName" />
        {{item.name}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Tags",
  data() {
    return {
      selectedTag: [],
      tagsList: this.value
    };
  },
  props: ["value"],
  methods: {
    addItem() {
      //   this.$router.push({ path: "/labels" });
      const input = window.prompt("输入新的标签名");
      if (input === "") {
        alert("请输入便签名");
      } else {
        const length = this.tagsList.length;
        this.tagsList[length - 1].id += 1;
        this.tagsList.splice(length - 1, 0, {
          id: this.tagsList.length - 1,
          name: input,
          iconName: "money"
        });
      }
    },
    selectedItem(tag) {
      const index = this.selectedTag.indexOf(tag);
      if (index >= 0) {
        this.selectedTag.splice(index, 1);
      } else {
        this.selectedTag = [];
        this.selectedTag.push(tag);
      }
    }
  },
  created() {
    this.selectedTag.push(this.value[0]);
    this.$emit("update:value", this.selectedTag);
  },
  watch: {
    selectedTag(newTag) {
      this.$emit("update:value", newTag);
    }
  }
};
</script>

<style lang="scss" scoped>
.currentTags {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 25%;
    padding: 8px;
    .icon {
      border-radius: 50%;
    }
    &.highlight {
      background: #ddd;
    }
  }
}
</style>