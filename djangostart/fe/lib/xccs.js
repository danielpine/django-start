import { IEVersion } from '@/utils/common'
// import axios from '~/plugins/axios'
import $ from 'jquery'
// import Api from './index.js'
import promise from 'es6-promise'
promise.polyfill()
require('isomorphic-fetch')
var Service = {
  getMarketConv: getMarketConv,
  price: price,
  getPriceData: getPriceData
}
// var baseurl = '/api'
var baseurl = '/api'
// 接口方法封装
function loadingData (baseurl, url, sendType, body) {
  console.log(' --->>> baseurl + url :' + baseurl + url)
  if (IEVersion() === -1) {
    let formData = new FormData()
    if (sendType === 'POST') {
      for (let k in body) {
        if (body.hasOwnProperty(k)) {
          if (k !== 'priceData') {
            formData.append(k, body[k])
          } else {
            formData.append(k, JSON.stringify(body[k]))
          }
        }
      }
    }
    return fetch(baseurl + url, {
      method: sendType,
      mode: 'no-cors',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json', // 'application/x-www-form-urlencoded'
        Accept: 'application/json' // 通过头指定，获取的数据类型是JSON
      },
      body: sendType === 'GET' ? null : formData
    })
      .then(response => {
        // console.log(response.json())
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
  } else {
    console.log('ie using axios')
    return $.ajax({
      type: sendType, // 提交的方法
      url: baseurl + url, // 提交的地址
      data: body, // 提交的地址
      async: true,
      error: function (request) {
        // 失败的话
        return request
      },
      success: function (j) {
        return j
      },
      complete: function () {},
      dataType: 'json'
    })
  }
}
// 获取市场惯例
function getMarketConv (market) {
  baseurl = '/api'
  let url = '/xccs/page?market=' + market
  let sendType = 'GET'
  let body = 'token=' + localStorage.getItem('token')
  return loadingData(baseurl, url, sendType, body)
}
// 计价
function price (market) {
  baseurl = '/pxccs'
  let url = '/xccs/price'
  let sendType = 'POST'
  return loadingData(baseurl, url, sendType, market)
}

// 获取计价数据
function getPriceData (market, date) {
  baseurl = '/api'
  let url =
    '/xccs/priceData?market=' +
    market +
    '&date=' +
    date +
    (arguments[2] ? '&lag=' + arguments[2] : '')
  let sendType = 'GET'
  let body = 'token=' + localStorage.getItem('token')
  return loadingData(baseurl, url, sendType, body)
}
export default Service
