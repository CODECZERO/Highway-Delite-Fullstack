import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCreateBooking } from '../hooks/useBooking';
import { useValidatePromo } from '../hooks/usePromoCode';
import Navbar from '../components/Navbar';
import { ArrowLeft, Loader2 } from 'lucide-react';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { experience, selectedSlot, numberOfPeople } = location.state || {};

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [error, setError] = useState('');
  
  // React Query mutations
  const createBookingMutation = useCreateBooking();
  const validatePromoMutation = useValidatePromo();

  if (!experience || !selectedSlot) {
    return <><Navbar /><div className="text-center py-20">Invalid booking data</div></>;
  }

  const subtotal = selectedSlot.price * numberOfPeople;
  const total = subtotal - discount;

  const handlePromoCode = () => {
    if (!promoCode) return;
    setError('');
    
    validatePromoMutation.mutate(
      { code: promoCode, subtotal },
      {
        onSuccess: (result) => {
          setDiscount(result.discount);
          setPromoApplied(true);
        },
        onError: (err: any) => {
          setError(err.response?.data?.message || 'Invalid promo code');
          setDiscount(0);
          setPromoApplied(false);
        },
      }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const bookingData = {
      experienceId: experience._id,
      slotDate: selectedSlot.date,
      slotTime: selectedSlot.startTime,
      numberOfPeople,
      customerName,
      customerEmail,
      customerPhone: customerEmail,
      promoCode: promoApplied ? promoCode : undefined,
      discount,
      subtotal,
      total,
    };

    createBookingMutation.mutate(bookingData, {
      onSuccess: (booking) => {
        navigate(`/result/${booking._id}`);
      },
      onError: (err: any) => {
        setError(err.response?.data?.message || 'Booking failed. Please try again.');
      },
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-6">
        <button onClick={() => navigate(-1)} className="flex items-center text-gray-700 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span className="font-medium">Checkout</span>
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Full name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-100 border-0 rounded text-sm focus:ring-2 focus:ring-primary-300 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="Your name"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-100 border-0 rounded text-sm focus:ring-2 focus:ring-primary-300 focus:bg-white"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    placeholder="Promo code"
                    disabled={promoApplied}
                    className="flex-1 px-4 py-2.5 bg-gray-100 border-0 rounded text-sm focus:ring-2 focus:ring-primary-300 focus:bg-white disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={handlePromoCode}
                    disabled={validatePromoMutation.isPending || promoApplied || !promoCode}
                    className="px-6 py-2.5 bg-black text-white text-sm rounded hover:bg-gray-800 active:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-150 active:scale-95"
                  >
                    {validatePromoMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Apply'}
                  </button>
                </div>
                <label className="flex items-center text-sm text-gray-600">
                  <input type="checkbox" required className="mr-2" />
                  I agree to the terms and safety policy
                </label>
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              {promoApplied && <p className="text-green-600 text-sm">Promo code applied!</p>}
            </form>
          </div>
          <div>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm text-gray-600">Experience</span>
                  <span className="font-semibold text-right">{experience.title}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Date</span>
                  <span className="font-medium">{new Date(selectedSlot.date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Time</span>
                  <span className="font-medium">{selectedSlot.startTime}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-600">Qty</span>
                  <span className="font-medium">{numberOfPeople}</span>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Taxes</span>
                  <span className="font-medium">₹{Math.round(subtotal * 0.06)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold">₹{total - discount + Math.round(subtotal * 0.06)}</span>
              </div>
              <button
                onClick={handleSubmit}
                disabled={createBookingMutation.isPending}
                className="w-full mt-6 bg-primary-300 hover:bg-primary-400 active:bg-primary-500 text-gray-900 font-bold py-3 rounded-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center active:scale-98 shadow-sm hover:shadow-md"
              >
                {createBookingMutation.isPending ? <><Loader2 className="h-5 w-5 animate-spin mr-2" />Processing...</> : 'Pay and Confirm'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
