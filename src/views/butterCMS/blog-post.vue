<template>
  <div class="app-container">
    <div v-if="post.data">
      <h1>{{ post.data.title }}</h1>
      <el-tag v-for="(tag, index) in post.data.tags" :key="tag + '_' + index">{{tag.name}}</el-tag>
      <h4>By: {{ post.data.author.first_name }} {{ post.data.author.last_name }}</h4>
      <div v-html="post.data.body"></div>
      <hr>
      <el-button-group>
        <router-link v-if="post.meta.previous_post" :to="/blog/ + post.meta.previous_post.slug" class="button">
          <el-button type="primary" icon="el-icon-arrow-left">
            Pre: {{ post.meta.previous_post.title }}
          </el-button>
        </router-link>
        <router-link v-if="post.meta.next_post" :to="/blog/ + post.meta.next_post.slug" class="button">
          <el-button type="primary">
            Next: {{ post.meta.next_post.title }}
            <i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </router-link>
      </el-button-group>
    </div>
    <div v-else>No data</div>
  </div>
</template>

<script>
  import { butter } from '@/buttercms'

  export default {
    name: 'blogPost',
    created () {
      this.getPost()
      this.getCategories()
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
      },

      getCategories () {
        butter.category.list()
          .then((res) => {
            console.log('List of Categories:')
            console.log(res.data.data)
          })
      }
    },
    watch: {
      $route (to, from) {
        this.getPost()
        this.getCategories()
      }
    }
  }
</script>

<style scoped>

</style>
