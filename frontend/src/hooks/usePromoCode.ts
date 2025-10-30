import { useMutation } from '@tanstack/react-query';
import { promoAPI } from '../services/api';
import { PromoCodeValidation } from '../types';

interface ValidatePromoParams {
  code: string;
  subtotal: number;
}

/**
 * Custom hook to validate promo codes
 * Uses mutation since it's a POST request
 */
export const useValidatePromo = () => {
  return useMutation<PromoCodeValidation, Error, ValidatePromoParams>({
    mutationFn: ({ code, subtotal }: ValidatePromoParams) => 
      promoAPI.validate(code, subtotal),
  });
};
