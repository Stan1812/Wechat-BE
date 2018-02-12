const Monk = require('monk')

const db = new Monk('localhost/articles')

const arts = db.get('arts')

const getNowFormatDate = () => {
  let date = new Date()
  let month = date.getMonth() + 1
  let strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = "0" + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate
  }
  let currentdate = date.getFullYear() + month + strDate
  return currentdate
}


module.exports = {
  'GET /api/today': async (ctx, next) => {
    ctx.response.type = 'application/json'
    let article = await arts.find({
      "data.date.curr": getNowFormatDate()
    })
    ctx.response.body = {
      article: article
    }
  },
  'GET /api/oneart': async (ctx, next) => {
    let date = ctx.request.query.date
    console.log(date)
    let article = await arts.find({
      "data.date.curr": date
    })
    ctx.response.body = {
      article: article
    }
  },
  'POST /api/articles': async (ctx, next) => {
    let date = ctx.request.body.date
    console.log(date)
    let articles = await arts.find({
      "data.date.curr": {
        $gt: date
      }
    }, {
      sort: {
        "_id": -1
      },
      limit: 5
    })
    ctx.response.type = 'application/json'
    ctx.response.body = articles
  }
}