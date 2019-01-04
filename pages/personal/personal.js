// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['彩妆', '护肤'],
    index: 0,
    goodsValue: '',
    logo: ''
  },
  bindPickerChange (e) {
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 图片上传
   */
  chooseImage () {
    let _this = this
    wx.chooseImage({
      count: 1,
      success: function(res) {
        _this.setData({
          logo: res.tempFilePaths[0]
        })
      }
    })
  },
  /**
   * 表单提交
   */
  formSubmit (e) {
    const _this = this
    const formData = e.detail.value
    formData.path = _this.data.logo
    if (!formData.name) {
      wx.showToast({
        title: '请录入商品名称！',
        icon: 'none'
      })
      return
    }
    wx.showLoading({
      title: '请求中',
    })
    wx.cloud.callFunction({
      name: 'add',
      data: formData
    }).then(res => {
      wx.hideLoading()
      if (res.result && res.result.code === 0) {
        wx.showToast({
          title: '新增成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function () {
          _this.setData({
            index: 0,
            logo: '',
            goodsValue: ''
          })
          wx.switchTab({
            url: '../index/index'
          })
        }, 2000)
      }
    })
  }
})