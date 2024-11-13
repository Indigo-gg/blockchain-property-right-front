<template>
  <div class="EarthGrandWrapper">
    <div id="stars"></div>
    <div id="stars2"></div>
    <div id="stars3"></div>
    <div id="horizon">
      <div class="glow"></div>
    </div>
    <div id="earth"></div>
    <div id="title">
      Start
    </div>
    <!--    <div id="subtitle">-->
    <!--      <span>-->
    <!--        DONT-->
    <!--      </span>-->
    <!--      <span>-->
    <!--        LET-->
    <!--      </span>-->
    <!--      <span>-->
    <!--        GO-->
    <!--      </span>-->
    <!--    </div>-->
  </div>
</template>

<script>
export default {
  name: 'EarthGrand',
  props: {},
  data () {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang='less'>
.EarthGrandWrapper{
  height: 120%;
  position: absolute;
  top: 0;
  width: 100%;
  overflow: hidden;
}
#stars {
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: 1019px 1390px #FFF , 1008px 458px #FFF , 1282px 272px #FFF , 839px 712px #FFF , 646px 111px #FFF , 1252px 199px #FFF , 1009px 429px #FFF , 311px 539px #FFF , 1777px 1238px #FFF , 393px 394px #FFF , 222px 450px #FFF , 1484px 869px #FFF , 572px 148px #FFF , 1358px 1899px #FFF , 1440px 557px #FFF , 925px 1644px #FFF , 1865px 1750px #FFF , 735px 1099px #FFF , 567px 1064px #FFF , 1102px 308px #FFF , 217px 1836px #FFF , 1500px 1014px #FFF , 1492px 1080px #FFF , 644px 313px #FFF , 253px 400px #FFF , 1395px 1283px #FFF , 782px 496px #FFF , 446px 1208px #FFF , 1374px 401px #FFF , 129px 1005px #FFF , 1012px 933px #FFF , 99px 1196px #FFF , 295px 1937px #FFF , 114px 137px #FFF , 1562px 700px #FFF , 1374px 1730px #FFF , 1579px 992px #FFF , 349px 23px #FFF , 505px 1451px #FFF , 174px 1112px #FFF , 1502px 351px #FFF , 988px 498px #FFF , 1180px 1393px #FFF , 1936px 970px #FFF , 1475px 95px #FFF , 635px 174px #FFF , 855px 984px #FFF , 456px 571px #FFF , 876px 1479px #FFF , 1345px 714px #FFF , 628px 1688px #FFF , 381px 194px #FFF , 1743px 1252px #FFF , 989px 863px #FFF , 1671px 1360px #FFF , 674px 1244px #FFF , 1607px 233px #FFF , 1305px 132px #FFF , 1378px 804px #FFF , 16px 1706px #FFF , 389px 969px #FFF , 1097px 1194px #FFF , 1595px 1670px #FFF , 223px 1891px #FFF , 512px 529px #FFF , 800px 1937px #FFF , 756px 338px #FFF , 1859px 958px #FFF , 551px 1843px #FFF , 591px 1713px #FFF , 607px 785px #FFF , 329px 1113px #FFF , 635px 546px #FFF , 52px 503px #FFF , 1163px 327px #FFF , 1825px 689px #FFF , 1651px 243px #FFF , 755px 1945px #FFF , 1328px 1241px #FFF , 1581px 1178px #FFF , 1155px 1495px #FFF , 119px 1470px #FFF , 237px 1107px #FFF , 354px 699px #FFF , 1037px 37px #FFF , 1734px 78px #FFF , 1817px 1312px #FFF , 1933px 1697px #FFF , 1004px 347px #FFF , 433px 157px #FFF , 559px 758px #FFF , 1728px 1260px #FFF , 752px 1482px #FFF , 1229px 468px #FFF , 1109px 1986px #FFF , 372px 1022px #FFF , 443px 1295px #FFF , 1187px 685px #FFF , 21px 523px #FFF , 927px 493px #FFF , 1784px 576px #FFF , 1994px 1413px #FFF , 860px 45px #FFF , 142px 173px #FFF , 1972px 122px #FFF , 539px 1022px #FFF , 77px 824px #FFF , 1313px 20px #FFF , 793px 1581px #FFF , 176px 694px #FFF , 619px 1957px #FFF , 1670px 1577px #FFF , 870px 221px #FFF , 1392px 750px #FFF , 1147px 1123px #FFF , 1171px 381px #FFF , 872px 1857px #FFF , 1742px 1042px #FFF , 1076px 1325px #FFF , 540px 894px #FFF , 1060px 1486px #FFF , 582px 1735px #FFF , 1820px 1029px #FFF , 1265px 1074px #FFF , 40px 375px #FFF , 1920px 176px #FFF , 78px 670px #FFF , 1853px 682px #FFF , 492px 745px #FFF , 744px 1092px #FFF , 266px 1051px #FFF , 740px 1007px #FFF , 1554px 1531px #FFF , 1164px 449px #FFF , 782px 630px #FFF , 1359px 227px #FFF , 635px 1948px #FFF , 639px 188px #FFF , 830px 1600px #FFF , 1179px 880px #FFF , 1276px 708px #FFF , 904px 806px #FFF , 1793px 84px #FFF , 1067px 724px #FFF , 349px 1160px #FFF , 1676px 1389px #FFF , 1544px 110px #FFF , 689px 1745px #FFF , 906px 731px #FFF , 528px 651px #FFF , 664px 69px #FFF , 1012px 1854px #FFF , 505px 869px #FFF , 763px 732px #FFF , 169px 755px #FFF , 1535px 1290px #FFF , 1386px 1110px #FFF , 588px 671px #FFF , 1184px 1550px #FFF , 1043px 527px #FFF , 65px 250px #FFF , 1916px 574px #FFF , 1294px 556px #FFF , 1089px 1650px #FFF , 1982px 1017px #FFF , 1806px 103px #FFF , 1902px 1160px #FFF , 1299px 1203px #FFF , 1063px 1559px #FFF , 905px 773px #FFF , 1718px 1925px #FFF , 614px 1634px #FFF , 68px 573px #FFF , 1774px 1256px #FFF , 1013px 1216px #FFF , 1449px 401px #FFF , 269px 1405px #FFF , 1245px 1085px #FFF , 1296px 793px #FFF , 1025px 1885px #FFF , 745px 757px #FFF , 827px 1635px #FFF , 1410px 1922px #FFF , 1088px 131px #FFF , 1195px 1921px #FFF , 1845px 772px #FFF , 160px 187px #FFF , 722px 326px #FFF , 1707px 1336px #FFF , 475px 1297px #FFF , 595px 578px #FFF , 965px 909px #FFF , 814px 1728px #FFF , 1030px 1070px #FFF , 1069px 129px #FFF , 1503px 752px #FFF , 816px 307px #FFF , 1085px 102px #FFF , 198px 1317px #FFF , 1387px 1053px #FFF , 1648px 772px #FFF , 1973px 524px #FFF , 548px 1087px #FFF , 1840px 927px #FFF , 1846px 404px #FFF , 910px 217px #FFF , 1528px 1134px #FFF , 462px 410px #FFF , 912px 1321px #FFF , 545px 1629px #FFF , 1084px 918px #FFF , 458px 209px #FFF , 180px 1989px #FFF , 52px 1351px #FFF , 1814px 1271px #FFF , 61px 1222px #FFF , 1782px 1054px #FFF , 1911px 184px #FFF , 1279px 971px #FFF , 1099px 1978px #FFF , 374px 734px #FFF , 349px 720px #FFF , 283px 335px #FFF , 475px 1928px #FFF , 1635px 1859px #FFF , 529px 1561px #FFF , 1254px 1158px #FFF , 1484px 1035px #FFF , 1174px 836px #FFF , 1045px 906px #FFF , 1398px 1200px #FFF , 1382px 680px #FFF , 1324px 135px #FFF , 433px 1555px #FFF , 166px 1500px #FFF , 288px 478px #FFF , 1133px 611px #FFF , 512px 770px #FFF , 817px 1611px #FFF , 1979px 2px #FFF , 1483px 350px #FFF , 100px 648px #FFF , 1216px 1820px #FFF , 1670px 1119px #FFF , 285px 1457px #FFF , 1675px 1599px #FFF , 1288px 1794px #FFF , 783px 1159px #FFF , 1197px 447px #FFF , 1743px 1796px #FFF , 619px 1734px #FFF , 245px 1957px #FFF , 1478px 601px #FFF , 126px 858px #FFF , 214px 1083px #FFF , 402px 1837px #FFF , 898px 1471px #FFF , 1821px 1443px #FFF , 1377px 438px #FFF , 420px 1070px #FFF , 1018px 1449px #FFF , 853px 1523px #FFF , 735px 457px #FFF , 310px 323px #FFF , 945px 1023px #FFF , 1533px 526px #FFF , 181px 1725px #FFF , 755px 1207px #FFF , 1555px 1196px #FFF , 560px 823px #FFF , 1803px 620px #FFF , 78px 717px #FFF , 1433px 1486px #FFF , 1758px 1771px #FFF , 1003px 908px #FFF , 1728px 53px #FFF , 303px 164px #FFF , 491px 1192px #FFF , 1320px 1643px #FFF , 460px 1114px #FFF , 1157px 422px #FFF , 1831px 1310px #FFF , 468px 381px #FFF , 912px 470px #FFF , 1017px 1079px #FFF , 572px 1862px #FFF , 102px 1485px #FFF , 1926px 1454px #FFF , 878px 1659px #FFF , 1154px 1067px #FFF , 869px 933px #FFF , 1001px 705px #FFF , 1436px 202px #FFF , 1758px 355px #FFF , 1558px 660px #FFF , 1241px 848px #FFF , 1911px 683px #FFF , 1868px 1695px #FFF , 1909px 1096px #FFF , 714px 747px #FFF , 1922px 127px #FFF , 1268px 1653px #FFF , 1752px 149px #FFF , 1952px 203px #FFF , 1023px 1317px #FFF , 1011px 1213px #FFF , 1994px 341px #FFF , 1411px 489px #FFF , 1423px 1605px #FFF , 1522px 1408px #FFF , 1260px 1318px #FFF , 1972px 511px #FFF , 1957px 1726px #FFF , 353px 341px #FFF , 506px 1349px #FFF , 453px 811px #FFF , 1363px 445px #FFF , 227px 1945px #FFF , 1023px 1333px #FFF , 72px 344px #FFF , 1201px 396px #FFF , 187px 1632px #FFF , 1316px 77px #FFF , 1108px 26px #FFF , 1005px 454px #FFF , 349px 890px #FFF , 1921px 183px #FFF , 26px 1111px #FFF , 1700px 717px #FFF , 554px 1252px #FFF , 444px 1428px #FFF , 1015px 1095px #FFF , 555px 811px #FFF , 1756px 520px #FFF , 861px 1166px #FFF , 108px 1224px #FFF , 1686px 838px #FFF , 713px 1326px #FFF , 458px 1318px #FFF , 694px 1097px #FFF , 1031px 1422px #FFF , 183px 287px #FFF , 1195px 1217px #FFF , 1866px 269px #FFF , 99px 241px #FFF , 1677px 368px #FFF , 27px 1877px #FFF , 932px 1595px #FFF , 477px 201px #FFF , 469px 70px #FFF , 33px 1272px #FFF , 500px 1447px #FFF , 1807px 195px #FFF , 1715px 1219px #FFF , 1626px 1437px #FFF , 1683px 1547px #FFF , 771px 773px #FFF , 507px 750px #FFF , 1736px 587px #FFF , 1426px 1624px #FFF , 1767px 584px #FFF , 1305px 737px #FFF , 169px 1605px #FFF , 1959px 1573px #FFF , 90px 1466px #FFF , 131px 426px #FFF , 552px 833px #FFF , 1488px 830px #FFF , 1200px 1701px #FFF , 1244px 659px #FFF , 153px 70px #FFF , 604px 1176px #FFF , 810px 230px #FFF , 850px 520px #FFF , 1245px 1248px #FFF , 554px 458px #FFF , 1560px 1350px #FFF , 928px 1979px #FFF , 1631px 1531px #FFF , 1879px 391px #FFF , 1690px 465px #FFF , 1186px 1956px #FFF , 260px 135px #FFF , 941px 211px #FFF , 9px 178px #FFF , 1373px 1347px #FFF , 1905px 601px #FFF , 1789px 451px #FFF , 486px 1849px #FFF , 1099px 778px #FFF , 512px 930px #FFF , 1645px 923px #FFF , 1062px 1323px #FFF , 998px 798px #FFF , 625px 207px #FFF , 1808px 1804px #FFF , 147px 9px #FFF , 132px 1948px #FFF , 902px 275px #FFF , 1409px 1738px #FFF , 40px 1184px #FFF , 387px 644px #FFF , 736px 1279px #FFF , 1499px 1063px #FFF , 743px 35px #FFF , 1852px 603px #FFF , 1678px 39px #FFF , 774px 1340px #FFF , 1983px 1745px #FFF , 1540px 1833px #FFF , 1165px 1819px #FFF , 1699px 1387px #FFF , 12px 396px #FFF , 643px 1144px #FFF , 1595px 1082px #FFF , 1890px 1431px #FFF , 1559px 13px #FFF , 1874px 429px #FFF , 351px 772px #FFF , 1267px 1947px #FFF , 1756px 392px #FFF , 323px 184px #FFF , 707px 1645px #FFF , 1689px 731px #FFF , 1725px 77px #FFF , 1841px 1533px #FFF , 298px 473px #FFF , 1690px 57px #FFF , 1862px 1915px #FFF , 792px 1437px #FFF , 1823px 953px #FFF , 700px 691px #FFF , 239px 275px #FFF , 561px 1400px #FFF , 1839px 338px #FFF , 1720px 1624px #FFF , 1206px 1870px #FFF , 681px 1731px #FFF , 448px 413px #FFF , 1581px 1162px #FFF , 421px 1081px #FFF , 613px 423px #FFF , 1449px 490px #FFF , 574px 1965px #FFF , 949px 1185px #FFF , 61px 115px #FFF , 1930px 344px #FFF , 17px 1442px #FFF , 1692px 402px #FFF , 1703px 1600px #FFF , 1966px 1156px #FFF , 1842px 1217px #FFF , 809px 392px #FFF , 691px 118px #FFF , 1526px 1590px #FFF , 940px 344px #FFF , 152px 1135px #FFF , 1237px 299px #FFF , 355px 1602px #FFF , 1031px 1771px #FFF , 395px 440px #FFF , 1772px 1451px #FFF , 350px 1454px #FFF , 413px 366px #FFF , 1418px 123px #FFF , 1956px 563px #FFF , 224px 554px #FFF , 429px 459px #FFF , 1133px 1198px #FFF , 551px 386px #FFF , 1008px 39px #FFF , 1374px 450px #FFF , 1764px 1963px #FFF , 231px 1128px #FFF , 897px 1680px #FFF , 739px 785px #FFF , 1611px 138px #FFF , 857px 1453px #FFF , 1122px 327px #FFF , 1734px 1470px #FFF , 267px 850px #FFF , 780px 1578px #FFF , 422px 308px #FFF , 499px 1533px #FFF , 1606px 1218px #FFF , 1105px 1989px #FFF , 313px 760px #FFF , 1310px 1274px #FFF , 135px 614px #FFF , 494px 1810px #FFF , 1923px 1684px #FFF , 1093px 501px #FFF , 950px 1260px #FFF , 1726px 1316px #FFF , 1589px 533px #FFF , 805px 175px #FFF , 1079px 1763px #FFF , 775px 362px #FFF , 510px 1823px #FFF , 630px 1969px #FFF , 1254px 638px #FFF , 1810px 934px #FFF , 135px 1790px #FFF , 543px 789px #FFF , 424px 986px #FFF , 872px 575px #FFF , 803px 115px #FFF , 829px 1886px #FFF , 1181px 339px #FFF , 1801px 762px #FFF , 1662px 82px #FFF , 826px 1902px #FFF , 478px 931px #FFF , 805px 881px #FFF , 1329px 895px #FFF , 1176px 485px #FFF , 4px 398px #FFF , 164px 1516px #FFF , 922px 633px #FFF , 1901px 1750px #FFF , 1184px 453px #FFF , 1719px 1636px #FFF , 1152px 781px #FFF , 1622px 1423px #FFF , 128px 730px #FFF , 1798px 1767px #FFF , 361px 1857px #FFF , 1667px 712px #FFF , 1045px 1904px #FFF , 1603px 1862px #FFF , 1082px 816px #FFF , 1769px 1674px #FFF , 883px 775px #FFF , 256px 1926px #FFF , 858px 1289px #FFF , 1498px 913px #FFF , 1368px 667px #FFF , 843px 1629px #FFF , 1814px 146px #FFF , 1292px 24px #FFF , 604px 1785px #FFF , 428px 485px #FFF , 213px 1369px #FFF , 560px 11px #FFF , 1799px 925px #FFF , 1104px 816px #FFF , 849px 949px #FFF , 886px 1112px #FFF , 1361px 1817px #FFF , 1832px 1179px #FFF , 1552px 1390px #FFF , 987px 1793px #FFF , 1267px 901px #FFF , 1580px 1157px #FFF , 1095px 1677px #FFF , 442px 1740px #FFF , 1559px 749px #FFF , 1120px 767px #FFF , 176px 1993px #FFF , 892px 937px #FFF , 1539px 1381px #FFF , 1579px 1746px #FFF , 598px 558px #FFF , 1203px 222px #FFF , 647px 1357px #FFF , 200px 272px #FFF , 1999px 1651px #FFF , 904px 1924px #FFF , 1342px 1124px #FFF , 22px 1561px #FFF , 1959px 1241px #FFF , 96px 819px #FFF , 507px 492px #FFF , 1396px 1830px #FFF , 1190px 1442px #FFF , 1258px 1466px #FFF , 1798px 1253px #FFF , 1642px 713px #FFF , 1165px 765px #FFF , 1704px 678px #FFF , 112px 1065px #FFF , 738px 728px #FFF , 679px 428px #FFF , 2000px 293px #FFF , 1338px 1176px #FFF , 1880px 932px #FFF , 1304px 698px #FFF , 821px 1639px #FFF , 718px 871px #FFF , 682px 105px #FFF , 698px 398px #FFF , 1015px 1966px #FFF , 1272px 1914px #FFF , 149px 902px #FFF , 70px 996px #FFF , 508px 1801px #FFF , 191px 140px #FFF , 1945px 377px #FFF , 1039px 1679px #FFF , 1385px 1212px #FFF , 937px 922px #FFF , 915px 1343px #FFF , 673px 831px #FFF , 242px 768px #FFF , 1164px 1215px #FFF , 2px 408px #FFF , 1443px 238px #FFF , 743px 589px #FFF , 1086px 1285px #FFF , 1783px 1415px #FFF , 917px 346px #FFF , 1704px 1275px #FFF , 940px 24px #FFF , 1884px 626px #FFF , 1541px 1399px #FFF , 1627px 1099px #FFF , 1766px 947px #FFF , 92px 352px #FFF , 438px 40px #FFF , 1698px 1124px #FFF , 26px 1350px #FFF , 676px 436px #FFF , 1655px 1692px #FFF , 545px 1192px #FFF , 1689px 772px #FFF , 578px 1978px #FFF , 1884px 1080px #FFF , 1866px 1657px #FFF , 1194px 1395px #FFF , 42px 506px #FFF , 1583px 1603px #FFF , 729px 1637px #FFF , 1291px 1970px #FFF , 1278px 1732px #FFF , 934px 1251px #FFF , 1808px 709px #FFF , 1615px 1675px #FFF , 599px 1687px #FFF , 1137px 681px #FFF , 1242px 1120px #FFF , 1231px 538px #FFF , 1310px 379px #FFF , 310px 1411px #FFF , 1666px 265px #FFF , 1270px 662px #FFF , 996px 717px #FFF , 1815px 1943px #FFF , 874px 1782px #FFF , 1805px 37px #FFF , 1338px 1418px #FFF , 414px 1654px #FFF , 1049px 34px #FFF , 142px 1311px #FFF , 1062px 1448px #FFF , 1186px 283px #FFF , 1316px 123px #FFF , 1394px 1861px #FFF , 1062px 1836px #FFF , 125px 1128px #FFF , 1408px 981px #FFF , 546px 101px #FFF , 1249px 770px #FFF , 1069px 268px #FFF , 384px 972px #FFF , 1967px 1317px #FFF , 1830px 1921px #FFF , 292px 900px #FFF , 1559px 1959px #FFF , 1686px 42px #FFF , 1465px 1841px #FFF , 1733px 902px #FFF , 1286px 1483px #FFF , 224px 667px #FFF , 152px 1344px #FFF , 550px 1947px #FFF , 1110px 1647px #FFF , 1641px 919px #FFF , 646px 1841px #FFF , 976px 341px #FFF , 1983px 1038px #FFF , 1357px 1897px #FFF , 1946px 1661px #FFF , 1060px 1470px #FFF , 323px 553px #FFF , 1504px 846px #FFF , 992px 758px #FFF , 241px 1052px #FFF , 1785px 1702px #FFF , 1762px 1896px #FFF , 761px 1093px #FFF , 1685px 458px #FFF , 1641px 645px #FFF , 1370px 1386px #FFF , 384px 1525px #FFF , 366px 1205px #FFF , 335px 422px #FFF , 1981px 865px #FFF , 448px 1168px #FFF , 355px 1350px #FFF , 1645px 1661px #FFF;
  animation: animStar 50s linear infinite;
}
#stars:after {
  content: " ";
  position: absolute;
  top: 2000px;
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: 1019px 1390px #FFF , 1008px 458px #FFF , 1282px 272px #FFF , 839px 712px #FFF , 646px 111px #FFF , 1252px 199px #FFF , 1009px 429px #FFF , 311px 539px #FFF , 1777px 1238px #FFF , 393px 394px #FFF , 222px 450px #FFF , 1484px 869px #FFF , 572px 148px #FFF , 1358px 1899px #FFF , 1440px 557px #FFF , 925px 1644px #FFF , 1865px 1750px #FFF , 735px 1099px #FFF , 567px 1064px #FFF , 1102px 308px #FFF , 217px 1836px #FFF , 1500px 1014px #FFF , 1492px 1080px #FFF , 644px 313px #FFF , 253px 400px #FFF , 1395px 1283px #FFF , 782px 496px #FFF , 446px 1208px #FFF , 1374px 401px #FFF , 129px 1005px #FFF , 1012px 933px #FFF , 99px 1196px #FFF , 295px 1937px #FFF , 114px 137px #FFF , 1562px 700px #FFF , 1374px 1730px #FFF , 1579px 992px #FFF , 349px 23px #FFF , 505px 1451px #FFF , 174px 1112px #FFF , 1502px 351px #FFF , 988px 498px #FFF , 1180px 1393px #FFF , 1936px 970px #FFF , 1475px 95px #FFF , 635px 174px #FFF , 855px 984px #FFF , 456px 571px #FFF , 876px 1479px #FFF , 1345px 714px #FFF , 628px 1688px #FFF , 381px 194px #FFF , 1743px 1252px #FFF , 989px 863px #FFF , 1671px 1360px #FFF , 674px 1244px #FFF , 1607px 233px #FFF , 1305px 132px #FFF , 1378px 804px #FFF , 16px 1706px #FFF , 389px 969px #FFF , 1097px 1194px #FFF , 1595px 1670px #FFF , 223px 1891px #FFF , 512px 529px #FFF , 800px 1937px #FFF , 756px 338px #FFF , 1859px 958px #FFF , 551px 1843px #FFF , 591px 1713px #FFF , 607px 785px #FFF , 329px 1113px #FFF , 635px 546px #FFF , 52px 503px #FFF , 1163px 327px #FFF , 1825px 689px #FFF , 1651px 243px #FFF , 755px 1945px #FFF , 1328px 1241px #FFF , 1581px 1178px #FFF , 1155px 1495px #FFF , 119px 1470px #FFF , 237px 1107px #FFF , 354px 699px #FFF , 1037px 37px #FFF , 1734px 78px #FFF , 1817px 1312px #FFF , 1933px 1697px #FFF , 1004px 347px #FFF , 433px 157px #FFF , 559px 758px #FFF , 1728px 1260px #FFF , 752px 1482px #FFF , 1229px 468px #FFF , 1109px 1986px #FFF , 372px 1022px #FFF , 443px 1295px #FFF , 1187px 685px #FFF , 21px 523px #FFF , 927px 493px #FFF , 1784px 576px #FFF , 1994px 1413px #FFF , 860px 45px #FFF , 142px 173px #FFF , 1972px 122px #FFF , 539px 1022px #FFF , 77px 824px #FFF , 1313px 20px #FFF , 793px 1581px #FFF , 176px 694px #FFF , 619px 1957px #FFF , 1670px 1577px #FFF , 870px 221px #FFF , 1392px 750px #FFF , 1147px 1123px #FFF , 1171px 381px #FFF , 872px 1857px #FFF , 1742px 1042px #FFF , 1076px 1325px #FFF , 540px 894px #FFF , 1060px 1486px #FFF , 582px 1735px #FFF , 1820px 1029px #FFF , 1265px 1074px #FFF , 40px 375px #FFF , 1920px 176px #FFF , 78px 670px #FFF , 1853px 682px #FFF , 492px 745px #FFF , 744px 1092px #FFF , 266px 1051px #FFF , 740px 1007px #FFF , 1554px 1531px #FFF , 1164px 449px #FFF , 782px 630px #FFF , 1359px 227px #FFF , 635px 1948px #FFF , 639px 188px #FFF , 830px 1600px #FFF , 1179px 880px #FFF , 1276px 708px #FFF , 904px 806px #FFF , 1793px 84px #FFF , 1067px 724px #FFF , 349px 1160px #FFF , 1676px 1389px #FFF , 1544px 110px #FFF , 689px 1745px #FFF , 906px 731px #FFF , 528px 651px #FFF , 664px 69px #FFF , 1012px 1854px #FFF , 505px 869px #FFF , 763px 732px #FFF , 169px 755px #FFF , 1535px 1290px #FFF , 1386px 1110px #FFF , 588px 671px #FFF , 1184px 1550px #FFF , 1043px 527px #FFF , 65px 250px #FFF , 1916px 574px #FFF , 1294px 556px #FFF , 1089px 1650px #FFF , 1982px 1017px #FFF , 1806px 103px #FFF , 1902px 1160px #FFF , 1299px 1203px #FFF , 1063px 1559px #FFF , 905px 773px #FFF , 1718px 1925px #FFF , 614px 1634px #FFF , 68px 573px #FFF , 1774px 1256px #FFF , 1013px 1216px #FFF , 1449px 401px #FFF , 269px 1405px #FFF , 1245px 1085px #FFF , 1296px 793px #FFF , 1025px 1885px #FFF , 745px 757px #FFF , 827px 1635px #FFF , 1410px 1922px #FFF , 1088px 131px #FFF , 1195px 1921px #FFF , 1845px 772px #FFF , 160px 187px #FFF , 722px 326px #FFF , 1707px 1336px #FFF , 475px 1297px #FFF , 595px 578px #FFF , 965px 909px #FFF , 814px 1728px #FFF , 1030px 1070px #FFF , 1069px 129px #FFF , 1503px 752px #FFF , 816px 307px #FFF , 1085px 102px #FFF , 198px 1317px #FFF , 1387px 1053px #FFF , 1648px 772px #FFF , 1973px 524px #FFF , 548px 1087px #FFF , 1840px 927px #FFF , 1846px 404px #FFF , 910px 217px #FFF , 1528px 1134px #FFF , 462px 410px #FFF , 912px 1321px #FFF , 545px 1629px #FFF , 1084px 918px #FFF , 458px 209px #FFF , 180px 1989px #FFF , 52px 1351px #FFF , 1814px 1271px #FFF , 61px 1222px #FFF , 1782px 1054px #FFF , 1911px 184px #FFF , 1279px 971px #FFF , 1099px 1978px #FFF , 374px 734px #FFF , 349px 720px #FFF , 283px 335px #FFF , 475px 1928px #FFF , 1635px 1859px #FFF , 529px 1561px #FFF , 1254px 1158px #FFF , 1484px 1035px #FFF , 1174px 836px #FFF , 1045px 906px #FFF , 1398px 1200px #FFF , 1382px 680px #FFF , 1324px 135px #FFF , 433px 1555px #FFF , 166px 1500px #FFF , 288px 478px #FFF , 1133px 611px #FFF , 512px 770px #FFF , 817px 1611px #FFF , 1979px 2px #FFF , 1483px 350px #FFF , 100px 648px #FFF , 1216px 1820px #FFF , 1670px 1119px #FFF , 285px 1457px #FFF , 1675px 1599px #FFF , 1288px 1794px #FFF , 783px 1159px #FFF , 1197px 447px #FFF , 1743px 1796px #FFF , 619px 1734px #FFF , 245px 1957px #FFF , 1478px 601px #FFF , 126px 858px #FFF , 214px 1083px #FFF , 402px 1837px #FFF , 898px 1471px #FFF , 1821px 1443px #FFF , 1377px 438px #FFF , 420px 1070px #FFF , 1018px 1449px #FFF , 853px 1523px #FFF , 735px 457px #FFF , 310px 323px #FFF , 945px 1023px #FFF , 1533px 526px #FFF , 181px 1725px #FFF , 755px 1207px #FFF , 1555px 1196px #FFF , 560px 823px #FFF , 1803px 620px #FFF , 78px 717px #FFF , 1433px 1486px #FFF , 1758px 1771px #FFF , 1003px 908px #FFF , 1728px 53px #FFF , 303px 164px #FFF , 491px 1192px #FFF , 1320px 1643px #FFF , 460px 1114px #FFF , 1157px 422px #FFF , 1831px 1310px #FFF , 468px 381px #FFF , 912px 470px #FFF , 1017px 1079px #FFF , 572px 1862px #FFF , 102px 1485px #FFF , 1926px 1454px #FFF , 878px 1659px #FFF , 1154px 1067px #FFF , 869px 933px #FFF , 1001px 705px #FFF , 1436px 202px #FFF , 1758px 355px #FFF , 1558px 660px #FFF , 1241px 848px #FFF , 1911px 683px #FFF , 1868px 1695px #FFF , 1909px 1096px #FFF , 714px 747px #FFF , 1922px 127px #FFF , 1268px 1653px #FFF , 1752px 149px #FFF , 1952px 203px #FFF , 1023px 1317px #FFF , 1011px 1213px #FFF , 1994px 341px #FFF , 1411px 489px #FFF , 1423px 1605px #FFF , 1522px 1408px #FFF , 1260px 1318px #FFF , 1972px 511px #FFF , 1957px 1726px #FFF , 353px 341px #FFF , 506px 1349px #FFF , 453px 811px #FFF , 1363px 445px #FFF , 227px 1945px #FFF , 1023px 1333px #FFF , 72px 344px #FFF , 1201px 396px #FFF , 187px 1632px #FFF , 1316px 77px #FFF , 1108px 26px #FFF , 1005px 454px #FFF , 349px 890px #FFF , 1921px 183px #FFF , 26px 1111px #FFF , 1700px 717px #FFF , 554px 1252px #FFF , 444px 1428px #FFF , 1015px 1095px #FFF , 555px 811px #FFF , 1756px 520px #FFF , 861px 1166px #FFF , 108px 1224px #FFF , 1686px 838px #FFF , 713px 1326px #FFF , 458px 1318px #FFF , 694px 1097px #FFF , 1031px 1422px #FFF , 183px 287px #FFF , 1195px 1217px #FFF , 1866px 269px #FFF , 99px 241px #FFF , 1677px 368px #FFF , 27px 1877px #FFF , 932px 1595px #FFF , 477px 201px #FFF , 469px 70px #FFF , 33px 1272px #FFF , 500px 1447px #FFF , 1807px 195px #FFF , 1715px 1219px #FFF , 1626px 1437px #FFF , 1683px 1547px #FFF , 771px 773px #FFF , 507px 750px #FFF , 1736px 587px #FFF , 1426px 1624px #FFF , 1767px 584px #FFF , 1305px 737px #FFF , 169px 1605px #FFF , 1959px 1573px #FFF , 90px 1466px #FFF , 131px 426px #FFF , 552px 833px #FFF , 1488px 830px #FFF , 1200px 1701px #FFF , 1244px 659px #FFF , 153px 70px #FFF , 604px 1176px #FFF , 810px 230px #FFF , 850px 520px #FFF , 1245px 1248px #FFF , 554px 458px #FFF , 1560px 1350px #FFF , 928px 1979px #FFF , 1631px 1531px #FFF , 1879px 391px #FFF , 1690px 465px #FFF , 1186px 1956px #FFF , 260px 135px #FFF , 941px 211px #FFF , 9px 178px #FFF , 1373px 1347px #FFF , 1905px 601px #FFF , 1789px 451px #FFF , 486px 1849px #FFF , 1099px 778px #FFF , 512px 930px #FFF , 1645px 923px #FFF , 1062px 1323px #FFF , 998px 798px #FFF , 625px 207px #FFF , 1808px 1804px #FFF , 147px 9px #FFF , 132px 1948px #FFF , 902px 275px #FFF , 1409px 1738px #FFF , 40px 1184px #FFF , 387px 644px #FFF , 736px 1279px #FFF , 1499px 1063px #FFF , 743px 35px #FFF , 1852px 603px #FFF , 1678px 39px #FFF , 774px 1340px #FFF , 1983px 1745px #FFF , 1540px 1833px #FFF , 1165px 1819px #FFF , 1699px 1387px #FFF , 12px 396px #FFF , 643px 1144px #FFF , 1595px 1082px #FFF , 1890px 1431px #FFF , 1559px 13px #FFF , 1874px 429px #FFF , 351px 772px #FFF , 1267px 1947px #FFF , 1756px 392px #FFF , 323px 184px #FFF , 707px 1645px #FFF , 1689px 731px #FFF , 1725px 77px #FFF , 1841px 1533px #FFF , 298px 473px #FFF , 1690px 57px #FFF , 1862px 1915px #FFF , 792px 1437px #FFF , 1823px 953px #FFF , 700px 691px #FFF , 239px 275px #FFF , 561px 1400px #FFF , 1839px 338px #FFF , 1720px 1624px #FFF , 1206px 1870px #FFF , 681px 1731px #FFF , 448px 413px #FFF , 1581px 1162px #FFF , 421px 1081px #FFF , 613px 423px #FFF , 1449px 490px #FFF , 574px 1965px #FFF , 949px 1185px #FFF , 61px 115px #FFF , 1930px 344px #FFF , 17px 1442px #FFF , 1692px 402px #FFF , 1703px 1600px #FFF , 1966px 1156px #FFF , 1842px 1217px #FFF , 809px 392px #FFF , 691px 118px #FFF , 1526px 1590px #FFF , 940px 344px #FFF , 152px 1135px #FFF , 1237px 299px #FFF , 355px 1602px #FFF , 1031px 1771px #FFF , 395px 440px #FFF , 1772px 1451px #FFF , 350px 1454px #FFF , 413px 366px #FFF , 1418px 123px #FFF , 1956px 563px #FFF , 224px 554px #FFF , 429px 459px #FFF , 1133px 1198px #FFF , 551px 386px #FFF , 1008px 39px #FFF , 1374px 450px #FFF , 1764px 1963px #FFF , 231px 1128px #FFF , 897px 1680px #FFF , 739px 785px #FFF , 1611px 138px #FFF , 857px 1453px #FFF , 1122px 327px #FFF , 1734px 1470px #FFF , 267px 850px #FFF , 780px 1578px #FFF , 422px 308px #FFF , 499px 1533px #FFF , 1606px 1218px #FFF , 1105px 1989px #FFF , 313px 760px #FFF , 1310px 1274px #FFF , 135px 614px #FFF , 494px 1810px #FFF , 1923px 1684px #FFF , 1093px 501px #FFF , 950px 1260px #FFF , 1726px 1316px #FFF , 1589px 533px #FFF , 805px 175px #FFF , 1079px 1763px #FFF , 775px 362px #FFF , 510px 1823px #FFF , 630px 1969px #FFF , 1254px 638px #FFF , 1810px 934px #FFF , 135px 1790px #FFF , 543px 789px #FFF , 424px 986px #FFF , 872px 575px #FFF , 803px 115px #FFF , 829px 1886px #FFF , 1181px 339px #FFF , 1801px 762px #FFF , 1662px 82px #FFF , 826px 1902px #FFF , 478px 931px #FFF , 805px 881px #FFF , 1329px 895px #FFF , 1176px 485px #FFF , 4px 398px #FFF , 164px 1516px #FFF , 922px 633px #FFF , 1901px 1750px #FFF , 1184px 453px #FFF , 1719px 1636px #FFF , 1152px 781px #FFF , 1622px 1423px #FFF , 128px 730px #FFF , 1798px 1767px #FFF , 361px 1857px #FFF , 1667px 712px #FFF , 1045px 1904px #FFF , 1603px 1862px #FFF , 1082px 816px #FFF , 1769px 1674px #FFF , 883px 775px #FFF , 256px 1926px #FFF , 858px 1289px #FFF , 1498px 913px #FFF , 1368px 667px #FFF , 843px 1629px #FFF , 1814px 146px #FFF , 1292px 24px #FFF , 604px 1785px #FFF , 428px 485px #FFF , 213px 1369px #FFF , 560px 11px #FFF , 1799px 925px #FFF , 1104px 816px #FFF , 849px 949px #FFF , 886px 1112px #FFF , 1361px 1817px #FFF , 1832px 1179px #FFF , 1552px 1390px #FFF , 987px 1793px #FFF , 1267px 901px #FFF , 1580px 1157px #FFF , 1095px 1677px #FFF , 442px 1740px #FFF , 1559px 749px #FFF , 1120px 767px #FFF , 176px 1993px #FFF , 892px 937px #FFF , 1539px 1381px #FFF , 1579px 1746px #FFF , 598px 558px #FFF , 1203px 222px #FFF , 647px 1357px #FFF , 200px 272px #FFF , 1999px 1651px #FFF , 904px 1924px #FFF , 1342px 1124px #FFF , 22px 1561px #FFF , 1959px 1241px #FFF , 96px 819px #FFF , 507px 492px #FFF , 1396px 1830px #FFF , 1190px 1442px #FFF , 1258px 1466px #FFF , 1798px 1253px #FFF , 1642px 713px #FFF , 1165px 765px #FFF , 1704px 678px #FFF , 112px 1065px #FFF , 738px 728px #FFF , 679px 428px #FFF , 2000px 293px #FFF , 1338px 1176px #FFF , 1880px 932px #FFF , 1304px 698px #FFF , 821px 1639px #FFF , 718px 871px #FFF , 682px 105px #FFF , 698px 398px #FFF , 1015px 1966px #FFF , 1272px 1914px #FFF , 149px 902px #FFF , 70px 996px #FFF , 508px 1801px #FFF , 191px 140px #FFF , 1945px 377px #FFF , 1039px 1679px #FFF , 1385px 1212px #FFF , 937px 922px #FFF , 915px 1343px #FFF , 673px 831px #FFF , 242px 768px #FFF , 1164px 1215px #FFF , 2px 408px #FFF , 1443px 238px #FFF , 743px 589px #FFF , 1086px 1285px #FFF , 1783px 1415px #FFF , 917px 346px #FFF , 1704px 1275px #FFF , 940px 24px #FFF , 1884px 626px #FFF , 1541px 1399px #FFF , 1627px 1099px #FFF , 1766px 947px #FFF , 92px 352px #FFF , 438px 40px #FFF , 1698px 1124px #FFF , 26px 1350px #FFF , 676px 436px #FFF , 1655px 1692px #FFF , 545px 1192px #FFF , 1689px 772px #FFF , 578px 1978px #FFF , 1884px 1080px #FFF , 1866px 1657px #FFF , 1194px 1395px #FFF , 42px 506px #FFF , 1583px 1603px #FFF , 729px 1637px #FFF , 1291px 1970px #FFF , 1278px 1732px #FFF , 934px 1251px #FFF , 1808px 709px #FFF , 1615px 1675px #FFF , 599px 1687px #FFF , 1137px 681px #FFF , 1242px 1120px #FFF , 1231px 538px #FFF , 1310px 379px #FFF , 310px 1411px #FFF , 1666px 265px #FFF , 1270px 662px #FFF , 996px 717px #FFF , 1815px 1943px #FFF , 874px 1782px #FFF , 1805px 37px #FFF , 1338px 1418px #FFF , 414px 1654px #FFF , 1049px 34px #FFF , 142px 1311px #FFF , 1062px 1448px #FFF , 1186px 283px #FFF , 1316px 123px #FFF , 1394px 1861px #FFF , 1062px 1836px #FFF , 125px 1128px #FFF , 1408px 981px #FFF , 546px 101px #FFF , 1249px 770px #FFF , 1069px 268px #FFF , 384px 972px #FFF , 1967px 1317px #FFF , 1830px 1921px #FFF , 292px 900px #FFF , 1559px 1959px #FFF , 1686px 42px #FFF , 1465px 1841px #FFF , 1733px 902px #FFF , 1286px 1483px #FFF , 224px 667px #FFF , 152px 1344px #FFF , 550px 1947px #FFF , 1110px 1647px #FFF , 1641px 919px #FFF , 646px 1841px #FFF , 976px 341px #FFF , 1983px 1038px #FFF , 1357px 1897px #FFF , 1946px 1661px #FFF , 1060px 1470px #FFF , 323px 553px #FFF , 1504px 846px #FFF , 992px 758px #FFF , 241px 1052px #FFF , 1785px 1702px #FFF , 1762px 1896px #FFF , 761px 1093px #FFF , 1685px 458px #FFF , 1641px 645px #FFF , 1370px 1386px #FFF , 384px 1525px #FFF , 366px 1205px #FFF , 335px 422px #FFF , 1981px 865px #FFF , 448px 1168px #FFF , 355px 1350px #FFF , 1645px 1661px #FFF;
}

