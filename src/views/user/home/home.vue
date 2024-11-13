<template>
  <div class="personal-center-page">
    <div class="personal-center-page-container " id="user-home">
      <a-row
        style="width: 95%"
        class="user-home-header glass-morphism  user-home-section"
        type="flex"
        justify="space-between">
        <a-col :span="18" class="col">
          <a-row class="user-info" type="flex" justify="start" :gutter="32">
            <a-col :span="4" class="avatar">
              <div class="avatar-box">
                <img :src="RenderAvatar(userInfo.avatar)" alt="">
                <img src="http://blockchain.maplesky.cn/StaticResource/PersonalCenter/avatar-bg.png" alt="">
              </div>
              <a-space>
                <a-button type="primary" @click="openUserEditForm">{{ hasUplink ? '编辑信息' : '生成虚拟身份' }}
                </a-button>
                <!--                <span class="edit-btn" @click="openUserEditForm">{{ hasUplink ? '编辑信息' : '生成虚拟身份' }}</span>-->
              </a-space>
            </a-col>
            <a-col :span="16" class="user-profile">
              <div class="username">
                <a-space>
                  <svg-icon color="#" icon="star-1" height="30" width="30"></svg-icon>
                  <span class="name">{{ userInfo.name }}</span>
                  <a-tooltip title="生成虚拟身份以开始在元宇宙世界的探索叭~" v-if="!hasUplink">
                    <a-tag color="pink">游客</a-tag>
                  </a-tooltip>
                  <a-tag v-else color="cyan" style="cursor: pointer" @click="openMyCertificate">
                    元宇宙居民
                  </a-tag>
                  <a-tooltip v-if="!hasIdentified" title="点击完成实名认证以开启更加丰富的平台体验">
                    <a-tag color="pink" style="cursor: pointer" @click="()=>{this.openIdentifyForm=true}">未认证</a-tag>
                  </a-tooltip>
                  <a-tag v-else color="blue">
                    已认证
                  </a-tag>
                </a-space>
              </div>
              <!--              <div class="brief">-->
              <!--                -->
              <!--              </div>-->
              <!--              <div class="privacy">-->
              <!--                <div class="gender">{{ userInfo.gender === 1 ? '男' : '女' }}</div>-->
              <!--                <div class="birth">{{ userInfo.birth }}</div>-->
              <!--              </div>-->
              <div class="contact">
                <div>简介：{{ userInfo.brief }}</div>
                <div>电话:{{ userInfo.mobile }}</div>
                <div>邮箱:{{ userInfo.email }}</div>
              </div>
              <div class="chain">
                <div class="block-chain" v-if="!!userPublicAdd">
                  <hash-plate :hash="userPublicAdd" color="gold"></hash-plate>
                </div>
                <div class="block-chain" v-else>

                </div>
              </div>

              <div class="zhengshu" style="width: 0;height: 0;overflow: hidden">
                <user2pic type="user" btn="下载虚拟身份证书" ref="certificate"></user2pic>
              </div>

              <a-tooltip title="点击查看我的个人认证">
                <!--                <img src="../../../assets/GIF/people.gif" class="animate-people" @click="openMyCertificate">-->
                <img
                  src="http://blockchain.maplesky.cn/StaticResource/GIF/people.gif"
                  class="animate-people"
                  @click="openMyCertificate">
              </a-tooltip>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="6"></a-col>
        <a-dropdown>
          <div class="drop-menu-trigger">
            <svg-icon icon="logout" color="#efefef" size='20'></svg-icon>
          </div>
          <a-menu slot="overlay" class="drop-menu">
            <a-menu-item @click="userLogout">
              <svg-icon icon="logout" color="#222222"></svg-icon>
              退出登录
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </a-row>

      <!--      <img src="../../../assets/user/level-2.png" alt="" style="height: 100px;width: 100px">-->
      <!--      <img src="../../../assets/user/level-3.png" alt="" style="height: 100px;width: 100px">-->
      <!--      <img src="../../../assets/user/level-4.png" alt="" style="height: 100px;width: 100px">-->

      <a-row style="width: 95%" type="flex" class="user-home-section" justify="space-between">
        <a-col :span="14">
          <div class="app-card glass-morphism">
            <span>
              我的荣誉勋章
            </span>
            <a-row type="flex" :gutter="32">
              <a-col flex="200px">
                <img src="http://blockchain.maplesky.cn/StaticResource/Guide/level-1.png" alt=""
                     style="height: 200px;width: 200px">
                <a-progress
                  :percent="67"
                  size="small"
                  width="100"
                  :stroke-color="{ 'from': '#108ee9','to': '#87d068'}"
                  style="color: #eeeeee"
                  status="active" />
                <span>当前成长值:124</span>
              </a-col>
              <a-col flex="1">
                <div class="app-card__subtitle">
                  <img src="http://blockchain.maplesky.cn/StaticResource/PersonalCenter/lace.png" alt="">
                  <span>我的权益</span>
                </div>
                <div class="app-card__subtext flex-row-space-between">
                  <a-list :grid="{ gutter: 32, column: 2 }" :data-source="rights">
                    <a-list-item slot="renderItem" slot-scope="item, index">
                      <div class="right flex-row-space-between" :key="index">
                        <div class="content">
                          <div class="sub-title"><svg-icon :icon="item.icon" size='50'></svg-icon>{{ item.title }}</div>
                          <div class="sub-text">{{ item.text }}</div>
                        </div>
                      </div>
                    </a-list-item>
                  </a-list>
                </div>
