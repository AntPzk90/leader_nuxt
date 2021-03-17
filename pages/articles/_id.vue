<template>
  <div>
    <h1>
      some article <span>{{ this.$route.params.id }}</span>
    </h1>
  </div>
</template>

<script>
export default {
  name: "AppArticle"
};
</script>