#stars2 {
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow: 1355px 1936px #FFF , 816px 1106px #FFF , 1178px 1648px #FFF , 1050px 1606px #FFF , 1384px 1598px #FFF , 385px 395px #FFF , 1404px 1376px #FFF , 959px 1003px #FFF , 273px 645px #FFF , 213px 973px #FFF , 1981px 1441px #FFF , 240px 637px #FFF , 1910px 693px #FFF , 784px 1240px #FFF , 1979px 1648px #FFF , 961px 678px #FFF , 964px 733px #FFF , 620px 829px #FFF , 1434px 1705px #FFF , 49px 1175px #FFF , 661px 1519px #FFF , 1881px 690px #FFF , 935px 1451px #FFF , 1719px 271px #FFF , 1505px 324px #FFF , 1587px 1930px #FFF , 869px 1530px #FFF , 1410px 1819px #FFF , 1833px 1488px #FFF , 599px 613px #FFF , 1542px 1622px #FFF , 1379px 1240px #FFF , 1455px 1371px #FFF , 55px 1962px #FFF , 1794px 1420px #FFF , 1039px 1472px #FFF , 531px 1632px #FFF , 18px 442px #FFF , 1165px 1780px #FFF , 1962px 1213px #FFF , 529px 1719px #FFF , 254px 1040px #FFF , 1399px 574px #FFF , 818px 171px #FFF , 575px 93px #FFF , 596px 1329px #FFF , 1975px 602px #FFF , 1595px 284px #FFF , 1559px 1313px #FFF , 57px 1758px #FFF , 195px 284px #FFF , 686px 192px #FFF , 915px 257px #FFF , 828px 932px #FFF , 1002px 1898px #FFF , 973px 773px #FFF , 1021px 270px #FFF , 1848px 1141px #FFF , 1665px 702px #FFF , 486px 1215px #FFF , 201px 1168px #FFF , 136px 1920px #FFF , 795px 404px #FFF , 877px 335px #FFF , 1497px 605px #FFF , 1569px 1413px #FFF , 1757px 1780px #FFF , 228px 621px #FFF , 696px 1731px #FFF , 1528px 256px #FFF , 457px 87px #FFF , 1857px 1246px #FFF , 1975px 1152px #FFF , 144px 1002px #FFF , 517px 1294px #FFF , 1473px 404px #FFF , 1791px 348px #FFF , 1630px 726px #FFF , 1328px 25px #FFF , 241px 566px #FFF , 1591px 1688px #FFF , 1198px 185px #FFF , 1836px 375px #FFF , 592px 1632px #FFF , 426px 690px #FFF , 1744px 1177px #FFF , 1145px 355px #FFF , 103px 449px #FFF , 1922px 133px #FFF , 129px 1661px #FFF , 1532px 1820px #FFF , 1448px 695px #FFF , 370px 186px #FFF , 1405px 802px #FFF , 112px 738px #FFF , 402px 29px #FFF , 777px 660px #FFF , 520px 193px #FFF , 1730px 1445px #FFF , 1970px 1281px #FFF , 1972px 1500px #FFF , 248px 1612px #FFF , 1369px 1617px #FFF , 489px 702px #FFF , 36px 1372px #FFF , 404px 1618px #FFF , 1837px 78px #FFF , 948px 1643px #FFF , 1099px 826px #FFF , 1795px 22px #FFF , 1278px 493px #FFF , 1496px 59px #FFF , 152px 987px #FFF , 1599px 1077px #FFF , 1116px 1252px #FFF , 666px 1855px #FFF , 1028px 404px #FFF , 1713px 1134px #FFF , 724px 609px #FFF , 1123px 1350px #FFF , 1928px 1871px #FFF , 547px 1945px #FFF , 1310px 1534px #FFF , 366px 1409px #FFF , 1234px 1354px #FFF , 1386px 1776px #FFF , 1383px 1427px #FFF , 227px 950px #FFF , 1010px 396px #FFF , 1010px 153px #FFF , 1533px 1595px #FFF , 1116px 723px #FFF , 1585px 1248px #FFF , 961px 631px #FFF , 465px 793px #FFF , 1366px 680px #FFF , 749px 652px #FFF , 1325px 1419px #FFF , 157px 1830px #FFF , 345px 1691px #FFF , 1234px 1958px #FFF , 980px 635px #FFF , 492px 1007px #FFF , 752px 1162px #FFF , 976px 1626px #FFF , 1075px 209px #FFF , 1342px 319px #FFF , 113px 1223px #FFF , 373px 985px #FFF , 46px 135px #FFF , 1675px 1976px #FFF , 573px 221px #FFF , 1508px 1422px #FFF , 1513px 786px #FFF , 1735px 1854px #FFF , 1049px 1884px #FFF , 1159px 1796px #FFF , 1878px 150px #FFF , 238px 424px #FFF , 1121px 510px #FFF , 1262px 431px #FFF , 8px 1842px #FFF , 1224px 1185px #FFF , 1757px 1939px #FFF , 1973px 1978px #FFF , 1529px 1000px #FFF , 36px 1883px #FFF , 127px 761px #FFF , 1531px 583px #FFF , 1015px 39px #FFF , 1446px 258px #FFF , 107px 1132px #FFF , 1155px 335px #FFF , 1123px 1680px #FFF , 425px 931px #FFF , 646px 214px #FFF , 1342px 1401px #FFF , 533px 502px #FFF , 825px 365px #FFF , 554px 1852px #FFF , 1594px 1751px #FFF , 1015px 526px #FFF , 1722px 896px #FFF , 357px 47px #FFF , 870px 408px #FFF , 772px 1484px #FFF , 15px 953px #FFF , 1365px 1294px #FFF , 823px 51px #FFF , 686px 1219px #FFF , 1198px 131px #FFF , 142px 1873px #FFF , 608px 418px #FFF , 219px 288px #FFF , 767px 1408px #FFF , 1564px 1795px #FFF , 1132px 1083px #FFF , 1241px 980px #FFF , 1344px 1879px #FFF , 683px 660px #FFF;
  animation: animStar 100s linear infinite;
}
#stars2:after {
  content: " ";
  position: absolute;
  top: 2000px;
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow: 1355px 1936px #FFF , 816px 1106px #FFF , 1178px 1648px #FFF , 1050px 1606px #FFF , 1384px 1598px #FFF , 385px 395px #FFF , 1404px 1376px #FFF , 959px 1003px #FFF , 273px 645px #FFF , 213px 973px #FFF , 1981px 1441px #FFF , 240px 637px #FFF , 1910px 693px #FFF , 784px 1240px #FFF , 1979px 1648px #FFF , 961px 678px #FFF , 964px 733px #FFF , 620px 829px #FFF , 1434px 1705px #FFF , 49px 1175px #FFF , 661px 1519px #FFF , 1881px 690px #FFF , 935px 1451px #FFF , 1719px 271px #FFF , 1505px 324px #FFF , 1587px 1930px #FFF , 869px 1530px #FFF , 1410px 1819px #FFF , 1833px 1488px #FFF , 599px 613px #FFF , 1542px 1622px #FFF , 1379px 1240px #FFF , 1455px 1371px #FFF , 55px 1962px #FFF , 1794px 1420px #FFF , 1039px 1472px #FFF , 531px 1632px #FFF , 18px 442px #FFF , 1165px 1780px #FFF , 1962px 1213px #FFF , 529px 1719px #FFF , 254px 1040px #FFF , 1399px 574px #FFF , 818px 171px #FFF , 575px 93px #FFF , 596px 1329px #FFF , 1975px 602px #FFF , 1595px 284px #FFF , 1559px 1313px #FFF , 57px 1758px #FFF , 195px 284px #FFF , 686px 192px #FFF , 915px 257px #FFF , 828px 932px #FFF , 1002px 1898px #FFF , 973px 773px #FFF , 1021px 270px #FFF , 1848px 1141px #FFF , 1665px 702px #FFF , 486px 1215px #FFF , 201px 1168px #FFF , 136px 1920px #FFF , 795px 404px #FFF , 877px 335px #FFF , 1497px 605px #FFF , 1569px 1413px #FFF , 1757px 1780px #FFF , 228px 621px #FFF , 696px 1731px #FFF , 1528px 256px #FFF , 457px 87px #FFF , 1857px 1246px #FFF , 1975px 1152px #FFF , 144px 1002px #FFF , 517px 1294px #FFF , 1473px 404px #FFF , 1791px 348px #FFF , 1630px 726px #FFF , 1328px 25px #FFF , 241px 566px #FFF , 1591px 1688px #FFF , 1198px 185px #FFF , 1836px 375px #FFF , 592px 1632px #FFF , 426px 690px #FFF , 1744px 1177px #FFF , 1145px 355px #FFF , 103px 449px #FFF , 1922px 133px #FFF , 129px 1661px #FFF , 1532px 1820px #FFF , 1448px 695px #FFF , 370px 186px #FFF , 1405px 802px #FFF , 112px 738px #FFF , 402px 29px #FFF , 777px 660px #FFF , 520px 193px #FFF , 1730px 1445px #FFF , 1970px 1281px #FFF , 1972px 1500px #FFF , 248px 1612px #FFF , 1369px 1617px #FFF , 489px 702px #FFF , 36px 1372px #FFF , 404px 1618px #FFF , 1837px 78px #FFF , 948px 1643px #FFF , 1099px 826px #FFF , 1795px 22px #FFF , 1278px 493px #FFF , 1496px 59px #FFF , 152px 987px #FFF , 1599px 1077px #FFF , 1116px 1252px #FFF , 666px 1855px #FFF , 1028px 404px #FFF , 1713px 1134px #FFF , 724px 609px #FFF , 1123px 1350px #FFF , 1928px 1871px #FFF , 547px 1945px #FFF , 1310px 1534px #FFF , 366px 1409px #FFF , 1234px 1354px #FFF , 1386px 1776px #FFF , 1383px 1427px #FFF , 227px 950px #FFF , 1010px 396px #FFF , 1010px 153px #FFF , 1533px 1595px #FFF , 1116px 723px #FFF , 1585px 1248px #FFF , 961px 631px #FFF , 465px 793px #FFF , 1366px 680px #FFF , 749px 652px #FFF , 1325px 1419px #FFF , 157px 1830px #FFF , 345px 1691px #FFF , 1234px 1958px #FFF , 980px 635px #FFF , 492px 1007px #FFF , 752px 1162px #FFF , 976px 1626px #FFF , 1075px 209px #FFF , 1342px 319px #FFF , 113px 1223px #FFF , 373px 985px #FFF , 46px 135px #FFF , 1675px 1976px #FFF , 573px 221px #FFF , 1508px 1422px #FFF , 1513px 786px #FFF , 1735px 1854px #FFF , 1049px 1884px #FFF , 1159px 1796px #FFF , 1878px 150px #FFF , 238px 424px #FFF , 1121px 510px #FFF , 1262px 431px #FFF , 8px 1842px #FFF , 1224px 1185px #FFF , 1757px 1939px #FFF , 1973px 1978px #FFF , 1529px 1000px #FFF , 36px 1883px #FFF , 127px 761px #FFF , 1531px 583px #FFF , 1015px 39px #FFF , 1446px 258px #FFF , 107px 1132px #FFF , 1155px 335px #FFF , 1123px 1680px #FFF , 425px 931px #FFF , 646px 214px #FFF , 1342px 1401px #FFF , 533px 502px #FFF , 825px 365px #FFF , 554px 1852px #FFF , 1594px 1751px #FFF , 1015px 526px #FFF , 1722px 896px #FFF , 357px 47px #FFF , 870px 408px #FFF , 772px 1484px #FFF , 15px 953px #FFF , 1365px 1294px #FFF , 823px 51px #FFF , 686px 1219px #FFF , 1198px 131px #FFF , 142px 1873px #FFF , 608px 418px #FFF , 219px 288px #FFF , 767px 1408px #FFF , 1564px 1795px #FFF , 1132px 1083px #FFF , 1241px 980px #FFF , 1344px 1879px #FFF , 683px 660px #FFF;
}

