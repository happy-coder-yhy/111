// 创建store实例对象
import {observable, action} from 'mobx-miniprogram'
export const store = observable({
  // 数据字段
  activeTabBar: 0,
  num: 0,
  isLogin: false,
  predictResult: {},
  error: '',
  City: '',

  // 计算属性
  
  // action方法, 用来修改store中的数据
  updateActiveTabBar: action(function(index) {
    this.activeTabBar = index
  }),
  updateNum: action(function(n) {
      this.num = n
  }),
  updateLogin: action(function() {
    this.isLogin = true
  }),
  exitLogin: action(function() {
    this.isLogin = false
  }),
  getIsLogin: action(function() {
    return this.isLogin
  }),
  setResult: action(function(r) {
    this.predictResult = r
  }),
  setError: action(function(e) {
    this.error = e
  }),
  setCity: action(function(c) {
    this.City = c
  })
})