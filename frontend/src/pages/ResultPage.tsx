import { useParams, useNavigate } from 'react-router-dom';
import { useBooking } from '../hooks/useBooking';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import { Check } from 'lucide-react';

const ResultPage = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  
  // Use React Query hook - automatically caches booking data
  const { data: booking, isLoading, isError } = useBooking(bookingId);

  if (isLoading) return <><Navbar /><LoadingSpinner /></>;
  if (isError || !booking) return <><Navbar /><div className="text-center py-20">Booking not found</div></>;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-2xl mx-auto px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6">
            <Check className="h-10 w-10 text-white stroke-[3]" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed</h1>
          <p className="text-gray-600 mb-8">Ref ID: {booking._id.slice(-8).toUpperCase()}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium px-6 py-2.5 rounded transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
