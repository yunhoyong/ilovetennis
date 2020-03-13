<template>
  <section>
    <div id="process">
      <div class="article-title">
        <h-search
          v-model="workSerialNumber"
          :title="'업무일련번호'"
          :on-click="searchWork"
          :active-button="isValidAuthBtn('authSelect')"
          @enter="searchWork"
        />
        <div class="btn-group">
          <div>
            <el-button
              v-if="isValidAuthBtn('authExclusive') && (isAuth || userInfo.eeno === data.managerId)"
              type="primary"
              :disabled="!workSerialNumber"
              @click="save"
            >
              저장
            </el-button>
            <el-button
              v-if="isValidAuthBtn('authExclusive') && (isAuth || userInfo.eeno === data.managerId)"
              type="primary"
              :disabled="!workSerialNumber"
              @click="send"
            >
              고객센터 전송
            </el-button>
            <!-- CS02: 1:1문의 -->
            <el-button
              v-if="isValidAuthBtn('authExclusive')
                && (isAuth || userInfo.eeno === data.managerId)
                && data.progressTypeCode === 'CS01'
                && data.customerTransferStatusCode === '21'"
              type="primary"
              :disabled="data.customerReturnYn === 'Y'"
              @click="customerReturn"
            >
              재이관
            </el-button>
            <el-button
              v-if="isValidAuthBtn('authExclusive') && (isAuth || userInfo.eeno === data.managerId)"
              type="primary"
              :disabled="!workSerialNumber"
              @click="popVisible05 = true"
            >
              문자보내기
            </el-button>
          </div>
        </div>
      </div>
      <el-form
        :inline="true"
        class="detail-form detail-02"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="업무유형">
              {{ data.progressType }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="처리결과">
              <el-select
                v-model="data.workProcessResultCode"
                placeholder="처리결과 선택"
              >
                <el-option
                  v-for="{ value, label } in commonCodes.U011 && commonCodes.U011.slice(1, commonCodes.U011.length)"
                  :key="value"
                  :value="value"
                  :label="label"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            v-if="data.customerTransferStatusCode === '21' && data.progressTypeCode === 'CS01'"
            :span="8"
          >
            <el-form-item label="재이관여부">
              {{ data.customerReturnYn }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <h-relese-info
        :info="data"
      />
      <div>
        <div class="title">
          <div class="article-title">
            <h2>고객센터 수신 문의</h2>
            <el-button
              type="text"
              @click="collapse01 = !collapse01"
            >
              <span v-if="collapse01 !== true">
                <i class="el-icon-arrow-up" />
              </span>
              <span v-else><i class="el-icon-arrow-down" /></span>
            </el-button>
          </div>
        </div>
        <div :class="{ 'collapse-off' : collapse01 === true }">
          <el-form
            :inline="true"
            :model="data"
            class="detail-form "
          >
            <el-row>
              <el-col :span="8">
                <el-form-item label="접수유형">
                  {{ data.workLevelName }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="문의유형">
                  {{ data.faqType }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="이관일시">
                  {{ data.regDt }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="상담코드1">
                  {{ data.consulCode1 }}
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="상담코드2">
                  {{ data.consulCode2 }}
                </el-form-item>
              </el-col>
              <!-- 업무담당자업무등급코드 U017 -->
              <!-- <el-col :span="8">
                <el-form-item label="이관상태">
                  {{ data.code2 }}
                </el-form-item>
              </el-col> -->
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="제목">
                  {{ data.faqTitle }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item
                  label="내용"
                  style="height: 200px;"
                >
                  {{ data.faqContents }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="첨부파일">
                  <router-link
                    v-for="(item, idx) in data.attachFileList"
                    :key="`file-${idx}`"
                    to="/"
                    class="link"
                  >
                    <i class="file_img" /> {{ item.attcFilNm + item.attcFilExtNm }}
                  </router-link>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="이관 유형/분류">
                  {{ data.customerTransferStatus }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="문의 수신일시">
                  {{ data.regDt }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row
              v-if="data.customerTransferStatusCode === '21'"
            >
              <el-col :span="24">
                <el-form-item label="일반 상담사 내용">
                  <el-form-item
                    label="수신일시"
                    class="sub-label"
                  >
                    {{ data.normalConAnswerDate }}
                  </el-form-item>
                  {{ data.nomalConAnswer }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row
              v-else-if="data.customerTransferStatusCode === '22'"
            >
              <el-col :span="24">
                <el-form-item label="전문 상담사 내용">
                  <el-form-item
                    label="수신일시"
                    class="sub-label"
                  >
                    {{ data.proConAnswerDate }}
                  </el-form-item>
                  {{ data.proConAnswer }}
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>

      <div
        v-for="(item, idx) in replyHistory"
        :key="`history-${idx}`"
      >
        <div class="title">
          <div class="article-title article-reply">
            <h2>고객센터 문의 회신_{{ idx+1 }}차</h2>
            <el-form
              :inline="true"
              class="detail-form"
              style="width: 50%;"
            >
              <el-row>
                <el-col :span="12">
                  <el-form-item label="처리자">
                    {{ item.managerName }}
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="회신 일시">
                    {{ item.progressResult }} {{ item.replyDate ? '/' + item.replyDate : '' }}
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <el-button
              type="text"
              style="margin-left: auto;"
              @click="`${item.openYn = !item.openYn}`"
            >
              <span v-if="item.openYn !== false">
                <i class="el-icon-arrow-up" />
              </span>
              <span v-else>
                <i class="el-icon-arrow-down" />
              </span>
            </el-button>
          </div>
        </div>
        <div :class="{ 'collapse-off' : item.openYn === false }">
          <el-form
            :inline="true"
            class="detail-form"
          >
            <el-row>
              <el-col :span="24">
                <el-form-item label="내용">
                  <el-input
                    v-model="item.workProcessReplyContents"
                    :disabled="item.customerSendYn === 'Y'"
                    type="textarea"
                    @change="onChangeReplyContents(idx)"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="middle-add">
        <div
          class="btn-wrap"
          style="margin-bottom: 10px"
        >
          <div class="side" />
          <div class="main">
            <el-button
              v-if="isValidAuthBtn('authExclusive')"
              type="primary"
              @click="addProcessRow"
            >
              행추가
            </el-button>
          </div>
        </div>
        <el-form
          :inline="true"
          class="detail-form"
        >
          <el-row
            v-for="(item, idx) in processHistory"
            :key="`history-${idx}`"
          >
            <el-col :span="12">
              <el-form-item :label="`${idx+1}차 처리 결과 상태`">
                <el-select
                  v-model="item.progressResultCode"
                  placeholder="처리결과 선택"
                  @change="onChangeProcessResultCode(idx)"
                >
                  <el-option
                    v-for="{ value, label } in commonCodes.U015 && commonCodes.U015.slice(1, commonCodes.U015.length-1)"
                    :key="value"
                    :value="value"
                    :label="label"
                  />
                </el-select>
                <el-input
                  v-model="item.workProcessDate"
                  disabled
                  style="width:200px; margin-left: 10px"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="메모">
                <el-input
                  v-model="item.workProcessContent"
                  @change="onChangeMemo(idx)"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-form
        :inline="true"
        class="detail-form detail-02"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="진행 상황 메모">
              <el-input
                v-model="data.workProcessContent"
                type="textarea"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form
        :inline="true"
        class="detail-form detail-02"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="업무담당자">
              {{ data.consultantName }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="처리자">
              {{ data.managerName }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="article">
        <el-tabs
          v-model="activeName"
          type="card"
          stretch
          @tab-click="handleTabClick"
        >
          <el-tab-pane
            label="계약정보"
            name="first"
          >
            <contract-info
              :contract-number.sync="contractNumber"
              :contract-data.sync="contractData"
              :sign-data.sync="signData"
              :status-date-data.sync="statusDateData"
              :user-info-data.sync="userInfo"
              :paper-review-data.sync="paperReviewData"
              :active-user-flag.sync="activeFlag"
            />
          </el-tab-pane>
          <el-tab-pane
            label="차량정보"
            name="second"
          >
            <car-info
              :car-info-data.sync="carInfoData"
              :choice-option-names.sync="choiceOptionNames"
              :tuix-option-names.sync="tuixOptionNames"
            />
          </el-tab-pane>
          <el-tab-pane
            label="결제정보"
            name="third"
          >
            <pay-info
              :pay-info-data.sync="payInfoData"
              :pay-amount-list.sync="payAmountList"
              :pay-detail.sync="payDetail"
              :user-info-data.sync="userInfo"
              :contract-info-data.sync="contractInfo"
              :active-user-flag.sync="activeFlag"
              @refresh="onRefresh($event, 'pay')"
            />
          </el-tab-pane>
          <el-tab-pane
            label="출고정보"
            name="fourth"
          >
            <release-info
              :release-info-data.sync="releaseInfoData"
              :release-center-data.sync="releaseCenterData"
              :release-takeover-data.sync="releaseTakeoverData"
              :release-consign-data.sync="releaseConsignData"
              :contract-info-data.sync="contractInfo"
            />
          </el-tab-pane>
          <el-tab-pane
            label="상태이력"
            name="fifth"
          >
            <status-history
              :data.sync="statusTabData"
            />
          </el-tab-pane>
          <el-tab-pane
            label="문자이력"
            name="sixth"
          >
            <sms-history
              :data.sync="messageTabData"
              @refresh="onRefresh($event, 'sms')"
            />
          </el-tab-pane>
        </el-tabs>
      </div>

      <!-- 조회결과없음 팝업 -->
      <el-dialog
        custom-class="message"
        :visible.sync="alertNoData"
      >
        <!-- Message -->
        조회 결과가 없습니다.

        <!-- Popup Footer -->
        <template slot="footer">
          <el-button
            type="info"
            @click="alertNoData = false"
          >
            확인
          </el-button>
        </template>
      </el-dialog>

      <!-- 문자보내기 팝업 -->
      <el-dialog
        title="문자보내기"
        :visible.sync="popVisible05"
        width="1100px"
      >
        <!-- Popup Contents -->
        <div class="board-wrap sandmessage">
          <h-title :title="'수신자 정보'" />
          <el-form
            ref="contractData"
            :model="contractData"
            class="detail-form"
          >
            <el-row>
              <el-col :span="8">
                <el-form-item label="계약자명">
                  {{ contractData.contractorInfo && contractData.contractorInfo.length > 0 ? contractData.contractorInfo[0].customerName : '' }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="휴대전화번호">
                  {{ contractData.contractorInfo && contractData.contractorInfo.length > 0 ? contractData.contractorInfo[0].customerMobile : '' }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="발송일시" />
              </el-col>
            </el-row>
          </el-form>
          <h-title :title="'발신내용'" />
          <el-form
            ref="ruleFormpopup"
            :model="ruleFormpopup"
            class="detail-form"
          >
            <el-row>
              <el-col :span="24">
                <el-form-item label="제목">
                  <el-input
                    v-model="ruleFormpopup.title"
                    class="mms-title"
                    @blur="ruleFormpopup.title = $event.target.value"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="내용">
                  <el-input
                    v-model="ruleFormpopup.text"
                    type="textarea"
                    @blur="ruleFormpopup.text = $event.target.value"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <!-- Popup Footer -->
        <template slot="footer">
          <el-button
            type="info"
            @click="initRuleFormPop"
          >
            초기화
          </el-button>
          <el-button
            type="primary"
            @click="sendSms"
          >
            전송
          </el-button>
        </template>
      </el-dialog>
      <!-- message Popup -->
      <pop-message
        :pop-visible.sync="alertMessagePop"
        :pop-message.sync="alertMessage"
        @confirm="alertMessagePop = false"
        @close="alertMessagePop = false"
      />
    </div>
  </section>
</template>

<script>
import HReleseInfo from '~/components/common/HReleseInfo.vue'
import HSearch from '~/components/common/HSearch.vue'
import HTitle from '~/components/common/HTitle.vue'

import ContractInfo from '~/components/tab/ContractInfo.vue'
import CarInfo from '~/components/tab/CarInfo.vue'
import PayInfo from '~/components/tab/PayInfo.vue'
import ReleaseInfo from '~/components/tab/ReleaseInfo.vue'
import StatusHistory from '~/components/tab/StatusHistory.vue'
import SmsHistory from '~/components/tab/SmsHistory.vue'
import PopMessage from '~/components/popup/PopMessage.vue'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'Proc',
  layout: 'default',
  components: {
    HReleseInfo,
    HSearch,
    HTitle,
    ContractInfo,
    CarInfo,
    PayInfo,
    ReleaseInfo,
    StatusHistory,
    SmsHistory,
    PopMessage
  },

  data() {
    return {
      isAuth: process.env.VUE_APP_AUTH === 'true', // 권한 패스용
      activeFlag: false, // 탭에서 조건별 활성화되어야 하는 버튼 제어 플래그
      activeName: '',
      alertNoData: false,
      alertMessage: '',
      alertMessagePop: false,
      popVisible05: false,
      ruleFormpopup: {
        title: '',
        text: ''
      },
      // collapse
      collapse01: false,
      workSerialNumber: null, // 업무일련번호
      data: {},
      replyHistory: [], // 문의회신 이력
      processHistory: [], // 처리정보 이력
      contractNumber: null,
      contractData: {},
      signData: [],
      statusDateData: {},
      paperReviewData: [],
      carInfoData: {},
      choiceOptionNames: '',
      tuixOptionNames: '',
      payInfoData: {},
      payAmountList: [],
      payDetail: {},
      releaseInfoData: {},
      releaseCenterData: {},
      releaseTakeoverData: {},
      releaseConsignData: {},
      contractInfo: {},
      statusTabData: { sale: [], sales: [], payment:[], consultant:[], papers:[], electron: [], point: []},
      messageTabData:[],
      commonCodes: {}
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
    // workSerialNumber: function () {
    //   return this.$route.query.workSerialNumber
    // }
  },
  watch: {
    '$route': 'fetchData'
  },
  async created() {
    await this.loadCommonCode()
  },
  mounted() {
    console.log(process.env)
    this.workSerialNumber = this.$route.query.workSerialNumber
    if(this.workSerialNumber) {
      this.getProcessData(this.workSerialNumber)
    }

    for(let i=0; i<4; i++) { // 문의회신 목록(default: 4) 기본 제공
      this.addReplyRow()
      if(i<3) { // 처리결과 목록(default: 3) 기본 제공
        this.addProcessRow()
      }
    }
  },
  methods: {
    fetchCommonCodeData(systemType = '', codeType = '') {
      let res = null
      switch(systemType) {
      case 'E':
        res = this.$store.dispatch('loadCommonCodesE', {vm: this, codeTypeCode: codeType})
        break
      case 'C':
        res = this.$store.dispatch('loadLegacyCommonCodesC', {vm: this, codeTypeCode: codeType})
        break
      }
      return res
    },
    async loadCommonCode() {
      const [ccU011, ccU015] = await Promise.all([
        this.fetchCommonCodeData('E', 'U011'),
        this.fetchCommonCodeData('E', 'U015')
      ])

      this.commonCodes = { ...ccU011, ...ccU015 }
    },
    fetchData() {
      if(!this.$route.query.workSerialNumber) { Object.assign(this.$data, this.$options.data()) }
    },
    isValidAuthBtn(authId) { // 버튼별 권한 체크
      let bResult = false // true: 허용 , false: 비허용
      const currAuthBtnList = this.$store.state.currAuthBtnList || []
      if(currAuthBtnList && currAuthBtnList.length > 0) {
        currAuthBtnList.some((items) => {
          if(items.btnId === authId) {
            bResult = true
            return true
          }
        })
      }
      return bResult
    },
    handleTabClick(tab) {
      if(tab.name==='first') this.getContractTabData()
      else if(tab.name==='second') this.getCarTabData()
      else if(tab.name==='third') this.getPaymentTabData()
      else if(tab.name==='fourth') this.getReleaseTabData()
      else if(tab.name==='fifth') this.getStatusTabData()
      else if(tab.name==='sixth') this.getMessageTabData()
    },
    async getProcessData(serialNumber) {
      if(!serialNumber) return

      const [res1,err1] = await this.$https.get('/v1/exclusive/customer/' + serialNumber)//API-E-업무담당자-059 (고객센터이관업무 상세조회)
      if(!err1) {
        console.log('/mypage/'+serialNumber, res1.data)
        if(!res1.data) { // 상세보기 - 조회 결과 없음 팝업 노출
          Object.assign(this.$data, this.$options.data())
          this.alertNoData = true
          return
        }
        this.data = res1.data
        this.data.attachFileList = []
        // this.data.attachFileList[0] = {
        //   'fileGroupSerialNumber': '1',
        //   'fileSn': '1',
        //   'attcFilNm': 'file',
        //   'attcFilExtNm': '.svg',
        // }
        this.contractNumber = res1.data && res1.data.contractNumber
        this.activeName = 'first'
        this.getContractTabData() //first tab
        this.getContractInfoData()

        if(this.data.managerId && this.data.managerId === this.userInfo.eeno) { // 사용자 사번과 처리자가 같을 경우
          this.activeFlag = true
        }
      } else {
        console.error(err1)
      }

      const [res2,err2] = await this.$https.get('/v1/exclusive/customer/'+serialNumber+'/inquiry-history') //API-E-업무담당자-061 (고객센터 처리정보 이력 조회)
      if(!err2) {
        this.processHistory = res2.data.map((el) => {
          const { progressResultCode = '', progressResult = '', workProcessDate = '', workProcessContent = '', workProcessSerialNumber = '', workAssignNumber = '' } = el
          return { progressResultCode, progressResult, workProcessDate, workProcessContent, workProcessSerialNumber, workAssignNumber }
        })
        if(res2.data.length < 3) { //최소 3개 행 나오도록
          for(let i=res2.data.length; i<3; i++) {
            this.addProcessRow()
          }
        }
        console.log(this.processHistory)
      } else {
        console.error(err2)
      }

      const [res3,err3] = await this.$https.get('/v1/exclusive/customer/'+serialNumber+'/reply-history') //API-E-업무담당자-060 (고객센터문의회신이력 조회)
      if(!err3) {
        this.replyHistory = res3.data.map((el) => {
          const { workAssignNumber = '', workProcessSerialNumber = '', progressResult = '', progressResulCode = '',
            managerId = '', managerName = '', replyDate = '', workProcessReplyContents = '', customerSendYn = '' } = el
          const { openYn } = false
          return { workAssignNumber, workProcessSerialNumber, progressResult, progressResulCode, managerId, managerName, replyDate, workProcessReplyContents, customerSendYn, openYn, isEdit: false }
        })

        if(this.replyHistory.length < 4) { //최소 4개 행 나오도록
          for(let i=this.replyHistory.length; i<4; i++) {
            this.addReplyRow()
          }
        }

        console.log(this.replyHistory)
      } else {
        console.error(err2)
      }

    },
    async getContractInfoData() {
      const [res, err] = await this.$https.get('/v1/exclusive/contract/'+this.contractNumber)
      if(!err) {
        this.contractInfo = res.data
      } else {
        console.error(err)
      }
    },
    searchWork(value) {
      if(!this.isValidAuthBtn('authSelect')) { // 권한없을경우 동작 x
        return
      }

      if(!value) {
        this.alertMessage = '업무일련번호를 입력해주세요.'
        this.alertMessagePop = true
        return
      } else {
        value = value.trim() // 공백 제거
      }

      if(this.$route.query.workSerialNumber !== value) {
        this.$router.push(this.$route.path + '?workSerialNumber='+ value)
      }

      this.workSerialNumber = value
      this.getProcessData(value)
      this.activeName = 'first'
      this.getContractTabData()//first tab
    },
    addProcessRow() {
      const { workSerialNumber = '', managerId = ''} = this.data
      this.processHistory.push({
        isAdd: this.processHistory.length > 3 ? true : false,
        workAssignNumber: workSerialNumber,
        workProcessSerialNumber : '',
        managerId,
        workProcessDetailResultCode:'',
        workProcessDate:'',
        workProcessContent:''
      })
    },
    addReplyRow() {
      const { workSerialNumber = '' } = this.data
      this.replyHistory.push({
        isAdd: this.replyHistory.length > 4 ? true : false,
        workAssignNumber: workSerialNumber,
        workProcessSerialNumber : '',
        progressResult: '',
        progressResulCode: '',
        workProcessDate: '',
        workProcessReplyContents: '',
        customerSendYn: 'N', // 전송여부
        openYn: false, // 접기/펼침 여부
        isEdit: false // 수정여부
      })
    },
    onChangeProcessResultCode(idx) { // 처리결과 상태코드 변경시
      this.processHistory[idx].workProcessDate = moment().format('YYYY-MM-DD HH:mm')
      this.processHistory[idx].isAdd = true
    },
    onChangeMemo(idx) { // 처리결과 메모 변경시
      this.processHistory[idx].isAdd = true
    },
    onChangeReplyContents(idx) { // 문의 회신 내용 변경시
      this.replyHistory[idx].isEdit = true
    },
    async save() {
      if(!this.workSerialNumber) {
        this.alertMessage = '업무를 먼저 검색해주세요.'
        this.alertMessagePop = true
        return
      }

      const { workSerialNumber: workAssignNumber = '', workProcessResultCode = '', workProcessContent = '',
        progressTypeCode: workType = '', customerNumber = '' } = this.data

      let processList = this.processHistory.map((el) => {
        const { customerProcessType } = { customerProcessType: 'E' } // 업무처리메모구분코드(C: 고객센터 문의 회신, E: 1차&2차&3차 처리결과)
        const { managerId = '', workProcessContent = '', progressResultCode = '', workProcessSerialNumber = '', workAssignNumber = this.data.workSerialNumber, isAdd = false } = el

        return { workAssignNumber, workProcessSerialNumber, workProcessDetailResultCode: progressResultCode, customerProcessType, workProcessContent, managerId, customerNumber, isAdd }
      })

      processList = processList.filter((items) => {    // 변경되거나 추가된 사항만 저장
        if(items.workProcessDetailResultCode) {
          return items.isAdd === true
        }
      })
      console.log(processList)
      let replyList = this.replyHistory.map((el) => { // 답변완료 상태가 아닐 경우에만 회신(전송)
        const { customerProcessType } = { customerProcessType: 'C' } // 업무처리메모구분코드(C: 고객센터 문의 회신, E: 1차&2차&3차 처리결과)
        const { workProcessReplyContents: workProcessContent = '', progressResulCode: workProcessDetailResultCode = '', workProcessSerialNumber = '', workAssignNumber = '', isEdit = '' } = el

        if(el.customerSendYn === 'N') { // 답변완료 상태가 아닐 경우에만 송신
          return { workAssignNumber, workProcessSerialNumber, workProcessDetailResultCode, customerProcessType, workProcessContent, isEdit }
        } else {
          return {}
        }
      })

      // 문의 회신 목록(변경된 사항만 저장)
      replyList = replyList.filter((items) => { return items.isEdit === true })

      const workProcessList = [ ...replyList, ...processList ] // merge

      const body = { workAssignNumber, workType, workProcessResultCode, workProcessContent, customerNumber, workProcessList }
      console.log(body)
      const [res,err] = await this.$https.post('/v1/exclusive/customer', body) //API-E-업무담당자-062 (고객센터이관업무 정보 저장)
      if(!err) {
        this.alertMessage = '저장되었습니다.'
        this.alertMessagePop = true
        this.getProcessData(this.workSerialNumber)
        console.log('POST /customer', res.data)
      } else {
        console.error(err)
      }
    },
    async send() { // 이관업무 정보 전송
      const { workSerialNumber: workAssignNumber = '', workProcessResultCode = '', workProcessContent = '',
        progressTypeCode: workType = '', consultantId = '', managerId = '', customerReturnYn = '' } = this.data

      // 문의 회신 목록중에서 전송여부가 'Y'이면서 `종결`상태인 목록이 1개라도 있으면
      // 전송 취소
      if(this.replyHistory.some((items) => { return items.progressResulCode === '30' && items.customerSendYn === 'Y' })) {
        this.alertMessage = '종결된 업무이므로, 전송할 수 없습니다.'
        this.alertMessagePop = true
        return
      }

      const originReplyHistory = this.replyHistory.filter((items) => { return items.workProcessReplyContents }) // 모든 문의 회신 목록에서 내용을 입력한 문의 회신 목록만 return
      if(originReplyHistory && originReplyHistory.length === 4 && this.data.workProcessResultCode !=='30') { // 문의 회신 1~4차 모두 기입한 상태이며 처리결과가 `종결`상태가 아니라면 alert
        this.alertMessage = '처리결과를 [종결] 상태로 변경해주세요.'
        this.alertMessagePop = true
        return
      }

      let processList = this.processHistory.map((el) => {
        const { customerProcessType } = { customerProcessType: 'E' } // 업무처리메모구분코드(C: 고객센터 문의 회신, E: 1차&2차&3차 처리결과)
        const { managerId = '', workProcessContent = '', progressResultCode = '', workProcessSerialNumber = '',workAssignNumber } = el
        return { workAssignNumber, workProcessSerialNumber, workProcessDetailResultCode: progressResultCode, customerProcessType, workProcessContent, managerId, customerReturnYn }
      })

      let replyList = this.replyHistory.map((el) => { // 답변완료 상태가 아닐 경우에만 회신(전송)
        const { customerProcessType } = { customerProcessType: 'C' } // 업무처리메모구분코드(C: 고객센터 문의 회신, E: 1차&2차&3차 처리결과)
        const { workProcessReplyContents: workProcessContent = '', progressResulCode: workProcessDetailResultCode = '', workProcessSerialNumber = '', workAssignNumber = '', isEdit = '' } = el

        if(el.customerSendYn === 'N') { // 답변완료 상태가 아닐 경우에만 송신
          return { workAssignNumber, workProcessSerialNumber, workProcessDetailResultCode, customerProcessType, workProcessContent, isEdit }
        } else {
          return {}
        }
      })

      processList = processList.filter((items) => {    // 변경되거나 추가된 사항만 저장
        if(items.workProcessDetailResultCode) {
          return items.isAdd === true
        }
      })

      const workProcessList = [ ...replyList, ...processList ] // merge

      const body = { workAssignNumber, workType, workProcessResultCode, workProcessContent, consultantId, managerId, workProcessList }
      console.log(body)
      const [res, err] = await this.$https.post('/v1/exclusive/send', body) // API-E-업무담당자-063 (고객센터이관업무 전송)

      if(!err) {
        console.log('POST /send', res.data)
        if(res.rspStatus && res.rspStatus.rspCode === '0000') {
          this.alertMessage = '전송되었습니다.'
          this.alertMessagePop = true
        }
        this.getProcessData(this.workSerialNumber)
      } else {
        console.error(err)
      }
    },
    async getContractTabData() {
      if(!this.contractNumber) return

      //계약자 정보 + 서비스가입 + 계약금 결제
      const [res1, err1] = await this.$https.get('/v1/exclusive/work/contract/'+this.contractNumber)
      if(!err1) {
        console.log('/work/contract/', res1.data)
        if(!res1.data) { return }
        this.contractData = res1.data
      } else {
        console.error(err1)
      }

      //전자서명
      const [res2, err2] = await this.$https.get('/v1/exclusive/work/electron/'+this.contractNumber)
      if(!err2) {
        console.log('/work/electron/', res2.data)
        this.signData = res2.data
      } else {
        console.error(err2)
      }

      //상태별 일자
      const [res3, err3] = await this.$https.get('/v1/exclusive/work/state-day/'+this.contractNumber)
      if(!err3) {
        console.log('/work/state-day/', res3.data)
        this.statusDateData = res3.data
      } else {
        console.error(err3)
      }

      //서류심사 목록
      const [res4, err4] = await this.$https.get('/v1/exclusive/work/contract/papers/'+this.contractNumber)
      if(!err4) {
        console.log('/work/contract/papers/', res4.data)
        this.paperReviewData = res4.data.map((el, idx) => {
          el.no = idx+1
          return el
        })
      } else {
        console.error(err4)
      }
    },
    async getCarTabData() {
      if(!this.contractNumber) return

      //차량정보
      const [res1, err1] = await this.$https.get('/v1/exclusive/work/car/'+this.contractNumber)
      if(!err1) {
        console.log('/work/car/', res1.data)
        if(res1.data) {
          this.carInfoData = res1.data
          let choiceOptionNameAry = [], tuixOptionNameArr = [], tuixOptionTotalPrice = 0

          this.carInfoData.choiceOptionInfo && this.carInfoData.choiceOptionInfo.map(el => {
            choiceOptionNameAry.push(el.carOptionName)
            if(el.carOptionDeailName !== null) {
              el.carOptionDeailNameAry = el.carOptionDeailName.split('+')
            }
          })
          this.choiceOptionNames = choiceOptionNameAry.join(', ')

          this.carInfoData.tuixOptionInfo && this.carInfoData.tuixOptionInfo.map(el => {
            tuixOptionTotalPrice += el.carOptionPrice
            tuixOptionNameArr.push(el.carOptionName)
            if(el.carOptionDeailName !== null) {
              el.carOptionDeailNameAry = el.carOptionDeailName.split('+')
            }
          })
          this.tuixOptionNames = tuixOptionNameArr.join(', ')
          this.carInfoData = { ...this.carInfoData, tuixOptionTotalPrice: tuixOptionTotalPrice }
        }

      } else {
        console.error(err1)
      }
    },
    async getPaymentTabData() {
      if(!this.contractNumber) return

      //결제정보
      const [res1, err1] = await this.$https.get('/v1/exclusive/work/payment/'+this.contractNumber)
      if(!err1) {
        console.log('/work/payment/', res1.data)
        this.payInfoData = res1.data
      } else {
        console.error(err1)
      }

      //결제금액
      const [res2, err2] = await this.$https.get('/v1/exclusive/work/payment-amount/'+this.contractNumber)
      if(!err2) {
        console.log('/work/payment-amount/', res2.data)
        this.payInfoData.totalPrice = 0
        let totalDiscount = 0, totalPoint = 0, totalDiscountRate = 0

        this.payAmountList = []
        if(res2.data) {
          this.payAmountList.push({name: '차량금액', content: '', price: (res2.data.carPrice ? res2.data.carPrice.toLocaleString() + '원' : '0원'), pointState: '', background: '', type: ''})
          this.payAmountList.push({name: '탁송료', content: '', price: (res2.data.deliveryPrice ? res2.data.deliveryPrice.toLocaleString() + '원' : '0원'), pointState: '', background: '', type: ''})
          this.payAmountList.push({name: '단기의무보험료', content: '', price: (res2.data.insurancePayment ? res2.data.insurancePayment.toLocaleString() + '원' : '0원'), pointState: '', background: '', type: ''})
          if(res2.data.greenTaxFreePrice) {
            //2020.03.03 친환경면세 => 개소세면서
            this.payAmountList.push({name: '개소세면서', content: '', price: (res2.data.greenTaxFreePrice ? res2.data.greenTaxFreePrice.toLocaleString() + '원' : '0원'), pointState: '', background: '', type: ''})
          }
          res2.data.discountInfo && res2.data.discountInfo.map((el) => {
            totalDiscount += el.discountPrice
            totalDiscountRate += el.discountRate || 0
          })
          this.payAmountList.push({name: '총 할인금액', content: '', percent: (totalDiscountRate ? totalDiscountRate + '%' : ''), price: (totalDiscount.toLocaleString() + '원'), pointState: '', background: '', type: ''})

          res2.data.discountInfo && res2.data.discountInfo.map((el, idx, ary) => {
            this.payAmountList.push({name: (idx===0 || el.discountTypeName!==ary[idx-1].discountTypeName  ? el.discountTypeName : ''), content: el.discountContents!==null ? el.discountContents : el.discountName, percent: (el.discountRate ? el.discountRate + '%' : ''), price: (el.discountPrice ? (el.discountPrice.toLocaleString() + '원') : ''), pointState: '', background: 'red', type: ''})
          })

          res2.data.pointInfo && res2.data.pointInfo.map((el) => { //총 포인트
            totalPoint += el.usePoint
          })
          this.payAmountList.push({name: '총 포인트 금액', content: '', price: (totalPoint.toLocaleString() + '원'), pointState: '', background: '', type: ''})

          res2.data.pointInfo && res2.data.pointInfo.map((el, idx) => {
            let payType = ''
            if(el.pointCode === 'HC' && el.saveAutoPointYn) {
              payType  = 'save-auto' // API-E-결제서비스-027 (세이브오토 취소 처리)
            } else if(el.pointCode === 'HC' && !el.saveAutoPointYn) {
              payType  = 'm-point' // API-E-결제서비스-025 (M포인트 취소 처리)
            } else if(el.pointCode === 'OH') {
              payType  = 'blue-point' // API-E-결제서비스-026 (블루멤버스 포인트 취소 처리)
            }

            this.payAmountList.push({name: (idx===0  ? '포인트' : ''), content: el.pointName || '', price: (el.usePoint ? (el.usePoint.toLocaleString() + '원') : ''), pointState: el.pointUseState || '', background: 'red', type: 'button', payType: payType, useCompleteYn: el.useCompleteYn, customerManagementNumber: el.customerManagementNumber })
          })

          this.payInfoData.totalPoint = totalPoint || 0
          this.payInfoData.totalPrice = (res2.data.carPrice || 0) + (res2.data.deliveryPrice || 0) + (res2.data.insurancePayment || 0) - totalDiscount - totalPoint
          this.payInfoData.totalPrice4Mypage = (res2.data.carPrice || 0) + (res2.data.deliveryPrice || 0) + (res2.data.insurancePayment || 0) - totalDiscount - (res2.data.greenTaxFreePrice || 0)
        }
      } else {
        console.error(err2)
      }

      //결제내역상세
      const [res3, err3] = await this.$https.get('/v1/exclusive/work/payment-details/'+this.contractNumber)
      if(!err3) {
        console.log('/work/payment/', res3.data)
        res3.data.installmentInfo && res3.data.installmentInfo.map(el => {
          el.advancePayment = el.advancePayment ? el.advancePayment.toLocaleString()+'원' : '-'
          el.installmentPrincipal = el.installmentPrincipal ? el.installmentPrincipal.toLocaleString()+'원' : '-'
          el.monthlyPaymentTotal = el.monthlyPaymentTotal ? el.monthlyPaymentTotal.toLocaleString()+'원' : '-'
        })
        res3.data.cardInfo && res3.data.cardInfo.map(el => {
          el.cardPaymentPrice = el.cardPaymentPrice ? el.cardPaymentPrice.toLocaleString()+'원' : '-'
        })

        res3.data.paymentInfo && res3.data.paymentInfo.map(el => {
          let payType = ''
          if(el.paymentTypeCode === '20') {
            payType  = 'card' // API-E-결제서비스-023 (카드 취소 처리)
          } else if(el.paymentTypeCode === '10') {
            payType  = 'installment' // API-E-결제서비스-024 (할부 취소 처리)
          } else if(el.paymentTypeCode === '30') {
            payType  = 'cash' // cash 현금은 별도 처리 방식
          }
          el.payType = payType
        })

        res3.data.additionPaymentInfo && res3.data.additionPaymentInfo.map(el => {
          let payType = ''
          if(el.paymentTypeCode === '20') {
            payType  = 'card' // API-E-결제서비스-023 (카드 취소 처리)
          } else if(el.paymentTypeCode === '10') {
            payType  = 'installment' // API-E-결제서비스-024 (할부 취소 처리)
          } else if(el.paymentTypeCode === '30') {
            payType  = 'cash' // cash 현금은 별도 처리 방식
          }
          el.payType = payType
        })


        this.payDetail = res3.data
        const { blueMembersRate, blueMembersPrearrangementPoint, blueMembersPoint, blueMembersContents } = res3.data
        this.payDetail.blueInfo = [ { blueMembersRate : (blueMembersRate ? Number(blueMembersRate).toFixed(1) : '-'), blueMembersPrearrangementPoint : blueMembersPrearrangementPoint ? Number(blueMembersPrearrangementPoint).toLocaleString() : '-', blueMembersPoint : blueMembersPoint ? Number(blueMembersPoint).toLocaleString() : '-', blueMembersContents } ]
      } else {
        console.error(err3)
      }


    },
    async getReleaseTabData() {
      if(!this.contractNumber) return

      //출고정보
      const [res1, err1] = await this.$https.get('/v1/exclusive/work/delivery/'+this.contractNumber)
      if(!err1) {
        console.log('/work/delivery/', res1.data)
        this.releaseInfoData = res1.data
      } else {
        console.error(err1)
      }


      //출고센터진행정보
      const [res2, err2] = await this.$https.get('/v1/exclusive/work/delivery-state/'+this.contractNumber)
      if(!err2) {
        console.log('/work/delivery-state/', res2.data)
        this.releaseCenterData = res2.data
      } else {
        console.error(err2)
      }


      //인수정보
      const [res3, err3] = await this.$https.get('/v1/exclusive/work/take-over/'+this.contractNumber)
      if(!err3) {
        console.log('/work/take-over/', res3.data)
        this.releaseTakeoverData = res3.data
      } else {
        console.error(err3)
      }


      //탁송정보
      const [res4, err4] = await this.$https.get('/v1/exclusive/work/consign/'+this.contractNumber)
      if(!err4) {
        console.log('/work/consign/', res4.data)
        this.releaseConsignData = res4.data
      } else {
        console.error(err4)
      }
    },
    async getStatusTabData() {
      if(!this.contractNumber) return

      //API-E-업무담당자-035 (판매처리이력 조회)
      const [res1, err1] = await this.$https.get('/v1/exclusive/work/history/sale/'+this.contractNumber)
      if(!err1) {
        console.log('/work/history/sale/', res1.data)
        this.statusTabData.sale = res1.data.map((el) => {
          return {
            ...el,
            deliveryPrearrangedDate: el.deliveryPrearrangedDate ? moment(el.deliveryPrearrangedDate).format('YYYY-MM-DD') : '',
          }
        })
      } else {
        console.error(err1)
      }


      //API-E-업무담당자-036 (매출변경이력 조회)
      const [res2, err2] = await this.$https.get('/v1/exclusive/work/history/sales/'+this.contractNumber)
      if(!err2) {
        console.log('/work/history/sales/', res2.data)
        this.statusTabData.sales = res2.data.map((el) => {
          return {
            ...el,
            carPrice: el.carPrice && (el.carPrice*1).toLocaleString()+' 원',
            discountPrice: el.discountPrice && (el.discountPrice*1).toLocaleString()+' 원',
            usePoint: el.usePoint && (el.usePoint*1).toLocaleString(),
            salePrice: el.salePrice && (el.salePrice*1).toLocaleString()+' 원',
            contractPrice: el.contractPrice && (el.contractPrice*1).toLocaleString()+' 원',
            installmentPrincipal: el.installmentPrincipal && (el.installmentPrincipal*1).toLocaleString()+' 원',
            cardPaymentPrice: el.cardPaymentPrice && (el.cardPaymentPrice*1).toLocaleString()+' 원',
            tax: el.tax && (el.tax*1).toLocaleString()+' 원',
          }
        })
      } else {
        console.error(err2)
      }
      //API-E-업무담당자-037 (결제변경이력 조회)
      const [res3, err3] = await this.$https.get('/v1/exclusive/work/history/payment/'+this.contractNumber)
      if(!err3) {
        console.log('/work/history/payment/', res3.data)
        this.statusTabData.payment = res3.data.map((el) => {
          return {
            ...el,
            paymentPrice: el.paymentPrice ? (el.paymentPrice*1).toLocaleString()+'원' : '',
            paymentContents: el.paymentTypeCode !== '30' ? el.paymentContents : (el.virtualAccount ? el.paymentContents + '\n - 계좌번호: ' + el.virtualAccount : el.paymentContents),
            refundPrice: el.refundPrice ? (el.refundPrice*1).toLocaleString()+'원' : ''
          }
        })
      } else {
        console.error(err3)
      }

      // API-E-업무담당자-129 (포인트신청이력 조회)
      const [res4, err4] = await this.$https.get('/v1/exclusive/work/history/point/' + this.contractNumber)
      if(!err4) {
        console.log('/work/history/point/', res4.data)
        this.statusTabData.point = res4.data.map((items, idx) => {
          return {
            ...items,
            no: idx + 1,
            pointUsePrice: items.pointUsePrice.toLocaleString() + '원', // 포인트 사용금액
            partnerAssignmentPrice: items.partnerAssignmentPrice.toLocaleString() + '원', // 제휴사분담금액
            companyAssignmentPrice: items.companyAssignmentPrice.toLocaleString() + '원' // 당사분담금액
          }
        })
      } else {
        console.error(err4)
      }

      //API-E-업무담당자-038 (업무담당자처리이력 조회)
      const [res5, err5] = await this.$https.get('/v1/exclusive/work/history/consultant/'+this.contractNumber)
      if(!err5) {
        console.log('/work/history/consultant/', res5.data)
        this.statusTabData.consultant = res5.data
      } else {
        console.error(err5)
      }


      //API-E-업무담당자-040 (서류심사이력 조회)
      const [res6, err6] = await this.$https.get('/v1/exclusive/work/history/papers/'+this.contractNumber)
      if(!err6) {
        console.log('/work/history/papers/', res6.data)
        this.statusTabData.papers = res6.data.map((el, idx) => {
          return {
            ...el,
            no : idx+1,
            papersNameListStr : el.papersNameList.join(', '),
          }
        })
      } else {
        console.error(err6)
      }


      //API-E-업무담당자-041 (전자서명이력 조회)
      const [res7, err7] = await this.$https.get('/v1/exclusive/work/history/electron/'+this.contractNumber)
      if(!err7) {
        console.log('/work/history/electron/', res7.data)
        this.statusTabData.electron = res7.data
      } else {
        console.error(err7)
      }

    },
    async getMessageTabData() {
      if(!this.contractNumber) return

      //API-E-업무담당자-042 (문자발송목록 조회)
      const [res, err] = await this.$https.get('/v1/exclusive/work/history/sms/'+this.contractNumber, {offset:0, limit:999})
      if(!err) {
        console.log('/work/history/sms/', res.data)
        this.messageTabData = res.data.list && res.data.list.map((el, idx) => {
          return {
            ...el,
            no : idx+1,
          }
        })
      } else {
        console.error(err)
      }
    },
    initRuleFormPop() { // 초기화 버튼
      Object.assign(this.$data.ruleFormpopup, this.$options.data().ruleFormpopup)
    },
    tableRowClassName({row}) {
      if (row.background === 'red') {
        return 'warning-row'
      }
      else if (row.border === 'red') {
        return 'warning-row1'
      }
      return ''
    },
    async customerReturn() { // 재이관
      const { workSerialNumber: workAssignNumber = '' } = this.data
      const body = { workAssignNumber }
      const [res, err] = await this.$https.post('/v1/exclusive/customer/return', body) // API-E-업무담당자-117 (고객센터이관업무 정보 재이관)

      if(!err) {
        console.log('POST /return', res.data)
      } else {
        console.error(err)
      }
    },
    async sendSms() {
      const body = {
        sendChannelCode: 'M', // 발송경로 구분 코드 - 업무담당자
        saleContractNo: this.contractNumber || '', // 판매계약번호
        customerMgmtNo: this.contractData.contractorInfo[0].customerManagementNumber || '', // 고객관리번호
        customerUniqueNo: this.userInfo.eeno || '', // 고객고유번호
        messageTitle: this.ruleFormpopup.title, // 제목
        messageContents: this.ruleFormpopup.text, // 내용
        receiverTel: this.contractData.contractorInfo[0].customerMobile, // 수신자전화번호
        receiverName: this.contractData.contractorInfo[0].customerName// 수신자명
      }

      const [res, err] = await this.$https.post('/v1/exclusive/common/sms-send', body) // API-E-공통서비스-023 (문자 보내기)
      if(!err) {
        if(res.rspStatus && res.rspStatus.rspCode === '0000') {
          this.alertMessage = '문자가 전송되었습니다.'
          this.alertMessagePop = true
          this.getMessageTabData() // reload
          this.popVisible05 = false // 팝업 닫기
        }
      }
      this.popVisible05 = false // 팝업 닫기
    },
    onRefresh(flag) {
      if(flag) { this.getStatusTabData() }
    }
  }


}
</script>
<style lang="scss" scoped>
@import '~/assets/style/pages/detail.scss';
</style>