#stars3 {
  width: 3px;
  height: 3px;
  background: transparent;
  box-shadow: 1674px 396px #FFF , 563px 377px #FFF , 928px 1271px #FFF , 906px 1173px #FFF , 252px 941px #FFF , 364px 1137px #FFF , 1088px 1239px #FFF , 1713px 1px #FFF , 63px 1373px #FFF , 686px 1046px #FFF , 172px 62px #FFF , 356px 1439px #FFF , 554px 69px #FFF , 239px 871px #FFF , 1703px 100px #FFF , 1237px 860px #FFF , 708px 1291px #FFF , 578px 590px #FFF , 1981px 1735px #FFF , 1577px 257px #FFF , 73px 1466px #FFF , 439px 1792px #FFF , 311px 1865px #FFF , 43px 949px #FFF , 1359px 1028px #FFF , 215px 1362px #FFF , 1070px 1229px #FFF , 1380px 1133px #FFF , 1246px 996px #FFF , 1094px 750px #FFF , 609px 561px #FFF , 1171px 502px #FFF , 146px 1985px #FFF , 802px 1972px #FFF , 940px 1102px #FFF , 715px 241px #FFF , 1491px 667px #FFF , 1800px 181px #FFF , 1385px 1587px #FFF , 874px 226px #FFF , 1365px 413px #FFF , 1143px 1563px #FFF , 537px 1442px #FFF , 483px 1055px #FFF , 1610px 864px #FFF , 727px 24px #FFF , 1629px 1838px #FFF , 33px 1358px #FFF , 677px 1674px #FFF , 392px 1702px #FFF , 942px 1974px #FFF , 1482px 844px #FFF , 691px 1313px #FFF , 260px 134px #FFF , 1745px 860px #FFF , 1280px 1796px #FFF , 558px 63px #FFF , 144px 610px #FFF , 1144px 1501px #FFF , 1943px 940px #FFF , 676px 1463px #FFF , 846px 512px #FFF , 269px 50px #FFF , 1062px 1283px #FFF , 392px 1091px #FFF , 120px 279px #FFF , 487px 1188px #FFF , 1019px 322px #FFF , 1548px 13px #FFF , 1164px 1497px #FFF , 308px 591px #FFF , 1129px 1938px #FFF , 632px 244px #FFF , 1602px 1883px #FFF , 1209px 1227px #FFF , 1824px 260px #FFF , 955px 1563px #FFF , 1478px 698px #FFF , 1380px 309px #FFF , 1247px 517px #FFF , 1997px 503px #FFF , 224px 544px #FFF , 251px 1409px #FFF , 2000px 1722px #FFF , 140px 1826px #FFF , 1781px 704px #FFF , 877px 1729px #FFF , 1265px 1651px #FFF , 645px 609px #FFF , 250px 501px #FFF , 1008px 248px #FFF , 268px 328px #FFF , 1339px 727px #FFF , 1831px 1148px #FFF , 493px 1344px #FFF , 1456px 561px #FFF , 539px 570px #FFF , 1073px 537px #FFF , 392px 722px #FFF , 626px 1440px #FFF;
  animation: animStar 150s linear infinite;
}
#stars3:after {
  content: " ";
  position: absolute;
  top: 2000px;
  width: 3px;
  height: 3px;
  background: transparent;
  box-shadow: 1674px 396px #FFF , 563px 377px #FFF , 928px 1271px #FFF , 906px 1173px #FFF , 252px 941px #FFF , 364px 1137px #FFF , 1088px 1239px #FFF , 1713px 1px #FFF , 63px 1373px #FFF , 686px 1046px #FFF , 172px 62px #FFF , 356px 1439px #FFF , 554px 69px #FFF , 239px 871px #FFF , 1703px 100px #FFF , 1237px 860px #FFF , 708px 1291px #FFF , 578px 590px #FFF , 1981px 1735px #FFF , 1577px 257px #FFF , 73px 1466px #FFF , 439px 1792px #FFF , 311px 1865px #FFF , 43px 949px #FFF , 1359px 1028px #FFF , 215px 1362px #FFF , 1070px 1229px #FFF , 1380px 1133px #FFF , 1246px 996px #FFF , 1094px 750px #FFF , 609px 561px #FFF , 1171px 502px #FFF , 146px 1985px #FFF , 802px 1972px #FFF , 940px 1102px #FFF , 715px 241px #FFF , 1491px 667px #FFF , 1800px 181px #FFF , 1385px 1587px #FFF , 874px 226px #FFF , 1365px 413px #FFF , 1143px 1563px #FFF , 537px 1442px #FFF , 483px 1055px #FFF , 1610px 864px #FFF , 727px 24px #FFF , 1629px 1838px #FFF , 33px 1358px #FFF , 677px 1674px #FFF , 392px 1702px #FFF , 942px 1974px #FFF , 1482px 844px #FFF , 691px 1313px #FFF , 260px 134px #FFF , 1745px 860px #FFF , 1280px 1796px #FFF , 558px 63px #FFF , 144px 610px #FFF , 1144px 1501px #FFF , 1943px 940px #FFF , 676px 1463px #FFF , 846px 512px #FFF , 269px 50px #FFF , 1062px 1283px #FFF , 392px 1091px #FFF , 120px 279px #FFF , 487px 1188px #FFF , 1019px 322px #FFF , 1548px 13px #FFF , 1164px 1497px #FFF , 308px 591px #FFF , 1129px 1938px #FFF , 632px 244px #FFF , 1602px 1883px #FFF , 1209px 1227px #FFF , 1824px 260px #FFF , 955px 1563px #FFF , 1478px 698px #FFF , 1380px 309px #FFF , 1247px 517px #FFF , 1997px 503px #FFF , 224px 544px #FFF , 251px 1409px #FFF , 2000px 1722px #FFF , 140px 1826px #FFF , 1781px 704px #FFF , 877px 1729px #FFF , 1265px 1651px #FFF , 645px 609px #FFF , 250px 501px #FFF , 1008px 248px #FFF , 268px 328px #FFF , 1339px 727px #FFF , 1831px 1148px #FFF , 493px 1344px #FFF , 1456px 561px #FFF , 539px 570px #FFF , 1073px 537px #FFF , 392px 722px #FFF , 626px 1440px #FFF;
}

