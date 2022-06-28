<template>
  <div class="home">
    <div class="container">

      <div class="tools">
        <el-button type="primary" size="small" @click="addWebDialogVisible = true">添加网站</el-button>
        <el-button type="primary" size="small" @click="addLinkVisible = true">添加客服</el-button>
        <el-button size="small" @click="refreshData">刷新列表</el-button>
      </div>

      <div class="columns">
        <div class="column left">
          <div class="title">网站列表</div>
          <div class="table">
            <el-table :data="webList" style="width: 100%" max-height="420px">
              <el-table-column prop="url" label="网址" />
              <el-table-column fixed="right" label="操作">
                <template #default="scope">
                  <el-button link type="primary" size="small" @click="openLink(scope.row)">访问</el-button>
                  <!-- <el-button link type="primary" size="small">查看客服</el-button> -->

                  <el-popover placement="top" :width="500" trigger="click">
                    <template #reference>
                      <el-button link type="primary" size="small">查看客服</el-button>
                    </template>
                    <div class="left-list">
                      <template v-for="(item, $index) in scope.row.links" :key="$index">
                        <div class="item">{{ item }}</div>
                      </template>
                    </div>
                  </el-popover>

                  <el-button link type="primary" size="small" @click="editWeb(scope.row)">编辑</el-button>
                  <el-popconfirm title="确认删除吗?" @confirm="deleteWeb(scope.$index, scope.row)">
                    <template #reference>
                      <el-button link type="danger" size="small">删除</el-button>
                    </template>
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <div class="column right">
          <div class="title">客服列表</div>
          <div class="table">
            <el-table :data="Links" style="width: 100%" max-height="420px">
              <el-table-column prop="link" label="链接" />
              <el-table-column prop="type" label="平台" width="120px" />
              <el-table-column fixed="right" label="操作" width="100px">
                <template #default="scope">
                  <el-button link type="primary" size="small" @click="editLink(scope.row)">编辑</el-button>
                  <el-popconfirm title="确认要删除吗? 此操作会影响网站中已添加的链接，请及时更换。" @confirm="deleteLink(scope.$index, scope.row)">
                    <template #reference>
                      <el-button link type="danger" size="small">删除</el-button>
                    </template>
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>

    </div>
  </div>

  <el-dialog
    v-model="addWebDialogVisible"
    title="添加网站"
    width="40%"
    :before-close="handleAddWebdialogClose"
    :close-on-click-modal="false"
  >

    <div class="add-web-content">
      <el-form
        :model="addWebForm"
        label-position="left"
        ref="addWebFormRef"
        :rules="addWebFormRules"
      >

        <el-form-item label="网址" prop="url">
          <el-input v-model="addWebForm.url" placeholder="请输入网址" />
        </el-form-item>

        <el-form-item label="客服" prop="links">
          <el-select style="width: 100%" multiple v-model="addWebForm.links" placeholder="添加要使用的客服链接">
            <template v-for="(item, $index) in Links" :key="$index">
              <el-option :label="`${item.link}（${item.type}）`" :value="item.link" />
            </template>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :loading="addWebLoading" @click="submitAddWeb(addWebFormRef)">提交</el-button>
        </el-form-item>

      </el-form>
    </div>

  </el-dialog>

  <el-dialog
    v-model="addLinkVisible"
    title="添加客服"
    width="40%"
    :before-close="handleAddLinkVisible"
    :close-on-click-modal="false"
  >

    <div class="add-web-content">
      <el-form
        :model="addLinkForm"
        label-position="left"
        ref="addLinkFormRef"
        :rules="addLinkFormRules"
      >

        <el-form-item label="链接" prop="link">
          <el-input v-model="addLinkForm.link" placeholder="Line 请输入链接， WhatsApp 请输入号码" />
        </el-form-item>

        <el-form-item label="平台" prop="type">
          <el-select style="width: 100%" v-model="addLinkForm.type" placeholder="选择平台">
            <el-option label="Line" value="line" />
            <el-option label="WhatsApp" value="whatsapp" />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :loading="addLinkLoading" @click="submitAddLink(addLinkFormRef)">提交</el-button>
        </el-form-item>

      </el-form>
    </div>

  </el-dialog>

  <el-dialog
    v-model="editWebVisible"
    title="编辑网站"
    width="40%"
    :before-close="handleEditWebdialogClose"
    :close-on-click-modal="false"
  >

    <div class="add-web-content">
      <el-form
        :model="editForm"
        label-position="left"
        ref="editWebRef"
        :rules="editWebFormRules"
      >

        <el-form-item label="网址" prop="url">
          <el-input v-model="editForm.url" placeholder="请输入网址" disabled />
        </el-form-item>

        <el-form-item label="客服" prop="links">
          <el-select style="width: 100%" multiple v-model="editForm.links" placeholder="添加要使用的客服链接">
            <template v-for="(item, $index) in Links" :key="$index">
              <el-option :label="`${item.link}（${item.type}）`" :value="item.link" />
            </template>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :loading="editWebLoading" @click="submitEditWeb(editWebRef)">提交</el-button>
        </el-form-item>

      </el-form>
    </div>

  </el-dialog>

  <el-dialog
    v-model="editLinkVisible"
    title="编辑客服链接"
    width="40%"
    :before-close="handleEditLinkVisible"
    :close-on-click-modal="false"
  >

    <div class="add-web-content">
      <el-form
        :model="editLinkForm"
        label-position="left"
        ref="editLinkFormRef"
        :rules="editLinkFormRules"
      >

        <el-form-item label="链接" prop="link">
          <el-input v-model="editLinkForm.link" placeholder="Line 请输入链接， WhatsApp 请输入号码" />
        </el-form-item>

        <el-form-item label="平台" prop="type">
          <el-select style="width: 100%" v-model="editLinkForm.type" placeholder="选择平台">
            <el-option label="Line" value="line" />
            <el-option label="WhatsApp" value="whatsapp" />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :loading="editLinkLoading" @click="submitEditLink(editLinkFormRef)">提交</el-button>
        </el-form-item>

      </el-form>
    </div>

  </el-dialog>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref } from 'vue'

