import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const WEBAPIKEY = 'AIzaSyAfpfEl5sRkgqWwaAall8SxJ_GvI2amDog'

const initialState = {
  statsData: {
    status: '',
    data: null,
  },
  coinsData: {
    status: '',
    data: null,
  },
  newsData: {
    status: '',
    data: null,
  },
  coinDetail: {
    status: '',
    data: null,
  },
  coinHistory: {
    status: '',
    data: null,
  },
  isLoggedIn: false,
  tokenId: null,
  signIn: true,
}

export const getStatsData = createAsyncThunk(
  'statsData/getStatsData',
  async () => {
    console.log('Inside the get state data')
    const options = {
      method: 'GET',
      url: 'https://coinranking1.p.rapidapi.com/coins',
      params: {
        referenceCurrencyUuid: 'yhjMzLPhuIDl',
        timePeriod: '24h',
        'tiers[0]': '1',
        orderBy: 'marketCap',
        orderDirection: 'desc',
        limit: '50',
        offset: '0',
      },
      headers: {
        'X-RapidAPI-Key': '9a520044a4mshedb14c4f0e5a474p1aeb86jsna18e25e97646',
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
      },
    }
    return await axios
      .request(options)
      .then((response) => response.data)
      .catch(function (error) {
        console.error(error)
      })
  },
)

export const getNewsData = createAsyncThunk(
  'newsData/getNewsData',
  async () => {
    const options = {
      method: 'GET',
      url: 'https://bing-news-search1.p.rapidapi.com/news',
      params: { safeSearch: 'Off', textFormat: 'Raw' },
      headers: {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Key': '9a520044a4mshedb14c4f0e5a474p1aeb86jsna18e25e97646',
        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
      },
    }

    return await axios
      .request(options)
      .then((response) => response.data)
      .catch((error) => error)
  },
)

export const getCoinDetail = createAsyncThunk(
  'coinDetail/getCoinDetail',
  async (coinId) => {
    console.log('coin id', coinId)
    const options = {
      method: 'GET',
      url: `https://coinranking1.p.rapidapi.com/coin/${coinId}`,
      params: { referenceCurrencyUuid: 'yhjMzLPhuIDl', timePeriod: '24h' },
      headers: {
        'X-RapidAPI-Key': '9a520044a4mshedb14c4f0e5a474p1aeb86jsna18e25e97646',
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
      },
    }

    return await axios
      .request(options)
      .then((response) => response)
      .catch((error) => error)
  },
)

export const getCoinHistory = createAsyncThunk(
  'coinHistory/getCoinHistory',
  async (coinId) => {
    const options = {
      method: 'GET',
      url: `https://coinranking1.p.rapidapi.com/coin/${coinId}/history`,
      params: { referenceCurrencyUuid: 'yhjMzLPhuIDl', timePeriod: '24h' },
      headers: {
        'X-RapidAPI-Key': '9a520044a4mshedb14c4f0e5a474p1aeb86jsna18e25e97646',
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
      },
    }

    return await axios
      .request(options)
      .then((response) => response)
      .catch((error) => error)
  },
)

export const signInFunction = createAsyncThunk(
  'signIn/signInFunction',
  async (requestBody) => {
    console.log('requestBody', requestBody)
    console.log('Request body', requestBody)
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${WEBAPIKEY}`
    console.log('url', url)
    return await axios
      .post(url, requestBody)
      .then((resp) => {
        console.log('response from utility funciton***', resp)
        return resp.data
      })
      .catch((error) => {
        const err = error.response
        throw new Error(err.data.error.message)
      })
  },
)
export const signUpFunction = createAsyncThunk(
  'signUp/signUpFunction',
  async (requestBody) => {
    console.log('requestBody', requestBody)
    console.log('Request body', requestBody)
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${WEBAPIKEY}`
    console.log('url', url)
    return await axios
      .post(url, requestBody)
      .then((resp) => {
        console.log('response from utility funciton***', resp)
        return resp.data
      })
      .catch((error) => {
        const err = error.response
        throw new Error(err.data.error.message)
      })
  },
)

