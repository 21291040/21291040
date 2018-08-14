<template>
  <div>
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :line-numbers="true"
      :search-options="{
                  enabled: true,
                  placeholder: '关键字搜索...',
                  searchFn: search,
                }"
      :group-options="{
                  enabled: true,
                  headerPosition: 'top',
                }"
      :selectOptions="{
                    enabled: false,
                    selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
                    selectionInfoClass: 'custom-class',
                    selectionText: '条记录被选中',
                    clearSelectionText: '清除选中',
                  }"
      styleClass="vgt-table condensed striped bordered">
      <div slot="emptystate">
        没有相关记录！
      </div>
      <template slot="table-row" slot-scope="props">
        <span v-html="formattedName(props)"></span>
      </template>
    </vue-good-table>
  </div>
</template>
<script>
/* eslint comma-dangle: ["error", "always"] */

import allData from './data.js'

export default {
  name: 'grouped-table',
  props: [],
  data () {
    return {
      columns: [
        {
          label: '内容',
          field: 'course',
          filterOptions: {
            enabled: true,
          },
          hidden: true,
        },
        {
          label: '推荐',
          field: 'recommend',
          filterOptions: {
            enabled: true,
          },
          type: 'number',
          hidden: true,
        },
        {
          label: '姓名|家庭',
          field: 'name',
          filterOptions: {
            enabled: true,
          },
          thClass: 'custom-th-class',
          tdClass: 'custom-td-class',
        },
        {
          label: '籍贯',
          field: 'nativePlace',
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: '年龄+',
          field: 'age',
        },
        {
          label: '性别',
          field: 'sex',
          filterOptions: {
            enabled: true,
          },
          hidden: true,
        },
        {
          label: '学历',
          field: 'education',
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: '地点',
          field: 'workplace',
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: '工作',
          field: 'job',
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: '家庭',
          field: 'family',
          filterOptions: {
            enabled: true,
          },
          hidden: true,
        },
        {
          label: '备注',
          field: 'remarks',
          filterOptions: {
            enabled: true,
          },
        },
      ],
      rows: [
        {
          label: '一班',
          mode: 'span',
          children: allData.YiBan,
        },
        {
          label: '二班',
          mode: 'span',
          children: allData.ErBan,
        },
        {
          label: '三班',
          mode: 'span',
          children: allData.SanBan,
        },
        {
          label: '四班',
          mode: 'span',
          children: allData.SiBan,
        },
        {
          label: '五六班',
          mode: 'span',
          children: allData.WuLiuBan,
        },
        {
          label: '五六后跟',
          mode: 'span',
          children: allData.WuLiuGen,
        },
        {
          label: '七班',
          mode: 'span',
          children: allData.QiBan,
        },
        {
          label: '七后跟',
          mode: 'span',
          children: allData.QiGen,
        },
        {
          label: '一二拼班',
          mode: 'span',
          children: allData.YiErPinBan,
        },
        {
          label: '三五六拼班',
          mode: 'span',
          children: allData.SanWuLiuPinBan,
        },
        {
          label: '正负面',
          mode: 'span',
          children: allData.ZhengFuMian,
        },
        {
          label: '宏观调控',
          mode: 'span',
          children: allData.HongGuanTiaoKong,
        },
        {
          label: '全贯通',
          mode: 'span',
          children: allData.QuanGuanTong,
        },
        {
          label: '四大政策',
          mode: 'span',
          children: allData.SiDaZhengCe,
        },
        {
          label: '环境合法',
          mode: 'span',
          children: allData.HuanJingHeFa,
        },
        {
          label: '书籍合法',
          mode: 'span',
          children: allData.ShuJiHeFa,
        },
        {
          label: '银行合法',
          mode: 'span',
          children: allData.YinHangHeFa,
        },
        {
          label: '国家高度',
          mode: 'span',
          children: allData.GuoJiaGaoDu,
        },
        {
          label: '人生观',
          mode: 'span',
          children: allData.ReShengGuan,
        },
        {
          label: '借钱方案',
          mode: 'span',
          children: allData.JieQianFangAn,
        },
        {
          label: '银行转账',
          mode: 'span',
          children: allData.YinHangZhuanZhang,
        },
        {
          label: '结案',
          mode: 'span',
          children: allData.JieAn,
        },
        {
          label: '大经理',
          mode: 'span',
          children: allData.DaJingLi,
        },
      ],
    }
  },
  computed: {
    formattedName () {
      return function (props) {
        if (props.column.field === 'name') {
          let str = props.row.name
          if (props.row.sex === '男') {
            str = `<span class="color_red">${props.row.name}</span>`
          } else if (props.row.sex === '女') {
            str = `<span class="color_green">${props.row.name}</span>`
          }
          if (props.row.course !== '大经理') {
            if (props.row.family === '有') {
              str = `${str}|<span class="color_purple">${props.row.family}</span>`
            } else {
              str = `${str}|${props.row.family}`
            }
          }
          return `${str}<div class="progress"><div class="progress-bar progress-bar-${props.row.recommend * 20}"></div></div>`
        }
        return props.formattedRow[props.column.field]
      }
    },
  },
  methods: {
    search (row, col, cellValue, searchTerm) {
      if (searchTerm.slice(-1) === '#' && col.field === 'recommend') {
        return `${cellValue}#` === searchTerm
      } else {
        return `${cellValue}`.indexOf(searchTerm) !== -1
      }
    },
  },
  mounted () {
  },
  components: {},
}
</script>
