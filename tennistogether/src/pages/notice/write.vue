<template>
  <div>
    <b-row>
      <b-col>
        <transition name="fade">
          <b-card v-if="show">
            <b-card-header>
              <CIcon name="cil-pencil"/> 공지사항 쓰기
              <div class="card-header-actions">
                <b-link
                  class="card-header-action btn-minimize"
                  @click="formCollapsed=!formCollapsed"
                >
                  <CIcon :name="`cil-chevron-${formCollapsed ? 'bottom' : 'top'}`"/>
                </b-link>
              </div>
            </b-card-header>
            <CCollapse :show="formCollapsed">
              <CCardBody>
                <CInput
                  label="제목"
                />
                <CTextarea/>
                <div class="form-actions">
                  <CButton type="submit" color="primary">저장</CButton>
                  <CButton color="secondary">초기화</CButton>
                </div>
              </CCardBody>
            </CCollapse>
          </b-card>
        </transition>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'noticeWrite',
  data () {
    return {
      show: true,
      formCollapsed: true
    }
  }
}
</script>
