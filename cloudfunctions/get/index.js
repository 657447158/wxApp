// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  let type = event.type;
  let data = await db.collection('color').get({
    type: type
  });
  return {
    code: 0,
    message: 'success',
    datas: data.data
  }
}