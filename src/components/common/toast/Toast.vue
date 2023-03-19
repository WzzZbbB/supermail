<template>
    <el-button :plain="true" @click="open2">成功</el-button>
</template>

<script>
export default {
  name: "Toast",
  methods: {
    success(message) {
      this.$message({
        message: message
      })
    },
    error(message) {
      this.$message.error(message);
    }
  }
}
</script>

<style scoped>

</style>