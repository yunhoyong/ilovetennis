<template>
  <section>
    <div id="login">
      <div class="loginWrap">
        <div class="logo">
          <h1>
            Tennis Together
          </h1>
        </div>
        <div class="login-form-wrap">
          <h3>Tennis Together</h3>
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            class="login-form"
          >
            <el-row>
              <el-col :span="24">
                <el-form-item
                  label=""
                  prop="id"
                >
                  <template>
                    아이디<br>
                  </template>
                  <el-input
                    v-model="ruleForm.uid"
                    class="login-input"
                    placeholder="아이디를 입력하세요."
                    @blur="ruleForm.uid = $event.target.value"
                    @keyup.native.enter="loginAction"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item
                  label=""
                  prop="pwd"
                >
                  <template>
                    비밀번호<br>
                  </template>
                  <el-input
                    v-model="ruleForm.pwd"
                    class="login-input"
                    type="password"
                    placeholder="비밀번호를 입력하세요."
                    @keyup.native.enter="loginAction"
                  />
                  <div
                    v-if="isCapsLock"
                    class="capslock-pop"
                  >
                    <div class="capslock-pop-wrap">
                      <span>Caps Lock이 켜져 있습니다.</span>
                    </div>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-checkbox
                  v-model="checkedId"
                >
                  아이디 저장
                </el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-button
                type="primary"
                class="loginBtn"
                @click="loginAction"
              >
                로그인
              </el-button>
            </el-row>
          </el-form>
        </div>
      </div>
    </div>
    <!-- message Popup -->
    <pop-message
      :pop-visible.sync="alertMessagePop"
      :pop-message.sync="alertMessage"
      :pop-sub-message.sync="alertSubMessage"
      sub-message-style="font-size: 12px;"
      @confirm="alertMessagePop = false"
      @close="alertMessagePop = false"
    />
  </section>
</template>

<script>
import PopMessage from '~/components/popup/PopMessage.vue'

export default {
  name: 'Login',
  layout: 'fullpage',
  components: {
    PopMessage
  },
  data() {
    return {
      alertMessage: '',
      alertSubMessage: '',
      alertMessagePop: false,
      ruleForm: {
        uid: '',
        pwd: ''
      },
      checkedId: false, // 아이디 저장 체크
      isCapsLock: false
    }
  },
  mounted() {
    //--for CHECK - 환경설정 파일 확인
    console.log(process.env)

    if(localStorage.getItem('copyId')) {
      this.ruleForm.uid = localStorage.getItem('copyId')
    }
    document.msCapsLockWarningOff = true
    window.addEventListener('keydown', this.onKeyCapsLock)
  },
  methods: {
    // CapsLock
    onKeyCapsLock(e) {
      this.isCapsLock = e.getModifierState('CapsLock')
    },
    loginAction() { // 로그인
      const { uid, pwd } = this.ruleForm
      if(!uid) {
        this.alertMessage = '아이디를 입력해주세요.'
        this.alertMessagePop = true
        return
      }

      if(!pwd) {
        this.alertMessage = '비밀번호를 입력해주세요.'
        this.alertMessagePop = true
        return
      }

      if(this.checkedId) { // `아이디 저장` 버튼을 체크했을 경우
        window.localStorage.setItem('copyId', uid)
      } else {
        if(!window.localStorage.getItem('copyId')) {
          window.localStorage.removeItem('copyId')
        }
      }
      this.$store.dispatch('login', {vm: this, uid, pwd}).then((res) => {
        const { rspCode = '', rspMessage = '', rspStatus = '' } = res
        if(!rspStatus && rspCode !== '0000') {
          this.alertMessage = '로그인이 실패했습니다.'
          this.alertSubMessage = rspMessage || ''
          this.alertMessagePop = true
          return
        }
        this.$router.push('/main')
      })

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
