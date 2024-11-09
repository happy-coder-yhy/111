// pages/prediction/prediction.js
import {createStoreBindings} from 'mobx-miniprogram-bindings'
import {store} from '../../store/store'
const dd  = new Date()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //获取子组件
  // getChild() {
  //   const child = this.selectComponent('.x')
  //   child.setData({
  //     num: child.properties.num + 1
  //   })
  //   console.log(child)
  // },

  btnHandler(e) {
    this.updateNumA(e.target.dataset.step)
  },

  test() {
    const d1 = new Date('2024/9/10 12:00:00')
    const d2 = new Date('2024/9/10 12:30:00')
    console.log(+ d1.getTime() - d2.getTime())
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // this.storeBindings = createStoreBindings(this, {
    //   store,
    //   fields: ['numA', 'numB', 'sum'],
    //   actions: ['updateNumA']
    // })
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