<!--                <span>-->
<!--                  更多权益等你来探索~-->
<!--                </span>-->
<!--                <div class="app-card-buttons">-->
<!--                  <button class="content-button status-button">Update</button>-->
<!--                  <div class="menu"></div>-->
<!--                </div>-->
              </a-col>
            </a-row>
          </div>
        </a-col>
        <a-col :span="10">
          <div class="glass-morphism app-card" style="height: 400px">
            <span>
              我的成长维度
            </span>
            <radar estyle="height:300px"></radar>
          </div>
        </a-col>
      </a-row>

      <div class="title">我的展品</div>
      <div class="user-exhibate">
        <art-window width="100%" height="200px"></art-window>
      </div>
      <!--实名认证表单-->




      <!---->
      <a-drawer
        title="编辑用户信息"
        :width="720"
        :visible="userEidtVisiable"
        :body-style="{ paddingBottom: '80px' }"
        @close="()=>{this.userEidtVisiable=false}"
      >
        <UserEditForm
          :profile="sentDefaultVal()"
          @submit="userEdtSubmit"
          @generate="userGenerate"
        ></UserEditForm>
      </a-drawer>
      <!-- 用户实名认证-->
      <XyzTransition>
        <div class="modal-overlay" v-if="openIdentifyForm" xyz="fade short-100% delay-3 ease-out-back">
          <UserIdentify
            @cancel="()=>{this.openIdentifyForm=false}"
            @success="()=>{this.openIdentifyForm=false;this.hasIdentified=true}"
          >
          </UserIdentify>
        </div>
      </XyzTransition>
    </div>
  </div>
</template>

<script>
import HashPlate from '@/views/components/HashPlate'
import UserEditForm from '@/views/user/components/userEditForm'
import { EditUserInfo, UserToBlockChain } from '@/api/modules/user'
import cloneDeep from 'lodash.clonedeep'
import { RenderPicture } from '@/api/modules/file'
import UserIdentify from '@/views/user/components/UserIdentify'
import Loading from '@/views/components/Loading/Loading'
import ArtWindow from '@/views/user/components/ArtWindow'
import PageHeader from '@/views/components/PageHeader/PageHeader'
// import user2Pic from '@/views/components/html2pic/user2Pic'
import radar from '@/views/components/AntVCharts/Radar'
import User2pic from '@/views/components/html2pic/user2Pic'
import Html2pic from '@/views/components/html2pic/html2pic'

