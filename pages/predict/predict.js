// pages/predict/predict.js
import {createStoreBindings} from 'mobx-miniprogram-bindings'
import {store} from '../../store/store'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: '',
    date: '',
    result: null,
    isCityExist: false,
    isFromPlan: false,
    error: ''
  },

  bindCityInput: function(e) {
    this.setData({ city: e.detail.value });
  },

  getPredictData: function() {
    const that = this;
    wx.request({
      // 43.143.210.200
      // http://127.0.0.1:5000/predict
      url: 'https://www.trafficforecast.online/predict',
      data: { city: that.data.city },
      method: 'GET',
      success: function(res) {
        // console.log('success')
        if(res.statusCode === 200) {
          that.setData({ result: res.data })
          that.setResult(that.data.result)
          wx.showLoading({
            title: '数据加载中',
          })
          setTimeout(function() {
            wx.hideLoading()
            const isFromPlan = that.data.isFromPlan
            const date = that.data.date
            const city = that.data.city
            wx.navigateTo({
              url: `/pages/result/result?isFromPlan=${isFromPlan}&date=${date}`,
            })
          }, 1000)
        }
        else {
          that.setData({
            error: res.data.error
          })
          wx.showModal({
            title: '错误提示',
            content: that.data.error,
            showCancel: false,
            complete: (res) => {
              if (res.confirm) {
                
              }
            }
          })
        }
      },
      fail: function() {
        console.error("request fail")
      }
    });
    that.setCity(that.data.city)
    that.setData({
      city: ''
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(this.data.isFromPlan)
    if(Object.keys(options).length > 0) {
      const City = options.city.split('')
      let c = ''
      for(let i = 0; i < City.length - 1; i++) {
        c += City[i]
      }
      this.setData({
        isFromPlan: true,
        date: options.date,
        city: c
      })
    }
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['predictResult', 'City'],
      actions: ['setResult', 'setCity']
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