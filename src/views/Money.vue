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
import rocordModel from "@/models/recordModel.js";
import tagsModel from "@/models/userTagsModels.js";
const recordList = rocordModel.fetch() || [];
tagsModel.init();
const selectedTags = tagsModel.fetch();

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
      recordList,
      record: {
        amount: 0,
        note: "",
        type: "pay",
        userSelectedTag: []
      },
      selectedTags
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
      rocordModel.save(this.recordList);
    }
  },
  created() {
    // if(localStorage.getItem(''))
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