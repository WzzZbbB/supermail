<template>
  <div class="cart-list">
    <scroll class="content" :probe-type="3" :pull-up-load="true" ref="scroll">
      <cart-list-item
          v-for="(item,index) in list"
          :key="index"
          :product="item"/>
    </scroll>
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";
import CartListItem from "@/views/cart/childComps/CartListItem";

import {mapGetters} from 'vuex'

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters({
      list: "cartList"
    })
  },
  activated() {
    this.$refs.scroll.scroll.refresh();
  }
}
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px - 40px)
  }

  .content {
    height: 100%;
    overflow: hidden;
  }
</style>