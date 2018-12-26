<template>
  <div class="top-buttons">

    <el-row>
      <el-col style="width: 801px; margin-top: -30px;">
        <el-tooltip :disabled="showBook && !butstatus.submitBtn.isDisabled"
                    :content="butstatus.submitBtn.notice"
                    placement="top"
                    effect="light">
          <div style="display:inline">
            <el-button size="mini"
                       type="primary"
                       :loading="butstatus.submitBtn.isLoading"
                       :disabled="butstatus.submitBtn.isDisabled"
                       @click="$emit('enlarge-text')">提交</el-button>
          </div>
        </el-tooltip>
        <el-tooltip :disabled="showBook && !butstatus.checkBtn.isDisabled"
                    :content="butstatus.checkBtn.notice"
                    placement="top"
                    effect="light">
          <div style="display:inline">
            <el-button size="mini"
                       :loading="butstatus.checkBtn.isLoading"
                       :disabled="butstatus.checkBtn.isDisabled"
                       @click="$emit('verify-trade')"
                       type="primary">复核</el-button>
          </div>
        </el-tooltip>
        <el-tooltip :disabled="showBook && !butstatus.deleteBtn.isDisabled"
                    :content="butstatus.deleteBtn.notice"
                    placement="top"
                    effect="light">
          <div style="display:inline">
            <el-button size="mini"
                       :loading="butstatus.deleteBtn.isLoading"
                       :disabled="butstatus.deleteBtn.isDisabled"
                       @click="$emit('delete-trade')"
                       type="primary">删除</el-button>
          </div>
        </el-tooltip>
        <el-tooltip :disabled="showBook && !butstatus.recoveryBtn.isDisabled"
                    :content="butstatus.recoveryBtn.notice"
                    placement="top"
                    effect="light">
          <div style="display:inline">
            <el-button size="mini"
                       :loading="butstatus.recoveryBtn.isLoading"
                       :disabled="butstatus.recoveryBtn.isDisabled"
                       @click="$emit('recovery-trade')"
                       type="primary">恢复</el-button>
          </div>
        </el-tooltip>
        <div style="display:inline">
          <el-button size="mini"
                     :loading="butstatus.queryBtn.isLoading"
                     :disabled="butstatus.queryBtn.isDisabled"
                     @click="$emit('trade_search')"
                     type="primary">查询</el-button>
        </div>
        <div style="display:inline">
          <el-button size="mini"
                     @click="$emit('reloadPage')"
                     type="primary">清空</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'TopButtons',
  data () {
    return {
    }
  },
  props: {
    deal: {
      type: Object,
      required: true
    },
    butstatus: {
      type: Object,
      required: true
    },
    showBook: {
      type: Boolean,
      required: true
    }
  }
}
//   methods: {
//     submit: function () {
//       // TODO check book
//       console.info(this.deal)
//       // this.$.ajax({
//       //   type: 'POST', // 提交的方�
//       //   url: '/pfx/fx/addTrade',
//       //   data: { deal: JSON.stringify(this.deal) },
//       //   async: true,
//       //   error: function (request) { // 失败的话
//       //   },
//       //   success: function (j) {
//       //     console.log(j)
//       //   },
//       //   dataType: 'json'
//       // })
//       // vue-source
//       this.$http.post('/pfx/fx/addTrade', { deal: JSON.stringify(this.deal) }, { emulateJSON: true })
//         .then(
//           (response) => {
//             console.log(response)
//           },
//           (error) => {
//             console.log(error)
//           }
//         )
//     }
//   }
</script>

<style scoped>
</style>
