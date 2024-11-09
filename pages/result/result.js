// pages/inputCity/inputCity.js
import {createStoreBindings} from 'mobx-miniprogram-bindings'
import {store} from '../../store/store'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFromPlan: false,
    dateAndtime: '',
    d: '',
    date: '',
    time: '',
    period: '拥堵时段',
    distance: '',
    smoothTime: 0,
    resultFontSize: '0px',
    processingTime: 0,
    processingDistance: 0
  },

  distanceInput(e) {
    this.setData({
      distance: e.detail.value
    })
    if(this.data.distance <= 65 && this.data.distance > 5) {
      this.setData({
        processingDistance: (this.data.distance - 5) / 60 * 0.3
      })
    }
    else if(this.data.distance < 125 && this.data.distance > 65) {
      this.setData({
        processingDistance: (125 - this.data.distance) / 60 * 0.3
      })
    }
    console.log(this.data.processingDistance)
  },

  smoothTimeInput(e) {
    this.setData({
      smoothTime: e.detail.value
    })
  },

  predict() {
    if(this.data.distance > 0 && this.data.smoothTime > 0) {
      this.setData({
        resultFontSize: '20px'
      })
    }
    else {
      wx.showToast({
        title: '输入有误',
        icon: 'error',
        duration: 2000
      })
    }
  },

  backToList() {
    wx.navigateBack({
      delta: 2
    }) 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const dateAndtime = options.date.split(' ')
    console.log(options.isFromPlan)
    if(Object.keys(options).length > 0) {
      this.setData({
        isFromPlan: options.isFromPlan,
        dateAndtime: dateAndtime,
        date: dateAndtime[0],
        time: dateAndtime[1]
      })
    
      let d = this.data.date.split('/')
      d.splice(0, 1)
      for(let i = 0; i < 2; i++) {
        if(parseInt(d[i]) < 10) {
          d[i] = '0' + d[i]
        }
      }
      
      // d.splice(2, 1, '-')
      // if(d[d.l])
      d = d.join('-')
      this.setData({
        d: d
      })
      const dat = new Date(this.data.dateAndtime)
      const morningPeak1 = new Date(`${this.data.date} 06:30:00`)
      const morningPeak = new Date(`${this.data.date} 07:30:00`)
      const morningPeak2 = new Date(`${this.data.date} 08:30:00`)
      const nightPeak1 = new Date(`${this.data.date} 17:30:00`)
      const nightPeak = new Date(`${this.data.date} 18:30:00`)
      const nightPeak2 = new Date(`${this.data.date} 19:30:00`)
      // console.log(dat.getTime(), morningPeak1.getTime())
      if(dat.getTime() >= morningPeak1.getTime() && dat.getTime() <= morningPeak2.getTime()) {
        this.setData({
          period: '早高峰'
        })
        if(dat.getTime() <= morningPeak.getTime()) {
          this.setData({
            processingTime: (dat.getTime() - morningPeak1.getTime()) / 3600000 * 0.3
          })
        }
        else {
          this.setData({
            processingTime: (morningPeak2.getTime() - dat.getTime()) / 3600000 * 0.3
          })
        }
        console.log(this.data.processingTime)
      }
      else if(dat.getTime() >= nightPeak1.getTime() && dat.getTime() <= nightPeak2.getTime()) {
        this.setData({
          period: '晚高峰'
        })
        if(dat.getTime() <= nightPeak.getTime()) {
          this.setData({
            processingTime: (dat.getTime() - nightPeak1.getTime()) / 3600000 * 0.3
          })
        }
        else {
          this.setData({
            processingTime: (nightPeak2.getTime() - dat.getTime() ) / 3600000 * 0.3
          })
        }
        console.log(this.data.processingTime)
      }
      // if(dat.getTime() >= '06:30:00' && time <= '08:30:00' || time >= '')
      // if((d.getDay() + 1) >= 1 && (d.getDay() + 1) <= 5) {

      // }
    }
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['predictResult', 'error', 'City']
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
    // this.storeBindings.destroyStoreBindings()
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