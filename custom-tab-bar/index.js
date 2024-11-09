// custom-tab-bar/index.js
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../store/store'

Component({

  options: {
    styleIsolation: 'shared'
  },
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: {
      num: 'num',
      active: 'activeTabBar'
    },
    actions: {
      updateActive: 'updateActiveTabBar',
      updateNum: 'updateNum'
    },
  },
  observers: {
    'num': function(val) {
      // console.log(val)
      this.setData({
        'list[1].info': val
      })
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    icon: {
      normal: 'https://img.yzcdn.cn/vant/user-inactive.png',
      active: 'https://img.yzcdn.cn/vant/user-active.png',
    },
    "list": [
      {
        "pagePath": "/pages/index/index",
        "text": "首页",
        "iconPath": "/image/tabBar/zhuye.png",
        "selectedIconPath": "/image/tabBar/home-active.png"
      },
      {
        "pagePath": "/pages/list/list",
        "text": "计划",
        "iconPath": "/image/tabBar/list.png",
        "selectedIconPath": "/image/tabBar/list-active-icon.png",
        info: 3
      },
      {
        "pagePath": "/pages/my/my",
        "text": "我的",
        "iconPath": "/image/tabBar/login_User.png",
        "selectedIconPath": "/image/tabBar/my-active.png"
      }
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event) {
      // this.setData({ active: event.detail });
      this.updateActive(event.detail)
      wx.switchTab({
        url: this.data.list[event.detail].pagePath,
      })
    }
  }
})