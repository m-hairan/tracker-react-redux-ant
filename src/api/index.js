import axios from 'axios'
// import store from 'store'

let BASE_URL

if (window.location.href.includes('local')) {
  BASE_URL = 'http://localhost:8000/api'  // local
} else if (window.location.href.includes('demo')) {
  BASE_URL = 'https://janio-api-demo.herokuapp.com/api'  // demo
} else {
  BASE_URL = 'http://janio-api.herokuapp.com/api'  // production
}

// wrapped http call with authorization header
// export const api = () => axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Token ${store.get('token')}`,
//   }
// })

// regular http call
export const http = () => axios.create({
  baseURL: BASE_URL,
  headers: {'Content-Type': 'application/json'}
})
