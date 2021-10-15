<template>
    <vue-daum-map
      :appKey="appKey"
      :center.sync="center"
      :level.sync="level"
      :mapTypeId="mapTypeId"
      :libraries="libraries"
      @load="onLoad"
      style="width:100%;height:400px;"/>
</template>

<script>
import VueDaumMap from 'vue-daum-map'

export default {
  name: 'TheKakaoMap',
  components: {
    VueDaumMap
  },
  data () {
    return {
      autoload: true,
      lat: 37.412923,
      lon: 127.125327,
      appKey: 'cc8bddd39eb72b9ac89ab2bf23450c97', // 테스트용 appkey
      center: { lat: 37.412923, lng: 127.125327 }, // 지도의 중심 좌표
      level: 3, // 지도의 레벨(확대, 축소 정도),
      mapTypeId: VueDaumMap.MapTypeId.NORMAL, // 맵 타입
      libraries: ['services'], // 추가로 불러올 라이브러리
      map: null // 지도 객체. 지도가 로드되면 할당됨.
    }
  },
  created () {

  },
  methods: {
    // 지도가 로드 완료되면 load 이벤트 발생
    onLoad (map) {
      // 지도의 현재 영역을 얻어옵니다
      const bounds = map.getBounds()
      // 영역정보를 문자열로 얻어옵니다. ((남,서), (북,동)) 형식입니다
      const boundsStr = bounds.toString()
      console.log('Daum Map Loaded', boundsStr)

      this.mapObject = map
    },
    onMapEvent (event, params) {
      console.log(`Daum Map Event(${event})`, params)
    },
    displayMarker (locPosition, message) {
      console(locPosition)
    }
  }
}
</script>
