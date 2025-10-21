import {createSlice} from '@reduxjs/toolkit'


const initialChangePasswordCustomerState = {
    responseSucces: null,
    errorField: null, 
    errorMessage: null,
    errorCP: null,
    loading: false,
}
export const changePasswordCustomerSlice = createSlice({
    name: 'changePassword',
    initialState: initialChangePasswordCustomerState,
    reducers: {
        changePassSuccessCustomer: (state, action) => {
            state.responseSucces = action.payload
            state.errorField = null
            state.errorMessage = null
            state.errorCP = null
            state.loading = false
        },
        changePassErrorCustomer: (state, action) => {
            state.errorField = action.payload.errorField
            state.errorMessage = action.payload.errorMessage
            state.errorCP = action.payload.error
            state.responseSucces = null
            state.loading = false
        },
        setLoadingPassCustomer: (state, action) => {
            state.loading = action.payload
        },
        resetChangePasswordCustomer: (state) => {
            state.responseSucces = null
            state.errorField = null
            state.errorMessage = null
            state.errorCP = null
        }
    }
})


const initialSetPasswordCustomerState = {
    successSetPass: null,
    errorFieldSetPass: null,
    errorSetPass: null,
    loadingSetPass: false,
}
export const setPasswordCustomerSlice = createSlice({
    name: 'setPasswordCustomer',
    initialState: initialSetPasswordCustomerState,
    reducers: {
        setLoadingSetPassCustomer: (state, action) => {
            state.loadingSetPass = action.payload
        },
        setPassSuccessCustomer: (state, action) => {
            state.successSetPass = action.payload
            state.errorFieldSetPass = null
            state.errorSetPass = null
        }, 
        setPassErrorCustomer: (state, action) => {
            state.errorFieldSetPass = action.payload.errorField
            state.errorSetPass = action.payload.error
            state.successSetPass = null
        },
        resetSetPassCustomer: (state) => {
            state.successSetPass = null
            state.errorFieldSetPass = null
            state.errorSetPass = null
        }
    }
})


const initialSetUsernameCustomerState = {
    successSetUsername: null,
    errorFieldSetUsername: null,
    errorSetUsername: null,
    loadingSetUsername: false,
}
export const setUsernameCustomerSlice = createSlice({
    name: 'setUsernameCustomer',
    initialState: initialSetUsernameCustomerState,
    reducers: {
        setLoadingSetUsernameCustomer: (state, action) => {
            state.loadingSetUsername = action.payload
        },
        setUsernameSuccessCustomer: (state, action) => {
            state.successSetUsername = action.payload
            state.errorFieldSetUsername = null
            state.errorSetUsername = null
        },
        setUsernameErrorCustomer: (state, action) => {
            state.errorFieldSetUsername = action.payload.errorField
            state.errorSetUsername = action.payload.error
            state.successSetUsername = null
        },
        resetSetUsernameCustomer: (state) => {
            state.successSetUsername = null
            state.errorFieldSetUsername = null
            state.errorSetUsername = null
        }
    }
})


const initialBuyTransactionCashOnGoingInternalState = {
    successBuyTransactionCashOnGoing: null,
    errorBuyTransactionCashOnGoing: null,
    errorFieldBuyTransactionCashOnGoing: null,
    loadingBuyTransactionCashOnGoing: false,
}
export const buyTransactionCashOnGoingInternalSlice = createSlice({
    name: 'setUsernameCustomer',
    initialState: initialBuyTransactionCashOnGoingInternalState,
    reducers: {
        setLoadingBuyTransactionCashOnGoingInternal: (state, action) => {
            state.loadingBuyTransactionCashOnGoing = action.payload
        },
        setSuccessBuyTransactionCashOnGoingInternal: (state, action) => {
            state.successBuyTransactionCashOnGoing = action.payload
            state.errorBuyTransactionCashOnGoing = null
            state.errorFieldBuyTransactionCashOnGoing = null
        },
        setErrorBuyTransactionCashOnGoinInternal: (state, action) => {
            state.errorBuyTransactionCashOnGoing = action.payload.error
            state.errorFieldBuyTransactionCashOnGoing = action.payload.errorField
            state.successBuyTransactionCashOnGoing = null
        },
        resetBuyTransactionCashOnGoingInternal: (state) => {
            state.successBuyTransactionCashOnGoing = null
            state.errorBuyTransactionCashOnGoing = null
            state.errorFieldBuyTransactionCashOnGoing = null
        }
    }
})


const initialAvailableProductInternalState = {
    successAvailableProduct: null,
    errorAvailableProduct: null,
}
export const availbaleProductlSlice = createSlice({
    name: 'availableProduct',
    initialState: initialAvailableProductInternalState,
    reducers: {
        setSuccessAvailableProduct: (state, action) => {
            state.successAvailableProduct = action.payload
            state.errorAvailableProduct = null
        },
        setErrorAvailableProduct: (state, action) => {
            state.errorAvailableProduct = action.payload
            state.successAvailableProduct = null
        },
        resetAvailableProduct: (state) => {
            state.successAvailableProduct = null
            state.errorAvailableProduct = null
        }
    }
})


