<template>
    <div class="app-container">
      <h1>{{ postTitle }}</h1>
      <div>
        <el-row type="flex" :gutter="6" class="wrapper">
          <el-col :span="8" v-for="(post, index) in posts" :key="post.slug + '_' + index" class="container">
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
        <div class="page">
          <h4>Hover the card</h4>
          <ul>
            <li> <<< </li>
            <li> >>> </li>
          </ul>
        </div>
      </div>
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

  .wrapper {
    align-items: center;
  }

  .container {
    height: 100%;
    transition: .5s all ease;
    transform: rotateX(60deg) scale(.8);
    perspective: 900px;
    -webkit-perspective: 900px;
    box-shadow: 0 20px 50px chartreuse;
    animation: entry 1s linear 1;
  }

  .container:hover {
    cursor: pointer;
    transform: rotate(0deg) scale(1) translateY(10px);
    transition: .5s all ease;
    z-index: 400;
  }

  .page {
    position: absolute;
    top: 95%;
    width: 100%;
    left: 0;
    height: 20%;
    z-index: 30;
  }

  li {
    position: absolute;
    top: 50%;
    list-style: none;
    color: #111;
  }

  li:nth-child(1) {
    left: 45%;
    animation: simple1 1s linear infinite;
  }

  li:nth-child(2) {
    right: 35%;
    animation: simple2 1s linear infinite;
  }

  h4 {
    color: #111;
    position: absolute;
    top: 30%;
    left: 50%;
    letter-spacing: 2px;
  }

  @keyframes entry {
    0% {
      top: -20%;
      opacity: 0.1;
    }
    100% {
      top: 0;
    }
  }

  @keyframes simple1 {
    50% {
      transform: translateX(10px);
      opacity: .5;
    }
    100% {
      transform: translateX(10px);
      opacity: 0;
    }
  }

  @keyframes simple2 {
    50% {
      transform: translateX(-10px);
      opacity: .5;
    }
    100% {
      transform: translateX(-10px);
      opacity: 0;
    }
  }

</style>