export default {
  name: 'UserHome',
  components: { radar, Html2pic, User2pic, ArtWindow, UserEditForm, UserIdentify, Loading, PageHeader, HashPlate },
  data () {
    return {
      rights: [
        {
          title: '权益认证',
          text: '您的合法权益经过本平台认证',
          icon: 'level1-confirm'
        },
        {
          title: '专属活动',
          text: '参与平台推出各项活动获取超多福利',
          icon: 'level1-fuli'
        },
        {
          title: '新人保护',
          text: '新用户特殊平台保护福利、为维权保驾护航',
          icon: 'level1-protect'
        },
        {
          title: '财富提现',
          text: '虚拟货币提现，用艺术创造美、创造价值',
          icon: 'level1-transfer'
        }
      ],
      openIdentifyForm: false,
      emptyPicPath: require('@/assets/user/empty.svg'),
      userEidtVisiable: false,
      userInfo: {},
      userPublicAdd: '',
      hasUplink: false,
      hasIdentified: false,
      exhibations: [],
      isWinLoading: true
    }
  },
  methods: {
    async handleLogout () {
      await this.$store.dispatch('Logout')
      this.$router.push({ name: 'Guide' })
    },
    async getLatestUserInfo () {
      await this.$store.dispatch('GetInfo')
      const res = this.$store.getters.userInfo
      this.userPublicAdd = res.publicAdd
      return res
    },
    RenderAvatar (fileId) {
      return RenderPicture(fileId)
    },
    sentDefaultVal () {
      return cloneDeep(this.userInfo)
    },
    openUserEditForm () {
      this.userEidtVisiable = true
    },
    openMyCertificate () {
      this.$refs['certificate'].showModal()
    },
    // 监听子组件的用户编辑事件
    async userEdtSubmit (profile) {
      profile.photoFileId = profile.avatar
      const res = await EditUserInfo(profile)
      if (res.ok) {
        // TODO 这里需要加上信息提示
        this.$message.info(res.msg)
        this.userInfo = await this.getLatestUserInfo()
        //  顶部导航栏的信息貌似没有动态加载更新，加一道保险杠
        this.$EventBus.$emit('userInfoUpdate', '')
      } else {
        this.$message.error(res.msg)
      }
      setTimeout(() => {
        this.userEidtVisiable = false
      }, 300)
    },
    // 监听用户第一次生成账户的事件
    async userGenerate (profile) {
      profile.photoFileId = profile.avatar
      const res = await EditUserInfo(profile)
      if (res.ok) {
        this.userInfo = await this.getLatestUserInfo()
        this.$EventBus.$emit('userInfoUpdate', '')
        const generate = await UserToBlockChain()
        console.log('用户上链结果!!', generate)
        generate.ok ? await this.generateOk() : this.$store.commit('SET_HASUPLINK', false)
      }
    },
    // 用户生成账户成功后我要做这些事情
    async generateOk () {
      this.$store.commit('SET_HASUPLINK', true)
      this.hasUplink = true
      this.userInfo = await this.getLatestUserInfo()
      this.$message.info('已生成您的虚拟账号')
      this.userEidtVisiable = false
    },
    async userLogout () {
      await this.$store.dispatch('Logout')
      this.$router.push({ name: 'Guide' })
    }
  },
  async mounted () {
    // 进入此页面拿去用户的信息
    this.userInfo = await this.getLatestUserInfo()
    this.hasUplink = this.$store.getters.hasUpLink
    this.hasIdentified = this.$store.getters.hasIdentified
    console.log(this.hasIdentified)
    console.log('我拿到的用户的信息', this.userInfo)
    // console.log(typeof this.emptyPicPath)
  }
}
</script>

