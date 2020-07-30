console.log('ssss')

import axios from 'axios'

let oInput=document.querySelector('input[name=_csrf]')

axios({
    url:'/form',
}).then(ret=>{
    console.log('ret',ret)
    //oInput.value=ret.data.csrfToken;
}).catch(err=>{
    console.error('error',err)
})