#horizon {
  position: absolute;
  width: 160%;
  height: 70%;
  border-radius: 100%/100%;
  background: #038bff;
  -webkit-filter: blur(30px);
  left: 50%;
  bottom: -20%;
  margin-left: -80%;
}
#horizon:before {
  content: " ";
  position: absolute;
  width: 81.25%;
  height: 70%;
  border-radius: 100%/100%;
  background: #51AFFF;
  -webkit-filter: blur(30px);
  opacity: 0.6;
  margin-left: 9.375%;
}
#horizon:after {
  content: " ";
  position: absolute;
  width: 32%;
  height: 20%;
  border-radius: 650px/350px;
  background: #B0DAFF;
  -webkit-filter: blur(30px);
  opacity: 0.5;
  margin-left: 34%;
}
#horizon .glow {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 100%/100%;
  background: #215496;
  -webkit-filter: blur(200px);
  opacity: 0.7;
  top: -10%;
}

#earth {
  position: absolute;
  width: 200%;
  height: 100%;
  background: black;
  border-radius: 100%;
  left: 50%;
  bottom: -50%;
  margin-left: -100%;
}
#earth:before {
  content: " ";
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  box-shadow: inset 0px 0px 62px 20px rgba(60, 105, 138, 0.85);
}
#title {
  position: absolute;
  font-weight: 300;
  top: 15%;
  left: 0;
  right: 0;
  margin-top: -60px;
  font-size: 100px;
  text-align: center;
  letter-spacing: 20px;
  padding-left: 20px;
  background: -webkit-linear-gradient(white, #dbdde0, #38495a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation-duration: 6s;
  animation-iteration-count: 1;
  animation-timing-function: ease;
  animation-name: animGravity;
}

