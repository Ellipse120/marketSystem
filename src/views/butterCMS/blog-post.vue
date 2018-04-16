<template>
    <div class="app-container">
      <span v-cloak>{{post}}</span>
      <h1>{{ post.data.title }}</h1>
      <h4>{{ post.data.author.first_name }} {{ post.data.author.last_name }}</h4>
      <div v-html="post.data.body"></div>

      <router-link v-if="post.meta.previous_post" :to="/blog/ + post.meta.previous_post.slug" class="button">
        {{ post.meta.previous_post.title }}
      </router-link>
      <router-link v-if="post.meta.next_post" :to="/blog/ + post.meta.next_post.slug" class="button">
        {{ post.meta.next_post.title }}
      </router-link>
    </div>
</template>

<script>
  import { butter } from '@/buttercms'

  export default {
    name: 'blogPost',
    created () {
      this.getPost()
    },
    data () {
      return {
        post: {}
      }
    },
    methods: {
      getPost () {
        butter.post.retrieve(this.$route.params.slug)
          .then(response => {
            this.post = response.data
          })
          .catch(res => console.log(res))
      }
    },
    watch: {
      $route (to, from) {
        this.getPost()
      }
    }
  }
</script>

<style scoped>

</style>
