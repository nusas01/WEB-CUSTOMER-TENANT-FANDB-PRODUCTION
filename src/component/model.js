import React, { useState, useEffect } from "react"
import { useOutsideClick } from "../helper/helper"
import { 
  X, 
  AlertTriangle, 
  Trash2,
  Store,
  MapPin,
  ChevronDown,
  Star,
  Clock,
  Share2,
  UtensilsCrossed,
  ShoppingBag,
  AlertCircle,
} from "lucide-react"
import { useRef } from "react"
import {
  storeInfoCustomerSlice
} from "../reducers/reducers"
import { useDispatch, useSelector } from "react-redux"
import { fetchNumberTableCustomer } from "../actions/get"

export const ModalConfirm = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-lg font-bold text-gray-800">Are you sure?</h2>
        <p className="text-gray-600 mt-2">{message}</p>

        {/* Tombol Aksi */}
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}


export const AccessDeniedModal = ({
  isOpen,
  onClose,
  title = "Akses Ditolak",
  message = "Anda tidak memiliki izin untuk mengakses fitur ini. Silakan hubungi administrator.",
  buttonText = "Mengerti"
}) => {
  const modalRef = useRef(null)

  // panggil custom hook
  useOutsideClick({ ref: modalRef, callback: onClose, isActive: isOpen })

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] flex bg-gray-900 bg-opacity-50 items-center justify-center">
      {/* Backdrop - perlu positioning yang benar */}
      <div className="shadow-sm w-full max-w-md">
        {/* Modal Content - perlu z-index lebih tinggi dari backdrop */}
        <div
          ref={modalRef}
          className="relative z-10 bg-white rounded-lg shadow-xl max-w-sm w-full mx-4"
        >
          <div className="p-6">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
            
            {/* Content */}
            <div className="flex flex-col items-center text-center">
              <div className="flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {title}
              </h3>
              <p className="text-sm text-gray-600 mb-6">{message}</p>
              <button
                onClick={onClose}
                className="w-full px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
              >
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const DeleteEmployeeConfirmation = ({ 
  employeeId, 
  onConfirm, 
  onCancel 
}) => {
  return (
    <div className="fixed inset-0 z-[9999] flex bg-gray-900 bg-opacity-50 items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            <h3 className="text-lg font-semibold text-gray-900">
              Konfirmasi Penghapusan
            </h3>
          </div>
          <button 
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Body */}
        <div className="p-6">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 p-3 rounded-full">
              <Trash2 className="w-8 h-8 text-red-600" />
            </div>
          </div>
          
          <p className="text-gray-700 text-center mb-2">
            Anda akan menghapus data karyawan dengan ID:
          </p>
          <div className="bg-gray-100 rounded-lg py-3 px-4 mb-4">
            <p className="text-gray-900 font-mono text-center font-bold text-lg">
              {employeeId}
            </p>
          </div>
          <p className="text-red-600 text-center text-sm">
            Jika sudah terhapus tindakan ini tidak dapat dibatalkan!
          </p>
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Hapus Karyawan
          </button>
        </div>
      </div>
    </div>
  )
}

