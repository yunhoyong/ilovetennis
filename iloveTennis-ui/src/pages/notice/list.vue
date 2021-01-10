<template>
  <div>
    <b-card
    header="클럽 공지사항"
    style="max-width: 400rem; margin: auto;"
    class="mb-2"
    border-variant="info"
    align="left">
      <b-row>
        <b-col md="auto">
          <b-calendar v-model="value" @context="onContext" locale="en-US"></b-calendar>
        </b-col>
      </b-row>
      <b-table striped hover :items="toDoItems" :fields="fields" sort-icon-left></b-table>
    </b-card>
  <router-link to="/notice/write">
  <b-button variant="success">글쓰기</b-button>
  </router-link>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'hello',
  layout: 'default',
  components: {
  },
  props: {

  },
  data: () => {
    return {
      toDoItems: [{ noticeSerialNumber: 1, noticeTitle: '제목1', userName: '등록자1', regDate: '201812210820',viewCnt : 10 },
                  { noticeSerialNumber: 2, noticeTitle: '제목2', userName: '등록자2', regDate: '201812210820',viewCnt : 20 },
                  { noticeSerialNumber: 3, noticeTitle: '제목3', userName: '등록자3', regDate: '201812210820',viewCnt : 30 },
                  { noticeSerialNumber: 4, noticeTitle: '제목4', userName: '등록자4', regDate: '201812210820',viewCnt : 40 }],
      pageInfo: {
        page: 1,
        size: 10,
        total: 10
      },
      fields: [
        {
          key: 'noticeSerialNumber',
          label: 'No.',
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
          key: 'viewCnt',
          label: '조회수',
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
    async getNoticeList () {
      const { page, size } = this.$data.pageInfo
      const params = {
        pageNo: page,
        pageSize: size,
        ...this.searchForm,
        noticeStartDt: '20180101',
        noticeEndtDt: '20200202'
      }

      const [res, err] = await this.$https.get('/v1/tennis/notice', params)
      /* 임시 공지사항 데이터 추후 삭제 */
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
