<template>
  <div class="hello">
  <v-md-date-range-picker :defaultPresets="this.defaultPresets" ></v-md-date-range-picker>
    <b-card
    header="클럽 공지사항"
    style="max-width: 400rem; margin: auto; margin-top: 10vh;"
    class="mb-2"
    border-variant="info"
    align="left">
      <b-table striped hover :items="toDoItems" :fields="fields" sort-icon-left v-if="toDoItems && toDoItems.length"></b-table>
  </b-card>
  </div>
</template>

<script>
import moment from 'moment'
// import VMdDateRangePicker from 'v-md-date-range-picker'

export default {
  name: 'hello',
  layout: 'default',
  components: {
    // VMdDateRangePicker
  },
  data: () => {
    return {
      toDoItems: [],
      pageInfo: {
        page: 1,
        size: 10,
        total: 0
      },
      defaultPresets: [
        {
          label: '오늘'
          // range: this.getRange(0, 0)
        },
        {
          label: '어제'
          // range: this.getRange(1, 1)
        },
        {
          label: '지난 7일'
          // range: this.getRange(6, 0)
        },
        {
          label: '지난 30일'
          // range: this.getRange(29, 0)
        },
        {
          label: '이번달'
          // range: this.getRange(0, 0, 'month')
        },
        {
          label: '저번달'
          // range: this.getRange(1, 1, 'month')
        }
      ],
      fields: [
        {
          key: 'noticeSerialNumber',
          label: 'No.',
          sortable: true
        },
        {
          key: 'fileYn',
          label: '파일'
        },
        {
          key: 'noticeGrade',
          label: '구분',
          sortable: true
        },
        {
          key: 'noticeTitle',
          label: '제목',
          sortable: true
        },
        {
          key: 'userName',
          label: '등록자',
          sortable: true
        },
        {
          key: 'regDate',
          label: '등록일시',
          sortable: false
        },
        {
          key: 'noticeDt',
          label: '게시기간',
          sortable: true
          // variant: 'danger'
        },
        {
          key: 'noticeYn',
          label: '공개여부',
          sortable: true
          // variant: 'danger'
        }
      ]
    }
  },
  created () {
    this.getNoticeList()
  },
  methods: {
    // getRange (startOffset = 0, endOffset = 0, period = 'day') {
    //   return [
    //     moment().subtract(startOffset, period).startOf(period),
    //     moment().subtract(endOffset, period).endOf(period)
    //   ]
    // },
    async getNoticeList () {
      const { page, size } = this.$data.pageInfo
      const params = {
        pageNo: page,
        pageSize: size,
        ...this.searchForm,
        noticeStartDt: '20180101',
        noticeEndtDt: '20200202'
      }

      const [res, err] = await this.$https.get('/v1/exclusive/notice', params)
      console.log(res)
      if (!err) {
        this.toDoItems = res.data.list
        this.toDoItems.map((items, idx) => {
          items.noticeDt = moment(items.noticeStartDt).format('YYYY-MM-DD') + ' ~ ' + moment(items.noticeEndtDt).format('YYYY-MM-DD')
          items.noticeSerialNumber = res.data.total - res.data.endRow + this.toDoItems.length - idx
          // items.fileYn = BIconArrowDown
        })
      }
    },
    update (values) {
      this.$router.push({
        query: Object.assign({}, this.$route.query, {
          to: values.to,
          from: values.from,
          panel: values.panel
        })
      })
    }
  }
}
</script>
