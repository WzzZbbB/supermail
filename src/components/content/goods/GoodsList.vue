<template>
  <div class="goods">
    <GoodListItem v-for="item in goods" :goods-item="item"/>
  </div>
</template>

<script>
import GoodListItem from "@/components/content/goods/GoodListItem";

export default {
  name: "GoodsList",
  props: {
    goods:{
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    GoodListItem
  }
}
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 3px;
  }
</style>