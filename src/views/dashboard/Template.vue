<template>
  <div class="app-container">

    <div class="template-list-cont">
      <div class="item-box"  @click="handleCreate">
        <div class="item-box-top">
          <div class="item-box-top-img">
            <i class="el-icon-plus plus-icon"/>
          </div>
        </div>
        <div class="item-box-bottom">
          <h4>新建模板</h4>
          <p>添加一个新的模板</p>
        </div>
      </div>
      <div class="item-box" v-for="item in tplList" :key="item.hash">
        <div class="item-box-top">
          <div class="item-box-top-img">
            <img :src="item.imgUrl | fullImgUrl">
          </div>
          <div class="item-box-top-icon">
            <i class="el-icon-edit" @click="handleEdit(item.hash)"></i>
            <i class="el-icon-delete" @click="handleDelete(item.hash)"></i>
          </div>
        </div>
        <div class="item-box-bottom">
          <h4>{{item.name}}</h4>
          <p>{{ item.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }} <span class="link-type" >{{ item.resolution }}</span></p>
        </div>
      </div>
    </div>

    <el-row style="display: none">
      <el-col :span="5">
        <el-card class="box-card-component" shadow="hover">
          <div slot="header" class="box-card-header"  @click="handleCreate">
            <i class="el-icon-plus" style="font-size:60px; margin:30% auto"/>
          </div>
          <div style="position:relative;">
            <span>新建模板</span>
            <div class="box-card-bottom">
              <span>添加一个新的模板</span>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="5" v-for="item in tplList" :key="item.hash" >
        <el-card class="box-card-component" shadow="hover">
          <div slot="header" class="box-card-header">
            <img :src="item.imgUrl | fullImgUrl">
            <div class="box-card-operation">
              <i class="el-icon-edit" @click="handleEdit(item.hash)"></i>
              <i class="el-icon-delete" @click="handleDelete(item.hash)"></i>
            </div>
          </div>
          <div style="position:relative;">
            <span>{{ item.name }}</span>
            <div class="box-card-bottom">
              <time class="time">{{ item.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</time>
              <span class="link-type" >{{ item.resolution }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

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
    handleDelete: function (hash) {
      deleteTemplate(hash).then(response => {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        // <!-- const index = this.list.indexOf(row) -->
        // <!-- this.list.splice(index, 1) -->
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
  .template-list-cont{
    width:100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .item-box{
    width: 250px;
    height:260px;
    margin: 0 20px 20px 0;
    box-sizing: border-box;
    border:1px solid #eee;
    /*background:#eee;*/
  }
  .item-box:hover{
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }
  .item-box-top{
    width:100%;
    height:180px;
    position: relative;
    border-bottom:1px solid #eee;
  }
  .item-box-top-img{
    width:100%;
    height: 100%;
    position: absolute;
    text-align: center;
    z-index: 0;
  }
  .item-box-top-img img{
    width:100%;
    height:100%;
    display: block;
  }
  .item-box-top-icon{
    position: absolute;
    display: none;
    z-index: 1;
    width:100%;
    height:100%;
    padding-top:30%;
    color:#fff;
    font-size: 26px;
    text-align: center;
    background: rgba(0,0,0,0.4);
  }
  .item-box-top-icon i{
    cursor: pointer;
  }
  .item-box-top:hover .item-box-top-img img{
    overflow: hidden;
    /*transform: scale(1.1, 1.1);*/
  }
  .item-box-top:hover .item-box-top-icon{
    display: block;
  }
  .plus-icon{
    font-size: 60px;
    font-weight: bold;
    margin-top:20%;
    color:#666;
  }
  .item-box-bottom{
    padding: 0 10px;
  }
  .item-box-bottom h4{
    font-size: 16px;
    margin:16px 0 0 0;
    font-weight: normal;
  }
  .item-box-bottom p{
    font-size:14px;
    margin:6px 0 0 0;
    color:#999;
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.box-card-component {
  width:250px;
  margin-left:8px;

  .box-card-header {
    position: relative;
    height: 150px;
    width: 150px;
    text-align: center;
    img {
      width: 100%;
      height: 100%;
      transition: all 0.2s linear;
      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
    }
  }
  .box-card-operation {
    position:absolute;
    bottom: 0;
    height: 30px;
    width: 100%;
    // background-color: #999;
    display:none;
    z-index: 1000;
  }
  .box-card-operation i{
    color: #606266;
    margin: 0 7px;
    font-size: 1.5em;
    cursor:pointer;
  }
  .box-card-header:hover .box-card-operation {
    display: block;
  }
  .box-card-bottom {
    margin-top: 13px;
    line-height: 12px;
    font-size: 13px;
    color: #999;
  }
}
</style>
