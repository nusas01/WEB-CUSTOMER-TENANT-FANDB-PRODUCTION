import { verificationSignupCustomer } from "../actions/post"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import {SpinnerFixed} from "../helper/spinner"
import { useNavigate } from "react-router-dom"
import { verificationSignupCustomerSlice } from "../reducers/post"
import { OrderTypeInvalidAlert, Toast, ToastPortal } from "./alert"
import { setIsClose } from "../reducers/reducers"
import { AlertTriangle, MailWarning } from "lucide-react"

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

                {/* Invalid Order Type */}
                {orderTypeInvalid && (
                <OrderTypeInvalidAlert
                    onClose={() => {
                    setOrderTypeInvalid(false);
                    dispatch(setIsClose(true));
                    }}
                />
                )}

                {/* Card container */}
                <div className="w-full max-w-md">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-10 sm:px-8 text-center">
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                        Check Your Email
                    </h2>
                    <p className="text-white text-xs sm:text-sm mt-1">
                        Enter the code we sent to verify your account
                    </p>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-6 sm:px-8 sm:py-8">

                    {/* Alert Boxes */}
                    <div className="mb-6 space-y-4">

                        {/* Expiry box */}
                        <div className="bg-amber-100 border border-amber-300 p-4 rounded-xl shadow-sm">
                        <div className="flex items-start space-x-3">
                            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                            <div>
                            <p className="text-sm font-semibold text-amber-900">
                                Kode kedaluwarsa dalam 3 menit
                            </p>
                            <p className="text-xs text-amber-800 mt-0.5 leading-snug">
                                Pastikan Anda memasukkan kode sebelum waktu habis.
                            </p>
                            </div>
                        </div>
                        </div>

                        {/* Spam box */}
                        <div className="bg-blue-100 border border-blue-300 p-4 rounded-xl shadow-sm">
                        <div className="flex items-start space-x-3">
                            <MailWarning className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                            <p className="text-sm font-semibold text-blue-900">
                                Tidak menerima kode?
                            </p>

                            <p className="text-xs text-blue-800 mt-0.5 leading-snug">
                                Hampir selalu masuk ke folder 
                                <span className="font-semibold"> Spam / Junk / Promotions</span>.
                            </p>

                            <p className="mt-1 text-xs text-blue-900 font-medium">Cara cek cepat:</p>
                            <ul className="ml-4 mt-0.5 list-disc text-xs text-blue-800 space-y-0.5">
                                <li>Buka aplikasi email</li>
                                <li>Pilih folder <span className="font-semibold">Spam</span> atau <span className="font-semibold">Promotions</span></li>
                                <li>Cari pesan terbaru dari kami</li>
                            </ul>
                            </div>
                        </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Code Input */}
                        <div>
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
                            className={`w-full px-4 py-3 sm:py-4 text-center text-xl sm:text-2xl font-bold tracking-widest border-2 rounded-xl bg-gray-50 text-gray-900 focus:outline-none focus:ring-4 focus:bg-white transition-all ${
                            ErrorField
                                ? "border-red-500 focus:ring-red-200"
                                : "border-gray-200 focus:ring-blue-200"
                            }`}
                        />

                        {ErrorField && (
                            <p className="text-red-600 text-sm mt-2 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            {ErrorField}
                            </p>
                        )}
                        </div>

                        {/* Submit Button */}
                        <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 sm:py-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-green-200 shadow-lg"
                        >
                        Verify Account
                        </button>
                    </form>
                    </div>
                </div>
                </div>

                {spinner && <SpinnerFixed colors="fill-blue-600" />}
            </div>
        </div>
    );
}