<style lang='less' scoped>
#user-home {
  min-height: 100%;
  width: 100%;
  position: relative;
  padding: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;

  .user-home-header {
    height: 30vh;
    display: flex;
    align-items: center;
    position: relative;

    .user-info {
      position: relative;
      width: 95%;
      margin: 0 auto;
      //background-image: url('../../../assets/images/user/cubes.png'), linear-gradient(to right bottom, #ad6bd1dd, #a673d7dd, #9e7adcdd, #9681e0dd, #8f87e4dd, #888ee8dd, #8194ebdd, #7b9aeedd, #73a2f3dd, #6ba9f6dd, #64b0f9dd, #5fb7fbdd);
      height: 100%;
      border-radius: 10px;
      padding: 1em 2em;

      .avatar {
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

        .avatar-box {
          height: 80px;
          width: 80px;
          position: relative;
          margin-top: 10px;
          margin-bottom: 35px;

          img:nth-child(1) {
            width: 80px;
            height: 80px;
            top: 0;
            right: 0;
          }

          img:nth-child(2) {
            width: 120px;
            height: 120px;
            top: -20px;
            right: -20px;
            opacity: 0.8;
          }

          img {
            position: absolute;
            border-radius: 50%;
          }
        }
      }

      .user-profile {
        .username {
          display: flex;
          align-items: center;
          font-size: 1.5em;
          letter-spacing: 1px;

          .name {
            color: #97d5d4;
          }
        }

        .avatar > img {
          width: 75px;
          height: 75px;
        }

        .edit-btn {
          font-family: "WenQuanYi Micro Hei";
          margin-top: 1em;
          display: inline-block;
          letter-spacing: 1px;
          text-align: center;
          padding: 0.25em 1em;
          border-radius: 1em;
          cursor: pointer;
          background-color: #0576f8;
        }

      }

      .animate-people {
        cursor: pointer;
        right: -375px;
        top: 80%;
        transform: translateY(-220px);
        position: absolute;
        height: 400px;
        width: 400px;
      }
    }

    .drop-menu-trigger {
      cursor: pointer;
      position: absolute;
      font-size: 1.5em;
      left: 5px;
      top: 3px;
      transform: rotateY(180deg);
    }
  }

  .user-home-section {
    width: 1400px;
    margin: 20px auto;
  }

  .title {
    width: 100%;
    text-align: left;
    margin: 1em 4em 1em 8em;
    color: #999999;
  }

  .contact {
    font-size: 14px;
    margin: 5px;
    color: #a5c3d9;
    line-height: 2em;
    font-weight: 500;
  }

  .chain {
    //position: absolute;
    //bottom: 5px;
    //left: 120px;
  }

  .brief {
    //font-size: 12px;
    color: #eeeeee;
  }

  .user-exhibate {
    min-height: 40vw;
    width: 95%;
    margin: 0 auto;
    border-radius: 10px;
    overflow: hidden;
    //padding: 1em 2em;
  }


  .app-card {
    display: flex;
    flex-direction: column;
    width: calc(100% - 20px);
    height: 100%;
    font-size: 16px;
    padding: 20px;
    //cursor: pointer;
    transition: 0.3s ease;
    //&:hover {
    //  transform: scale(1.02);
    //
    //}
    svg {
      width: 28px;
      border-radius: 6px;
      margin-right: 12px;
      flex-shrink: 0;
    }

    & + .app-card {
      margin-left: 20px;
    }

    span {
      display: flex;
      align-items: center;
    }

    &__subtitle {
      display: flex;
      justify-content: center;
      position: relative;
      font-size: 24px;

      & > img {
        position: absolute;
        top: -24px;
        width: 180px;
      }
    }

    &__subtext {
      font-size: 14px;
      font-weight: 400;
      line-height: 1.6em;
      margin-top: 20px;
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 20px;

      .right {
        margin: 20px 0;
        .icon {
          width: 20%;
          font-size: 50px;
        }

        .content {
          width: 80%;
          color: #b6bebe;
          .sub-title{
            position: relative;
            float: left;
            width: 100%;
            display: flex;
            margin-bottom: 10px;
            height: 20px;
            font-size: 18px;
            font-weight: bold;
            padding-left: 30px;
            .svg-icon{
              position: absolute;
              left: 0;
              top: -10px;
            }
          }
          .sub-text{
            width: 100%;
            font-size: 14px;
            &::first-letter{
              margin-left: 14px;
            }
          }
        }
      }


    }

    &-buttons {
      display: flex;
      align-items: center;
      margin-left: auto;
      margin-top: 16px;
    }
  }

  //  .empty {
  //    width: 100%;
  //    display: flex;
  //    flex-direction: column;
  //    align-items: center;
  //
  //    & > img {
  //      height: 30vh;
  //      width: 30vh;
  //    }
  //
  //    .notice {
  //      color: #999999;
  //      margin-bottom: 1em;
  //    }
  //  }
  //}

  .modal-overlay {
    background-color: #fff;
    height: 80vh;
    width: 600px;
    position: fixed;
    z-index: 99;
    left: 50%;
    transform: translateX(-50%);
    top: 30%;
    top: 0;
  }
}

.tree-bar {
  overflow: auto;
  margin-top: 5px;
}

.tree-bar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.tree-bar::-webkit-scrollbar-thumb {
  border-radius: 4px;
  -webkit-box-shadow: inset 0 0 2px #d1d1d1;
  background: #e4e4e4;
}

.expand {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .icon {
    cursor: pointer;
  }

  :hover {
    color: #1890ff !important;
  }
}
</style>
