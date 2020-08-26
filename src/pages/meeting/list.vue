<template>
  <div>
    <b-table-simple hover small caption-top responsive>
    <colgroup><col><col><col><col></colgroup>
    <b-tbody>
      <b-tr>
        <b-th>지역선택</b-th>
        <b-td>
            <b-form-select v-model="searchClubCd" class="mb-3">
            <b-form-select-option :value="''">전체</b-form-select-option>
            <b-form-select-option value="100">서울시</b-form-select-option>
            <b-form-select-option value="200">경기도</b-form-select-option>
            <b-form-select-option value="300">강원도</b-form-select-option>
            <b-form-select-option value="400">경상남도</b-form-select-option>
            <b-form-select-option value="500">경상북도</b-form-select-option>
            <b-form-select-option value="600">전라남도</b-form-select-option>
            <b-form-select-option value="700">전라북도</b-form-select-option>
            <b-form-select-option value="800">충청남도</b-form-select-option>
            <b-form-select-option value="900">충청북도</b-form-select-option>
            <b-form-select-option value="1100">광주광역시</b-form-select-option>
            <b-form-select-option value="1200">대구광역시</b-form-select-option>
            <b-form-select-option value="1300">대전광역시</b-form-select-option>
            <b-form-select-option value="1400">부산광역시</b-form-select-option>
            <b-form-select-option value="1500">울산광역시</b-form-select-option>
            <b-form-select-option value="1600">인천광역시</b-form-select-option>
            <b-form-select-option value="1700">제주도</b-form-select-option>
        </b-form-select>
        </b-td>
        <b-td>
        <b-form-input placeholder="원하는지역을 입력해 주세요."></b-form-input>
        </b-td>
      </b-tr>
      <b-tr>
        <b-th>레벨 선택</b-th>
        <b-td colspan="2">
            <b-form-checkbox-group id="checkbox-group-1" :options="levelOptions" name="flavour-1" >
            </b-form-checkbox-group>
        </b-td>
      </b-tr>
      <b-tr>
        <b-th>날짜 선택</b-th>
        <b-td>
            <b-form-datepicker v-model="ruleForm.searchFromDt" type="date" @context="onContext" placeholder="검색 시작일"  locale="ko-KR" ></b-form-datepicker>
        </b-td>
        <b-td>
            <b-form-datepicker v-model="ruleForm.searchEndDt" type="date" @context="onContext" placeholder="검색 종료일" locale="ko-KR"></b-form-datepicker>
        </b-td>
      </b-tr>
      <b-tr>
        <b-th>모임명</b-th>
        <b-td><b-form-input v-model="searchClubNm" placeholder="모임명을 입력해 주세요."></b-form-input></b-td>
      </b-tr>
    </b-tbody>
    </b-table-simple>
    <b-button pill variant="primary">모임 검색</b-button>
    <b-card
    header="번개모임"
    style="max-width: 400rem; margin: auto; margin-top: 10vh;"
    class="mb-2"
    border-variant="info"
    align="left">
      <div id="map"></div>
      <b-table striped hover :items="toDoItems" :fields="fields" sort-icon-left v-if="toDoItems && toDoItems.length"></b-table>
      <the-kakao-map/>
  </b-card>
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

      const [res, err] = await this.$https.get('/v1/exclusive/notice', params)
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
