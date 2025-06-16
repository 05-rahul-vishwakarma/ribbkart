import React, { useEffect, useState } from 'react';
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
import { ProductCard } from '@/components/product/ProductCard';
import { CategoryCard, Category } from '@/components/product/CategoryCard';
import { StatusBar } from 'expo-status-bar';
import Animated, { 
  FadeIn, 
  FadeInDown 
} from 'react-native-reanimated';
import { getFeaturedProducts } from '@/services/productService';
import axios from 'axios';
import { getAllCategories } from '@/services/categoryService';
import { useCategories } from '@/hooks/useCategories';

interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  images: {
    url: string;
    public_id?: string;
    _id?: string;
    id?: string;
  }[];
  category: {
    _id: string;
    name: string;
    parent: string | null;
    id: string;
  };
  isNew?: boolean;
}

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
  const [products, setProducts] = useState<Product[]>([]);
  const { data: categoriesData, isLoading: isLoadingCategories } = useCategories();


  useEffect(() =>{
     const fetch = async () =>{
      try {
       const response = await getFeaturedProducts();
       setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
     }

     fetch();
  },[])
  
  const handleAddToCart = (id: string) => {
    // Add to cart 
    console.log(`Added product ${id} to cart`);
  };
  
  const handleToggleWishlist = (id: string) => {
    console.log(`Toggled wishlist for product ${id}`);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Header 
        showCart 
        showSearch 
        cartItemCount={3}
        onSearchPress={() => router.push('/(tabs)/search')}
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
              onPress={() => router.push('/products')}
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
          
          {
            !isLoadingCategories && categoriesData && (
              Array.isArray(categoriesData) ? (
                categoriesData.map((category: Category) => (
                  <CategoryCard 
                    key={category.id} 
                    category={category} 
                  />
                ))
              ) : (
                <CategoryCard 
                  key={categoriesData.id} 
                  category={categoriesData as Category} 
                />
              )
            )
          }
         
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
                  <TouchableOpacity onPress={() => router.push('/products')}>
                    <Text style={styles.promoBannerLink}>Shop Now</Text>
                  </TouchableOpacity>
                </View>
                <Image 
                  source={{ uri: banner?.image }}
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
            <TouchableOpacity onPress={() => router.push('/products')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.productsGrid}>
            {products?.map((product) => (
              <ProductCard
                key={product?.id}
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