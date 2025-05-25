import { API_ENDPOINTS } from '../api_endpoints';

export const deleteReview = (token: string, productId: string, reviewId: string) => fetch(API_ENDPOINTS.reviews.delete(productId, reviewId), {
  method: 'DELETE',
  headers: { Authorization: `Bearer ${token}` },
}); 