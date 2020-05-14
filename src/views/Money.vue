<template>
  <div class="money-warpper">
    <Types />
    <Tags class="money-tags" />
    <Note />
  </div>
</template>

<script lang='ts'>
import Types from "@/components/money/Types.vue";
import Tags from "@/components/money/Tags.vue";
import Note from "@/components/money/Note.vue";

export default {
  name: "Money",
  components: {
    Types,
    Tags,
    Note
  }
};
</script>

<style lang="scss" scoped>
.money-warpper{
  height: 100vh;
  display:flex;
  flex-direction:column;
  .money-tags{
    flex-grow:1;
  }
}
</style>