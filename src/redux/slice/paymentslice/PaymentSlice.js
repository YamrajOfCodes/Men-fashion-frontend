import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';
import { AddOrderApi } from "../../../Api/orderAPi/Orderapi";




// Order slice
export const Order = createAsyncThunk("Order",async(data)=>{
    try {
        console.log(data);
        const response = await AddOrderApi(data);

        if(response.status == 200){
            toast.success("your order has been placed");

            return response.data
        }else{
            toast.error(response.response.data.error);
        }
    } catch (error) {
        throw error;
    }
});

// create reducer and action
export const PaymentSlice = createSlice({
    name:"PaymentSlice",
    initialState:{
        ordersucess:[],
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        
        builder.addCase(Order.pending,(state)=>{
            state.loading = true;
        })
        .addCase(Order.fulfilled,(state,action)=>{
            state.loading = false;
            state.ordersucess = action.payload;
        })
        .addCase(Order.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    


    }
});

export default PaymentSlice.reducer;