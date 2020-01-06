<template>
  <div>
    <avue-crud
      v-if="option.column"
      :data="data.data"
      :option="option"
      :page="page"
      @row-save="create"
      @row-update="update"
      @row-del="remove"
      @on-load="changePage"
      @sort-change="changeSort"
      @search-change="search"
    ></avue-crud>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class ResourceList extends Vue {
  @Prop(String) resource!: string;
  data: any = {};
  option: any = {
    // column: []
  };
  page: any = {
    total: 0,
    pageSize: 10,
    pageSizes: [2, 5, 10]
  };
  query: any = {
    limit: 10
  };
  async changePage({ pageSize, currentPage }) {
    this.query.page = currentPage;
    this.query.limit = pageSize;
    this.fetch();
  }
  async fetch() {
    const res = await this.$http.get(`${this.resource}`, {
      params: {
        query: this.query
      }
    });
    this.page.total = res.data.total;
    this.data = res.data;
  }
  async fetchOption() {
    const res = await this.$http.get(`${this.resource}/option`);
    this.option = res.data;
  }
  async create(row, done, loading) {
    await this.$http.post(`${this.resource}`, row);
    this.$message.success("保存成功");
    this.fetch();
    done();
  }
  async update(row, index, done, loading) {
    const model = JSON.parse(JSON.stringify(row));
    delete model.$index;
    // delete model.$course;
    await this.$http.put(`${this.resource}/${row._id}`, model);
    this.$message.success("更新成功");
    this.fetch();
    done();
  }
  async remove(row) {
    try {
      await this.$confirm("是否确认删除", "提示");
      await this.$http.delete(`${this.resource}/${row._id}`);
      this.$message.success("删除成功");
      this.fetch();
    } catch (e) {
      return;
    }
  }
  changeSort({ prop, order }) {
    if (!order) {
      this.query.sort = null;
    } else {
      this.query.sort = {
        [prop]: order === "ascending" ? 1 : -1
      };
    }
    this.fetch();
  }
  async search(where) {
    for (let k in where) {
      const filed = this.option["column"].find(v => v.prop === k);
      if (filed.regex) {
        where[k] = { $regex: where[k] };
      }
    }
    this.query.where = where;
    this.fetch();
  }
  created() {
    this.fetchOption();
    this.fetch();
  }
}
</script>

<style></style>
