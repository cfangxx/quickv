<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input :placeholder="'大屏名称'" v-model="listQuery.title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>

      <el-select v-model="listQuery.type" :placeholder="'发布状态'" clearable class="filter-item" style="width: 130px">
        <el-option v-for="(key, value) in publishTypeOptions" :key="key" :label="key" :value="value"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ '搜索' }}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ '新建' }}</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange">
      <el-table-column :label="'序号'" prop="id" align="center" width="60">
        <template slot-scope="scope">
          <span>{{ scope.row.sequenceNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'名称'" min-width="150px">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column :label="'时间'" width="150px" align="center">-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column :label="'链接'" min-width="250px">
        <template slot-scope="scope">
          <a class="link-type" :href="scope.row.url" target="_blank">{{ scope.row.url }}</a>
        </template>
      </el-table-column>
      <el-table-column :label="'状态'" class-name="status-col" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status ">{{ scope.row.status | statusFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="'操作'" align="center" width="400" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handlePreviewDashboard(scope.row.hash)">{{ '预览' }}</el-button>
          <el-button size="mini" type="success" @click="handleEdit(scope.row.hash)">{{ '编辑' }}</el-button>
          <el-button size="mini" type="warning" @click="handleModifyStatus(scope.row.hash,'draft')">{{ '克隆' }}</el-button>
          <el-button size="mini" type="info" @click="handleModifyPublish(scope.row.hash)">{{ '发布' }}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row,'deleted')">{{ '删除' }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!--新建大屏-->
    <el-dialog :title="'新建大屏'" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">

        <el-form-item :label="'名称'" prop="title">
          <el-input v-model="temp.name"/>
        </el-form-item>
        <el-form-item :label="'简介'">
          <el-input v-model="temp.description"/>
        </el-form-item>
        <el-form-item :label="'模板'">
          <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in 6" :key="item">
              <h3>{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ '取消' }}</el-button>
        <el-button type="primary" @click="dialogStatus===createData()">{{ '创建' }}</el-button>
      </div>
    </el-dialog>

    <!--发布管理-->
    <el-dialog :visible.sync="dialogPublish" :title="dialogPublishTitle">
      <el-radio-group v-model="dialogPublishStatus">
        <el-radio v-for="(value, key) in publishTypeOptions" :key="key" :label="key">{{ value }}</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPublish = false">{{ '取消' }}</el-button>
        <el-button type="primary" @click="dialogPublish = false">{{ '确定' }}</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { createDashboard, deleteDashboard } from '@/api/dashboard'
import waves from '@/directive/waves' // Waves directive
import { parseTime } from '@/scripts'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { mapGetters } from 'vuex'

const publishTypeOptions = {
  published: '已发布',
  unpublished: '未发布',
  developing: '开发中'
}
export default {
  name: 'ManageDashboard',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter (status) {
      return publishTypeOptions[status]
    }
  },
  computed: {
    ...mapGetters([
      'userRouters'
    ])
  },
  data () {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      publishTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      temp: {
        name: '',
        template: '',
        description: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      dialogPublish: false,
      dialogPublishTitle: '',
      dialogPublishStatus: '',
      downloadLoading: false
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.listLoading = true
      this.$store.dispatch('GetUserDashboardList', this.listQuery).then(response => {
        if (response.data.total > 0) {
          this.serialList(response.data.items)
        }
        this.list = response.data.items
        this.total = response.data.total || 0

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter () {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus (row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    handleModifyPublish (row) {
      this.dialogPublishTitle = '发布管理 - ' + row.name
      this.dialogPublishStatus = row.status
      this.dialogPublish = true
    },
    sortChange (data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID (order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp () {
      this.temp = {
        name: '',
        timestamp: Number(new Date()),
        status: 'developing',
        template: '',
        description: ''
      }
    },
    handleCreate () {
      this.resetTemp()
      this.dialogStatus = '新建大屏'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData () {
      this.$refs['dataForm'].validate((valid) => {
        console.log(this.temp)
        if (valid) {
          createDashboard(this.temp).then(response => {
            // 跳转到编辑页面
            this.$router.push('/edit/dashboard/' + response.hash)
          })
        }
      })
    },
    handleUpdate (row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleDelete: function (row) {
      deleteDashboard(row.hash).then(response => {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
        this.getList()
      })
    },
    handleDownload () {
      this.downloadLoading = true
      alert('下载')
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    handleEdit (hash) {
      this.$router.push('/edit/dashboard/' + hash)
    },
    handlePreviewDashboard (hash) {
      this.$router.push('/dashboard/' + hash)
    },
    serialList (list) {
      for (let i = 0; i < list.length; i++) {
        list[i]['sequenceNumber'] = i + 1
      }
    }
  }
}
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 100px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
