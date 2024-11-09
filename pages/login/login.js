// pages/home/home.js
const defaultAvatarUrl = '/image/user.png'

import { set } from 'mobx-miniprogram'
import {createStoreBindings} from 'mobx-miniprogram-bindings'
import {store} from '../../store/store'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
      psw: ''
    },
    users: [],
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname')
  },
  // getLocalStorage() {
  //   wx.getStorage({
  //     key: 'users',
  //     success: (res) => {
  //       this.setData({
  //         users: JSON.parse(res.data) 
  //       })
  //       console.log(this.data.users)
  //     }
  //   })
  // },
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
  onInputChange1(e) {
    const n = e.detail.value
    const { avatarUrl } = this.data.userInfo
    this.setData({
      "userInfo.nickName": n
    })
    console.log(this.data.userInfo)
  },
  onInputChange2(e) {
    const { avatarUrl } = this.data.userInfo
    this.setData({
      "userInfo.psw": e.detail.value,
      hasUserInfo: true,
    })
    // console.log(this.data.hasUserInfo)
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
    console.log(e)
  },
  login() {
    console.log(this.data.users)
    const temp = this.data.users.filter(item => item.nickName === this.data.userInfo.nickName)
    // console.log(temp[0].psw)
    if(this.data.userInfo.nickName === '') {
      wx.showToast({
        title: '请输入昵称',
        icon: 'error'
      })
    }
    else if(temp.length === 0) {
      wx.showToast({
        title: '该账号尚未注册',
        icon: 'error'
      })
    }
    else {
      if(this.data.userInfo.psw == temp[0].psw) {
        this.updateLogin()
        wx.switchTab({
          url: '/pages/index/index',
        })
      }
      else {
        wx.showToast({
          title: '密码错误',
          icon: 'error'
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.getStorage({
      key: 'users',
      success: (res) => {
        this.setData({
          users: JSON.parse(res.data) 
        })
        console.log(this.data.users)
      }
    })
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['isLogin'],
      actions: ['updateLogin']
    })
    wx.hideHomeButton();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    this.storeBindings.destroyStoreBindings()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})