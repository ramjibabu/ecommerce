import { createSlice } from "@reduxjs/toolkit";


const productSlices=createSlice({
    name: 'product',
    initialState: {
        loading: false,
        product:{}
    }, reducers: {
        productRequest(state, action) {
            return {
                loading: true,

            }

        }, productSuccess(state, action) {
            return {
                loading: false,
                product: action.payload.product
            }
        }, productFail(state, action) {
            return {
                loading: false,
                error: action.payload
            }


        }
    }
})

const {actions,reducer}=productSlices
export const {productRequest,productSuccess,productFail}=actions
export default reducer;