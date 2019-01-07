// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

/**
 * 云函数入口函数
 * condition: 0 全部， 1 已开封， 2 未开封， 3 已用完
 */
exports.main = async (event, context) => {
  const condition = event.condition
  const where = {
    type: event.type
  }
  switch (condition) {
    case 0:
      break;
    case 1:
      where.openDate = _.neq('')
      break;
    case 2:
      where.openDate = _.eq('')
      break;
    case 3:
      where.emptyDate = _.neq('')
      break;
  }
  const data = await db.collection('color').where(where).get()
  return {
    code: 0,
    message: 'success',
    datas: data.data
  }
}