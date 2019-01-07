//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    array1: [],
    array2: [],
    array3: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onReady: function () {
    this.dialog = this.selectComponent('#dialog')
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow: function () {
    this.getDatas()
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
   * 获取分类数据
   */
  getDatas () {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'get'
    }).then(res => {
      wx.hideLoading()
      if (res.result && res.result.code === 0) {
        let datas = res.result.datas
        let arr1 = [], arr2 = [], arr3 = [];
        datas.map(item => {
          if (item.type == 0) {
            arr1.push(item)
          } else if (item.type == 1) {
            arr2.push(item)
          } else {
            arr3.push(item)
          }
        })
        this.setData({
          array1: arr1,
          array2: arr2,
          array3: arr3
        })
      }
    })
  }
})
