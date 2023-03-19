<template>
  <div id="detail-navbar">
    <nav-bar>
      <div slot="left" class="title-left" @click="back">
        <img src="~assets/img/common/back.svg" />
      </div>
      <div slot="center" class="title-center">
        <div v-for="(item,index) in title"
             class="title"
             @click="itemClick(index)"
             :class="{active:currentIndex===index}">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      title: ['商品','参数','评论','推荐'],
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('itemClick',index);
    },
    back() {
      this.$router.back();
    }
  }
}
</script>

<style scoped>
  .title-center {
    display: flex;
    font-size: 15px;
  }

  .title {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }

  .title-left img{
    width: 40%;
    vertical-align: middle;
  }

</style>