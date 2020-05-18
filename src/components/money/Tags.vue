<template>
  <div class="tags">
    <ul class="currentTags">
      <li
        v-for="(item,index) in tagsList"
        :key="index"
        @click="item.name==='添加'?addItem():selectedItem(item)"
        :class="{highlight:selectedTag[0].name===item.name}"
      >
        <Icon :name="item.iconName" />
        <span>{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import store from "@/store";
export default {
  name: "Tags",
  data() {
    return {};
  },
  methods: {
    addItem() {
      this.$router.push({ path: "/labels" });
    },
    selectedItem(tag) {
      if (this.selectedTag[0].name !== tag.name) {
        this.$store.commit("saveSelectedTag", tag);
      }
    }
  },
  computed: {
    tagsList() {
      return store.state.userSelectedTag;
    },
    selectedTag() {
      return store.state.defaultSelectedTag;
    }
  },
  mounted(){
    this.$store.commit('initUserTagList')
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
    span {
      font-size: 12px;
      margin-top: 5px;
    }
    .icon {
      border-radius: 50%;
      height: 40px;
      width: 40px;
      padding: 10px;
    }
    &.highlight {
      .icon {
        background: rgb(255, 218, 71);
      }
    }
  }
}
</style>