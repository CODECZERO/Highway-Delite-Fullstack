import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { bookingAPI } from '../services/api';
import { Booking, BookingData } from '../types';

/**
 * Custom hook to fetch a booking by ID
 * @param id - Booking ID
 */
export const useBooking = (id: string | undefined) => {
  return useQuery<Booking, Error>({
    queryKey: ['booking', id],
    queryFn: () => bookingAPI.getById(id!),
    enabled: !!id,
    staleTime: 1 * 60 * 1000, // 1 minute (bookings change less frequently)
  });
};

/**
 * Custom hook to create a booking
 * Uses mutation for POST requests
 */
export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation<Booking, Error, BookingData>({
    mutationFn: bookingAPI.create,
    onSuccess: (data: Booking) => {
      // Invalidate and refetch experiences to update available spots
      queryClient.invalidateQueries({ queryKey: ['experiences'] });
      queryClient.invalidateQueries({ queryKey: ['experience', data.experienceId] });
    },
  });
};
