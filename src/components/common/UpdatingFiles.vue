<template>
  <!-- 添加附件 -->
  <el-dialog :title="uploadProp.title" :visible.sync="uploadProp.visible" width="630px"
    :close-on-press-escape='false' :close-on-click-modal='false' class="patent_common_dialog drag"
    :modal-append-to-body='false' :lock-scroll='true' :append-to-body='true'
    @before-close='closeFn' @close='closeFn' v-drag>
    <slot></slot>
    <el-form :model="formData" ref="formData" class="colon-form" label-width="70px">
      <el-form-item label="文件类型" class="js__attachment_modal" required v-if="uploadProp.showFileType !== false">
        <el-select v-if="fileList.length" v-model="formData.id" :disabled="fileDisabled" filterable>
          <el-option v-for='item in fileList' :key='item.id' :label="item.fileName" :value="item.id"></el-option>
        </el-select>
        <el-popover v-else placement="bottom-start" trigger="manual" v-model="showPop">
          <el-tree class='tree_patent_common'
            ref="tree2"
            :data="fileTreeData"
            :props="defaultProps"
            :filter-node-method="filterNode"
            :render-content="renderContent"
            :default-expand-all='false'
            @node-expand="showPop = true"
            :expand-on-click-node = "false">
          </el-tree>
          <el-input slot="reference" v-model="filterText" size="mini"
            placeholder="请输入..." @focus="showPop = true" @blur="showPop = false">
          </el-input>
        </el-popover>
      </el-form-item>
      <el-form-item label="备注" v-if="uploadProp.showRemak">
        <el-input type="textarea" size="mini" v-model="formData.remark"></el-input>
      </el-form-item>
      <el-form-item label="导入" required>
        <el-upload
          :drag="true" ref='attachUpload'
          class="upload-demo ips_upload_content" :with-credential="false"
          :action="uploadUrl" multiple :limit='limitNum'
          :on-remove='handleRemove'
          :before-upload='beforeUpload'
          :on-exceed='handleExceed'
          :on-success="handleSuccess">
          <el-button class='upload_icon_btn'><i class="el-icon-upload"></i></el-button>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div slot="tip" class="el-upload__tip">支持格式/大小：文件大小为{{maxSizeStr}}M，格式支持{{allowedExtensionStr}}文件</div>
        </el-upload>
      </el-form-item>
      <slot name="remarkTip"></slot>
    </el-form>
    <template slot="footer">
      <el-button size="mini" @click="closeFn">取消</el-button>
      <el-button type="info" size="mini" @click="saveFun">确定</el-button>
    </template>
  </el-dialog>
