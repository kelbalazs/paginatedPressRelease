<template>
  <div>
    <div v-html="article" />
  </div>
</template>

<script>
export default {
  name: 'article-details',
  props: ['article']
}
</script>

<style>

</style>
