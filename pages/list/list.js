// pages/list/list.js
import {createStoreBindings} from 'mobx-miniprogram-bindings'
import {store} from '../../store/store'

const dd = new Date()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLoading: false,
    num: 0,
    date: '',
    temp: -1,
    dateList: [],
    time: '',
    dest: '',
    departure: '',
    region: ['北京市', '北京市', '东城区'],
    customItem: '全部',
    plan: [
    //   {time: '2024-9-3 8:00', departure: '中国民航大学', dest: '滨海国际机场', city: ''},
    //   {time: '2024-9-3 17:00', departure: '滨海国际机场', dest: '中国民航大学', city: ''}
    ]
  },
  bindDateChange(e) {
    const dl = this.data.dateList
    this.setData({
      temp: e.detail.value,
      date: this.data.dateList[this.data.temp]
    })
    console.log(this.data.temp)
  },
  bindTimeChange(e) {
    this.setData({
      time: e.detail.value + ':00'
    })
  },
  bindRegionChange(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value,
    })
  },
  rank(arr) {
    for(let i = arr.length - 1; i > 0; i--) {
      for(let j = 0; j < i; j++) {
        const d1 = new Date(arr[j].time)
        const d2 = new Date(arr[j + 1].time)
        if(d1.getTime() > d2.getTime()) {
          const t = arr[j]
          arr[j] = arr[j + 1]
          arr[j + 1] = t
        }
      }
    }
    return arr
  },
  getLocalStorage() {
    wx.getStorage({
      key: 'plan',
      success: (res) => {
        this.setData({
          plan: JSON.parse(res.data),
          num: JSON.parse(res.data).length
        })
        this.updateNum(this.data.num)
        // console.log(this.data.plan)
      }
    })
  },
  autoDelete() {
    const plan = this.data.plan
    const filterPlan = plan.filter(item => {
      const d = new Date(item.time)
      return (Date.now() - d.getTime()) / 1000 <= 1800
    })
    if(filterPlan.length === plan.length) {
      wx.showToast({
        title: '暂无过期行程',
        icon: 'error'
      })
    }
    else {
      wx.showModal({
        title: '提示',
        content: '是否清理所有过期行程',
        complete: (res) => {
          if (res.confirm) {
            wx.showToast({
              title: '已清理',
              icon: 'success'
            })
            this.setData({
              num: filterPlan.length,
              plan: filterPlan
            })
            this.updateNum(this.data.num)
            wx.setStorage({
              key: 'plan',
              data: JSON.stringify(filterPlan)
            })
          }
        }
      })
    }
  },
  
  date(e) {
    const that = this
    wx.showActionSheet({
      itemList: that.data.dateList,
      success(res) {
        that.setData({
          date: that.data.dateList[res.tapIndex]
        })
      }
    })
    
  },
  time(e) {
    this.setData({
      time: e.detail.value
    })
  },
  dest(e) {
    this.setData({
      dest: e.detail.value
    })
  },
  departure(e) {
    this.setData({
      departure: e.detail.value
    })
  },
  isLeapYear(year) {
    if(year % 4 == 0 && year % 100 != 0 || year % 400 == 0) return true
    else return false
  },
  isInputLegal(year, month, day) {
    if(month > 12) return false
    if(month == 2) {
      if(this.isLeapYear(year)) {
        if(day > 28) return false
        else return true
      }
      else {
        if(day > 26) return false
        else return false
      }
    }
    else if(month == 4 || month == 6 || month == 9 || month == 11) {
      if(day > 30) return false
      else return true
    }
    else {
      if(day > 31) return false
      else return true
    }
  },

  assure() {
    this.setData({
      date: this.data.dateList[this.data.temp]
    })
    const date = this.data.date
    const time = this.data.time
    const dest = this.data.dest
    const departure = this.data.departure
    const city = this.data.region[1]
    const obj = {time: date + " " + time, departure: departure, dest: dest, city: city}
    // const reg1 = /^\d{4}\/\d{1,2}\/\d{1,2}$/
    // const reg2 = /^\d{1,2}:\d{2}:\d{2}$/
    // const list1 = date.split('/')
    // const list2 = time.split(':')
    if(date == '' || time == '' || dest == '' || departure == '') {
      wx.showToast({
        title: '请输入完整',
        icon: 'error',
        duration: 2000
      })
    }
    // else if(reg1.test(date) == false || this.isInputLegal(list1[0], list1[1], list1[2]) == false) {
    //   wx.showToast({
    //     title: '日期输入不合法',
    //     icon: 'error',
    //     duration: 2000
    //   })
    // }   
    // else if(reg2.test(time) == false || parseInt(list2[0]) > 23 || parseInt(list2[1]) >59) {
    //   wx.showToast({
    //     title: '时间输入不合法',
    //     icon: 'error',
    //     duration: 2000
    //   })
    // }
    else {
      this.setData({
        num: this.data.num + 1,
        plan: this.rank([...this.data.plan, obj])
      })
      this.updateNum(this.data.num)
      wx.showToast({
        title: '行程已添加',
        icon: 'success',
        duration: 2000
      })
      wx.setStorage({
        key: 'plan',
        data: JSON.stringify(this.data.plan) 
      })
      // this.changeColor()
    }
    this.setData({
      date: '',
      temp: -1,
      time: '',
      dest: '',
      region: ['北京', '北京', '东城区'],
      reminder: ''
    })
  },
  delete(e) {
    wx.showModal({
      title: '提示',
      content: '是否取消行程',
      complete: (res) => {
        if (res.confirm) {
          this.data.plan.splice(e.target.dataset.id, 1)
          this.setData({
            num: this.data.num - 1,
            plan: this.data.plan
          })
          this.updateNum(this.data.num)
          wx.setStorage({
            key: 'plan',
            data: JSON.stringify(this.data.plan)
          })
          wx.showToast({
            title: '已删除行程',
            icon: 'none'
          })
        }
      }
    })
  },
  // gotoPredict(e) {
  //   // const city = this.data.plan[e.target.dataset.id].city
  //   console.log(e.target)
  //   // wx.navigateTo({
  //   //   url: `/pages/predict/predict?city=${city}`,
  //   // })
  // },
  routePlan(e) {
    console.log(e.target.dataset.id)
    const plan = this.data.plan
    let plugin = requirePlugin('routePlan');
    let key = 'MFMBZ-4D3CJ-ATTFL-X7ILT-PVIXO-CGFXD';  //使用在腾讯位置服务申请的key
    let referer = 'routePlan';   //调用插件的app的名称
    let startPoint = JSON.stringify({
      'name': plan[e.target.dataset.id].departure,
      'latitude': 39,
      'longitude': 116
    });
    let endPoint = JSON.stringify({  //终点
      'name': plan[e.target.dataset.id].dest,
      'latitude': 39.894806,
      'longitude': 116.321592
    });
    wx.navigateTo({
      url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&startPoint=' + startPoint+ '&endPoint=' + endPoint + '&navigation=1'
    });
  },
  jump() {
    wx.navigateTo({
      url: '/pages/map/map',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(this.data.temp)
    const d = new Date()
    let year = d.getFullYear()
    let month = d.getMonth() + 1
    let day = d.getDate()
    console.log(year, month, day)
    for(let i = 0; i < 7; i++) {
      const date = year + '/' + month + '/' + day
      this.setData({
        dateList: [...this.data.dateList, date]
      })
      day++
      if(month === 4 || month === 6 || month === 9|| month === 11) {
        if(day > 30) {
          day = 1 
          month++
        }
      }
      else if(month === 2){
        if(this.isLeapYear(year)) {
          if(day > 29) {
            day = 1
            month++
          }
        }
        else {
          if(day > 28) {
            day = 1
            month++
          }
        }
      }
      else {
        if(day > 31) {
          day = 1
          month++
          if(month > 12) {
            month = 1
            year++
          }
        }
      }

    }
    console.log(this.data.dateList)
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['num', 'isLogin'],
      actions: ['updateNum', 'getIsLogin']
    })
    
    // this.autoDelete()
    // console.log(this.data.plan)
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
    else this.getLocalStorage()
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
    // this.getLocalStorage()
    // this.autoDelete()
    console.log('刷新')
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    // console.log('触底')
    // wx.showLoading({
    //   title: '加载中',
    // })
    // setTimeout(function() {
    //   wx.hideLoading()
    // }, 1000)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})