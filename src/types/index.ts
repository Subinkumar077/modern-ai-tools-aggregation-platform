export interface AITool {
  id: string;
  name: string;
  description: string;
  category: string;
  price: 'free' | 'freemium' | 'paid';
  rating: number;
  reviewCount: number;
  imageUrl: string;
  websiteUrl: string;
  features: string[];
  pros: string[];
  cons: string[];
  pricingDetails: string;
  dateAdded: string;
  trending: boolean;
  topRated: boolean;
}

export type SortOption = 'trending' | 'topRated' | 'latest' | 'alphabetical';
export type FilterCategory = 'all' | 'chatbots' | 'image-ai' | 'code-generators' | 'audio-ai' | 'video-ai' | 'writing-ai' | 'data-analysis';
export type FilterPrice = 'all' | 'free' | 'freemium' | 'paid';

export interface FilterState {
  category: FilterCategory;
  price: FilterPrice;
  search: string;
  sort: SortOption;
}