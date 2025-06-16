import { privateInstance } from '../axiosInstance';
import { API_ENDPOINTS } from '../api_endpoints';

export const deleteReview = (productId: string, reviewId: string) => privateInstance.delete(API_ENDPOINTS.reviews.delete(productId, reviewId)); 