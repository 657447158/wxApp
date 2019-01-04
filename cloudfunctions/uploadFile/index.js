// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const fs = require('fs')
const path = require('path')

// 云函数入口函数
exports.main = async (event, context) => {
  const fileStream = fs.createReadStream(path.join(__dirname, ''))
}