const initialToProgressOrderInternalState = {
    successToProgressOrder: null,
    errorToProgressOrder: null,
    loadingToProgressOrder: false,
}
export const toProgressOrderInternalSlice = createSlice({
    name: 'toProgressOrder',
    initialState: initialToProgressOrderInternalState,
    reducers: {
        setSuccessToProgressOrder: (state, action) => {
            state.successToProgressOrder = action.payload
            state.errorToProgressOrder = null
        },
        setErrorToProgressOrder: (state, action) => {
            state.errorToProgressOrder = action.payload
            state.successToProgressOrder = null
        },
        setLoadingToProgressOrder: (state, action) => {
            state.loadingToProgressOrder = action.payload
        },
        resetToProgressOrder: (state) => {
            state.successToProgressOrder = null
            state.errorToProgressOrder = null
        }
    }
})


const initialToFinishedOrderInternalState = {
    successToFinishedOrder: null,
    errorToFinishedOrder: null,
    loadingToFinishedOrder: false,
}
export const toFinishedOrderInternalSlice = createSlice({
    name: 'toFinishedOrder',
    initialState: initialToFinishedOrderInternalState,
    reducers: {
        setSuccessToFinishedOrder: (state, action) => {
            state.successToFinishedOrder = action.payload
            state.errorToFinishedOrder = null
        },
        setErrorToFinishedOrder: (state, action) => {
            state.errorToFinishedOrder = action.payload
            state.successToFinishedOrder = null
        },
        setLoadingToFinishedOrder: (state, action) => {
            state.loadingToFinishedOrder = action.payload
        },
        resetToFinishedOrder: (state) => {
            state.successToFinishedOrder = null
            state.errorToFinishedOrder = null
        }
    }
})


const initialUpdateDataEmployeeInternalState = {
    successUpdateDataEmployee: null,
    errorUpdateDataEmployee: null,
    errorFieldUpdateDataEmployee: null,
    loadingUpdateDataEmployee: false,
}
export const updateDataEmployeeSlice = createSlice({
    name: 'updateDataEmployee',
    initialState: initialUpdateDataEmployeeInternalState,
    reducers: {
        setSuccessUpdateDataEmployee: (state, action) => {
            state.successUpdateDataEmployee = action.payload
            state.errorUpdateDataEmployee = null
        },
        setErrorUpdateDataEmployee: (state, action) => {
            state.errorUpdateDataEmployee = action.payload.error
            state.errorFieldUpdateDataEmployee = action.payload.errorField
            state.successUpdateDataEmployee = null
        },
        setLoadingUpdateDataEmployee: (state, action) => {
            state.loadingUpdateDataEmployee = action.payload
        },
        resetUpdateDataEmployee: (state) => {
            state.successUpdateDataEmployee = null
            state.errorUpdateDataEmployee = null
            state.errorFieldUpdateDataEmployee = null
        }
    }
})

const initialChangePasswordInternalState = {
    successChangePassword: null,
    errorChangePassword: null,
    loadingChangePassword: false,
    errorValidatePassword: null,
    errorValidateNewPassword: null,
}
export const changePasswordInternalSlice = createSlice({
    name: 'changePasswordInteral',
    initialState: initialChangePasswordInternalState,
    reducers: {
        setSuccessChangePasswordInternal: (state, action) => {
            state.successChangePassword = action.payload
            state.errorChangePassword = null
            state.errorValidatePassword = null
            state.errorValidateNewPassword = null
        },
        setErrorChangePasswordInteral: (state, action) => {
            state.errorChangePassword = action.payload.error
            state.errorValidatePassword = action.payload.password
            state.errorValidateNewPassword = action.payload.newPassword
            state.successChangePassword = null
        },
        setLoadingChangePasswordInternal: (state, action) => {
            state.loadingChangePassword = action.payload
        },
        resetChangePasswordInternal: (state) => {
            state.successChangePassword = null
            state.errorChangePassword = null
            state.errorValidatePassword = null
            state.errorValidateNewPassword = null
        }
    }
})

const initialChangePasswordEmployeeStore = {
    successChangePasswordEmployee: null,
    errorFieldsChangePasswordEmployee: null,
    errorChangePasswordEmployee: null,
    loadingChangePasswordEmployee: false,
}
export const changePasswordEmployeeSlice = createSlice({
    name: 'changePasswordEmployee',
    initialState: initialChangePasswordEmployeeStore,
    reducers: {
        setSuccessChangePasswordEmployee: (state, action) => {
            state.successChangePasswordEmployee = action.payload
        },
        setErrorChangePasswordEmployee: (state, action) => {
            state.errorFieldsChangePasswordEmployee = action.payload.errorField
            state.errorChangePasswordEmployee = action.payload.error
        },
        setLoadingChangePasswordEmployee: (state, action) => {
            state.loadingChangePasswordEmployee = action.payload
        },
        resetChangePasswordEmployee: (state) => {
            state.errorFieldsChangePasswordEmployee = null
            state.errorChangePasswordEmployee = null
            state.successChangePasswordEmployee = null
        }
    }
})


