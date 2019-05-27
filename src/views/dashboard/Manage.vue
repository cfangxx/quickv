<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input :placeholder="'大屏名称'" v-model="listQuery.title" clearable style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>

      <el-select v-model="listQuery.status" :placeholder="'发布状态'" clearable class="filter-item" style="width: 130px">
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
          <span class="link-type" @click="handleUpdate(scope.row)">{{ scope.row.config.title }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column :label="'时间'" width="150px" align="center">-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column :label="'链接'" min-width="250px">
        <template slot-scope="scope" >
          <div v-show="scope.row.publish.status === 'published'">
            <el-link type="primary" :href="scope.row.publish.hash | pubUrlFilter" target="_blank">{{ scope.row.publish.hash | pubUrlFilter }}</el-link>
            <el-tooltip effect="dark" content="复制" placement="bottom">
              <el-button size="mini" type="success" icon="el-icon-document" @click="handleCopy(scope.row.publish.hash, $event)" circle></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="下载" placement="bottom">
              <el-button size="mini" type="primary" icon="el-icon-download" @click="handleDownload(scope.row.publish.hash)" circle></el-button>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="'状态'" class-name="status-col" width="100">
        <template slot-scope="scope">
          <el-tooltip :disabled="scope.row | needRepublish" content="内容已更新, 未重新发布" placement="bottom">
            <el-badge is-dot style="margin-top: 3px;" :hidden="scope.row | needRepublish">
              <el-tag :type="scope.row.publish.status">{{ scope.row.publish.status | statusFilter}}</el-tag>
            </el-badge>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column :label="'操作'" align="center" width="400" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handlePreview(scope.row.hash)">{{ '预览' }}</el-button>
          <el-button size="mini" type="success" @click="handleDesign(scope.row.hash)">{{ '编辑' }}</el-button>
          <el-button size="mini" type="info" @click="showPublishDialog(scope.row)">{{ '发布' }}</el-button>
          <el-button size="mini" type="warning" @click="handleClone(scope.row.hash, scope.row.config.title)">{{ '克隆' }}</el-button>

          <div style="display:inline-block; padding-left:10px">
            <el-popover  placement="bottom" width="200" :ref="`popover-${scope.$index}`">
              <p>确定要删除大屏 {{ scope.row.config.title }} 吗?</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="scope._self.$refs[`popover-${scope.$index}`].doClose()">取消</el-button>
                <el-button size="mini" type="primary" @click="scope._self.$refs[`popover-${scope.$index}`].doClose() === handleDelete(scope.row)">确定</el-button>
              </div>
              <el-button size="mini" type="danger" slot="reference">{{ '删除' }}</el-button>
            </el-popover>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!--新建大屏-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" v-model="createTable" label-position="top" label-width="70px">
        <el-form-item :label="'大屏名称'" placeholder="请输入大屏名称" prop="title">
          <el-input v-model="createTable.name"/>
        </el-form-item>

        <el-form-item :label="'选择模板'" v-show="this.templateList">
          <template-list :templates="templateList"
                         @onselect="onSelectTemplate">
          </template-list>
        </el-form-item>

        <el-form-item :label="'大屏简介'">
          <el-input type="textarea" :rows="3" placeholder="请填写关于大屏的描述信息" v-model="createTable.about"/>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ '取消' }}</el-button>
        <el-button type="primary" @click="createSubmit()">{{ '创建' }}</el-button>
      </div>
    </el-dialog>

    <!--发布管理-->
    <el-dialog :visible.sync="dialogPublish" :title="dialogPublishTitle">
      <el-radio-group v-model="dialogPublishStatus">
        <el-radio label="unpublish">{{"停止发布"}}</el-radio>
        <el-radio label="published">{{"公开发布"}}</el-radio>
        <el-radio v-show="dialogPublishStatus == 'published'" label="republish">{{"重新发布"}}</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPublish = false">{{ '取消' }}</el-button>
        <el-button type="primary" @click="dialogPublish = handlePublish()">{{ '确定' }}</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { createDashboard, deleteDashboard, publishDashboard, downloadDashboard } from '@/api/dashboard'
import { mapGetters } from 'vuex'
import { fetchList } from '@/api/template'

import waves from '@/directive/waves' // Waves directive
import TemplateList from '@/components/Dashboard/Template'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import clip from '@/scripts/clipboard'

const publishTypeOptions = {
  published: '已发布',
  unpublish: '未发布'
}

export default {
  name: 'ManageDashboard',
  components: { Pagination, TemplateList },
  directives: { waves },
  filters: {
    statusFilter (status) {
      return publishTypeOptions[status] || '未发布'
    },
    pubUrlFilter (hash) {
      return hash ? window.location.protocol + '//' + window.location.host + '/dashboard/' + hash : ''
    },
    needRepublish (row) {
      return row.publish.status !== 'published' || row.config.timestamp <= row.publish.timestamp
    }

  },
  data () {
    return {
      delPopover: false,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        title: undefined,
        status: undefined
      },
      publishTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      createTable: {},
      templateList: null,
      dialogTitle: '',
      dialogFormVisible: false,
      dialogPublish: false,
      dialogPublishTitle: '',
      dialogPublishStatus: '',
      dialogPublishHash: '',
      downloadLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'userRouters'
    ])
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
    showPublishDialog (row) {
      this.dialogPublishTitle = '发布管理 - ' + row.config.title
      this.dialogPublishStatus = row.publish.status
      this.dialogPublishHash = row.hash
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
    handleCopy (text, event) {
      const pubUrlFilter = this.$options.filters['pubUrlFilter']

      clip(pubUrlFilter(text), event)
    },
    resetTemp () {
      this.createTable = {
        name: '',
        timestamp: Number(new Date()),
        template: 'blank',
        about: '',
        mode: 'create'
      }
    },
    handleCreate () {
      fetchList().then(response => {
        this.templateList = response.data.items
      })

      this.resetTemp()
      this.dialogTitle = '新建大屏'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleClone (hash, title) {
      this.resetTemp()
      this.templateList = null
      this.dialogTitle = '大屏克隆 - <' + title + '>'

      this.createTable.template = hash
      this.createTable.mode = 'clone'

      this.dialogFormVisible = true
    },
    createSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createDashboard(this.createTable).then(response => {
            // 跳转到编辑页面
            this.$router.push('/edit/dashboard/' + response.hash)
          })
        }
      })
    },
    handleUpdate (row) {
      this.createTable = Object.assign({}, row) // copy obj
      this.createTable.timestamp = new Date(this.createTable.timestamp)
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
    handleDownload (hash) {
      this.downloadLoading = true
      // alert('下载')
      downloadDashboard(hash).then(response => {
        if (response.code === 0) {
          console.log(response)
          window.location = process.env.BASE_API + '/' + response.data
        }
      })
    },
    handlePublish () {
      publishDashboard(this.dialogPublishHash, this.dialogPublishStatus).then(response => {
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })

        this.getList()
      })
    },
    handleDesign (hash) {
      this.$router.push('/edit/dashboard/' + hash)
    },
    handlePreview (hash) {
      const routeUrl = this.$router.resolve({
        path: '/preview/' + hash
      })

      window.open(routeUrl.href, '_blank')
    },
    serialList (list) {
      for (let i = 0; i < list.length; i++) {
        list[i]['sequenceNumber'] = i + 1
      }
    },
    onSelectTemplate: function (data) {
      this.createTable.template = data.hash
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