</template>
<script>
import { getLoadingLock } from '@/views/todo/components/loading'
import { getFileTypeTreeList } from '@/api/common'
import { gatWayUploadApi } from '@/utils'
export default {
  data () {
    return {
      // 费用类型
      formData: {
        id: '',
        remark: ''
      },
      filterText: '',
      defaultProps: {
        children: 'fileNameManagerList',
        label: 'fileName'
      },
      showPop: false,
      fileTreeData: [], // 树形结构数据
      tempFileList: [], // 上传附件
      uploadUrl: gatWayUploadApi()
    }
  },
  props: {
    uploadProp: {
      type: Object,
      default: () => ({
        visible: false,
        showRemak: false, // 是否显示备注
        showFileType: true,
        multiple: false, // 文件是否多选
        width: '630px' // 默认弹出框宽度
      })
    },
    allowedExtension: {
      type: Array,
      default: () => (['pdf', 'doc', 'docx', 'png', 'jpg', 'zip', 'xlsx', 'xls', 'tar', 'rar', '7z', 'pfx', 'tif'])
    },
    fileList: {
      type: Array,
      default: () => ([])
    },
    limitNum: {
      type: Number,
      default: 1
    },
    maxSize: {
      type: Number,
      default: 50 * 1024 * 1024 // 50M
    },
    fileDisabled: {
      type: Boolean,
      default: false
    },
    callParent: Function
  },
  computed: {
    allowedExtensionStr () {
      return this.allowedExtension.join(',')
    },
    maxSizeStr () {
      return this.maxSize / (1024 * 1024)
    }
  },
  watch: {
    filterText (val) {
      val = val.trim()
      if (this.$refs.tree2) {
        this.$refs.tree2.filter(val)
      }
    },
    formData: {
      handler (vals) {
        if (vals.id && this.callParent && this.callParent instanceof Function) {
          this.callParent(vals.id)
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    // 初始化
    initData () {
      if (!this.fileList.length) {
        this.getTreeFileList()
      } else {
        this.formData.id = this.fileList[0].id
      }
    },
    // 渲染树形结构数据
    renderContent (h, { node, data, store }) {
      return (
        <el-button class="file_custom_tree_node" disabled={!data.leaf} on-click={ (e) => this.clickFileTypeNode(data, e)}>
          <span>
            {node.label}
          </span>
        </el-button>
      )
    },
    // 获取树形的文件类型
    getTreeFileList () {
      getFileTypeTreeList().then(({ data }) => {
        if (data.status === 0) {
          this.fileTreeData = Array.isArray(data.data) ? data.data : []
        }
      })
    },
    clickFileTypeNode (data) {
      this.formData = { ...this.formData, ...data }
      this.filterText = data.fileName
      this.showPop = false
    },
    // 替换所有中文小括号
    replaceAllFn (str) {
      let newStr = ''
      for (let k in str) {
        if (['（', '）'].includes(str[k])) {
          newStr += ''
        } else {
          newStr += str[k]
        }
      }
      return newStr
    },
    // 筛选节点
    filterNode (value, data) {
      if (!value) return true
      // return data.fileName.indexOf(value) !== -1

      // 为了匹配空格，中英文括号的2020-12-4
      // let reg = /(\(|\)|\s|\（|\）)/g
      let vals = this.replaceAllFn(value)
      let fileName = this.replaceAllFn(data.fileName)
      let reg = /(\(|\)|\s)/g
      vals = vals?.replace(reg, '')
      fileName = fileName?.replace(reg, '')
      return fileName.includes(vals) || fileName === vals
    },
    // 上传成功
    handleSuccess (res, file, fileList) {
      this.tempFileList = []
      fileList.forEach(item => {
        this.tempFileList.push(item.response)
      })
      getLoadingLock().close()
    },
    // 删除附件
    handleRemove (file, fileList) {
      this.tempFileList.forEach((item, index) => {
        if (file.response.data.globalUuid === item.data.globalUuid) this.tempFileList.splice(index, 1)
      })
    },
    // 上传前验证
    beforeUpload (file) {
      // if (this.tempFileList.length === 1) {
      //   this.$message.error('只允许上传一条数据')
      //   return false
      // }
      getLoadingLock()
      const ex = file.name.substr(file.name.lastIndexOf('.') + 1).toLowerCase()
      if (!this.allowedExtension.includes(ex)) {
        getLoadingLock().close()
        this.$message.error(`请上传${this.allowedExtensionStr}格式文件`)
        return false
      }
      if (file.size > this.maxSize) {
        getLoadingLock().close()
        this.$message.error(`上传文件尺寸不能超过${this.maxSizeStr}MB`)
        return false
      }
    },
    // 上传前验证附件多个上传
    handleExceed () {
      this.$message.error(`文件最多传${this.limitNum}个`)
    },
    // 获取附件参数
    getParamsFun () {
      // 单个上传
      if (this.limitNum === 1) {
        const { name, downloadLocation, globalUuid, size, extension } = this.tempFileList[0].data
        let params = {
          fileName: name.replace(/\s/g, ''),
          filePath: downloadLocation,
          fileUuid: globalUuid,
          attachmentTypeId: this.formData.id,
          fileSize: size, // 文件大小
          extension, // 扩展名
          remark: this.formData.remark, // 备注
          ...this.uploadProp.data
        }
        return params
      } else {
        // 多个附件上传
        let result = []
        this.tempFileList.forEach(item => {
          let { name, downloadLocation, globalUuid, size, extension } = item.data
          let obj = {
            fileName: name.replace(/\s/g, ''),
            filePath: downloadLocation,
            fileUuid: globalUuid,
            attachmentTypeId: this.formData.id,
            fileSize: size, // 文件大小
            extension, // 扩展名
            remark: this.formData.remark, // 备注
            ...this.uploadProp.data
          }
          result.push(obj)
        })
        return result
      }
    },
    submitJudge () {
      if (!this.formData.id && this.uploadProp.showFileType) {
        this.$message.error('请选择文件类型!')
        return false
      }
      if (!this.tempFileList.length) {
        this.$message.error('请先上传附件!')
        return false
      }
      return true
    },
    // 保存添加表单
    closeFn (reload, params) {
      this.showPop = false
      this.$emit('close', reload, params)
    },
    // 点击保存按钮
    saveFun () {
      if (!this.submitJudge()) {
        return
      }
      let params = this.getParamsFun()
      this.closeFn('reload', params)
    }
  }
}
</script>
<style lang="scss" scoped>
.el-dialog__wrapper /deep/ .el-upload-dragger {
  width:100% !important;
}
.el-form-item {
  margin-bottom: 8px;
}
.ips__file__uploader {
  .uploader-container{
    label {
      padding: 0 15px!important;
      height: 30px;
      line-height: 30px;
      margin-top:20px;
    }
    .file-name {
      margin-top:20px;
    }
  }
}
.upload_icon_btn {
  background: #fff!important;
  border:none!important;
  &:hover, &:focus, &:active {
    background: #fff!important;
  }
}
</style>
<style lang="scss">
.patent_common_dialog.drag{
  position: fixed;
  .el-dialog{
    cursor: move;
  }
}
.el-popover.el-popper {
  max-height: 400px;
  overflow: auto;
}
.file_custom_tree_node {
  border:none;
  width:100%;
  line-height: 0;
  border-radius: 0;
  text-align: left;
}
.el-button.el-button--default.el-button--mini.file_custom_tree_node {
  background:#fff!important;
  color: #606266;
  &:hover {
    background-color: #f5f7fa!important;
  }
}
.file_custom_tree_node.is-disabled {
  background-color: #f5f7fa!important;
  span {
    color: #606266!important;
  }
}
.tree_patent_common {
  .el-tree-node__content {
    &:hover {
      background-color: #f5f7fa!important;
    }
  }
}
</style>
