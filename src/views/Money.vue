<template>
  <div class="money-warpper">
    <Types :value.sync="record.type" />
    <Tags class="money-tags" />
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
      recordList: [],
      record: {
        amount: 0,
        note: "",
        type: "pay",
        selectedTag: null
      }
    };
  },
  computed: {
    userSelectedTag() {
      return this.$store.state.defaultSelectedTag[0];
    }
  },
  methods: {
    saveRecord() {
      this.record.selectedTag = this.userSelectedTag;
      this.record.amount = Math.abs(this.record.amount)
      this.record.createTime = new Date();
      this.recordList.push(JSON.parse(JSON.stringify(this.record))); //深拷贝
      this.$store.commit('saveRecordList',this.recordList)
      this.resetRecord();
      this.$router.push('/statistics')
    },
    resetRecord() {
      this.record = {
        amount: 0,
        note: "",
        type: "pay",
        selectedTag: null
      };
    }
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