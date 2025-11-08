<style scoped lang="stylus">
@import '../styles/constants.styl'
@import '../styles/components.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'
@import '../styles/scrollbars.styl'

.root-page
  page-root()

  .header
    font-large()
    font-bold()
  .desc
    font-thin()
    font-small()

  .buttons-container
    block()
    display flex
    flex-direction column
    gap 15px
    .button-branch
      button()
</style>

<template>
  <div class="root-page">
    <header class="header">Выбор ветки</header>
    <p class="desc">Выберите ветку, которую вам сказал ведущий</p>

    <nav class="buttons-container">
      <button class="button-branch" @click="selectBranch('1')">1</button>
      <button class="button-branch" @click="selectBranch('2')">2</button>
      <button class="button-branch" @click="selectBranch('3')">3</button>
    </nav>
  </div>
</template>

<script lang="ts">
export default {
  components: {},

  data() {
    return {};
  },

  mounted() {},

  methods: {
    selectBranch(branch: string) {
      localStorage.setItem('branch', branch);
      this.$router.push({name: 'scan'});
    }
  },
};
</script>
