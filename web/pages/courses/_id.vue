<template>
  <div class="pa-3">
    <v-row>
      <v-col :md="8">
        <video :src="episode.file" width="100%" controls></video>
        <h3>{{ course.name }}</h3>
        <v-select
          v-model="currentIndex"
          :items="course.episodes.map((v, i) => ({ text: v.name, value: i }))"
        >
        </v-select>
      </v-col>
      <v-col :md="4">
        <comment-list :object="this.episode._id" type="Episode" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CommentList from '../../components/CommentList'

export default {
  components: {
    CommentList
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  computed: {
    episode() {
      return this.course.episodes[this.currentIndex]
    }
  },
  async asyncData({ params, $axios }) {
    const { id } = params
    const course = await $axios.$get(`courses/${id}`, {
      params: {
        query: { populate: 'episodes' }
      }
    })
    return {
      id,
      course
    }
  }
}
</script>

<style></style>
