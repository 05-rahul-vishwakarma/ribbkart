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
import { useProducts } from '@/hooks/useProducts';
import { useProductStore } from '@/stores/productStore';
import { useCategories } from '@/hooks/useCategories';

// Sample product data (using the same data from other files)



export default function ProductsScreen() {
  const router = useRouter();
  const { products, productsLoading, productsError, fetchProductsByCategory } = useProducts();
  const { data: categoriesData, isLoading: isLoadingCategories } = useCategories();
  const { products: storeProducts, loading, error, refetchAllProducts } = useProductStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  let selectedCategoryName = '';
  if (selectedCategory && Array.isArray(categoriesData)) {
    const foundCategory = categoriesData.find((cat: any) => cat.id === selectedCategory);
    if (foundCategory) {
      selectedCategoryName = foundCategory.name || '';
    }
  }

  const handleAddToCart = (id: string) => {
    console.log(`Added product ${id} to cart`);
  };

  const handleToggleWishlist = (id: string) => {
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
              onPress={() => {
                setSelectedCategory(null);
                if (refetchAllProducts) {
                  refetchAllProducts();
                }
              }}
            >
              <Text style={[
                styles.categoryChipText,
                selectedCategory === null && styles.selectedCategoryChipText
              ]}>
                All
              </Text>
            </TouchableOpacity>

            {Array.isArray(categoriesData) && categoriesData.map((category: any) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryChip,
                  selectedCategory === category.id && styles.selectedCategoryChip
                ]}
                onPress={() => {
                  setSelectedCategory(category.id);
                  fetchProductsByCategory(category.id);
                }}
              >
                <Text style={[
                  styles.categoryChipText,
                  selectedCategory === category.id && styles.selectedCategoryChipText
                ]}>
                  {category.name}
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
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.primary.main} />
            </View>
          ) : (
            <>
              <View style={styles.resultsHeader}>
                <Text style={styles.resultsCount}>
                  {storeProducts.length} {storeProducts.length === 1 ? 'product' : 'products'}
                  {selectedCategoryName ? ` in ${selectedCategoryName}` : ''}
                </Text>
              </View>

              <FlatList
                data={storeProducts}
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
