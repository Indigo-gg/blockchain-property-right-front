/**
 * 有三种模式
 * 1：测试模式：开发最基础模式，由开发自己去打点配置相关点位 -- 此时的控制器并无锁定
 * 2：编辑模式：开发第二模式，由用户去配置相关图片等信息 -- 此时控制器已经锁定到固定点位
 * 3：预览模式：游客预览展馆模式 -- 此时控制器已经锁定到固定点位
 */

let CONFIG = {
  env: "editor",
  models: [
    {
      id: '0',
      name: "展馆1",
      type: "fbx",
      floorName: "mesh_Floor", // 包含它
      billboardName: "Work_front", // 包含它
      url: "data/models/0/scene.fbx",
      positionScalar: 50, // 法向量延长计算 position的倍数
      controlsScalar: 40, // 法向量延长计算 controls的倍数
      markerSize: 5,
      cameraPosition: [0.72, 18.52, 269.54],
      controlsTarget: [0, 0, 0],
      markerList: [
        {
          name: "Work_front1025__ys-test-marker",
          position: [4.27156, 18.52184, 278.2032],
          markPosition: [-0.72844, 1.16, 269.54295],
          controls: [-0.72844, 18.52184, 269.54295]
        },
        {
          name: "Work_front1026__ys-test-marker",
          position: [-4.27732, 18.52184, 278.20077],
          markPosition: [0.72268, 1.16, 269.54052],
          controls: [0.72268, 18.52184, 269.54052]
        },
        {
          name: "Work_front1028__ys-test-marker",
          position: [-82.48216, 18.52184, 265.72675],
          markPosition: [-75.24483, 1.16, 258.82596],
          controls: [-75.24483, 18.52184, 258.82596]
        },
        {
          name: "Work_front1027__ys-test-marker",
          position: [-74.2802, 18.52183, 268.13748],
          markPosition: [-76.6378, 1.16, 258.41937],
          controls: [-76.6378, 18.52183, 258.41937]
        },
        {
          name: "Work_front1030__ys-test-marker",
          position: [-154.0048, 18.52184, 231.72516],
          markPosition: [-145.11645, 1.16, 227.14288],
          controls: [-145.11645, 18.52184, 227.14288]
        },
        {
          name: "Work_front1029__ys-test-marker",
          position: [-146.81427, 18.52184, 236.34554],
          markPosition: [-146.33846, 1.16, 226.35686],
          controls: [-146.33846, 18.52184, 226.35686]
        },
        {
          name: "Work_front1032__ys-test-marker",
          position: [-213.04726, 18.52184, 178.95063],
          markPosition: [-203.22798, 1.16, 177.0581],
          controls: [-203.22798, 18.52184, 177.0581]
        },
        {
          name: "Work_front1031__ys-test-marker",
          position: [-207.45433, 18.52184, 185.41297],
          markPosition: [-204.18367, 1.16, 175.96296],
          controls: [-204.18367, 18.52184, 175.96296]
        },
        {
          name: "Work_front1034__ys-test-marker",
          position: [-254.83358, 18.52184, 111.67863],
          markPosition: [-244.87886, 1.16, 112.62917],
          controls: [-244.87886, 18.52184, 112.62917]
        },
        {
          name: "Work_front1033__ys-test-marker",
          position: [-251.28779, 18.52184, 119.45599],
          markPosition: [-245.48725, 1.16, 111.31022],
          controls: [-245.48725, 18.52184, 111.31022]
        },
        {
          name: "Work_front1036__ys-test-marker",
          position: [-275.97777, 18.52185, 35.3592],
          markPosition: [-266.69407, 1.16, 39.07579],
          controls: [-266.69407, 18.52184, 39.07579]
        },
        {
          name: "Work_front1035__ys-test-marker",
          position: [-274.76345, 18.52184, 43.8214],
          markPosition: [-266.90294, 1.16, 37.63978],
          controls: [-266.90294, 18.52184, 37.63978]
        },
        {
          name: "Work_front1038__ys-test-marker",
          position: [-274.76059, 18.52184, -43.82486],
          markPosition: [-266.90004, 1.16, -37.6433],
          controls: [-266.90004, 18.52184, -37.6433]
        },
        {
          name: "Work_front1037__ys-test-marker",
          position: [-275.97954, 18.52184, -35.36333],
          markPosition: [-266.69588, 1.16, -39.07999],
          controls: [-266.69588, 18.52184, -39.07999]
        },
        {
          name: "Work_front1040__ys-test-marker",
          position: [-251.28409, 18.52182, -119.4585],
          markPosition: [-245.48349, 1.16, -111.31276],
          controls: [-245.48349, 18.52182, -111.31276]
        },
        {
          name: "Work_front1039__ys-test-marker",
          position: [-254.83396, 18.52184, -111.68314],
          markPosition: [-244.87924, 1.16, -112.63375],
          controls: [-244.87924, 18.52184, -112.63375]
        },
        {
          name: "Work_front1042__ys-test-marker",
          position: [-207.44935, 18.52184, -185.41507],
          markPosition: [-204.17866, 1.16, -175.96506],
          controls: [-204.17866, 18.52184, -175.96506]
        },
        {
          name: "Work_front1041__ys-test-marker",
          position: [-213.04623, 18.52183, -178.95583],
          markPosition: [-203.22694, 1.16, -177.06333],
          controls: [-203.22694, 18.52183, -177.06333]
        },
        {
          name: "Work_front1044__ys-test-marker",
          position: [-146.80891, 18.52183, -236.34606],
          markPosition: [-146.33307, 1.16, -226.35739],
          controls: [-146.33307, 18.52183, -226.35739]
        },
        {
          name: "Work_front1043__ys-test-marker",
          position: [-154.00201, 18.52187, -231.72973],
          markPosition: [-145.11365, 1.16, -227.14748],
          controls: [-145.11365, 18.52187, -227.14748]
        },
        {
          name: "Work_front1046__ys-test-marker",
          position: [-74.27485, 18.52183, -268.13658],
          markPosition: [-76.63242, 1.16, -258.41846],
          controls: [-76.63242, 18.52183, -258.41846]
        },
        {
          name: "Work_front1045__ys-test-marker",
          position: [-82.47815, 18.52183, -265.73037],
          markPosition: [-75.24079, 1.16, -258.8296],
          controls: [-75.24079, 18.52183, -258.8296]
        },
        {
          name: "Work_front1048__ys-test-marker",
          position: [4.27638, 18.52183, -278.20084],
          markPosition: [-0.72359, 1.16, -269.54057],
          controls: [-0.72359, 18.52183, -269.54057]
        },
        {
          name: "Work_front1047__ys-test-marker",
          position: [-4.27248, 18.52183, -278.20321],
          markPosition: [0.72755, 1.16, -269.54297],
          controls: [0.72755, 18.52183, -269.54297]
        },
        {
          name: "Work_front1050__ys-test-marker",
          position: [82.48118, 18.52183, -265.72701],
          markPosition: [75.24387, 1.16, -258.82619],
          controls: [75.24387, 18.52183, -258.82619]
        },
        {
          name: "Work_front1049__ys-test-marker",
          position: [74.27931, 18.52183, -268.13775],
          markPosition: [76.63694, 1.16, -258.41965],
          controls: [76.63694, 18.52183, -258.41965]
        },
        {
          name: "Work_front1052__ys-test-marker",
          position: [154.00396, 18.52183, -231.72566],
          markPosition: [145.11563, 1.16, -227.14334],
          controls: [145.11563, 18.52183, -227.14334]
        },
        {
          name: "Work_front1051__ys-test-marker",
          position: [146.81347, 18.52184, -236.34603],
          markPosition: [146.33769, 1.16, -226.35736],
          controls: [146.33769, 18.52184, -226.35736]
        },
        {
          name: "Work_front1054__ys-test-marker",
          position: [213.04665, 18.52183, -178.95137],
          markPosition: [203.22738, 1.16, -177.05881],
          controls: [203.22738, 18.52183, -177.05881]
        },
        {
          name: "Work_front1053__ys-test-marker",
          position: [207.4537, 18.52183, -185.4137],
          markPosition: [204.18307, 1.16, -175.96368],
          controls: [204.18307, 18.52183, -175.96368]
        },
        {
          name: "Work_front1056__ys-test-marker",
          position: [254.83315, 18.52183, -111.67955],
          markPosition: [244.87843, 1.16, -112.63005],
          controls: [244.87843, 18.52183, -112.63005]
        },
        {
          name: "Work_front1055__ys-test-marker",
          position: [251.28733, 18.52183, -119.45687],
          markPosition: [245.48681, 1.16, -111.31107],
          controls: [245.48681, 18.52183, -111.31107]
        },
        {
          name: "Work_front1059__ys-test-marker",
          position: [275.97765, 18.5218, -35.35996],
          markPosition: [266.69395, 1.16, -39.07653],
          controls: [266.69395, 18.52181, -39.07653]
        },
        {
          name: "Work_front1058__ys-test-marker",
          position: [274.76334, 18.52183, -43.82221],
          markPosition: [266.90285, 1.16, -37.64057],
          controls: [266.90285, 18.52183, -37.64057]
        },
        {
          name: "Work_front1061__ys-test-marker",
          position: [274.76074, 18.52184, 43.82408],
          markPosition: [266.90017, 1.16, 37.64254],
          controls: [266.90017, 18.52184, 37.64254]
        },
        {
          name: "Work_front1060__ys-test-marker",
          position: [275.97967, 18.52184, 35.36254],
          markPosition: [266.69602, 1.16, 39.07922],
          controls: [266.69602, 18.52184, 39.07922]
        },
        {
          name: "Work_front1063__ys-test-marker",
          position: [251.28435, 18.52183, 119.45778],
          markPosition: [245.48372, 1.16, 111.31206],
          controls: [245.48372, 18.52183, 111.31206]
        },
        {
          name: "Work_front1062__ys-test-marker",
          position: [254.83428, 18.52184, 111.68236],
          markPosition: [244.87957, 1.16, 112.633],
          controls: [244.87957, 18.52184, 112.633]
        },
        {
          name: "Work_front1065__ys-test-marker",
          position: [207.45058, 18.52185, 185.41378],
          markPosition: [204.17982, 1.16, 175.9638],
          controls: [204.17982, 18.52184, 175.9638]
        },
        {
          name: "Work_front1064__ys-test-marker",
          position: [213.04737, 18.52184, 178.95445],
          markPosition: [203.22806, 1.16, 177.06201],
          controls: [203.22806, 18.52184, 177.06201]
        },
        {
          name: "Work_front1067__ys-test-marker",
          position: [146.81043, 18.52184, 236.34513],
          markPosition: [146.33453, 1.16, 226.35646],
          controls: [146.33453, 18.52184, 226.35646]
        },
        {
          name: "Work_front1066__ys-test-marker",
          position: [154.00347, 18.52177, 231.72873],
          markPosition: [145.11507, 1.16, 227.14654],
          controls: [145.11507, 18.52178, 227.14654]
        },
        {
          name: "Work_front1069__ys-test-marker",
          position: [74.27663, 18.52184, 268.13613],
          markPosition: [76.63413, 1.16, 258.418],
          controls: [76.63413, 18.52184, 258.418]
        },
        {
          name: "Work_front1068__ys-test-marker",
          position: [82.47988, 18.52186, 265.72983],
          markPosition: [75.24248, 1.16, 258.8291],
          controls: [75.24248, 18.52185, 258.8291]
        },
        {
          name: "Work_front1057__ys-test-marker",
          position: [-3.98927, 5.88084, 173.5397],
          markPosition: [0.70544, -11.76, 164.71022],
          controls: [0.70544, 5.88084, 164.71022]
        },
        {
          name: "Work_front1024__ys-test-marker",
          position: [3.98758, 5.88084, 173.54062],
          markPosition: [-0.70714, -11.76, 164.71115],
          controls: [-0.70714, 5.88084, 164.71115]
        },
        {
          name: "Work_front1071__ys-test-marker",
          position: [-90.22465, 5.88083, 148.29512],
          markPosition: [-81.74417, -11.76, 142.99593],
          controls: [-81.74417, 5.88083, 142.99593]
        },
        {
          name: "Work_front1070__ys-test-marker",
          position: [-83.31695, 5.88084, 152.28084],
          markPosition: [-82.96796, -11.76, 142.28693],
          controls: [-82.96796, 5.88084, 142.28693]
        },
        {
          name: "Work_front1073__ys-test-marker",
          position: [-152.28086, 5.88083, 83.31503],
          markPosition: [-142.28695, -11.76, 82.96603],
          controls: [-142.28695, 5.88083, 82.96603]
        },
        {
          name: "Work_front1072__ys-test-marker",
          position: [-148.29679, 5.88084, 90.22365],
          markPosition: [-142.9976, -11.76, 81.74317],
          controls: [-142.9976, 5.88084, 81.74317]
        },
        {
          name: "Work_front1075__ys-test-marker",
          position: [-173.53969, 5.88094, -3.98929],
          markPosition: [-164.71021, -11.76, 0.70542],
          controls: [-164.71021, 5.88092, 0.70542]
        },
        {
          name: "Work_front1074__ys-test-marker",
          position: [-173.54059, 5.88084, 3.98757],
          markPosition: [-164.71111, -11.76, -0.70714],
          controls: [-164.71111, 5.88084, -0.70714]
        },
        {
          name: "Work_front1077__ys-test-marker",
          position: [-148.29512, 5.88082, -90.22468],
          markPosition: [-142.99593, -11.76, -81.7442],
          controls: [-142.99593, 5.88082, -81.7442]
        },
        {
          name: "Work_front1076__ys-test-marker",
          position: [-152.28083, 5.88083, -83.31696],
          markPosition: [-142.28693, -11.76, -82.96796],
          controls: [-142.28693, 5.88083, -82.96796]
        },
        {
          name: "Work_front1079__ys-test-marker",
          position: [-83.315, 5.88083, -152.28084],
          markPosition: [-82.96601, -11.76, -142.28693],
          controls: [-82.96601, 5.88083, -142.28693]
        },
        {
          name: "Work_front1078__ys-test-marker",
          position: [-90.22362, 5.88079, -148.29679],
          markPosition: [-81.74314, -11.76, -142.99759],
          controls: [-81.74314, 5.8808, -142.99759]
        },
        {
          name: "Work_front1081__ys-test-marker",
          position: [3.98943, 5.88083, -173.53963],
          markPosition: [-0.70531, -11.76, -164.71017],
          controls: [-0.70531, 5.88083, -164.71017]
        },
        {
          name: "Work_front1080__ys-test-marker",
          position: [-3.98758, 5.88083, -173.54058],
          markPosition: [0.70714, -11.76, -164.7111],
          controls: [0.70714, 5.88083, -164.7111]
        },
        {
          name: "Work_front1083__ys-test-marker",
          position: [90.22466, 5.88083, -148.29513],
          markPosition: [81.74418, -11.76, -142.99594],
          controls: [81.74418, 5.88083, -142.99594]
        },
        {
          name: "Work_front1082__ys-test-marker",
          position: [83.31697, 5.88083, -152.28083],
          markPosition: [82.96797, -11.76, -142.28693],
          controls: [82.96797, 5.88083, -142.28693]
        },
        {
          name: "Work_front1085__ys-test-marker",
          position: [152.28084, 5.88083, -83.31503],
          markPosition: [142.28693, -11.76, -82.96603],
          controls: [142.28693, 5.88083, -82.96603]
        },
        {
          name: "Work_front1084__ys-test-marker",
          position: [148.29656, 5.88083, -90.22377],
          markPosition: [142.99741, -11.76, -81.74326],
          controls: [142.99741, 5.88083, -81.74326]
        },
        {
          name: "Work_front1087__ys-test-marker",
          position: [173.53969, 5.88067, 3.98927],
          markPosition: [164.71021, -11.76, -0.70544],
          controls: [164.71021, 5.8807, -0.70544]
        },
        {
          name: "Work_front1086__ys-test-marker",
          position: [173.5406, 5.88082, -3.98761],
          markPosition: [164.71113, -11.76, 0.70711],
          controls: [164.71113, 5.88083, 0.70711]
        },
        {
          name: "Work_front1089__ys-test-marker",
          position: [148.29513, 5.88083, 90.2247],
          markPosition: [142.99594, -11.76, 81.74421],
          controls: [142.99594, 5.88083, 81.74421]
        },
        {
          name: "Work_front1088__ys-test-marker",
          position: [152.28082, 5.88084, 83.31695],
          markPosition: [142.28691, -11.76, 82.96795],
          controls: [142.28691, 5.88084, 82.96795]
        },
        {
          name: "Work_front1091__ys-test-marker",
          position: [83.31497, 5.88083, 152.28085],
          markPosition: [82.96598, -11.76, 142.28694],
          controls: [82.96598, 5.88083, 142.28694]
        },
        {
          name: "Work_front1090__ys-test-marker",
          position: [90.22364, 5.88096, 148.29674],
          markPosition: [81.74316, -11.76, 142.99754],
          controls: [81.74316, 5.88093, 142.99754]
        }
      ],
      fixedY: -11.76 // -11.76 // 1.16
    }
  ]
};
window.CONFIG = CONFIG;
