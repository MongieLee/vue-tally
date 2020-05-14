<template>
  <div>
    <Types />
    <Tags />
  </div>
</template>

<script lang='ts'>
import Types from "@/components/money/Types.vue";
import Tags from "@/components/money/Tags.vue";

export default {
  name: "Money",
  components: {
    Types,
    Tags
  }
};
</script>