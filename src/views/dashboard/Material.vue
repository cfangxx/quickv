<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input :placeholder="'数据表名称 表头名称'" v-model="listQuery.title" clearable style="width: 200px;" class="filter-item" @keyup.enter.native="handleSearch"/>

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleSearch">{{ '搜索' }}</el-button>
      <input ref="excel-upload-input" class="excel-upload-input" type="file" accept=".csv" @change="handleClick">
      <el-button class="filter-item" style="margin-left:16px;" type="primary" @click="handleUpload">新建表格</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="materialDataList"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column :label="'序号'" type="index" align="center" width="60" />
      <el-table-column :label="'数据表名称'" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'表头'" min-width="250px">
        <template slot-scope="scope">
          <span>{{ scope.row.title.join('， ') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'操作'" align="center" class-name="small-padding fixed-width" width="260px">
        <template slot-scope="scope">
          <el-button size="mini" type="primary"  @click="handle(scope.row.id)">{{ '查看' }}</el-button>
          <el-button size="mini" type="success" >{{ '更新' }}</el-button>
          <!--<el-button size="mini" type="danger" plain>{{ '删除' }}</el-button>-->
          <div style="display:inline-block;padding-left:10px;">
            <el-popover
              placement="top"
              width="160" :ref="`popover-${scope.$index}`">
              <p>{{ '确定要删除表格吗' }}</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text"  @click="scope._self.$refs[`popover-${scope.$index}`].doClose()">取消</el-button>
                <el-button type="primary" size="mini" @click="scope._self.$refs[`popover-${scope.$index}`].doClose() === handleDelete(scope.row)">确定</el-button>
              </div>
              <el-button size="mini" type="danger"  slot="reference">删除</el-button>
            </el-popover>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getMaterialList" />
    <el-dialog title="新建表格" :visible.sync="dialogTableVisible" width="70%">
      <el-form :model="excelData" :rules="rules" ref="excelData" label-width="100px" class="demo-ruleForm">
        <el-form-item label="表格名称" prop="filename">
          <el-input class="dialog-inp-filename" v-model="excelData.filename"></el-input>
        </el-form-item>
      </el-form>
      <table class="material-table">
        <thead>
        <th
          v-for="(head, key) in excelData.data[0]"
          :data-head="key"
          :key="key">
          <span>{{ key }}</span>
          <el-select size="mini" class="material-sel" :value="setHeaderType(key)" @change="changeProp(key,$event)"  placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </th>
        </thead>
        <tbody>
        <tr v-for="(items, index) in showData" :key="index">
          <td v-for="(key,i) in items" :key="i">{{ key[1] }}</td>
        </tr>
        </tbody>
      </table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveCreate('excelData')">保 存</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogUnnormalVisible">
      <table class="material-table">
        <thead>
        <th
          v-for="(head, key) in unNormalData.data[0]"
          :data-head="key"
          :key="key">
          <span>{{ key }} <a> {{ getUnHeaderType(key) }}</a></span>
          <el-select size="mini" class="material-sel" :value="setHeaderType(key)" @change="changeProp(key,$event)"  placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </th>
        </thead>
        <tbody>
        <tr v-for="(items, index) in unNormalData.data" :key="index">
          <td v-for="(key,i) in items" :key="i">
            <span :style="{color: key[0]} == 'true' ? '' : 'red'">{{ key[1] }}</span>
          </td>
        </tr>
        </tbody>
      </table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUnnormalVisible = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import XLSX from 'xlsx'
import { fetchMaterialList, getTableItem, uploadCsv, createType, deleteMaterial } from '@/api/material'
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  data () {
    return {
      materialDataList: null,

      total: 1,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        title: undefined,
        status: undefined,
        project: this.$route.name || 'all'
      },
      excelData: {
        hash: '',
        filename: '',
        title: [],
        data: []
      },
      showData: [],
      rules: {
        filename: [
          { required: true, message: '请输入表格名称', trigger: 'blur' }
        ]
      },
      originalTableData: null,
      dialogTableVisible: false,
      dialogUnnormalVisible: false,
      unNormalData: {
        filename: '',
        title: [],
        data: []
      },
      options: [
        { value: 'text', label: '文本' },
        { value: 'date', label: '日期' },
        { value: 'number', label: '数字' },
        { value: 'position', label: '位置' }
      ]

    }
  },
  computed: {

  },
  created () {
    this.getMaterialList()
  },
  methods: {
    getMaterialList () {
      this.listLoading = true
      fetchMaterialList(this.listQuery).then(response => {
        this.materialDataList = response.data.items
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleDelete: function (row) {
      deleteMaterial(row.hash).then(response => {
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
    handle (id) {
      getTableItem().then(res => {
        // console.log(res)
        this.excelDataId = id
        this.excelData.title = res.data.header
        let result = this.filterData(res.data.results)
        this.excelData.data = result
        this.dialogTableVisible = true
      })
    },
    filterData (data) { // 筛选
      let newData = data.filter((item, i) => {
        let isTrue = [] // 将每行各个数据的判断存到该数组
        Object.keys(item).forEach(key => {
          let val = item[key] // val为数值 key为表头数据 prop为数据类型
          let prop = this.excelData.header.find(head => {
            return head.value === key
          }).prop
          isTrue.push(this.checkData(val, key, prop)) // 判断表格中的每项数据是否符合标准，是则为true，否则为false，存到数组中
        })
        let a = isTrue.filter(x => { // 判断每个数组中是否有false，有则该行不符合
          return !x
        })
        return !a.length
      })

      return newData
    },
    checkData (val, key, prop) {
      switch (prop) {
        case 'text':
          return this.checkString(val)
        case 'number':
          return this.checkNumber(val)
        case 'date':
          return this.checkDate(val)
        case 'position':
          return this.checkString(val)
        default:
          return true
      }
    },
    checkString (str) {
      if (typeof str === 'undefined' || str == null || str === '') {
        return false
      } else {
        return true
      }
    },
    checkNumber (num) {
      if (num === '') {
        return false
      }
      let regPos = /^\d+(\.\d+)?$/ // 非负浮点数
      let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/ // 负浮点数
      if (regPos.test(num) || regNeg.test(num)) {
        return true
      } else {
        return false
      }
    },
    checkDate (str) {
      let reg1 = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/
      let reg2 = /^[1-9]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])$/
      if (reg1.test(str) || reg2.test(str)) {
        return true
      } else {
        return false
      }
    },
    changeProp (val, e) {
      this.excelData.title.map(item => {
        if (item.title === val) {
          item.titleType = e
        }
      })
    },
    setHeaderType (title) {
      let titleIndex = this.excelData.title.findIndex(item => {
        return item.title === title
      })
      return this.excelData.title[titleIndex].titleType
    },
    saveCreate (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            filename: this.excelData.filename,
            title: this.excelData.title,
            hash: this.excelData.hash
          }
          createType(params).then(res => {
            if (res.code === 0) {
              let data = res.data
              this.unNormalData.filename = data.fileName
              this.unNormalData.title = data.title
              this.unNormalData.data = data.data
              this.dialogUnnormalVisible = true
            }
          })
        }
      })
    },
    getUnHeaderType (key) {
      console.log(key)
      let titleType = this.unNormalData.title.filter(item => {
        return item.title === key
      })
      return titleType[0].titleType
    },
    handleSearch () {
      this.listQuery.page = 1
      this.getList()
    },
    handleUpload () {
      this.$refs['excel-upload-input'].click()
    },
    handleClick (e) {
      const files = e.target.files
      const rawFile = files[0] // only use files[0]
      if (!rawFile) return

      let fileFormData = new FormData()
      fileFormData.append('file', rawFile)
      uploadCsv(fileFormData).then(res => {
        let data = res.data
        this.excelData.filename = data.fileName
        this.excelData.title = data.title
        this.excelData.data = data.data
        this.excelData.hash = data.hash
        this.showData = data.data.length >= 5 ? data.data.slice(0, 5) : data.data
        this.dialogTableVisible = true
      })
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

  .excel-upload-input{
    display: none;
    z-index: -9999;
  }
  .drop{
    border: 2px dashed #bbb;
    width: 600px;
    height: 160px;
    line-height: 160px;
    margin: 0 auto;
    font-size: 24px;
    border-radius: 5px;
    text-align: center;
    color: #bbb;
    position: relative;
  }

  .material-table{
    width: 100%;
    table-layout:fixed;
  }
  .material-table th,.material-table td{
    border-bottom:1px solid #EBEEF5;
    color:#909399;
    padding:10px;
    text-align: left;
  }
  .material-table td{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .material-sel{
    width: 60px;
  }
  .material-sel .el-input__inner{
    padding: 0 0 0 6px;
  }
  .dialog-inp-filename{
    width:200px;
  }
</style>
