<template>
  <div class="content">
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <el-table :data="rightsList" :border="true" :stripe="true">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="权限ID" prop="permissionId"></el-table-column>
        <el-table-column label="权限名称" prop="name"></el-table-column>
        <el-table-column label="权限父ID" prop="pid"></el-table-column>
        <el-table-column
          label="权限所属服务"
          prop="apiService"
        ></el-table-column>
        <el-table-column label="权限方法名" prop="apiAction"></el-table-column>
        <el-table-column label="权限所属路径" prop="apiPath"></el-table-column>
        <el-table-column label="权限能级" prop="level" align="center">
          <template v-slot="scope">
            <el-tag v-if="scope.row.level === 0">一级</el-tag>
            <el-tag v-if="scope.row.level === 1" type="success">二级</el-tag>
            <el-tag v-if="scope.row.level === 2" type="warning">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
  
  <script>
export default {
  name: "Rights",
  data() {
    return {
      rightsList: [], //权限列表
    };
  },
  created() {
    this.getRightsList();
  },
  methods: {
    /* 获取权限列表 */
    async getRightsList() {
      const { data: res } = await this.$http.get("rights/list");
      if (res.code !== 200) {
        return this.$message.error("未获取到权限列表！");
      }
      this.rightsList = res.data;
    },
  },
};
</script>
  
  <style lang="less" scoped>
</style>