#subtitle {
  position: absolute;
  font-weight: 300;
  top: 70%;
  left: 0;
  right: 0;
  font-size: 25px;
  text-align: center;
  letter-spacing: 6px;
}
#subtitle span {
  color: #d8d8d8;
  animation-duration: 6s;
  animation-iteration-count: infinite;
  animation-timing-function: ease;
}
#subtitle span:nth-child(1) {
  animation-name: animDont;
}
#subtitle span:nth-child(2) {
  animation-name: animLet;
}
#subtitle span:nth-child(3) {
  animation-name: animGo;
}

@keyframes animStar {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-2000px);
  }
}
@keyframes animGravity {
  0% {
    transform: translateY(-26px);
    opacity: 0;
  }
  30%, 80% {
    letter-spacing: 40px;
    padding-left: 40px;
    transform: translateY(0px);
    opacity: 1;
  }
  92%, 100% {
    letter-spacing: 35px;
    padding-left: 35px;
    transform: translateY(-4px);
    opacity: 0;
  }
}
@keyframes animDont {
  0%	, 15% {
    transform: translateY(-26px);
    opacity: 0;
  }
  35%, 80% {
    transform: translateY(0px);
    opacity: 1;
  }
  92%, 100% {
    transform: translateY(-4px);
    opacity: 0;
  }
}
@keyframes animLet {
  0%	, 25% {
    transform: translateY(-26px);
    opacity: 0;
  }
  45%, 80% {
    transform: translateY(0px);
    opacity: 1;
  }
  92%, 100% {
    transform: translateY(-4px);
    opacity: 0;
  }
}
@keyframes animGo {
  0%	, 35% {
    transform: translateY(-26px);
    opacity: 0;
  }
  55%, 80% {
    transform: translateY(0px);
    opacity: 1;
  }
  92%, 100% {
    transform: translateY(-4px);
    opacity: 0;
  }
}
</style>
