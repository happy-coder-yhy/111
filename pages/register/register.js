// pages/register/register.js
const defaultAvatarUrl = '/image/user.png'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
      psw: '',
      pswCheck: '',
    },
    users: [],
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname')
  },
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    this.setData({
      "userInfo.avatarUrl": avatarUrl,
    })
  },
  onInputChange(e) {
    const nickName = e.detail.value
    this.setData({
      "userInfo.nickName": nickName,
    })
    // console.log(this.data.userInfo)
  },
  onInputChange2(e) {
    this.setData({
      "userInfo.psw": e.detail.value,
    })
    // console.log(this.data.hasUserInfo)
  },
  onInputChange3(e) {
    this.setData({
      "userInfo.pswCheck": e.detail.value,
    })
    // console.log(this.data.hasUserInfo)
  },
  register() {
    const avatarUrl = this.data.userInfo.avatarUrl
    const nickName = this.data.userInfo.nickName
    const psw = this.data.userInfo.psw
    const pswCheck = this.data.userInfo.pswCheck
    const regPsw = /^([A-Za-z0-9]){6,12}$/
    const newUser = {avatarUrl: avatarUrl, nickName: nickName, psw: psw}
    if(nickName === '') {
      wx.showToast({
        title: '请设置昵称',
        icon: 'error'
      })
    }
    else if(!regPsw.test(psw) || !/[A-Za-z]/.test(psw) || !/\d/.test(psw)) {
      wx.showToast({
        title: '密码不合法',
        icon: 'error'
      })
    }
    else if(psw != pswCheck) {
      wx.showToast({
        title: '密码不一致',
        icon: 'error'
      })
    }
    else {
      this.setData({
        users: [...this.data.users, newUser]
      })
      wx.setStorage({
        key: 'users',
        data: JSON.stringify(this.data.users) 
      }) 
      wx.showModal({
        content: '注册成功',
        showCancel: false,
        complete: (res) => {
          if(res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        }
      })
    }
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
    wx.getStorage({
      key: 'users',
      success: (res) => {
        this.setData({
          users: JSON.parse(res.data) 
        })
        // console.log(this.data.users)
        if(this.data.users.length != 0) {
          wx.showModal({
            title: '提示',
            content: '本机已注册账号',
            cancelText: '注销账号',
            complete: (res) => {
              if (res.cancel) {
                wx.showModal({
                  content: '确定要注销账号吗',
                  complete: (res) => {
                    if (res.confirm) {
                      this.data.users.splice(0, 1)
                      this.setData({
                        users: this.data.users
                      })
                      wx.setStorage({
                        key: 'users',
                        data: JSON.stringify(this.data.users) 
                      })
                    }
                    if(res.cancel) {
                      wx.navigateTo({
                        url: '/pages/login/login',
                      })
                    }
                  }
                })
              }
          
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/login/login',
                })
              }
            }
          })
          
        }
      }
    })
   
  

    
    // console.log(this.data.users)
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