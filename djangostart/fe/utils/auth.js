// import Cookies from 'js-cookie'

// const TokenKey = 'Admin-Token'

export const info = process.browser ? window.info : {
  'brooker': ['平安货币经纪公司'],
  'useClearing': ['上海清算所', 'None'],
  'contract': ['NAFMII', 'ISDA'],
  'desk': {
    '人民币汇率交易处': ['FX_CNY_3', 'FX_CNY_4'],
    '外币汇率交易处': ['FX_USD_3']
  },
  'counterPartyId': ['ABC', 'BOC', 'CCB', 'CEB', 'CIB', 'GUANGFA', 'ICBC'],
  'section': ['A', 'B', 'C'],
  'counterParty': ['中国农业银行', '中国银行', '中国建设银行', '中国光大银行', '兴业银行', '广发证券', '中国工商银行'],
  'company': '京都金融',
  'calculationAgent': ['本方', '对方', '双方']
}
export const userOperation = process.browser ? window.userOperation : ['trader~FX~JD_CNY_COMM_TRD', 'cheker~FX~JD_USD_EQTY_INV']

// export function getToken () {
//   return Cookies.get(TokenKey)
// }

// export function setToken (token) {
//   return Cookies.set(TokenKey, token)
// }

// export function removeToken () {
//   return Cookies.remove(TokenKey)
// }
