import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  TextInput, 
  FlatList, 
  Text, 
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Header } from '@/components/ui/Header';
import { ProductCard, Product } from '@/components/product/ProductCard';
import { X, Search as SearchIcon, Filter } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

// Sample product data
const allProducts: Product[] = [
  {
    id: '1',
    name: 'Summer Floral Dress',
    price: 79.99,
    discountPrice: 59.99,
    image: 'https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg',
    category: 'Women',
    isNew: true,
  },
  {
    id: '2',
    name: 'Casual Denim Jacket',
    price: 89.99,
    image: 'https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg',
    category: 'Men',
  },
  {
    id: '3',
    name: 'White Sneakers',
    price: 69.99,
    discountPrice: 49.99,
    image: 'https://images.pexels.com/photos/1280064/pexels-photo-1280064.jpeg',
    category: 'Shoes',
  },
  {
    id: '4',
    name: 'Leather Watch',
    price: 159.99,
    image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg',
    category: 'Accessories',
    isNew: true,
  },
  {
    id: '5',
    name: 'Classic T-Shirt',
    price: 29.99,
    image: 'https://images.pexels.com/photos/5384423/pexels-photo-5384423.jpeg',
    category: 'Men',
  },
  {
    id: '6',
    name: 'Summer Hat',
    price: 24.99,
    image: 'https://images.pexels.com/photos/984619/pexels-photo-984619.jpeg',
    category: 'Accessories',
  },
];

// Popular search terms
const popularSearches = [
  'Summer dress', 'Denim jacket', 'Sneakers', 'Watch',
  'T-shirt', 'Hat', 'Sunglasses', 'Sandals'
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }
    
    setIsSearching(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const results = allProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
      
      setSearchResults(results);
      setHasSearched(true);
      setIsSearching(false);
    }, 500);
  };
  
  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setHasSearched(false);
  };
  
  const handlePopularSearch = (term: string) => {
    setSearchQuery(term);
    handleSearch(term);
  };

  return (
    <View style={styles.container}>
      <Header showBack title="Search" />
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <SearchIcon 
            size={20} 
            color={Colors.text.secondary} 
            style={styles.searchIcon} 
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for products..."
            value={searchQuery}
            onChangeText={handleSearch}
            autoFocus
            returnKeyType="search"
            onSubmitEditing={() => handleSearch(searchQuery)}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={clearSearch}
            >
              <X size={18} color={Colors.text.secondary} />
            </TouchableOpacity>
          )}
        </View>
        
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={22} color={Colors.text.primary} />
        </TouchableOpacity>
      </View>
      
      {isSearching ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary.dark} />
        </View>
      ) : hasSearched ? (
        <Animated.View 
          style={styles.resultsContainer}
          entering={FadeIn.duration(300)}
        >
          <Text style={styles.resultsTitle}>
            {searchResults.length === 0 
              ? 'No results found' 
              : `${searchResults.length} results for "${searchQuery}"`}
          </Text>
          
          <FlatList
            data={searchResults}
            keyExtractor={item => item.id}
            numColumns={2}
            renderItem={({ item }) => (
              <ProductCard product={item} />
            )}
            contentContainerStyle={styles.resultsGrid}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.noResultsContainer}>
                <Text style={styles.noResultsText}>
                  No products found matching "{searchQuery}"
                </Text>
                <Text style={styles.tryAgainText}>
                  Try a different search term or browse categories
                </Text>
              </View>
            }
          />
        </Animated.View>
      ) : (
        <View style={styles.popularSearchesContainer}>
          <Text style={styles.popularSearchesTitle}>Popular Searches</Text>
          <View style={styles.popularSearchesList}>
            {popularSearches.map((term, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.popularSearchItem}
                onPress={() => handlePopularSearch(term)}
              >
                <Text style={styles.popularSearchText}>{term}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral.light,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: Colors.text.primary,
  },
  clearButton: {
    padding: 4,
  },
  filterButton: {
    padding: 8,
    backgroundColor: Colors.neutral.light,
    borderRadius: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsContainer: {
    flex: 1,
    paddingTop: 16,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  resultsGrid: {
    paddingHorizontal: 8,
  },
  noResultsContainer: {
    padding: 24,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  tryAgainText: {
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  popularSearchesContainer: {
    padding: 16,
  },
  popularSearchesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 16,
  },
  popularSearchesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  popularSearchItem: {
    backgroundColor: Colors.neutral.light,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    margin: 4,
  },
  popularSearchText: {
    fontSize: 14,
    color: Colors.text.primary,
  },
});