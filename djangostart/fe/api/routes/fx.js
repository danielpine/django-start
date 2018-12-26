const {
  Router
} = require('express')

const router = Router()

// Mock Users
const users = [{
  name: 'Alexandre'
},
{
  name: 'Pooya'
},
{
  name: 'Sébastien'
}
]

/* GET users listing. */
router.get('/users', function (req, res, next) {
  res.json(users)
})

/* GET user by ID. */
router.get('/users/:id', function (req, res, next) {
  const id = parseInt(req.params.id)
  if (id >= 0 && id < users.length) {
    res.json(users[id])
  } else {
    res.sendStatus(404)
  }
})

router.get('/fx/:market', function (req, res, next) {
  let url = '/fx/page?market=' + req.params.market
  let sendType = 'GET'
  let body = 'token=' + localStorage.getItem('token')
  loadingData(baseurl, url, sendType, body)
})

function getMarketConv (market) {
  baseurl = '/api'
  let url = '/fx/page?market=' + market
  let sendType = 'GET'
  let body = 'token=' + localStorage.getItem('token')
  return loadingData(baseurl, url, sendType, body)
}

function loadingData (baseurl, url, sendType, body) {
  console.log(' --->>> baseurl + url :' + baseurl + url)
  return fetch(baseurl + url, {
    method: sendType,
    mode: 'no-cors',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json', // 'application/x-www-form-urlencoded'
      Accept: 'application/json' // 通过头指定，获取的数据类型是JSON
    },
    body: sendType === 'GET' ? null : body
  })
    .then(response => {
      return response.json()
    })
    .catch(error => {
      // alert('*****' + error)
      return {
        code: 0,
        msg: error.toString()
      }
      // throw error
    })
}
module.exports = router
