import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  FlatList 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { Header } from '@/components/ui/Header';
import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';
import { ProductCard, Product } from '@/components/product/ProductCard';
import { CategoryCard, Category } from '@/components/product/CategoryCard';
import { StatusBar } from 'expo-status-bar';
import Animated, { 
  FadeIn, 
  FadeInDown 
} from 'react-native-reanimated';

// Sample data
const featuredProducts: Product[] = [
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
];

const categories: Category[] = [
  {
    id: '1',
    name: 'Women',
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg',
    itemCount: 152,
  },
  {
    id: '2',
    name: 'Men',
    image: 'https://images.pexels.com/photos/1342609/pexels-photo-1342609.jpeg',
    itemCount: 124,
  },
  {
    id: '3',
    name: 'Kids',
    image: 'https://images.pexels.com/photos/3662667/pexels-photo-3662667.jpeg',
    itemCount: 89,
  },
];

const banners = [
  {
    id: '1',
    title: 'Summer Sale',
    subtitle: 'Up to 50% off',
    image: 'https://images.pexels.com/photos/5325104/pexels-photo-5325104.jpeg',
    color: '#FFB74D',
  },
  {
    id: '2',
    title: 'New Collection',
    subtitle: 'Spring 2025',
    image: 'https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg',
    color: '#A5D6A7',
  },
];

export default function HomeScreen() {
  const router = useRouter();
  
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
      <StatusBar style="dark" />
      <Header 
        showCart 
        showSearch 
        cartItemCount={3}
        onSearchPress={() => router.push('/search')}
      />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Banner */}
        <Animated.View 
          entering={FadeIn.duration(600)}
          style={styles.heroContainer}
        >
          <Image
            source={{ uri: 'https://images.pexels.com/photos/994517/pexels-photo-994517.jpeg' }}
            style={styles.heroImage}
          />
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>New Arrivals</Text>
            <Text style={styles.heroSubtitle}>Summer Collection 2025</Text>
            <Button 
              title="Shop Now" 
              style={styles.heroButton}
              onPress={() => router.push('/category/summer')}
            />
          </View>
        </Animated.View>
        
        {/* Categories */}
        <Animated.View entering={FadeInDown.delay(200).duration(600)}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity onPress={() => router.push('/products')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {categories.map((category, index) => (
            <CategoryCard 
              key={category.id} 
              category={category} 
            />
          ))}
        </Animated.View>
        
        {/* Promotional Banners */}
        <Animated.View entering={FadeInDown.delay(300).duration(600)}>
          <View style={styles.promoBannersContainer}>
            {banners.map((banner) => (
              <TouchableOpacity 
                key={banner.id}
                style={[styles.promoBanner, { backgroundColor: banner.color }]}
                activeOpacity={0.9}
              >
                <View style={styles.promoBannerContent}>
                  <Text style={styles.promoBannerTitle}>{banner.title}</Text>
                  <Text style={styles.promoBannerSubtitle}>{banner.subtitle}</Text>
                  <TouchableOpacity>
                    <Text style={styles.promoBannerLink}>Shop Now</Text>
                  </TouchableOpacity>
                </View>
                <Image 
                  source={{ uri: banner.image }}
                  style={styles.promoBannerImage}
                />
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
        
        {/* Featured Products */}
        <Animated.View entering={FadeInDown.delay(400).duration(600)}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Products</Text>
            <TouchableOpacity>
              <Text onPress={() => router.push('/products')} style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.productsGrid}>
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
              />
            ))}
          </View>
        </Animated.View>
        
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  heroContainer: {
    height: 400,
    position: 'relative',
    marginBottom: 16,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.neutral.lightest,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: Colors.neutral.lightest,
    marginBottom: 16,
  },
  heroButton: {
    width: 120,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text.primary,
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.primary.dark,
    fontWeight: '600',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  promoBannersContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  promoBanner: {
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  promoBannerContent: {
    padding: 16,
    flex: 1,
  },
  promoBannerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text.light,
    marginBottom: 4,
  },
  promoBannerSubtitle: {
    fontSize: 14,
    color: Colors.text.light,
    marginBottom: 8,
    opacity: 0.9,
  },
  promoBannerLink: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.text.light,
    textDecorationLine: 'underline',
  },
  promoBannerImage: {
    width: 120,
    height: 120,
  },
});