const { proxy } = getCurrentInstance()

const webList = ref([])
const Links = ref([])

function getWebs() {
  proxy.$api.Webs.getWebs()
  .then(res => {
    if (res.status === 200) {
      webList.value = res.data.results
    }
  })
  .catch(err => {
    console.log(err)
  })
}
function getLinks() {
  proxy.$api.Links.getLinks()
  .then(res => {
    if (res.status === 200) {
      Links.value = res.data.results
    }
  })
  .catch(err => {
    console.log(err)
  })
}

const addWebFormRef = ref()
const addWebDialogVisible = ref(false)
function handleAddWebdialogClose(done) {
  addWebForm.url = ''
  addWebForm.links = []
  done()
}
function closeAddWebDialog() {
  addWebDialogVisible.value = false
  addWebForm.url = ''
  addWebForm.links = []
}
const addWebForm = reactive({
  url: '',
  links: []
})
function checkAddWebLinks(rule, value, callback) {
  console.log(rule)
  console.log(value)
  if (value.length <= 0) {
    callback(new Error('请选择至少一个客服链接'))
  } else {
    callback()
  }
}
const addWebLoading = ref(false)
const addWebFormRules = ref({
  url: [{ required: true, message: '请输入网址', trigger: 'blur' }],
  links: [{ required: true, validator: checkAddWebLinks, trigger: 'blur' }]
})
async function submitAddWeb(formEl) {
  if (!formEl) return false
  await formEl.validate((valid, fields) => {
    if (valid) {
      addWebLoading.value = true

      proxy.$api.Webs.addWeb(addWebForm)
      .then(res => {
        console.log(res)
        if (res.status === 200 || res.status === 201) {
          // Links.value = res.data.results
          closeAddWebDialog()

          ElMessage({
            message: '添加成功',
            type: 'success',
          })

          getWebs()
        } else {
          ElMessage.error(`添加失败`)
        }
      })
      .catch(err => {
        ElMessage.error(`添加失败：${ err }`)
      })
      .finally(() => {
        addWebLoading.value = false
      })
    }
  })
}


const editWebRef = ref()
const editForm = reactive({
  objectId: '',
  url: '',
  links: []
})
const editWebLoading = ref(false)
const editWebVisible = ref(false)
const editWebFormRules = ref({
  url: [{ required: true, message: '请输入网址', trigger: 'blur' }],
  links: [{ required: true, validator: checkAddWebLinks, trigger: 'blur' }]
})
function editWeb(row) {
  editWebVisible.value = true
  editForm.objectId = row.objectId
  editForm.url = row.url
  editForm.links = row.links
}
function handleEditWebdialogClose(done) {
  editForm.objectId = ''
  editForm.url = ''
  editForm.links = ''
  done()
}
async function submitEditWeb(formEl) {
  console.log(formEl)
  if (!formEl) return false
  await formEl.validate((valid, fields) => {
    if (valid) {
      editWebLoading.value = true

      proxy.$api.Webs.updateWeb(editForm.objectId, { url: editForm.url, links: editForm.links })
      .then(res => {
        console.log(res)
        if (res.status === 200 || res.status === 201) {
          // Links.value = res.data.results
          closeEditWebDialog()

          ElMessage({
            message: '修改成功',
            type: 'success',
          })

          getWebs()
        } else {
          ElMessage.error(`修改失败`)
        }
      })
      .catch(err => {
        ElMessage.error(`修改失败：${ err }`)
      })
      .finally(() => {
        editWebVisible.value = false
      })
    }
  })
}
function closeEditWebDialog() {
  editWebVisible.value = false
  editForm.objectId = ''
  editForm.url = ''
  editForm.links = ''
}