const requestDataSlice = createSlice({
  name: 'requestdata',
  initialState,
  reducers: {
    setLogin(state) {
      console.log('inside setLogin from reducer function.')
      state.isLoggedIn = true
      state.signIn = false
    },
    setLogout(state) {
      state.isLoggedIn = false
      state.signIn = true
    },
    setSignUp(state) {
      state.signIn = false
    },
    setSignIn(state) {
      state.signIn = true
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStatsData.fulfilled, (state, action) => {
        console.log('Fulfilled action', action.payload)
        // console.log('state from fulfilled action', ...state)
        return {
          ...state,
          statsData: {
            status: 'success',
            data: action?.payload?.data?.stats,
          },
          coinsData: {
            status: '',
            data: action?.payload?.data?.coins,
          },
        }
      })
      .addCase(getStatsData.pending, (state, action) => {
        return {
          ...state,
          statsData: {
            status: 'pending',
            data: null,
          },
          coinsData: {
            status: '',
            data: null,
          },
        }
      })
      .addCase(getStatsData.rejected, (state, action) => {
        return {
          ...state,
          statsData: {
            status: 'failed',
            data: null,
          },
          coinsData: {
            status: 'failed',
            data: null,
          },
        }
      })
      .addCase(getNewsData.fulfilled, (state, action) => {
        console.log('news data action from add case', action)
        return {
          ...state,
          newsData: {
            status: 'success',
            data: action.payload,
          },
        }
      })
      .addCase(getNewsData.pending, (state, action) => {
        return {
          ...state,
          newsData: {
            status: 'pending',
            data: null,
          },
        }
      })
      .addCase(getNewsData.rejected, (state, action) => {
        return {
          ...state,
          newsData: {
            status: 'failed',
            data: null,
          },
        }
      })
      .addCase(getCoinDetail.fulfilled, (state, action) => {
        console.log('action from coin detail', action)
        return {
          ...state,
          coinDetail: {
            status: 'success',
            data: action?.payload.data,
          },
        }
      })
      .addCase(getCoinDetail.pending, (state, action) => {
        return {
          ...state,
          coinDetail: {
            status: 'pending',
            data: null,
          },
        }
      })
      .addCase(getCoinDetail.rejected, (state, action) => {
        return {
          ...state,
          coinDetail: {
            status: 'failed',
            data: null,
          },
        }
      })
      .addCase(getCoinHistory.fulfilled, (state, action) => {
        console.log('Action price history', action)
        return {
          ...state,
          coinHistory: {
            status: 'success',
            data: action?.payload?.data,
          },
        }
      })
      .addCase(getCoinHistory.pending, (state, action) => {
        return {
          ...state,
          coinHistory: {
            status: 'pending',
            data: null,
          },
        }
      })
      .addCase(getCoinHistory.rejected, (state, action) => {
        return {
          ...state,
          coinHistory: {
            status: 'failed',
            data: null,
          },
        }
      })
      .addCase(signInFunction.fulfilled, (state, action) => {
        console.log('response action', action)
        return {
          ...state,
          tokenId: action.payload.idToken,
        }
      })
      .addCase(signInFunction.pending, (state, action) => {
        console.log(action)
        return {
          ...state,
          tokenId: null,
        }
      })
      .addCase(signInFunction.rejected, (state, action) => {
        console.log(action)
        return {
          ...state,
          tokenId: null,
        }
      })
      .addCase(signUpFunction.fulfilled, (state, action) => {
        console.log('response action signup function', action)
        return {
          ...state,
          tokenId: action.payload,
        }
      })
      .addCase(signUpFunction.pending, (state, action) => {
        console.log(action)
        return {
          ...state,
          tokenId: null,
        }
      })
      .addCase(signUpFunction.rejected, (state, action) => {
        console.log(action)
        return {
          ...state,
          tokenId: null,
        }
      })
  },
})

// export const loginAction = loginSlice.actions
// export const statsAction = requestDataSlice.actions

// export const { setLogin, setLogout } = loginSlice.actions

// export const selectIsLoggedIn = (state) => state.login.isLoggedIn

export const {
  setLogin,
  setLogout,
  setSignIn,
  setSignUp,
} = requestDataSlice.actions

export const selectStatsData = (state) => state?.requestdata?.statsData
export const selectCoinsList = (state) => state?.requestdata?.coinsData
export const selectNewsData = (state) => state?.requestdata?.newsData
export const selectCoinDetail = (state) => state?.requestdata?.coinDetail
export const selectCoinHistory = (state) => state?.requestdata?.coinHistory
export const selectIsLoggedIn = (state) => state.requestdata?.isLoggedIn
export const selectTokenId = (state) => state.requestdata?.tokenId
export const selectSignUpClicked = (state) => state.requestdata?.signIn

export default requestDataSlice.reducer
