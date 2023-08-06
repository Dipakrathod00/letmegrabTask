import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { tableItem } from "../intefaces";

export interface DataState {
  data: string[];
  loginData: any;
  userIsLoggedIn: boolean;
  editValue: tableItem;
}

const initialState: DataState = {
  data: [],
  loginData: {},
  userIsLoggedIn: false,
  editValue: {
    title: "",
    price: 0,
    description: "",
    category: "",
    setisEdit:()=>{},
    isEdit:false
  },
};

export const GetProduct = createAsyncThunk("getProduct", async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
});
export const AddProduct = createAsyncThunk("AddProduct", async (data: any) => {
  try {
    await axios.post("https://fakestoreapi.com/products", data).then((res) => {
      if (res.data) {
        return res.data;
      }
    });
  } catch (error) {
    return error;
  }
});

export const EditProduct = createAsyncThunk(
  "EditProduct",
  async (data: any) => {
    try {
      await axios.put("https://fakestoreapi.com/products", data).then((res) => {
        if (res) {
          return res;
        }
      });
    } catch (error) {
      return error;
    }
  }
);

export const DeleteProduct = createAsyncThunk(
  "EditProduct",
  async (id: any) => {
    try {
      await axios
        .delete(`https://fakestoreapi.com/products/${id}`)
        .then((res) => {
          if (res) {
            return res;
          }
        });
    } catch (error) {
      return error;
    }
  }
);

export const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    setLogout: (state, { payload }) => {
      state.userIsLoggedIn = false;
      localStorage.setItem("isLoggedIn", JSON.stringify(state.userIsLoggedIn));
      payload.navigate("/login");
    },
    getLoginData: (state, { payload }) => {
      state.loginData = payload;
      const localData: any = localStorage.getItem("user");
      const storedLoginUser: any = localStorage.getItem("login-user");
      const parseLocalData = JSON.parse(localData);
      parseLocalData?.map((item: any) => {
        const parsestoredLoginUser = JSON.parse(storedLoginUser);
        if (parsestoredLoginUser.password === item.password) {
          state.userIsLoggedIn = true;
          payload.navigate("/home");
          localStorage.setItem(
            "isLoggedIn",
            JSON.stringify(state.userIsLoggedIn)
          );
        }
      });
    },
    setLoginState: (state, { payload }) => {
      state.userIsLoggedIn = payload;
    },
    setEditValue: (state, { payload }) => {
      console.log("called")
      state.editValue = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(GetProduct.fulfilled, (state: any, action) => {
      state.data = action.payload;
    });
  },
});

export const { getLoginData, setLogout, setLoginState, setEditValue } =
  productSlice.actions;

export default productSlice.reducer;
