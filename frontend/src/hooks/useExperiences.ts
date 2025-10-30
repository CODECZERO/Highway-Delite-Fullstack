import { useQuery } from '@tanstack/react-query';
import { experienceAPI } from '../services/api';
import { Experience } from '../types';

/**
 * Custom hook to fetch all experiences with caching
 * Uses React Query to prevent unnecessary API calls
 */
export const useExperiences = () => {
  return useQuery<Experience[], Error>({
    queryKey: ['experiences'], // Unique key for this query
    queryFn: experienceAPI.getAll, // Function to fetch data
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
  });
};

/**
 * Custom hook to fetch a single experience by ID
 * @param id - Experience ID
 */
export const useExperience = (id: string | undefined) => {
  return useQuery<Experience, Error>({
    queryKey: ['experience', id], // Unique key with ID
    queryFn: () => experienceAPI.getById(id!),
    enabled: !!id, // Only run query if ID exists
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
