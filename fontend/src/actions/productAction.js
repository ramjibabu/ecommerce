import axios from 'axios'
import { productFail, productRequest, productSuccess } from '../slices/productSlice'
export const getProduct = id => async (dispatch) => {
    try {
        dispatch(productRequest())

        const { data } = await axios.get(`/api/v1/getSingleProduct/${id}`)


        dispatch(productSuccess(data))
        console.log('>>>>',data)


    } catch (err) {
        dispatch(productFail(err.response.data.message))
    }
}