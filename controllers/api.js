const Monk = require('monk')

const db = new Monk('localhost/articles') //链接到库

const arts = db.get('arts')

module.exports = {
  'GET /api/article': async (ctx, next) => {
    ctx.response.type = 'application/json'
    let article = await arts.find({
      "data.date.curr": "20171228"
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