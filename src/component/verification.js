import { verificationSignupCustomer } from "../actions/post"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { SpinnerFixed } from "../helper/spinner"
import { useNavigate } from "react-router-dom"
import { verificationSignupCustomerSlice } from "../reducers/post"
import { OrderTypeInvalidAlert, Toast, ToastPortal } from "./alert"
import { setIsClose } from "../reducers/reducers"
import { Mail, Clock, ShieldCheck, Info, AlertCircle } from "lucide-react"

export default function Verification() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [spinner, setSpinner] = useState(false)
    const [codeInput, setCodeInput] = useState("")
    const [toast, setToast] = useState(null)
    const [orderTypeInvalid, setOrderTypeInvalid] = useState(false)

    const {resetSignupVerificationCustomer} = verificationSignupCustomerSlice.actions
    const {succes, message, error, ErrorField, loading} = useSelector((state) => state.verificationSignupCustomerState)
    
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(verificationSignupCustomer({code: codeInput}))
    }
    
    useEffect(() => {
        if(succes) {
            navigate('/access', {
                state: {
                    data: succes
                }
            })
            dispatch(resetSignupVerificationCustomer()) 
        }
    }, [succes])

    useEffect(() => {
        setSpinner(loading)
    }, [loading])

    useEffect(() => {
        if (message) {
            setToast({
                type: "success",
                message: message,
            })
        }
    }, [message])

    useEffect(() => {
        if (error) {
            setToast({
                type: 'error',
                message: error,
            })
        }
    }, [error])

    const {tableId, orderTakeAway, isClose} = useSelector((state) => state.persisted.orderType)
    useEffect(() => {
        if (tableId === null && orderTakeAway === false && !isClose) {
            setOrderTypeInvalid(true)
            return
        }
    }, [tableId, orderTakeAway, isClose])

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 flex items-center justify-center">
            <div className="max-w-md w-full">
                {/* Toast Notification */}
                {toast && (
                <ToastPortal>
                    <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-[100]">
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => { 
                            setToast(null)
                            dispatch(resetSignupVerificationCustomer()) 
                        }}
                        duration={5000}
                    />
                    </div>
                </ToastPortal>
                )}

                {/* Order Type Invalid Alert */}
                {orderTypeInvalid && (
                <OrderTypeInvalidAlert onClose={() => { 
                    setOrderTypeInvalid(false)
                    dispatch(setIsClose(true))
                }} />
                )}

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    {/* Header with Icon */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                            <ShieldCheck className="w-8 h-8 text-green-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 text-center">Email Verification</h2>
                        <p className="text-sm text-gray-500 mt-1">Secure your account</p>
                    </div>

                    {/* Info Box */}
                    <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-6">
                        <div className="flex items-start gap-3 mb-3">
                            <Mail className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-medium text-gray-700">Check your email</p>
                                <p className="text-xs text-gray-600 mt-1">
                                    We've sent a verification code to your email address. Please enter the code below to verify your account.
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-3 pt-3 border-t border-green-100">
                            <Clock className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-medium text-gray-700">Code expires in 2 minutes</p>
                                <p className="text-xs text-gray-600 mt-1">
                                    Make sure to enter the code before it expires for security purposes.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* New Information Box - Added */}
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-medium text-gray-700">Belum menerima kode?</p>
                                <p className="text-xs text-gray-600 mt-1">
                                    Kami telah mengirimkan kode verifikasi ke email Anda. Jika tidak menerima dalam 5 menit, harap periksa folder <span className="font-medium">Spam</span> atau <span className="font-medium">Promosi</span>, atau hubungi tim dukungan kami.
                                </p>
                            </div>
                        </div>
                    </div>


                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Input Field */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Verification Code
                            </label>
                            <input
                                type="text"
                                value={codeInput}
                                onChange={(e) => setCodeInput(e.target.value)}
                                placeholder="Enter 8-digit code"
                                required
                                maxLength={8}
                                className={`w-full px-4 py-3.5 border rounded-xl bg-white text-gray-900 text-center text-lg font-semibold tracking-widest focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                                    ErrorField ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                }`}
                            />
                            {ErrorField && (
                                <div className="flex items-center gap-2 mt-2">
                                    <Info className="w-4 h-4 text-red-500" />
                                    <p className="text-red-500 text-sm">
                                        {ErrorField}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40"
                        >
                            Verify Account
                        </button>
                    </form>

                    {/* Footer Info */}
                    <div className="mt-6 pt-6 border-t border-gray-100">
                        <p className="text-xs text-center text-gray-500">
                            Didn't receive the code? Check your spam folder or try signing up again.
                        </p>
                    </div>
                </div>

                {/* Spinner */}
                {spinner && <SpinnerFixed colors={'fill-green-500'} />}
            </div>
        </div>
    )
}