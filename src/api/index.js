import axios from 'axios'
export default {
  signOut: (params)=>{
    return new Promise((resolve, reject)=>{
      axios.delete('/signOut',{params}).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      })
    })
  }
}