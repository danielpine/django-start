<template>
  <div class="book"
       v-show="showBook"
       style="width: 1100px; border: 1px solid black; padding-bottom: 5px; padding-right: 30px;margin-bottom:10px;">
    <el-row>
      <el-col :span="6">
        <el-form-item label="交易编号">
          <el-input size="mini"
                    :value="deal.dealId"
                    disabled
                    v-model="deal.dealId"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="预审批编号">
          <el-input size="mini"
                    :value="deal.applId"
                    v-model="deal.applId"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="业务编号">
          <el-input size="mini"
                    :value="deal.businessId"
                    v-model="deal.businessId"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="外部编号">
          <el-input size="mini"
                    :value="deal.externnal"
                    v-model="deal.externnal"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="6">
        <el-form-item label="公司">
          <el-input size="mini"
                    readonly
                    class="book-readonly-input"
                    v-model="deal.company"
                    :value="deal.company"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="交易处室">
          <el-select size="mini"
                     v-model="deal.desk"
                     :disabled="deal.dealId !== ''"
                     @change="onDeskChanged"
                     placeholder="请选择">
            <el-option v-for="(desk,key) in bookInfo.desk"
                       :key="key"
                       :label="key"
                       :value="key"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="账户">
          <el-select size="mini"
                     v-model="deal.book"
                     :disabled="deal.dealId !== ''"
                     @change="$emit('changeBtnsStatus')"
                     placeholder="请选择">
            <el-option v-for="book in bookInfo.desk[deal.desk]"
                       :key="book"
                       :label="book"
                       :value="book"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="分组">
          <el-select size="mini"
                     v-model="deal.section"
                     placeholder="请选择">
            <el-option v-for="section in bookInfo.section"
                       :key="section"
                       :label="section"
                       :value="section"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="计算代理方">
          <el-select size="mini"
                     v-model="deal.calculationAgent"
                     placeholder="请选择">
            <el-option v-for="calculationAgent in bookInfo.calculationAgent"
                       :key="calculationAgent"
                       :label="calculationAgent"
                       :value="calculationAgent"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="使用清算">
          <el-select size="mini"
                     v-model="deal.useClearing"
                     placeholder="请选择">
            <el-option label="无"
                       value="No"></el-option>
            <el-option v-for="calculationAgent in bookInfo.useClearing"
                       :key="calculationAgent"
                       :label="calculationAgent"
                       :value="calculationAgent"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="经纪公司">
          <el-select size="mini"
                     style="width: 450px;"
                     v-model="deal.brooker"
                     placeholder="请选择">
            <el-option label="无"
                       value=""></el-option>
            <el-option v-for="brooker in bookInfo.brooker"
                       :key="brooker"
                       :label="brooker"
                       :value="brooker"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="主协议">
          <el-select size="mini"
                     v-model="deal.contract"
                     placeholder="请选择">
            <el-option label="无"
                       value="0"></el-option>
            <el-option v-for="contract in bookInfo.contract"
                       :key="contract"
                       :label="contract"
                       :value="contract"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="对手代码">
          <el-select v-on:change=counterPartyIdChange
                     size="mini"
                     v-model="deal.counterPartyId"
                     @change="$emit('changeBtnsStatus')"
                     placeholder="请选择">
            <el-option v-for="id in bookInfo.counterPartyId"
                       :key="id"
                       :label="id"
                       :value="id"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="交易对手">
          <el-input size="mini"
                    readonly
                    class="book-readonly-input"
                    :value="deal.counterParty"
                    v-model="deal.counterParty"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="交易日期">
          <el-date-picker size="mini"
                          style="width: 175px;"
                          v-model="deal.tradeDate"
                          type="date"
                          value-format="yyyyMMdd"
                          format="yyyy-MM-dd"
                          placeholder="">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="录入日期">
          <el-date-picker size="mini"
                          style="width: 175px;"
                          v-model="deal.recordDate"
                          type="date"
                          readonly
                          class="book-readonly-input"
                          value-format="yyyyMMdd"
                          format="yyyy-MM-dd"
                          placeholder="">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="备注">
          <el-input size="mini"
                    :value="deal.note"
                    v-model="deal.note"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="状态">
          <el-input size="mini"
                    :value="deal.status"
                    readonly
                    class="book-readonly-input"
                    v-model="deal.status"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="版本号">
          <el-input size="mini"
                    :value="deal.version"
                    readonly
                    class="book-readonly-input"
                    v-model="deal.version"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="用户">
          <el-input size="mini"
                    :value="deal.user"
                    readonly
                    class="book-readonly-input"
                    v-model="deal.user"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="更改日期">
          <el-date-picker size="mini"
                          style="width: 175px;"
                          v-model="deal.versionDate"
                          type="date"
                          readonly
                          class="book-readonly-input"
                          value-format="yyyyMMdd"
                          format="yyyy-MM-dd"
                          placeholder="">
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Book',
  data () {
    return {
    }
  },
  created () {
    if (process.browser) {
      var needInit = ['section', 'calculationAgent']
      for (var i in needInit) {
        this.deal[needInit[i]] = this.bookInfo[needInit[i]][0] || ''
      }
    }
  },
  methods: {
    counterPartyIdChange () {
      var vm = this
      vm.deal.counterParty = vm.bookInfo.counterParty[vm.bookInfo.counterPartyId.indexOf(vm.deal.counterPartyId)]
    },
    onDeskChanged () {
      this.deal.book = this.bookInfo.desk[this.deal.desk].length > 1 ? '' : this.bookInfo.desk[this.deal.desk][0]
      this.$emit('changeBtnsStatus')
    }
  },
  props: {
    showBook: true,
    bookInfo: {
      type: Object,
      required: true
    },
    deal: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.el-row {
  margin-top: 0;
  margin-bottom: 0px;
}
.el-form-item {
  margin-bottom: 0px;
}
.el-col {
  /*margin-top: 0px;*/
  /*margin-bottom: -27px;*/
  height: 35px;
  padding-top: 0;
  padding-bottom: 0;
}
</style>
