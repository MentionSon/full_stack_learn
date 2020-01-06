<template>
  <div>
    <h3>视频集合列表</h3>
    <div>
      <el-button type="success" @click="$router.push('/courses/create')">创建集合</el-button>
    </div>
    <el-table :data="data.data" border stripe>
      <el-table-column
        v-for="(field, name) in fields"
        :prop="name"
        :key="name"
        :label="field.label"
        :width="field.width"
      ></el-table-column>
      <el-table-column label="操作" :width="200">
        <template v-slot="{row}">
          <el-button
            type="success"
            size="small"
            @click="$router.push(`/courses/edit/${row._id}`)"
          >编辑</el-button>
          <el-button type="danger" size="small" @click="remove(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class CourseList extends Vue {
  data = {};
  fields = {
    _id: { label: "ID" },
    name: { label: "集合名称" },
    cover: { label: "封面" }
  };
  async fetch() {
    const res = await this.$http.get("courses");
    this.data = res.data;
  }
  async remove(row) {
    try {
      await this.$confirm("是否确认删除", "提示");
      await this.$http.delete(`courses/${row._id}`);
      this.$message.success("删除成功");
      this.fetch();
    } catch (e) {
      return;
    }
  }
  created() {
    this.fetch();
  }
}
</script>

<style>
</style>