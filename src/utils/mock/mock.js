import Mock from 'mockjs'
// import {getRandomColor} from "@/utils/mock/getRandomColor";
const Random = Mock.Random

Random.extend({
  rightStatus: function () {
    let workStatus = [0, 1, 2]
    return this.pick(workStatus)
  },
  cerStatus: function () {
    let workStatus = ['0', '1', '2', '3']
    return this.pick(workStatus)
  },
  hallStatus: function () {
    let workStatus = [0, 1, 2]
    return this.pick(workStatus)
  },
  releaseStatus: function () {
    let status = [5, 6]
    return this.pick(status)
  },
  ownShare: function () {
    let status = [10, 20, 30, 40, 50, 60, 70, 80, 90]
    return this.pick(status)
  }
})



export const myMock=()=> {

  Mock.mock(/\/artwork\/pubExamList/, {
    'msg': 'in',
    'fail': 'dolore nostrud dolore officia voluptate',
    'ok': 'mollit esse quis',
    'code': 0,
    'total': 6,
    'time': 1214809976387,
    'data|6': [{
      'artworkName': '@word(3,7)',
      'artworkId|+1': 17,
      'markedfileId': Random.image(),
      'author|1-5': [
        {
          'avatar': Random.image('100x100'),
          'userName': '@cword(2,7)',
          'userId|+1': 77
        }
      ],
      'documentIds|1-4': [
        {
          'markedfileId': Random.image()
        }
      ],
      'type': 'nulla',
      'artworkInfo': '@cword(20,400)'
    }]
  })

  /**
   *GetCollectionsInFolder
   */
  Mock.mock(/\/favorites\/listByCollectId/, {
    'code': 0,
    'msg': "listByCollectId",
    'data|20': [
      {
        "createdTime": "2023-03-07 15:31:31",
        "fileId": Random.image('160x90'),
        "id|+1": 1,
        "artworkName": "@cword(2,9)"
      }
    ]
  })

  /**
   *AddFavorite
   */
  Mock.mock(/\/favorites\/add/, {
    'code': 0,
    'msg': "success",
    'data|20': []
  })

  /**
   *DelFavorite
   */
  Mock.mock(/\/favorites\/del/, {
    'code': 0,
    'msg': "success",
    'data|20': []
  })

  /**
   *AddCollectFolder
   */
  Mock.mock(/\/collect\/add/, {
    'code': 0,
    'msg': "success",
    'data|20': []
  })


  /**
   *certificate
   */
  Mock.mock(/\/certificate\/list/, {
    "msg": "tempor fugiat elit esse",
    "fail": false,
    "total": 30,
    "ok": 'true',
    "code": 0,
    "data|8": [
      {
        "createdTime": "2007-12-18 13:25:11",
        "updatedTime": "1999-07-02 03:48:39",
        "id|+1": 50,
        "certificateType": '@cerStatus',
        "artworkName": "先低子日平外",
        "certificateHash": "proident adipisicing"
      },
    ],
    "extraData": null,
    "time": 921370100082
  })
  /**
   *DelCollectFolder
   */
  Mock.mock(/\/collect\/del/, {
    'code': 0,
    'msg': "success",
    'data|20': []
  })


  /**
   *ListCollectFolders
   */
  Mock.mock(/\/collect\/list/, {
    'code': 0,
    'msg': "success",
    'ok':'',
    'data|20': [
      {
        "name": "@cword(2,5)",
        "id|+1":1
      }
    ]
  })
  /**
   *delRoomWork
   */
  Mock.mock(/\/showWork\/delete/, {
    'code': 0,
    'msg': "success",
    'data|20': []
  })


  Mock.mock(/\/artwork\/listShownArt/, {
    'code': 0,
    'msg': 'success',
    'data|20': [
      {
        "artworkName": "@cword(3,8)",
        "rightStatus": '@rightStatus',
        "artworkId|+1": 2,
        "releaseStatus": "@releaseStatus",
        "artworkType": 1,
        "markedFileId": Random.image('400x300'),
        "artworkInfo": "@cword(20,90)",
        "authors|1-3": [
          {
            "contribution": 100,
            "photoFileId": Random.image('300x300', '#000'),
            "isMainOwner": 0,
            "name": "@cword(3,6)"
          }
        ]
      }
    ]
  })

  Mock.mock(/\/sale\/manageList/, {
    'code': 0,
    'msg': 'success',
    'data|20': [
      {
        "artworkName": "@cword(3,8)",
        "ownShare": "@ownShare",
        "rightStatus": '@rightStatus',
        "artworkId|+1": 2,
        "releaseStatus": "@releaseStatus",
        "artworkType": 1,
        "markedFileId": Random.image('400x300'),
        "artworkInfo": "@cword(20,400)",
        "authors|1-3": [
          {
            "contribution": 100,
            "photoFileId": Random.image('300x300', '#000'),
            "isMainOwner": 0,
            "name": "@cword(3,6)"
          }
        ]
      }
    ]
  })


  Mock.mock(/\/artwork\/listShownArt/, {
    'code': 0,
    'msg': 'success',
    'data|20': [
      {
        "artworkName": "@cword(3,8)",
        "rightStatus": '@rightStatus',
        "artworkId|+1": 2,
        "releaseStatus": "@releaseStatus",
        "artworkType": 1,
        "markedFileId": Random.image('400x300'),
        "artworkInfo": "@cword(20,90)",
        "authors|1-3": [
          {
            "contribution": 100,
            "photoFileId": Random.image('300x300', '#000'),
            "isMainOwner": 0,
            "name": "@cword(3,6)"
          }
        ]
      }
    ]
  })

  /**
   *AddFavorite
   */
  Mock.mock(/\/favorites\/add/, {
    'code': 0,
    'msg': 'success',
    'data|20': []
  })

  /**
   *DelFavorite
   */
  Mock.mock(/\/favorites\/del/, {
    'code': 0,
    'msg': 'success',
    'data|20': []
  })

  /**
   *AddCollectFolder
   */
  Mock.mock(/\/collect\/add/, {
    'code': 0,
    'msg': 'success',
    'data|20': []
  })

  /**
   *DelCollectFolder
   */
  Mock.mock(/\/collect\/del/, {
    'code': 0,
    'msg': 'success',
    'data|20': []
  })

  /**
   *GetCollectionsInFolder
   */
  // Mock.mock(/\/favorites\/listByCollectId/, {
  //   'code': 0,
  //   'msg': 'success',
  //   'data|20': []
  // })

  /**
   *ListCollectFolders
   */
  Mock.mock(/\/collect\/list/, {
    'code': 0,
    'msg': 'success',
    'data|20': [
      {
        'name': '@cword(2,3)',
        'id|+1': 77,
        'type': 1,
        'author|1-2': [
          {
            'id|+1': 53,
            'name': '@cname',
            'avatar': Random.image()
          }
        ],
        'price|18-199': 1,
        'remaining|0-99': 1,
        'fileId': Random.image()
      }
    ]
  })

  /**
   *ArtworkAdd
   */
  Mock.mock(/\/artwork\/add/, {
    'code': 0,
    'msg': 'success',
    'data|20': []
  })

  /**
   *ArtworkEdit
   */
  Mock.mock(/\/artwork\/edit/, {
    'code': 0,
    'msg': 'success',
    'data|20': []
  })

  /**
   *ArtworkDel
   */
  Mock.mock(/\/artwork\/del/, {
    'code': 0,
    'msg': 'success',
    'data|20': []
  })

  /**
   *ArtworkList
   */
  Mock.mock(/\/artwork\/list/, {
    'code': 0,
    'msg': 'success',
    'data|6': [
      {
        'name': '@cword(2,3)',
        'id|+1': 77,
        'type': 1,
        'author|1-5': [
          {
            'id|+1': 53,
            'name': '@cword(2,6)',
            'avatar': Random.image('100x100')
          }
        ],
        'price|18-199': 1,
        'remaining|0-99': 1,
        'brief': '@cword(2,20)',
        'markedfileId': Random.image()
      }
    ]
  })


  /**
   *ArtworkDetail
   */
// Mock.mock(/\/artwork\/listShownArt/, {
//   'code': 0,
//   'msg': 'success',
//   'data|6': [
//     {
//       "artworkName": "@cword(2,6)",
//       "rightStatus": 0,
//       "artworkId|+1": 2,
//       "releaseStatus": 4,
//       "artworkType": 1,
//       "markedFileId": Random.image(),
//       "artworkInfo": "@cword(10,200)",
//       "authors": [
//         {
//           "contribution": 100,
//           "photoFileId": Random.image(),
//           "isMainOwner": 0,
//           "name": "@cname(3,5)"
//         }
//       ]
//     }
//   ]
// })

  /**
   *ArtworkCgStatus
   */
  Mock.mock(/\/artwork\/status/, {
    'code': 0,
    'msg': 'success',
    'data|20': []
  })

  /**
   *AddAttention
   */
  Mock.mock(/\/attention\/add/, {
    'code': 0,
    'msg': 'success',
    'data|20': []
  })

  /**
   *DelAttention
   */
  Mock.mock(/\/attention\/del/, {
    'code': 0,
    'msg': 'success',
    'data|20': []
  })

  /**
   *FansList
   */
  Mock.mock(/\/attention\/fanslist/, {
    'code': 0,
    'msg': 'success',
    'data|20': [
      {
        'avatarId': Random.image(),
        'brief': '@cword(5,15)',
        'followedUser|+1': 2,
        'username': '@cname'
      }
    ]
  })

  /**
   *FollowList
   */
  Mock.mock(/\/attention\/followlist/, {
    'code': 0,
    'msg': 'success',
    'data|20': [
      {
        'avatarId': Random.image(),
        'brief': '@cword(5,15)',
        'followedUser|+1': 2,
        'username': '@cname'
      }
    ]
  })

  /**
   *getMyRoom
   */
  Mock.mock(/\/showRoom\/getMy/, {
    'code': 0,
    'msg': 'success',
    data:
      {
        "showroomId": -1,
        'pattern': 1,
        'name': '@cword(2,4)',
        'createdTime|8-99': 1,
        'view|0-888': 1,
        'heat|0-888': 1,
        'info': '@cword(90,600)'
      }
  })

  /**
   *editMyRoom
   */
  Mock.mock(/\/showRoom\/edit/, {
    'code': 0,
    'msg': 'success',
    'data|20': []
  })

  /**
   *getRoomList
   */
  Mock.mock(/\/showRoom\/list/, {
    'code': 0,
    'msg': 'success',
    'data|6': [
      {
        "promoterName": "@cword(3,5)",
        "name": "@cword(3,5)",
        "pattern": "@hallStatus",
        "info": "@cword(10,20)",
        "showroomId": 1
      }
    ]
  })

  /**
   *addRoomWork
   */
  Mock.mock(/\/showWork\/add/, {
    'code': 0,
    'msg': 'success',
    'data|20': []
  })

  /**
   *getRoomWork
   */
  Mock.mock(/\/showWork\/list/, {
    'code': 0,
    'msg': 'success',
    'data|20': [
      {
        "name": "@cword(3,7)",
        "id|+1": 9,
        "author": [
          {
            "id|+1": 33,
            "name": "@cname",
            "avatar": Random.image('200x400')
          }
        ],
        "markedfileId": Random.image('200x200'),
        "artworkHash": "non",
        "position": "ex anim esse Lorem"
      }
    ]
  })
  /**
   *HistoryList
   */
  Mock.mock(/\/history\/list/, {
    'code': 0,
    'msg': "success",
    'data|20': [
      {
        "sketchId|+1": Random.image('100x100',),
        "artworkId|+1": 1,
        "name": "@cword(3,5)",
        "time": "2023-10-1",
        "historyId+1": 91
      }
    ]
  })

  /**
   *AddHistory
   */
  Mock.mock(/\/history\/add/, {
    'code': 0,
    'msg': "success",
    'data|20': []
  })

  /**
   *DelHistory
   */
  Mock.mock(/\/history\/del/, {
    'code': 0,
    'msg': "success",
    'data|20': []
  })

  /**
   *LoginByCaptcha
   */
// Mock.mock(/\/user\/loginCode/, {
//   'code':0,
//   'msg':"success",
//   'data|20': []
// })
//
// /**
//  *LoginByPwd
//  */
// Mock.mock(//user/loginPassword/, {
//   'code':0,
//   'msg':"success",
//   'data|20': []
// })
//
// /**
//  *Logout
//  */
// Mock.mock(//user/logout/, {
//   'code':0,
//   'msg':"success",
//   'data|20': []
// })
//
// /**
//  *SendMs
//  */
// Mock.mock(//user/sendMs/, {
//   'code':0,
//   'msg':"success",
//   'data|20': []
// })

  /**
   *GetInfo
   */
  Mock.mock(/\/user\/getInfo/, {
    'code': 0,
    'msg': "success",
    'data': {
      "brief": "我是一个勤勤恳恳的艺术家",
      "createdTime": "2023-03-06 18:37:58",
      "updatedTime": "2023-03-06 19:02:52",
      "salt": "f2KOXGHRO5cbkg4A31t1JymmiCmNh9Ac",
      "address": null,
      "idcardId": null,
      "gender": 1,
      "photoFileId": "byiueow",
      "mobile": "15926313038",
      "birth": "2002-08-24 00:00:00",
      "reputation": 100,
      "type": 2,
      "tradingAccount": null,
      "password": null,
      "isDeleted": 0,
      "idcard": null,
      "name": "swimming-pool",
      "id": 1,
      "email": "1304075594@qq.com",
      "status": 1

    }
  })

  /**
   *EditInfo
   */
  Mock.mock(/\/user\/edit/, {
    'code': 0,
    'msg': "success",
    'data|20': []
  })


}

