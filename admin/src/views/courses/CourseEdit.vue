<template>
  <div>
    <h3>{{ isNew ? '创建' : '编辑' }}集合</h3>
    <ele-form :form-data="data" :form-desc="fields" :request-fn="submit"></ele-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class CourseList extends Vue {
  @Prop(String) id!: string;

  data = {};
  fields = {
    name: { label: "集合名称", type: "input" },
    cover: { label: "封面", type: "input" }
  };

  get isNew() {
    return !this.id;
  }

  async fetch() {
    const res = await this.$http.get(`courses/${this.id}`);
    this.data = res.data;
  }
  async submit(data) {
    this.data = {};
    const url = this.isNew ? "courses" : `courses/${this.id}`;
    const method = this.isNew ? "post" : "put";
    await this.$http[method](url, data);
    this.$message.success("保存成功");
    this.$router.go(-1);
  }
  created() {
    !this.isNew && this.fetch();
  }
}
</script>

<style>
</style>