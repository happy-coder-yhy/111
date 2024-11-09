// Components/test1/test1.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    // 1、简化方式
    // max: Number
    // 2、完整方式
    max: {
      type: Number,
      // 默认值
      value: 10
    },
    num: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    count: 0,
    n1: 1,
    n2: 2,
    sum: 3
  },
  options: {
    //纯数据字段
    pureDataPattern: /^_/,
    //支持多个插槽
    multipleSlots: true
  },
  /**
   * 组件的方法列表
   */
  methods: {
    pre() {
      this.setData({
        count: this.data.count + 1
      })
      if(this.data.count == this.properties.max) {
        wx.showToast({
          title: '请求过于频繁',
          icon: 'error',
          duration: 2000
        })
        this.setData({
          count: 0
        })
      }
      else {
        wx.showLoading({
          title: '预测中',
          duration: 2000
        })
      }
    },
    // addN1() {
    //   this.setData({
    //     n1: this.data.n1 + 1
    //   })
    // },
    // addN2() {
    //   this.setData({
    //     n2: this.data.n2 + 1
    //   })
    // }
  },
  // 数据监听
  // observers: {
  //   'n1, n2': function(n1, n2) {
  //     this.setData({sum: n1 + n2})
  //   }
  // }
})