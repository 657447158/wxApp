// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()


// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  try {
    await db.collection('color').add({
      data: {
        type: event.type.toString(),        // 分类
        name: event.name,                   // 名称
        path: event.path,                   // 图片路径
        size: event.size,                   // 规格
        productDate: event.productDate,     // 生产日期
        buyDate: event.buyDate,             // 购买日期
        openDate: event.openDate,           // 开封日期
        emptyDate: event.emptyDate          // 空瓶日期
      }
    })
    return {
      code: 0,
      message: 'success'
    }
  } catch (e) {
    console.log(e)
  }
}