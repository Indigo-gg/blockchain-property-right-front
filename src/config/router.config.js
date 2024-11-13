/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/index'),
    redirect: { name: 'Guide' },
    children: [
      {
        path: 'guide',
        name: 'Guide',
        component: () => import('@/views/guide/guide')
      },
      {
        path: 'main',
        name: 'Main',
        redirect: { name: 'Home' },
        component: () => import('@/views/home/index'),
        children: [
          {
            path: 'artwork/home',
            name: 'Home',
            component: () => import('@/views/home/main')
          },
          {
            path: 'artwork/shop',
            name: 'ArtworkShop',
            component: () => import('@/views/market/shop')
          },
          {
            path: 'artwork/search/:value/:searchType',
            name: 'ArtworkSearch',
            component: () => import('@/views/home/artwork/search')
          },
          {
            path: 'artwork/detail/:artworkId',
            name: 'ArtworkDetail',
            component: () => import('@/views/market/detail')
          },
          {
            path: 'artwork/publicity',
            name: 'ArtworkPublicity',
            component: () => import('@/views/home/artwork/publicity')
          }
        ]
      },
      {
        path: 'exhibition',
        name: 'Exhibition',
        component: () => import('@/views/exhibition-hall/index')
      },
      {
        path: '/exhibitionHall/:hallNo/:pattern',
        name: 'ExhibitionHall',
        component: () => import('@/views/exhibition-hall/exhibition-hall')
      },
      // {  //此处演化至个人中心
      //   path: 'right',
      //   name: 'RightCenter',
      //   component: () => import('@/views/property-right/index'),
      //   redirect: { name: 'UserRights' },
      //   children: [
      //     {
      //       path: 'my-rights',
      //       name: 'UserRights',
      //       component: () => import('@/views/property-right/my-right/my-right')
      //     },
      //     {
      //       path: 'detail/:rightId',
      //       name: 'RightDetails',
      //       component: () => import('@/views/property-right/my-right/detail')
      //     }
      //   ]
      // },
      {
        path: 'user/:userId',
        name: 'PersonalCenter',
        component: () => import('@/views/user/index'),
        redirect: {name: 'UserHome'},
        children: [
          {
            path: 'home',
            name: 'UserHome',
            component: () => import('@/views/user/home/home')
          },
          {
            path: 'artworks',
            name: 'UserArtwork',
            component: () => import('@/views/user/my-artworks/artwork-manage')
          },
          {
            path: 'artwork/trace/:artworkId',
            name: 'ArtworkTrace',
            component: () => import('@/views/user/my-artworks/artwork-trace')
          },
          {
            path: 'artwork-submit',
            name: 'UserArtworkSubmit',
            component: () => import('@/views/user/my-artworks/submit-center')
          },
          // {
          //   path: 'sub-protect/:artworkId',
          //   name: 'RightProtect',
          //   component: () => import('@/views/property-right/right-protect/protect')
          // },
          {
            path: 'protect/list',
            name: 'RightProtectList',
            component: () => import('@/views/property-right/right-protect/protect-list')
          },
          {
            path: 'protect/detail/:protectId',
            name: 'RightProtectDetail',
            component: () => import('@/views/property-right/right-protect/protect-detail')
          },
          // {
          //   path: 'sub-report/:artworkId',
          //   name: 'RightReport',
          //   component: () => import('@/views/property-right/right-protect/report')
          // },
          {
            path: 'report/list',
            name: 'ReportList',
            component: () => import('@/views/property-right/right-protect/report-list')
          },
          {
            path: 'report/detail/:reportId',
            name: 'RightReportDetail',
            component: () => import('@/views/property-right/right-protect/report-detail')
          },
          {
            path: 'orders',
            name: 'UserOrders',
            component: () => import('@/views/user/Currency/my-orders')
          },
          {
            path: 'cocoins',
            name: 'UserCurrency',
            component: () => import('@/views/user/Currency/my-cocoin')
          },
          {
            path: 'collections',
            name: 'UserCollections',
            component: () => import('@/views/user/collections/collections')
          },
          {
            path: 'record',
            name: 'UserRecord',
            component: () => import('@/views/user/collections/records')
          },
          {
            path: 'certificate',
            name: 'UserCertificate',
            component: () => import('@/views/user/certificate/certificate')
          },
          {
            path: 'exhibition',
            name: 'UserExhibition',
            component: () => import('@/views/user/exhibition/index')
          },
          {
            path: 'exhibition-settings',
            name: 'UserExhibitionSettings',
            component: () => import('@/views/user/exhibition/settings')
          },
          {
            path: 'follows',
            name: 'UserFollows',
            component: () => import('@/views/user/follows-fans/follows')
          },
          {
            path: 'fans',
            name: 'UserFans',
            component: () => import('@/views/user/follows-fans/fans')
          },
          {
            path: 'messages',
            name: 'UserMessages',
            component: () => import('@/views/user/message/index')
          },
          {
            path: 'messages/:messageId',
            name: 'UserMessageDetail',
            component: () => import('@/views/user/message/detail')
          },
          {
            path: 'message-send',
            name: 'UserMessageSend',
            component: () => import('@/views/user/message/send')
          }
        ]
      },
      {
        path: 'space/:userId',
        name: 'UserSpace',
        component: () => import('@/views/space/space')
      },
      {
        path: '/deathRemember',
        name: 'DeathRemember',
        component: () => import('@/views/death/death')
      },
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
export const defaultLocation = constantRouterMap[0].redirect
