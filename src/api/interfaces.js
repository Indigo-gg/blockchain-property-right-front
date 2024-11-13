// 用户账号相关API TODO 实名认证
export const userApi = {
  LoginByCaptcha: '/user/loginCode',
  LoginByPwd: '/user/loginPassword',
  Logout: '/user/logout',
  SendMs: '/user/sendMs',
  GetInfo: '/user/getInfo',
  EditInfo: '/user/edit',
  // 通过原密码更改密码
  ChangePwd: '/user/changePwd',
  // 通过手机验证码更改密码
  ChangePwdCode: '/user/changePwdCode',
  // 用户实名认证
  IdentifyRealName: '/user/verify',
  // 用户上链
  UpToBlockChain: '/user/uplink',
  // 搜索用户
  SearchUser: '/user/search',
  // 当前缓存用户是否仍合法
  UserLegal: '/user/isLegal',
  // 当前用户名是否重复
  UserRepeat: '/user/isRepeat',
  UserExternal: '/user/externalInfo'
}


// 消息中心
export const messageApi = {
  MessageList: '/message/list',
  MessageSetRead: '/message/setRead'
}

// 历史记录相关API
export const historyApi = {
  HistoryList: '/history/list',
  AddHistory: '/history/add',
  DelHistory: '/history/del'
}

// 关注模块相关API
export const attentionApi = {
  AddAttention: '/attention/add',
  DelAttention: '/attention/del',
  FansList: '/attention/fanslist',
  FollowList: '/attention/followlist'
}

// 收藏模块相关API
export const collectionApi = {
  DelFavoriteMore: '/favorites/delMore',
  AddFavorite: '/favorites/add',
  DelFavorite: '/favorites/del',
  AddCollectFolder: '/collect/add',
  DelCollectFolder: '/collect/del',
  GetCollectionsInFolder: '/favorites/listByCollectId',
  ListCollectFolders: '/collect/list'
}

// 维权功能模块
export const rightProtectApi = {
  // 新增维权事件
  AddProtect: '/rightProtect/add',
  // 删除维权事件
  DelProtect: '/rightProtect/del',
  // 维权事件列表
  ProtectList: '/rightProtect/list',
  // 维权事件详情
  ProtectDetail: '/rightProtect/detail',
  // 维权事件增添证据
  AddEvidence: '/rightProtect/addEvidence',
  // 维权事件删除证据内容
  DelEvidence: '/rightProtect/delEvidence'
}

// 产权举报相关模块
export const rightReportApi = {
  // 新增举报事件
  AddReport: '/report/add',
  // 举报事件
  ReportList: '/report/listByUser',
  // 查看事件详情
  ReportDetail: '/report/detail',
  // 删除举报事件
  DelReport: '/report/del'
}

// 藏品上传创作模块相关API
export const artworkApi = {
  ShowArtList: '/artwork/listShownArt',
  ArtworkAdd: '/artwork/add',
  ArtworkEdit: '/artwork/edit',
  ArtworkDel: '/artwork/del',
  ArtworkList: '/artwork/list',
  PubList: '/artwork/pubExamList',
  ArtworkDetail: '/artwork/detail',
  ArtworkCgStatus: '/artwork/status',
  AddInvisibleWatermark: '/artwork/addMark',
  MyUploadedArtworkList: '/artwork/getstatus',
  ArtworkBrief: '/artwork/brief',
  ArtworkAuthors: '/artwork/authors',
  ArtworkHash: '/artwork/backHashes',
  IntelRecommend: '/showWork/recommend',
  ArtExamineByAI: '/artwork/examineByAI'
}
// 藏品交易转移相关api
export const artworkTransitonApi = {
  // 根据藏品的id来获取当前藏品可供购买的份额规格
  GetAvailableOwnShares: '/artworkOwnPrice/getAvailable',
  // 新增订单
  AddOrder: '/order/add',
  // 支付订单
  PayOrder: '/order/pay',
  // 取消订单
  CancelOrder: '/order/cancel',
  // 删除订单记录
  DelOrder: '/order/del',
  // 查看订单的总览情况
  OrderOverlook: '/order/overLook',
  // 获取订单列表
  OrderList: '/order/list',
  // 查看订单详情
  GetOrderDetail: '/order/detail',
  // 藏品管理获取列表
  GetManageList: '/sale/manageList',
  // 追加发售
  UpdateSale: '/sale/update',
  // 发售
  AddSale: '/sale/add',
  // 查看使用权的发售状态
  UsufructStatus: 'sale/usufructStatus',
  // 产看所有权的发售状态
  OwnershipStatus: '/sale/ownershipStatus',
  //  藏品溯源
  AtrworkTrace: '/sale/Traceability',
  // 查看持有的藏品版权
  ArtworkRightOverLook: '/artworkRight/overlook'
}

export const certificateApi = {
  CertificateList: '/certificate/list',
  CertificateDetail: '/certificate/checkCer',
  UserCertificate: '/certificate/downloadIdCard'
}
// 用户资产相关API
export const CocoinApi = {
  // COCoin充值
  ChargeCocoins: '/ledger/add',
  // CoCoin余额查询
  CheckBalance: '/ledger/balance',
  // 查看CoCoin动账记录
  CocoinBills: '/ledger/list',
  // 删除CoCoin的重置记录
  DelCocoinBill: '/ledger/del',
  // 用户提现
  WithDraw: '/ledger/withdrawal'

}

export const showroomApi = {
  getMyRoom: '/showRoom/getMy',
  editMyRoom: '/showRoom/edit',
  getRoomList: '/showRoom/list',
  addRoomWork: '/showWork/add',
  getRoomWork: '/showWork/list',
  delRoomWork: '/showWork/delete'
}

// 文件上传与下载相关API地址
export const fileApi = {
  VideoUpload: '/file/uploadVideo',
  FileUpload: '/file/upload',
  FileDownload: '/file/download',
  GetPicture: '/file/image',
  GetVideo: '/file/audio',
  AddVisibleWatermark: '/documentation/addMark'
}

// 富文本上传编辑相关API地址
export const richTextApi = {
  RichTextUpload: '/text/add',
  RichTextUpdate: '/text/updateByUuid',
  RichTextRender: '/text/getContent'
}
