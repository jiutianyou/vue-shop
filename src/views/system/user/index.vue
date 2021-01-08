<template>
  <div>
    <User v-if='$route.params.type === "list"'/>
    <keep-alive>
      <Main v-if='$route.params.type === "index"'/>
    </keep-alive>
  </div>
</template>
<script>
import User from './User'
import Main from './Main'
export default {
  components: {
    User,
    Main
  }
}
</script>
