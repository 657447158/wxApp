// components/Dialog/Dialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '标题'
    },
    content: {
      type: String,
      value: '弹窗内容'
    },
    cancelText: {
      type: String,
      value: '取消'
    },
    confirmText: {
      type: String,
      value: '确认'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideDialog () {
      this.setData({
        isShow: !this.data.isShow
      })
      this.triggerEvent('hide')
    },
    showDialog () {
      this.setData({
        isShow: !this.data.isShow
      })
    }
  }
})
