// pages/personal/personal.js
const util = require('../../../utils/util.js');
const now = util.formatDate(new Date(), '-');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['彩妆', '护肤', '种草'],
    index: 0,
    goodsValue: '',
    sizeValue: '',
    logo: '',
    productDate: now,
    buyDate: now,
    openDate: '',
    emptyDate: ''
  },
  onLoad: function (options) {
    this.setData({
      index: options.type || 0
    })
  },
  bindPickerChange (e) {
    this.setData({
      index: e.detail.value
    })
  },
  /**
  * 生产日期选择
  */
  bindProductDateChange(e) {
    this.setData({
      productDate: e.detail.value
    })
  },
  /**
   * 购买日期选择
   */
  bindBuyTimeChange (e) {
    this.setData({
      buyDate: e.detail.value
    })
  },
  /**
   * 开封日期选择
   */
  bindOpenTimeChange(e) {
    this.setData({
      openDate: e.detail.value
    })
  },
  /**
   * 空瓶日期选择
   */
  bindEmptyTimeChange(e) {
    this.setData({
      emptyDate: e.detail.value
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
    console.log(formData)
    formData.path = _this.data.logo
    if (!formData.name) {
      wx.showToast({
        title: '请录入商品名称！',
        icon: 'none'
      })
      return
    }
    if (!formData.size) {
      wx.showToast({
        title: '请录入商品规格！',
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
            goodsValue: '',
            sizeValue: '',
            productDate: now,
            buyDate: now,
            openDate: now,
            emptyDate: now
          })
          wx.switchTab({
            url: '../../index/index'
          })
        }, 2000)
      }
    })
  }
})