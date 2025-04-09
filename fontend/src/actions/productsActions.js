import axios from 'axios'
import { productsFail, productsRequest, productsSuccess } from '../slices/productsSlices'
export const getProducts=async(dispatch)=>{
    try{
        dispatch(productsRequest())
        
        const {data}=await axios.get('/api/v1/getAllProduct')
        

        dispatch(productsSuccess(data))
      

    }catch(err){
dispatch(productsFail(err.response.data.message))
    }
}