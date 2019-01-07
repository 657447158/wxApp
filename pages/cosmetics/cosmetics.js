// pages/cosmetics/cosmetics.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: "0",
    list: [],
    tabIndex: 0,
    tabList: [
      {
        name: '全部',
        index: 0
      },
      {
        name: '已开封',
        index: 1
      },
      {
        name: '未开封',
        index: 2
      },
      {
        name: '已用完',
        index: 3
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type || '0'
    })
    this.getDataList()
  },

  /**
   * 获取数据列表
   */
  getDataList: function (condition) {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'where',
      data: {
        type: this.data.type,
        condition: condition
      }
    }).then(res => {
      wx.hideLoading()
      if (res.result && res.result.code === 0) {
        this.setData({
          list: res.result.datas
        })
      }
    })
  },

  /**
   * 按条件删选 
   */
  changeTab: function (e) {
    this.setData({
      tabIndex: e.currentTarget.dataset.index
    })
    this.getDataList(this.data.tabIndex)
  }
})