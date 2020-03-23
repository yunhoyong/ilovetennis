import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
// import { stat } from 'fs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menus: [],
    commonCodes: {},
    LegacyCommonCodes: {},
    consultants: [],
    carTypes: [],
    allTypeCars: {},
    documentTargets: [],
    unConfirmInfo: {}, // 알림 카운트 정보
    menuList: [], // 메뉴 목록
    bookMarkList: [], // 즐겨찾기 목록
    userInfo: null, // 로그인 사용자 정보
    sessionId: null, // 세션 ID
    isAuthenticated: false, // 로그인 완료(인증) 여부
    currMenuId: '', // 현재 화면 매칭 메뉴 ID
    currPath: '', // 현재 화면 path
    authBtnList: [], // 버튼 권한 목록
    currAuthBtnList: [], // 현재 화면 버튼 권한 목록
    banners: [] // 메인 - 배너 목록
  },
  mutations: {
    setCurrMenuId: (state, data) => {
      const customMenus = [...state.menus]
      console.log(customMenus, data)

      customMenus.some((items) => {
        if (items.screenUrlAddress === data) {
          state.currMenuId = items.menuId
          return true
        } else {
          state.currMenuId = ''
        }
      })
      if (state.currMenuId) {
        const currAuthList = state.authBtnList.filter((items) => {
          return items.menuId === state.currMenuId
        })
        state.currAuthBtnList = currAuthList
      } else {
        state.currAuthBtnList = []
      }
      console.log('setCurrMenuId', state.currMenuId)
      console.log('setCurrAuthBtnList', state.currAuthBtnList)
    },
    setCommonCodes: (state, data) => {
      state.commonCodes = { ...data }
      console.log('setCommonCodes', state.commonCodes)
    },
    setLegacyCommonCodes: (state, data) => {
      state.LegacyCommonCodes = { ...data }
      console.log('setLegacyCommonCodes', state.LegacyCommonCodes)
    },
    setConsultants: (state, data) => {
      state.consultants = data
      state.consultants = state.consultants.sort((compareA, compareB) => { return compareA.sysUserNm > compareB.sysUserNm ? 1 : -1 })
      console.log('setConsultants', state.consultants)
    },
    setAllTypeCars: (state, data) => {
      let allCarList = []
      state.carTypes = data.map(el => {
        const { carTypeCode, carTypeName } = el
        state.allTypeCars[carTypeCode] = el.list
        if (el.list && el.list.length > 0) {
          allCarList = allCarList.concat(el.list)
        }
        return { carTypeCode, carTypeName }
      })
      state.allTypeCars.all = allCarList

      console.log('setAllTypeCars', state.allTypeCars.all)
    },
    setDocumentTargets: (state, data) => {
      state.documentTargets = data
      console.log('setDocumentTargets', state.documentTargets)
    },
    setUserInfo: (state, userInfo) => {
      state.userInfo = { ...userInfo }
    },
    setUnConfirmInfo: (state, data) => {
      state.unConfirmInfo = data
    },
    setOriginMenus: (state, data) => {
      state.menus = data
    },
    setBookMarkList: (state, data) => {
      state.bookMarkList = data
    },
    setSessionId: (state, sessionId) => {
      state.sessionId = sessionId
    },
    setAuth: (state, isAuthenticated) => {
      state.isAuthenticated = isAuthenticated
    },
    setAuthBtn: (state, data) => {
      state.authBtnList = data
    },
    setCurrPath: (state, path) => {
      console.log('setCurrPath => ', path)
      state.currPath = path
    },
    setCurrAuthBtnList: (state, data) => {
      state.currAuthBtnList = data
    },
    setBanners: (state, data) => {
      state.banners = data
    }

  },
  getters: {
    commonCodes: state => state.commonCodes,
    LegacyCommonCodes: state => state.LegacyCommonCodes,
    menus: state => state.menus,
    menuMap: state => {
      let customs = []
      customs = [...customs]
      return customs.reduce((map, obj) => {
        map[obj.menuLink] = { ...obj }
        return map
      }, {})
    },
    bookMarkList: state => state.bookMarkList,
    userInfo: state => state.userInfo,
    isAuthenticated: state => state.isAuthenticated,
    authBtnList: state => state.authBtnList
  },
  actions: {

    loadCommonCodes: async ({ commit, state }, { vm }) => {
      if (Object.keys(state.commonCodes).length > 0) {
        return
      }

      const [res, err] = await vm.$https.get('/common/v1/common/common-code', { systemTypeCode: 'E' }, null, 'gateway')
      const codes = {}
      if (!err) {
        res.data && res.data.forEach(elem => {
          if (!codes[elem.codeTypeCode]) codes[elem.codeTypeCode] = [{ label: '전체', value: 'all' }]
          codes[elem.codeTypeCode].push({ label: elem.codeName, value: elem.code })
        })
        commit('setCommonCodes', codes)
      }
    },

    loadLegacyCommonCodes: async ({ commit, state }, { vm }) => {
      if (Object.keys(state.LegacyCommonCodes).length > 0) {
        return
      }

      const [res, err] = await vm.$https.get('/common/v1/common/common-code', { systemTypeCode: 'C' }, null, 'gateway')
      const codes = {}
      if (!err) {
        res.data && res.data.forEach(elem => {
          if (!codes[elem.codeTypeCode]) codes[elem.codeTypeCode] = [{ label: '전체', value: 'all' }]
          codes[elem.codeTypeCode].push({ label: elem.codeName, value: elem.code })
        })
        commit('setLegacyCommonCodes', codes)
      }
    },

    // eslint-disable-next-line no-unused-vars
    loadCommonCodesE: async ({ commit }, { vm, codeTypeCode }) => {
      const [res, err] = await vm.$https.get('/common/v1/common/common-code', { systemTypeCode: 'E', codeTypeCode }, null, 'gateway')
      const codes = {}
      let codeList = []
      if (!err) {
        codeList = res.data && res.data.map((items) => { return { label: items.codeName, value: items.code } })
        codeList.unshift({ label: '전체', value: 'all' })
      }
      codes[codeTypeCode] = codeList
      console.log(codes)
      return codes
    },
    login: async ({ dispatch, commit }, { vm, uid, pwd }) => {
      const body = { id: uid, password: pwd }
      const [res, err] = await vm.$https.post('/', body, null, 'gateway')
      if (!err) {
        const { result = '', sessionId = '' } = res.data

        if (result === 'SUCCESS' && sessionId) {
          Cookies.set('sessionId', sessionId) // cookie 저장
          commit('setSessionId', sessionId) // state sessionId 저장
          await dispatch('loadUserInfo', { vm, sessionId })
          // header set - first load
        }
        console.log('response => ', res)
        return res
      } else {
        return err
      }
    },
    logout: async ({ commit }, { vm }) => {
      await vm.$https.put('/', null, null, 'gateway')
      Cookies.remove('sessionId')
      Cookies.remove('userInfo')
      commit('setSessionId', null)
      commit('setAuth', false)
      commit('setMenuList', [])
    },
    loadUserInfo: async ({ commit, state }, { vm, sessionId }) => {
      if (state.userInfo !== null) return
      const sId = Cookies.get('sessionId')
      console.log(sId)
      if (sId) { sessionId = sId }

      const params = {
        sessionId: 'tennisTogether-' + sessionId
      }
      console.log(params)
      const [res, err] = await vm.$https.get('/common/v1/session/attributes', params, null, 'gateway')
      if (!err) {
        commit('setAuth', true) // 인증 완료 여부 Flag
        console.log('response => ', res.data)
        const userInfo = res.data.session
        Cookies.set('userInfo', userInfo)
        commit('setUserInfo', userInfo)
      } else {
        Cookies.remove('sessionId')
        Cookies.remove('userInfo')
        commit('setSessionId', null)
        commit('setAuth', false)
      }
    }
  }
})
