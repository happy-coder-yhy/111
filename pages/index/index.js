// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'


import {createStoreBindings} from 'mobx-miniprogram-bindings'
import {store} from '../../store/store'

Page({
  data: {
    pnum: '18888888888',
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
    option: "请选择路段",
    count: 0,
    uname: "",
    psw: "",
  },
  hhh(e) {
    console.log(e.target)
  },
  choose(e) {
    this.setData({
      option: e.target.dataset.route
    })
  },
  assure() {
    this.setData({
      count: this.data.count + 1
    })
  },
  cancel(e) {
    if(this.data.count == 0) {
      alert('已没有行程')
    }
    else{
      this.setData({
        count: this.data.count - e.target.dataset.info
      })
    }
    // console.log(e.target.dataset.info)
  },
  clear() {
    this.setData({
      count: 0
    })
  },
  inputUname(e) {
    this.setData({
      uname: e.detail.value
    })
    console.log(this.data)
  },
  inputPsw(e) {
    this.setData({
      psw: e.detail.value
    })
    console.log(e)
  },
  reset() {
    this.setData({
      uname: "",
      psw: ""
    })
  },
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    const { nickName } = this.data.userInfo
    this.setData({
      "userInfo.avatarUrl": avatarUrl,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  onInputChange(e) {
    const nickName = e.detail.value
    const { avatarUrl } = this.data.userInfo
    this.setData({
      "userInfo.nickName": nickName,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  onLoad() {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['num'],
      actions: ['updateNum', 'getIsLogin']
    })
    wx.getStorage({
      key: 'plan',
      success: (res) => {
        this.updateNum(JSON.parse(res.data).length)
        // console.log(this.data.plan)
      }
    })
  },
  onUnload() {
    this.storeBindings.destroyStoreBindings()
  },
  onShow() {
    if(this.getIsLogin() == false) {
      this.updateNum(0)
    }

  }
})
