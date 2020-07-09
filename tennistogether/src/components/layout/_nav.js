export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavTitle',
        _children: ['I love Tennis']
      },
      {
        _name: 'CSidebarNavItem',
        name: '공지사항',
        to: '/notice/list',
        icon: 'cil-tennis-ball'
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['나의 클럽']
      },
      {
        _name: 'CSidebarNavItem',
        name: '게시판',
        to: '/notice/list',
        icon: 'cil-pencil'
      },
      {
        _name: 'CSidebarNavItem',
        name: '정모 기록',
        to: '/notice/list',
        icon: 'cil-tennis'
      },
      {
        _name: 'CSidebarNavItem',
        name: '경기 기록',
        to: '/notice/list',
        icon: 'cil-face'
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['테니스 친구찾기']
      },
      {
        _name: 'CSidebarNavItem',
        name: '번개 모임',
        to: '/meeting/list',
        icon: 'cil-people'
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['테니스용품 중고거래']
      },
      {
        _name: 'CSidebarNavDropdown',
        name: '라켓',
        route: '/base',
        icon: 'cil-puzzle',
        items: [
          {
            name: '남성용',
            to: '/base/breadcrumbs'
          },
          {
            name: '여성용',
            to: '/base/cards'
          }
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: '신발',
        route: '/base',
        icon: 'cil-puzzle',
        items: [
          {
            name: '남성용',
            to: '/base/breadcrumbs'
          },
          {
            name: '여성용',
            to: '/base/cards'
          }
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: '의류',
        route: '/base',
        icon: 'cil-puzzle',
        items: [
          {
            name: '남성용',
            to: '/base/breadcrumbs'
          },
          {
            name: '여성용',
            to: '/base/cards'
          }
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: '가방,모자 등등',
        route: '/buttons',
        icon: 'cil-cursor',
        items: [
          {
            name: '가방',
            to: '/buttons/standard-buttons'
          },
          {
            name: '모자',
            to: '/buttons/dropdowns'
          },
          {
            name: '스트링',
            to: '/buttons/button-groups'
          },
          {
            name: '그립',
            to: '/buttons/button-groups'
          },
          {
            name: '테니스공',
            to: '/buttons/brand-buttons'
          }
        ]
      },
      {
        _name: 'CSidebarNavDivider',
        _class: 'm-2'
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Extras']
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Pages',
        route: '/pages',
        icon: 'cil-star',
        items: [
          {
            name: 'Login',
            to: '/pages/login'
          },
          {
            name: 'Register',
            to: '/pages/register'
          },
          {
            name: 'Error 404',
            to: '/pages/error404'
          },
          {
            name: 'Error 500',
            to: '/pages/error500'
          }
        ]
      }
    ]
  }
]
