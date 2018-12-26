<template>
  <div class="main-container"
       align="center">
    <div v-for="(itema,a) in arr"
         :key="a">
      <div class="gong"
           v-for="(itemb,b) in itema"
           :key="b">
        <div class="row"
             v-for="(itemc,c) in itemb"
             :key="c">
          <div class="block"
               v-for="(itemd,d) in itemc"
               :key="d"
               v-on:click="blockClick($event, a+'-'+b+'-'+c+'-'+d)"
               :id="a+'-'+b+'-'+c+'-'+d"
               :title="a+'-'+b+'-'+c+'-'+d">
            <div style="height:35%"></div>
            <div style="display:none">{{itemd = data[a*3+c][b*3+d]}}</div>
            {{data[a*3+c][b*3+d]}}
          </div>
        </div>
      </div>
    </div>
    <div v-show="optionShow"
         class="option-container"
         :style="{'top':top,'left':left}">
      <div class="option"
           align=center
           v-for="(disable,num) in options"
           :key="num">
        <el-button type="primary"
                   :disabled="disable"
                   @click="optionClick(num)"
                   style="width:100%;height:100%;margin: 0 0px;">{{num}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'Lang',
  head () {
    return {
      title: 'suduku'
    }
  },
  data () {
    const vm = this
    vm.data = {
      0: ['', '', '', '', '', '', '', '', ''],
      1: ['', '', '', '', '', '', '', '', ''],
      2: ['', '', '', '', '', '', '', '', ''],
      3: ['', '', '', '', '', '', '', '', ''],
      4: ['', '', '', '', '', '', '', '', ''],
      5: ['', '', '', '', '', '', '', '', ''],
      6: ['', '', '', '', '', '', '', '', ''],
      7: ['', '', '', '', '', '', '', '', ''],
      8: ['', '', '', '', '', '', '', '', '']
    }
    vm.options = { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false }
    vm.gongsxy = [
      [0, 0], [0, 1], [0, 2],
      [1, 0], [1, 1], [1, 2],
      [2, 0], [2, 1], [2, 2]
    ]
    return {
      optionShow: false,
      lastClick: '',
      left: '0',
      top: '0',
      arr: [
        [
          [
            [vm.data[0][0], vm.data[0][1], vm.data[0][2]],
            [vm.data[1][0], vm.data[0][1], vm.data[0][2]],
            [vm.data[2][0], vm.data[0][1], vm.data[0][2]]
          ],
          [
            [vm.data[0][3], vm.data[0][4], vm.data[0][5]],
            [vm.data[1][3], vm.data[0][4], vm.data[0][5]],
            [vm.data[2][3], vm.data[0][4], vm.data[0][5]]
          ],
          [
            [vm.data[0][6], vm.data[0][7], vm.data[0][8]],
            [vm.data[1][6], vm.data[0][7], vm.data[0][8]],
            [vm.data[2][6], vm.data[0][7], vm.data[0][8]]
          ]
        ],
        [
          [
            [vm.data[3][0], vm.data[0][1], vm.data[0][2]],
            [vm.data[4][0], vm.data[0][1], vm.data[0][2]],
            [vm.data[5][0], vm.data[0][1], vm.data[0][2]]
          ],
          [
            [vm.data[3][3], vm.data[0][4], vm.data[0][5]],
            [vm.data[4][3], vm.data[0][4], vm.data[0][5]],
            [vm.data[5][3], vm.data[0][4], vm.data[0][5]]
          ],
          [
            [vm.data[3][6], vm.data[0][7], vm.data[0][8]],
            [vm.data[4][6], vm.data[0][7], vm.data[0][8]],
            [vm.data[5][6], vm.data[0][7], vm.data[0][8]]
          ]
        ],
        [
          [
            [vm.data[6][0], vm.data[0][1], vm.data[0][2]],
            [vm.data[7][0], vm.data[0][1], vm.data[0][2]],
            [vm.data[8][0], vm.data[0][1], vm.data[0][2]]
          ],
          [
            [vm.data[6][3], vm.data[0][4], vm.data[0][5]],
            [vm.data[7][3], vm.data[0][4], vm.data[0][5]],
            [vm.data[8][3], vm.data[0][4], vm.data[0][5]]
          ],
          [
            [vm.data[6][6], vm.data[0][7], vm.data[0][8]],
            [vm.data[7][6], vm.data[0][7], vm.data[0][8]],
            [vm.data[8][6], vm.data[0][7], vm.data[0][8]]
          ]
        ]
      ]
    }
  },
  mounted () {
    var v = this
    window.oncontextmenu = function (e) {
      // 取消默认的浏览器自带右键 很重要！！
      e.preventDefault()
      var id = $(e.target).attr('id')
      if (id === undefined) {
        id = $(e.target).parent().attr('id')
      }
      v.clear(id)
    }
  },
  methods: {
    clear (id) {
      if (id) {
        var arr = id.split('-')
        if (arr.length === 4) {
          var a = parseInt(arr[0])
          var b = parseInt(arr[1])
          var c = parseInt(arr[2])
          var d = parseInt(arr[3])
          this.data[a * 3 + c][b * 3 + d] = ''
        }
      }
    },
    blockClick (e, id) {
      // this.optionShow = !this.optionShow
      var $ele = $('#' + id)
      $ele.addClass('back-green')
      if (this.lastClick === id) {
        this.optionShow = false
        if (this.lastClick !== '') {
          $('#' + this.lastClick).removeClass('back-green')
        }
        this.lastClick = ''
      } else {
        if (this.lastClick !== '') {
          $('#' + this.lastClick).removeClass('back-green')
        }
        this.optionShow = true
        this.lastClick = id
        this.optionCheck()
      }
      this.top = (e.clientY + 20) + 'px'
      this.left = (e.clientX + 10) + 'px'
      // console.log(e)
    },
    optionClick (num) {
      if (this.lastClick !== '') {
        var arr = this.lastClick.split('-')
        var a = parseInt(arr[0])
        var b = parseInt(arr[1])
        var c = parseInt(arr[2])
        var d = parseInt(arr[3])
        this.data[a * 3 + c][b * 3 + d] = num
        this.optionShow = false
        $('#' + this.lastClick).removeClass('back-green')
      }
    },
    optionCheck () {
      if (this.lastClick !== '') {
        var arr = this.lastClick.split('-')
        var a = parseInt(arr[0])
        var b = parseInt(arr[1])
        var c = parseInt(arr[2])
        var d = parseInt(arr[3])
        var row = a * 3 + c
        var col = b * 3 + d
        var thisRow = this.data[row]
        var rowLine = thisRow.join('')
        var colLine = ''
        for (var j = 0; j <= 8; j++) {
          colLine += String(this.data[j][col])
        }
        // check gong
        var gongLine = ''
        for (var blockxy in this.gongsxy) {
          var cc = this.gongsxy[blockxy][0]
          var dd = this.gongsxy[blockxy][1]
          gongLine += String(this.data[a * 3 + cc][b * 3 + dd])
        }
        var line = rowLine + colLine + gongLine
        console.log(line)
        for (var i = 1; i <= 9; i++) {
          if (line.indexOf(String(i)) !== -1) {
            this.options[i] = true
          } else {
            this.options[i] = false
          }
        }
      }
    }
  },
  props: {}
}
</script>

<style scoped>
.lang {
  width: 280px;
  margin-bottom: 10px;
  position: absolute;
  right: 10px;
}

.back-green {
  background: green;
}

.main-container {
  width: 606px;
  height: 606px;
  margin: 0 auto;
  top: 50px;
}
.gong {
  position: relative;
  float: left;
  width: 199px;
  height: 199px;
  border: 1px solid blue;
}
.option {
  position: relative;
  float: left;
  width: 50px;
  height: 50px;
}
.row {
  width: 100%;
  height: 33.3%;
}
.block {
  position: relative;
  float: left;
  width: 32.3%;
  height: 97.3%;
  border: 1px solid green;
  cursor: pointer;
}
font {
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 100%;
}
.block:hover {
  background: green;
}
.option-container {
  width: 150px;
  height: 150px;
  border: 1px solid green;
  z-index: 5;
  position: absolute;
}
</style>