export const ModernStoreBrand = ({ 
  storeName,
  location,
  isOpen = true,
  rating = 4.8,
  totalReviews = 1234,
  phone
}) => {
  const dispatch = useDispatch()

  const { setStoreInfoCustomer: setIsMinimized, setModelPosition} = storeInfoCustomerSlice.actions
  const { statusStoreInfo: isMinimized, modelPosition} = useSelector((state) => state.persisted.storeInfoCustomer)

  useEffect(() => {
    if (!modelPosition || Object.keys(modelPosition).length === 0) {
      dispatch(setModelPosition({ x: 25, y: 70 }))
    }
  }, [dispatch])

  const {
    numberTable,
    loading: tableLoading,
    error: tableError,
  } = useSelector((state) => state.persisted.getNumberTableCustomer)

  const { tableId, orderTakeAway } = useSelector((state) => state.persisted.orderType)

  useEffect(() => {
    if (tableId && !numberTable) {
      dispatch(fetchNumberTableCustomer(tableId))
    }
  }, [tableId, dispatch])

  // Handle share location to WhatsApp
  const handleShareToWhatsApp = () => {
    const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`

    const message = [
      `🏬 *${storeName}*`,
      `📍 Lokasi: ${location}`,
      `⭐ Rating: ${rating} (${totalReviews.toLocaleString()} ulasan)`,
      `🕒 Status: ${isOpen ? 'Buka' : 'Tutup'} (10:00 - 22:00)`,
      '',
      `Lihat di Google Maps: ${googleMapsLink}`,
      '',
      `Kunjungi sekarang dan rasakan pelayanan terbaik dari kami! ✨`
    ].join('\n')

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  // Determine if we should show table section
  const isValidTable = numberTable && !tableError && !tableLoading

  const elRef = useRef(null)
  const dragging = useRef(false)
  const offsetRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Pas mount, set posisi awal dari Redux
    if (elRef.current) {
      elRef.current.style.transform = `translate3d(${modelPosition.x}px, ${modelPosition.y}px, 0)`
    }
  }, [modelPosition])

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current) return
      e.preventDefault()

      const clientX = e.clientX ?? e.touches?.[0]?.clientX
      const clientY = e.clientY ?? e.touches?.[0]?.clientY

      const newX = clientX - offsetRef.current.x
      const newY = clientY - offsetRef.current.y

      if (elRef.current) {
        elRef.current.style.transform = `translate3d(${newX}px, ${newY}px, 0)`
      }

      dispatch(setModelPosition({ x: newX, y: newY }))
    }

    const onEnd = () => {
      if (!dragging.current) return
      dragging.current = false
      if (elRef.current) {
        elRef.current.style.cursor = 'grab'
      }
    }

    window.addEventListener('mousemove', onMove, { passive: false })
    window.addEventListener('mouseup', onEnd)
    window.addEventListener('touchmove', onMove, { passive: false })
    window.addEventListener('touchend', onEnd)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onEnd)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onEnd)
    }
  }, [dispatch])

  const onStart = (e) => {
    e.preventDefault()
    dragging.current = true

    const clientX = e.clientX ?? e.touches?.[0]?.clientX
    const clientY = e.clientY ?? e.touches?.[0]?.clientY

    const rect = elRef.current.getBoundingClientRect()
    offsetRef.current = {
      x: clientX - rect.left,
      y: clientY - rect.top
    }

    if (elRef.current) {
      elRef.current.style.cursor = 'grabbing'
    }
  }
  
  return (
    <div
      ref={elRef}
      onMouseDown={onStart}
      onTouchStart={onStart}
      style={{
        position: "fixed",
        top: "20px",
        left: "20px",
        transform: `translate3d(${modelPosition.x}px, ${modelPosition.y}px, 0)`,
        zIndex: 20,
        cursor: "grab",
        touchAction: "none",
        willChange: "transform",
        userSelect: "none",
      }}
    >
      <div className="relative group select-none">
        <div
          className={`relative bg-white/95 backdrop-blur-sm border border-gray-200 shadow-lg overflow-hidden pointer-events-auto ${
            isMinimized ? "rounded-xl w-[70px]" : "rounded-2xl w-[260px]"
          } transition-all duration-300`}
        >
          {/* Gradient top bar */}
          <div className="h-0.5 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
          </div>

          {/* MINIMIZED VIEW */}
          {isMinimized ? (
            <div className="p-3 flex flex-col items-center gap-1">
              <button
                onClick={() => dispatch(setIsMinimized(false))}
                className="flex flex-col items-center gap-1"
                aria-label="Expand store info"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg blur-md opacity-40" />
                  <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-lg">
                    <Store className="w-4 h-4 text-white" strokeWidth={2.5} />
                  </div>
                </div>

                {isOpen && (
                  <div className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                  </div>
                )}

                {isValidTable && (
                  <div className="bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                    {numberTable}
                  </div>
                )}

                <ChevronDown className="w-4.2 h-4.2 text-gray-400 rotate-90" strokeWidth={2.5} />
              </button>
            </div>
          ) : (
            /* EXPANDED VIEW */
            <div className="p-4">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  dispatch(setIsMinimized(true))
                }}
                className="absolute top-2 right-2 z-10 p-1 bg-gray-100 hover:bg-gray-200 rounded-md border border-gray-200 transition-all duration-200 btn-minimize"
                aria-label="Minimize"
              >
                <ChevronDown className="w-4.2 h-4.2 text-gray-600 -rotate-90" strokeWidth={2.5} />
              </button>

              <div className="flex items-start gap-2 mb-3 pr-6">
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg blur-md opacity-40" />
                  <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 p-1.5 rounded-lg">
                    <Store className="w-4 h-4 text-white" strokeWidth={2.5} />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h1 className="text-sm font-bold text-gray-900 mb-0.5 truncate">{storeName}</h1>
                  <div className="flex items-center gap-1 text-gray-600 mb-1">
                    <MapPin className="w-3 h-3 text-green-500 flex-shrink-0" strokeWidth={2.5} />
                    <span className="text-[10px] truncate">{location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-0.5 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/50">
                      <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" strokeWidth={2.5} />
                      <span className="text-[10px] font-bold text-amber-700">{rating}</span>
                    </div>
                    <span className="text-[9px] text-gray-500">({totalReviews.toLocaleString()})</span>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-100">
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold ${
                    isOpen
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  <Clock className="w-3 h-3" strokeWidth={2.5} />
                  <span>{isOpen ? "Buka" : "Tutup"}</span>
                </div>
                <div className="text-[9px] text-gray-600">
                  <span className="font-medium">10:00</span> - <span className="font-medium">22:00</span>
                </div>
              </div>

              {/* Table Info */}
              <div className="mb-2 pb-2 border-b border-gray-100">
                {orderTakeAway ? (
                  <div className="bg-gradient-to-br from-amber-500 to-yellow-600 rounded-lg p-2 text-white text-xs font-medium">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <ShoppingBag className="w-3.5 h-3.5" strokeWidth={2.5} />
                        <span>Take Away</span>
                      </div>
                      <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded">Verified</span>
                    </div>
                  </div>
                ) : tableId && numberTable ? (
                  <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg p-2 text-white text-xs font-medium">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <UtensilsCrossed className="w-3.5 h-3.5" strokeWidth={2.5} />
                        <span>Meja {numberTable}</span>
                      </div>
                      <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded">Verified</span>
                    </div>
                  </div>
                ) : (
                  <div className="px-2 py-1.5 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start gap-1">
                      <AlertCircle className="w-3.5 h-3.5 text-red-600 mt-0.5" strokeWidth={2.5} />
                      <p className="text-[9px] text-red-700">
                        Gagal memuat data meja. Coba scan ulang QR code.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Share */}
              <button
                onClick={handleShareToWhatsApp}
                className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 active:scale-95 transition-transform"
              >
                <Share2 className="w-3.5 h-3.5" strokeWidth={2.5} />
                Bagikan Lokasi
              </button>

              <div className="mt-2 flex justify-center text-[9px] text-gray-500 gap-1 items-center">
                <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                <span>Verified Store</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  )
}