const addLinkFormRef = ref()
const addLinkForm = reactive({
  link: '',
  type: ''
})
const addLinkVisible = ref(false)
function handleAddLinkVisible(done) {
  addLinkForm.link = ''
  addLinkForm.type = []
  done()
}
function closeAddLinkDialog() {
  addLinkVisible.value = false
  addLinkForm.link = ''
  addLinkForm.type = []
}
const addLinkFormRules = ref({
  link: [{ required: true, message: '请输入链接', trigger: 'blur' }],
  type: [{ required: true, message: '请选择平台', trigger: 'blur' }]
})
const addLinkLoading = ref(false)
async function submitAddLink(formEl) {
  if (!formEl) return false
  await formEl.validate((valid, fields) => {
    if (valid) {
      addLinkLoading.value = true

      proxy.$api.Links.addLink(addLinkForm)
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          // Links.value = res.data.results
          closeAddLinkDialog()

          ElMessage({
            message: '添加成功',
            type: 'success',
          })

          getLinks()
        } else {
          ElMessage.error(`添加失败`)
        }
      })
      .catch(err => {
        ElMessage.error(`添加失败：${ err }`)
      })
      .finally(() => {
        addLinkLoading.value = false
      })
    }
  })
}


const editLinkVisible = ref(false)
const editLinkFormRef = ref()
const editLinkForm = reactive({
  objectId: '',
  link: '',
  type: ''
})
function editLink(row) {
  editLinkVisible.value = true
  editLinkForm.objectId = row.objectId
  editLinkForm.link = row.link
  editLinkForm.type = row.type
}
function handleEditLinkVisible(done) {
  editLinkForm.objectId = ''
  editLinkForm.link = ''
  editLinkForm.type = ''
  done()
}
const editLinkFormRules = ref({
  link: [{ required: true, message: '请输入链接', trigger: 'blur' }],
  type: [{ required: true, message: '请选择平台', trigger: 'blur' }]
})
const editLinkLoading = ref(false)
async function submitEditLink(formEl) {
  if (!formEl) return false
  await formEl.validate((valid, fields) => {
    if (valid) {
      addLinkLoading.value = true

      proxy.$api.Links.updateLink(editLinkForm.objectId, { link: editLinkForm.link, type: editLinkForm.type })
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          // Links.value = res.data.results
          closeEditLinkDialog()

          ElMessage({
            message: '修改成功',
            type: 'success',
          })

          getLinks()
        } else {
          ElMessage.error(`修改失败`)
        }
      })
      .catch(err => {
        ElMessage.error(`修改失败：${ err }`)
      })
      .finally(() => {
        addLinkLoading.value = false
      })
    }
  })
}
function closeEditLinkDialog() {
  editLinkVisible.value = false
  editLinkForm.objectId = ''
  editLinkForm.link = ''
  editLinkForm.type = ''
}





function openLink(row) {
  window.open(`https://${ row.url }`, `_blank`) 
}
function deleteWeb(index, row) {
  proxy.$api.Webs.deleteWeb(row.objectId)
  .then(res => {
    if(res.status === 200) {
      webList.value.splice(index,1)
      ElMessage({
        message: '删除成功',
        type: 'success',
      })
    } else {
      ElMessage.error(`删除失败`)
    }
  })
  .catch(err => {
    ElMessage.error(`删除失败：${ err }`)
  })
  .finally(() => {
  })
}
function deleteLink(index, row) {
  proxy.$api.Links.deleteLink(row.objectId)
  .then(res => {
    if(res.status === 200) {
      Links.value.splice(index,1)
      ElMessage({
        message: '删除成功',
        type: 'success',
      })
    } else {
      ElMessage.error(`删除失败`)
    }
  })
  .catch(err => {
    ElMessage.error(`删除失败：${ err }`)
  })
  .finally(() => {
  })
}

function refreshData() {
  getWebs()
  getLinks()
}
onMounted(() => {
  getWebs()
  getLinks()
})
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  .container {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 30px 36px;
    .tools {
      margin-bottom: 16px;
    }
    .columns {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      .column {
        width: 49%;
        height: 100%;
        border-radius: 10px;
        border: 1px solid #409eff;
        overflow: hidden;
        .title {
          box-sizing: border-box;
          display: flex;
          align-items: center;
          height: 30px;
          padding: 0 14px;
          background-color: #409eff;
          font-size: 14px;
          color: white;
        }
      }
    }
  }
}
</style>