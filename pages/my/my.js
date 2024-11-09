// pages/my/my.js
const defaultAvatarUrl = '/image/user.png'
import {createStoreBindings} from 'mobx-miniprogram-bindings'
import {store} from '../../store/store'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultAvatarUrl: '/image/user.png',
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
      pn: ''
    },
    users: []
  },

  gotoLogin() {
    wx.showLoading({
      title: '加载中'
    })
    setTimeout(function() {
      wx.hideLoading()
      wx.navigateTo({
        url: '/pages/innerLogin/innerLogin',
      })
    }, 1000)
  },

  exit() {
    wx.showModal({
      content: '确定要退出登录吗',
      complete: (res) => {
        if (res.cancel) {
          
        }
        if (res.confirm) {
          wx.showToast({
            title: '已退出',
          })
          this.exitLogin()
          this.updateNum(0);
        }
      }
    })
  },

  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    this.setData({
      "userInfo.avatarUrl": avatarUrl,
      "users[0].avatarUrl": avatarUrl
    })
    wx.setStorage({
      key: 'users',
      data: JSON.stringify(this.data.users)
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
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log('123')
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['num', 'isLogin'],
      actions: ['exitLogin', 'getIsLogin', 'updateNum']
    })
    wx.getStorage({
      key: 'users',
      success: (res) => {
        this.setData({
          users: JSON.parse(res.data),
          "userInfo.avatarUrl": JSON.parse(res.data)[0].avatarUrl,
          "userInfo.nickName": JSON.parse(res.data)[0].nickName,
          "userInfo.pn": JSON.parse(res.data)[0].pn,
        })
      }
    })
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
    if(this.getIsLogin() == false) {
      this.updateNum(0)
    }
    // else this.getLocalStorage()
    else {
      wx.getStorage({
        key: 'plan',
        success: (res) => {
          this.setData({
            num: JSON.parse(res.data).length
          })
          this.updateNum(this.data.num)
          // console.log(this.data.plan)
        }
      })
    }
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