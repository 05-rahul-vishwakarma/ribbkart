import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import { Header } from '@/components/ui/Header';
import { Colors } from '@/constants/Colors';
import { ProductCard, Product } from '@/components/product/ProductCard';
import Animated, { FadeIn } from 'react-native-reanimated';

// Sample product data (using the same data from other files)
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

// Extract unique categories
const categories = [...new Set(allProducts.map(product => product.category))];

export default function ProductsScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call with timeout
    setTimeout(() => {
      if (selectedCategory) {
        setFilteredProducts(allProducts.filter(product =>
          product.category === selectedCategory
        ));
      } else {
        setFilteredProducts(allProducts);
      }
      setIsLoading(false);
    }, 300);
  }, [selectedCategory]);

  const handleCategoryPress = (category: string) => {
    setSelectedCategory(prevCategory =>
      prevCategory === category ? null : category
    );
  };

  const handleAddToCart = (id: string) => {
    // Add to cart functionality
    console.log(`Added product ${id} to cart`);
  };

  const handleToggleWishlist = (id: string) => {
    // Toggle wishlist functionality
    console.log(`Toggled wishlist for product ${id}`);
  };

  return (
    <View style={styles.container}>
      <Header
        title="All Products"
        showBack
        showCart
        cartItemCount={3}
        onSearchPress={() => router.push('/search')}
      />

      <View style={styles.content}>
        {/* Categories Section */}
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScrollContent}
          >
            <TouchableOpacity
              style={[
                styles.categoryChip,
                selectedCategory === null && styles.selectedCategoryChip
              ]}
              onPress={() => setSelectedCategory(null)}
            >
              <Text style={[
                styles.categoryChipText,
                selectedCategory === null && styles.selectedCategoryChipText
              ]}>
                All
              </Text>
            </TouchableOpacity>

            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryChip,
                  selectedCategory === category && styles.selectedCategoryChip
                ]}
                onPress={() => handleCategoryPress(category)}
              >
                <Text style={[
                  styles.categoryChipText,
                  selectedCategory === category && styles.selectedCategoryChipText
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Products Grid */}
        <Animated.View
          style={styles.productsContainer}
          entering={FadeIn.duration(400)}
        >
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.primary.main} />
            </View>
          ) : (
            <>
              <View style={styles.resultsHeader}>
                <Text style={styles.resultsCount}>
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                  {selectedCategory ? ` in ${selectedCategory}` : ''}
                </Text>
              </View>

              <FlatList
                data={filteredProducts}
                keyExtractor={item => item.id}
                numColumns={2}
                renderItem={({ item }) => (
                  <ProductCard
                    product={item}
                    onAddToCart={handleAddToCart}
                    onToggleWishlist={handleToggleWishlist}
                  />
                )}
                contentContainerStyle={styles.productsGrid}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                      No products found in this category
                    </Text>
                  </View>
                }
              />
            </>
          )}
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
  },
  categoriesContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.light,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginLeft: 16,
    marginBottom: 8,
  },
  categoriesScrollContent: {
    paddingHorizontal: 16,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.neutral.lightest,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.neutral.light,
  },
  selectedCategoryChip: {
    backgroundColor: Colors.primary.main,
    borderColor: Colors.primary.main,
  },
  categoryChipText: {
    fontSize: 14,
    color: Colors.text.primary,
  },
  selectedCategoryChipText: {
    color: Colors.text.secondary,
    fontWeight: '500',
  },
  productsContainer: {
    flex: 1,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  resultsCount: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  productsGrid: {
    paddingHorizontal: 8,
    paddingBottom: 16,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
});
