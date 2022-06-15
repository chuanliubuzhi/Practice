//加载json数据
var apiData = require('../src/mock/data.json')
var seller = apiData.seller;
var goods = apiData.goods;
var ratings = apiData.ratings;
//得到路由器
var apiRouter = express.Router()
//注册路由
apiRouter.get('/seller', function (req, res) {
    res.json({
      code: 0,   //0代表正确数据
      data: seller
    })
})
apiRouter.get('/goods', function (req, res) {
  res.json({
    code: 0,
    data: goods
  })
})
apiRouter.get('/ratings', function (req, res) {
  res.json({
    code: 0,
    data: ratings
  })
})
//启用路由
app.use('/api', apiRouter)
