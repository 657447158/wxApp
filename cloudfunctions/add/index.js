// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()


// 云函数入口函数
exports.main = async (event, context) => {
  try {
    let data = await db.collection('color').add({
      data: {
        type: event.type,
        name: event.name,
        path: event.path
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