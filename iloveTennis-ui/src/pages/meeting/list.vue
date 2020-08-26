<template>
  <div>
    <b-table-simple hover small caption-top responsive>
    <colgroup><col><col><col><col></colgroup>
    <b-tbody>
      
      <b-tr>
        <b-th>27 토요일</b-th>
        <b-td>
            
        </b-td>
      </b-tr>
    </b-tbody>
    </b-table-simple>
    <b-button pill variant="primary">모임 검색</b-button>
  </div>
</template>

<script>
import moment from 'moment'
import TheKakaoMap from '~/components/TheKakaoMap'
export default {
  name: 'hello',
  layout: 'default',
  components: {
    TheKakaoMap
  },
  props: {

  },
  data: () => {
    return {
      toDoItems: [],
      pageInfo: {
        page: 1,
        size: 10,
        total: 0
      },
      searchClubCd: '',
      searchClubNm: '퍼니피플',
      levelOptions: [
        { value: 'lt2.5', text: '2.5이하' },
        { value: '2.5', text: '2.5~3.0' },
        { value: '3.0', text: '3.0~3.5' },
        { value: '3.5', text: '3.5~4.0' },
        { value: '4.0', text: '4.0~4.5' },
        { value: 'gt4.5', text: '4.5이상' }
      ],
      ruleForm: {
        searchFromDt: moment().format('YYYY-MM-DD'),
        searchEndDt: moment().format('YYYY-MM-DD')
      },
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
        },
        {
          key: 'noticeYn',
          label: '공개여부',
          sortable: true
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
      if (!err) {
        this.toDoItems = res.data.list
        this.toDoItems.map((items, idx) => {
          items.noticeDt = moment(items.noticeStartDt).format('YYYY-MM-DD') + ' ~ ' + moment(items.noticeEndtDt).format('YYYY-MM-DD')
          items.noticeSerialNumber = res.data.total - res.data.endRow + this.toDoItems.length - idx
          // items.fileYn = BIconArrowDown
        })
      }
    },
    onContext(ctx) {
        // The date formatted in the locale, or the `label-no-date-selected` string
        this.formatted = ctx.selectedFormatted
        // The following will be an empty string until a valid date is entered
        this.selected = ctx.selectedYMD
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
