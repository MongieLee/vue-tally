<template>
  <div class="note-wrapper">
    <label for="note">备注：</label>
    <input id="note" type="text" autocomplete="off" v-model="noteText" placeholder="点击填写备注..." />
    {{note}}
  </div>
</template>

<script>
export default {
  name: "Note",
  data() {
    return {
      noteText: this.note
    };
  },
  props: ["note"],
  watch:{
      noteText(newText){
          this.$emit('update:value',newText)
      }
  }
};
</script>

<style lang="scss" scoped>
.note-wrapper {
  padding: 3px 10px 3px 15px;
  display: flex;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  input {
    margin-left: 10px;
    flex-grow: 1;
    border: none;
    padding: 5px 3px;
    background: transparent;
  }
}
</style>