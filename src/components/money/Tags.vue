<template>
  <div class="tags">
    <ul class="current">
      <li v-for="item in tagsList" :key="item.id" @click="item.name==='add'?addItem():selectedItem()">
        <Icon :name="item.iconName" />
        {{item.name}}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: "Tags",
  data() {
    return {
      tagsList: [
        {
          id: 0,
          name: "衣",
          iconName: "money"
        },
        {
          id: 1,
          name: "食物",
          iconName: "money"
        },
        {
          id: 2,
          name: "住",
          iconName: "money"
        },
        {
          id: 3,
          name: "行",
          iconName: "money"
        },
        {
          id: 4,
          name: "add",
          iconName: "money"
        }
      ]
    };
  },
  methods: {
    addItem() {
      console.log("111");
    },
    selectedItem() {
        console.log('222')
    }
  }
};
</script>

<style lang="scss" scoped>
.current {
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
  }
}
</style>