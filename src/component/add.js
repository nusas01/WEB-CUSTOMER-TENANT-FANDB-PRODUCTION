import "../style/add.css"
import { useState } from 'react'
import { useDispatch } from "react-redux"
import { addItem, addItemCashier } from "../reducers/cartSlice"

// type CUSTOMER, INTERNAL
export const AddProductToCart = ({ onClose, id, name, desc, harga, image, type }) => {
  const [quantity, setQuantity] = useState(1)
  const [notes, setNotes] = useState('')
  const amountPrice = quantity * harga

  const handleIncrement = () => setQuantity(prev => prev + 1)
  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1))

  const dispatch = useDispatch()

  const handleAddItem = (name, harga, image, amountPrice, quantity) => {
      const newItem = {id, name, harga, image, notes, amountPrice, quantity}
      if (type === "CUSTOMER") {
        dispatch(addItem(newItem))
      }
      if (type === "INTERNAL") {
        dispatch(addItemCashier(newItem))
      }
      onClose()
  }

  const handleQuantityChange = (e) => {
    const value = e.target.value
    if (value === '0') {
      setQuantity(1)
      return
    }
    setQuantity(value === '' ? '' : Number(value))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-20">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl w-full max-w-md transform transition-all max-h-[95vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-3 xs:p-4 sm:p-6 border-b rounded-t-xl sm:rounded-t-2xl">
          <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-800">Tambah ke Keranjang</h3>
        </div>
        
        {/* Modal Body */}
        <div className="p-3 xs:p-4 sm:p-6 space-y-3 sm:space-y-4">
          {/* Product Image */}
          <div className="w-full">
            <img 
              src={`https://assets.nusas.id/${image}`} 
              alt="Product" 
              className="w-full h-32 xs:h-40 sm:h-48 rounded-lg sm:rounded-xl object-cover"
            />
          </div>
          
          {/* Product Info */}
          <div className="flex flex-col space-y-1 sm:space-y-2">
            <h4 className="text-base xs:text-lg sm:text-xl font-semibold text-gray-800 line-clamp-2">{name}</h4>
            <p className="text-xs xs:text-sm sm:text-base text-gray-600 line-clamp-2">{desc}</p>
            <p className="text-sm xs:text-base sm:text-lg font-medium text-gray-800">
              Rp {(harga).toLocaleString('id-ID')}
            </p>
          </div>
          
          {/* Quantity Selector */}
          <div className="space-y-1 sm:space-y-2">
            <label className="text-xs xs:text-sm font-medium text-gray-700">Jumlah</label>
            <div className="flex items-center gap-2 sm:gap-3">
              <button 
                onClick={handleDecrement}
                className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-base xs:text-lg sm:text-xl font-medium flex items-center justify-center"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-12 xs:w-16 sm:w-20 text-center border-0 text-base xs:text-lg sm:text-xl font-medium focus:ring-0 p-0"
                min="1"
              />
              <button 
                onClick={handleIncrement}
                className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-base xs:text-lg sm:text-xl font-medium flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Additional Notes */}
          <div className="space-y-1 sm:space-y-2">
            <label className="text-xs xs:text-sm font-medium text-gray-700">Catatan</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional"
              className="w-full p-2 xs:p-2.5 sm:p-3 border rounded-lg text-xs xs:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows="3"
            />
          </div>
        </div>
        
        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-white p-3 xs:p-4 sm:p-6 border-t flex flex-col xs:flex-row justify-end gap-2 xs:gap-3 rounded-b-xl sm:rounded-b-2xl">
          <button
            onClick={onClose}
            className="w-full xs:w-auto px-4 xs:px-6 py-2 xs:py-2.5 text-xs xs:text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors order-2 xs:order-1"
          >
            Batal
          </button>
          <button
            className={`w-full xs:w-auto px-4 xs:px-6 py-2 xs:py-2.5 text-xs xs:text-sm font-medium text-white rounded-lg ${type === "CUSTOMER" ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-800 hover:bg-gray-900'} transition-colors order-1 xs:order-2`}
            onClick={() => handleAddItem(name, harga, image, amountPrice, quantity)}
          >
            <span className="hidden xs:inline">Tambah ke Keranjang - </span>
            <span className="xs:hidden">Tambah - </span>
            Rp {(amountPrice).toLocaleString('id-ID')}
          </button>
        </div>
      </div>
      
      <style jsx>{`
        @media (max-width: 360px) {
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }
        
        /* Custom breakpoint for xs (360px+) */
        @media (min-width: 360px) {
          .xs\:p-4 { padding: 1rem; }
          .xs\:p-2\.5 { padding: 0.625rem; }
          .xs\:text-xl { font-size: 1.25rem; line-height: 1.75rem; }
          .xs\:text-lg { font-size: 1.125rem; line-height: 1.75rem; }
          .xs\:text-sm { font-size: 0.875rem; line-height: 1.25rem; }
          .xs\:text-base { font-size: 1rem; line-height: 1.5rem; }
          .xs\:h-40 { height: 10rem; }
          .xs\:w-9 { width: 2.25rem; }
          .xs\:h-9 { height: 2.25rem; }
          .xs\:w-16 { width: 4rem; }
          .xs\:flex-row { flex-direction: row; }
          .xs\:w-auto { width: auto; }
          .xs\:py-2\.5 { padding-top: 0.625rem; padding-bottom: 0.625rem; }
          .xs\:px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
          .xs\:order-1 { order: 1; }
          .xs\:order-2 { order: 2; }
          .xs\:inline { display: inline; }
          .xs\:hidden { display: none; }
        }
        
        /* Hide scrollbar but keep functionality */
        .overflow-y-auto::-webkit-scrollbar {
          width: 0px;
        }
        
        .overflow-y-auto {
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}