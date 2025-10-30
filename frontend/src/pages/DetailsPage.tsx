import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useExperience } from '../hooks/useExperiences';
import { Slot } from '../types';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import { ArrowLeft, Minus, Plus } from 'lucide-react';
import { format } from 'date-fns';

const DetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  
  // Use React Query hook - automatically caches and manages the experience data
  const { data: experience, isLoading, isError } = useExperience(id);

  const handleBooking = () => {
    if (!selectedSlot || !experience) return;
    navigate('/checkout', {
      state: {
        experience,
        selectedSlot,
        numberOfPeople,
      },
    });
  };

  if (isLoading) return <><Navbar /><LoadingSpinner /></>;
  if (isError || !experience) return <><Navbar /><div className="text-center py-20">Experience not found</div></>;

  const subtotal = selectedSlot ? selectedSlot.price * numberOfPeople : 0;
  const taxes = Math.round(subtotal * 0.06);
  const total = subtotal + taxes;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
        <button onClick={() => navigate(-1)} className="flex items-center text-gray-700 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200 px-3 py-2 rounded-lg transition-all duration-150 active:scale-95 mb-6">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span className="font-medium">Details</span>
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-xl overflow-hidden mb-6">
              <img src={experience.images[0]} alt={experience.title} className="w-full h-80 object-cover" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">{experience.title}</h1>
            <p className="text-gray-600 leading-relaxed mb-6">{experience.description}</p>
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Choose date</h3>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {experience.slots.map((slot, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedSlot(slot)}
                    disabled={slot.availableSpots === 0}
                    className={`px-4 py-2 rounded border whitespace-nowrap transition-all duration-150 ${
                      selectedSlot === slot 
                        ? 'bg-primary-300 border-primary-400 text-gray-900 font-medium scale-105' 
                        : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 active:scale-95'
                    } ${slot.availableSpots === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {format(new Date(slot.date), 'MMM dd')}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Starts at</span>
                  <span className="text-xl font-bold text-gray-900">₹{experience.basePrice}</span>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-2">Quantity</label>
                <div className="flex items-center justify-between border border-gray-300 rounded px-4 py-2 bg-white">
                  <button
                    onClick={() => setNumberOfPeople(Math.max(1, numberOfPeople - 1))}
                    className="text-gray-600 hover:text-gray-900 hover:bg-gray-200 active:bg-gray-300 rounded p-1 transition-all duration-150 active:scale-90"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="font-medium">{numberOfPeople}</span>
                  <button
                    onClick={() => setNumberOfPeople(numberOfPeople + 1)}
                    className="text-gray-600 hover:text-gray-900 hover:bg-gray-200 active:bg-gray-300 rounded p-1 transition-all duration-150 active:scale-90"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {selectedSlot && (
                <>
                  <div className="border-t border-gray-200 pt-4 mb-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Taxes</span>
                      <span className="font-medium">₹{taxes}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-4 pt-4 border-t border-gray-200">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-2xl font-bold text-gray-900">₹{total}</span>
                  </div>
                  <button 
                    onClick={handleBooking} 
                    className="w-full bg-primary-300 hover:bg-primary-400 active:bg-primary-500 text-gray-900 font-bold py-3 rounded-lg transition-all duration-150 active:scale-98 shadow-sm hover:shadow-md"
                  >
                    Confirm Booking
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
