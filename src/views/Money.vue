<template>
  <div class="money-warpper">
    <Types :value.sync="record.type" />
    <Tags :value="selectedTags" class="money-tags" @update:value="getSelectedTag" />
    <Note :value.sync="record.note" />
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />
  </div>
</template>

<script>
import Types from "@/components/money/Types.vue";
import Tags from "@/components/money/Tags.vue";
import Note from "@/components/money/Note.vue";
import NumberPad from "@/components/money/NumberPad.vue";

export default {
  name: "Money",
  components: {
    Types,
    Tags,
    Note,
    NumberPad
  },
  data() {
    return {
      recordList: JSON.parse(window.localStorage.getItem("recordList")) || [],
      record: {
        amount: 0,
        note: "",
        type: "pay",
        userSelectedTag: []
      },
      selectedTags: [
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
    getSelectedTag(value) {
      this.record.userSelectedTag = value;
    },
    saveRecord() {
      this.record.createTime = new Date();
      this.recordList.push(JSON.parse(JSON.stringify(this.record)));
      this.resetRecord();
    },
    resetRecord() {
      this.record = {
        amoun: 0,
        note: "",
        type: "pay",
        userSelectedTag: []
      };
    }
  },
  watch: {
    recordList() {
      window.localStorage.setItem(
        "recordList",
        JSON.stringify(this.recordList)
      );
    }
  },
  created() {
    console.log();
  }
};
</script>

<style lang="scss" scoped>
.money-warpper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .money-tags {
    flex-grow: 1;
  }
}
</style>