<template>
    <div class="app-container">
      <h1>{{ postTitle }}</h1>
      <el-row type="flex" :gutter="6">
        <el-col :span="8" v-for="(post, index) in posts" :key="post.slug + '_' + index">
          <el-card>
            <router-link :to="'/blog/' + post.slug">
              <article class="media">
                <figure>
                  <img v-if="post.featured_image" :src="post.featured_image" :alt="post.summary" class="image">
                  <img v-else src="http://via.placeholder.com/250x125" alt="😍😙🙂🤔😑😏😮" class="image">
                </figure>
                <h2>{{ post.title }}</h2>
                <p>{{ post.summary}}</p>
                <time class="time">{{new Date(post.published).toLocaleTimeString()}}</time>
              </article>
            </router-link>
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import { butter } from '@/buttercms'

  export default {
    name: '',
    created () {
      this.lists()
    },
    data () {
      return {
        postTitle: 'Blog',
        posts: []
      }
    },
    methods: {
      lists () {
        butter.post.list({ page: 1, page_size: 10 }).then(response => {
          this.posts = response.data.data
        })
      }
    }
  }
</script>

<style scoped>
  .image {
    width: 100%;
    display: block;
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

</style>
