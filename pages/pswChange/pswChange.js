// pages/pswChange/pswChange.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    psw: '',
    newPsw: '',
    isOldPswRight: false,
    opacity1: 0,
    isNewPswLegal: false,
    opacity2: 0,
    users: []
  },

  oldPswInput(e) {
    this.setData({
      psw: e.detail.value
    })
  },

  checkNewPsw(e) {
    this.setData({
      newPsw: e.detail.value
    })
  },

  nextStep() {
    // console.log(this.data.psw)
    // console.log(this.data.users[0].psw)
    if(this.data.psw === this.data.users[0].psw) {
      this.setData({
        isOldPswRight: true,
        opacity1: 1
      })
    }
    else {
      wx.showModal({
        title: '提示',
        content: '旧密码错误',
        showCancel: false,
        complete: (res) => {
          if (res.confirm) {
            
          }
        }
      })
    }
  },

  nextStep1() {
    const psw = this.data.psw
    const regNewPsw = /^([A-Za-z0-9]){6,12}$/
    if(regNewPsw.test(psw) && /[A-Za-z]/.test(psw) && /\d/.test(psw)) {
      this.setData({
        isNewPswLegal: true,
        opacity2: 1
      })
    }
    else {
      wx.showModal({
        content: '密码不合法',
        showCancel: false,
        complete: (res) => {
          if (res.confirm) {
            
          }
        }
      })
    }
  },

  assure() {
    if(this.data.psw === this.data.newPsw) {
      this.setData({
        "users[0].psw": this.data.psw
      })
      wx.setStorage({
        key: 'users',
        data: JSON.stringify(this.data.users)
      })
      wx.showModal({
        content: '密码修改成功',
        showCancel: false,
        complete: (res) => {
          if(res.confirm) {
            wx.switchTab({
              url: '/pages/my/my',
            })
          }
        }
      })
    }
    else {
      wx.showToast({
        title: '密码不一致',
        icon: 'error',
        duration: 2000
      })
    }
  },

  cancel() {
    wx.switchTab({
      url: '/pages/my/my',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.getStorage({
      key: 'users',
      success: (res) => {
        this.setData({
          users: JSON.parse(res.data),
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