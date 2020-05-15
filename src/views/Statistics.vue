<template>
  <Layout>这是Statistics{{test}}</Layout>
  
</template>

<script lang='ts'>
export default {
  name: "Statistics",
  data(){
    return {
      test:window.localStorage.getItem('recordList')
    }
  }
};
</script>