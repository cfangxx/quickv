<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input :placeholder="'模板名称'" v-model="listQuery.title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ '搜索' }}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ '新建模板' }}</el-button>
    </div>

    <el-table
      v-loading="tplListLoading"
      :key="tableKey"
      :data="tplList"
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

      <el-table-column :label="'缩略图'" width="170px">
        <template slot-scope="scope">
          <div class="thumb"><img :src="scope.row.imgUrl | fullImgUrl"  alt="" /></div>
        </template>
      </el-table-column>

      <el-table-column :label="'模板名称'" min-width="250px">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'分辨率'" width="110px" align="center">
        <template slot-scope="scope">
          <span class="link-type" >{{ scope.row.resolution }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'作者'" width="100px" align="center">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'创建时间'" width="150px" align="center">
      <template slot-scope="scope">
      <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
      </template>
      </el-table-column>

      <el-table-column :label="'级别'" class-name="status-col" width="100">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.level | levelFilter}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column :label="'操作'" align="center" width="180" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleEdit(scope.row.hash)">{{ '编辑' }}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row,'deleted')">{{ '删除' }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getTemplates" />

    <!--新建大屏-->
    <el-dialog :title="'新建模板'" :visible.sync="dialogFormVisible">
      <el-form ref="TplForm" :model="temp" :rules="createTplRules" label-position="top" label-width="70px" style="width: 500px; margin-left:50px;">

        <el-form-item :label="'模板名称'" prop="title">
          <el-input v-model="temp.name"/>
        </el-form-item>
        <el-form-item :label="'模板级别'">
          <el-select v-model="temp.level" class="filter-item" placeholder="请选择一个级别">
            <el-option v-for="item in levelOptions" :key="item.value" :label="item.text" :value="item.value"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ '取消' }}</el-button>
        <el-button type="primary" @click="dialogStatus===createSubmit()">{{ '创建' }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { fetchList, createTemplate, deleteTemplate } from '@/api/template'
import waves from '@/directive/waves' // Waves directive
// import { parseTime } from '@/scripts'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

const levelOptions = [
  { value: 0, text: '隐藏' },
  { value: 1, text: '公开' },
  { value: 2, text: '普通' },
  { value: 3, text: '中级' },
  { value: 4, text: '高级' }
]

const levelTypeKeyValue = levelOptions.reduce((acc, cur) => {
  acc[cur.value] = cur.text
  return acc
}, {})

export default {
  name: 'TemplateManage',
  components: { Pagination },
  directives: { waves },
  filters: {
    levelFilter (v) {
      return levelTypeKeyValue[v]
    },
    fullImgUrl (url) {
      return process.env.BASE_API + url
    }
  },
  computed: {
  },
  data () {
    const validateTplName = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('模板名称不能为空'))
      } else {
        callback()
      }
    }

    return {
      tableKey: 0,
      tplList: null,
      total: 0,
      tplListLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      levelOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      temp: {
        name: '',
        level: 1
      },
      dialogFormVisible: false,
      dialogStatus: '',
      createTplRules: {
        name: [{ required: true, trigger: 'blur', validator: validateTplName }]
      }
    }
  },
  created () {
    this.getTemplates()
  },
  methods: {
    getTemplates () {
      this.tplListLoading = true
      fetchList().then(response => {
        if (response.data.total > 0) {
          this.serialList(response.data.items)
        }
        this.tplList = response.data.items
        this.total = response.data.total || 0
        this.tplListLoading = false

        setTimeout(() => {
          this.tplListLoading = false
        }, 1 * 1000)
      }).catch(() => {
        setTimeout(() => {
          this.tplListLoading = false
        }, 1 * 1000)
      })
    },
    handleFilter () {
      this.listQuery.page = 1
      this.getTemplates()
    },
    handleModifyStatus (row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
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
        level: 1
      }
    },
    handleCreate () {
      this.resetTemp()
      this.dialogStatus = '新建模板'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['TplForm'].clearValidate()
      })
    },
    createSubmit () {
      this.$refs['TplForm'].validate((valid) => {
        if (valid) {
          createTemplate(this.temp).then(response => {
            // 跳转到编辑页面
            this.handleEdit(response.hash)
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
        this.$refs['TplForm'].clearValidate()
      })
    },
    handleDelete: function (row) {
      deleteTemplate(row.hash).then(response => {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
        this.getTemplates()
      })
    },
    handleEdit (hash) {
      this.$router.push({
        path: '/edit/dashboard/' + hash,
        query: {
          redirect: 'template'
        }
      })
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

  .thumb {
    width: 150px;
    height: 150px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }

  .thumb img {
    width: 100%;
    height: 100%;
  }
</style>
