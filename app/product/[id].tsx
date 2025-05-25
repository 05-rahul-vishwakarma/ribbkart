import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Dimensions 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Header } from '@/components/ui/Header';
import { Button } from '@/components/ui/Button';
import { Star, Heart, ChevronDown, ChevronUp, Check } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  FadeIn,
  SlideInUp
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Sample product data
const products = {
  '1': {
    id: '1',
    name: 'Summer Floral Dress',
    price: 79.99,
    discountPrice: 59.99,
    images: [
      'https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg',
      'https://images.pexels.com/photos/7248266/pexels-photo-7248266.jpeg',
      'https://images.pexels.com/photos/6311607/pexels-photo-6311607.jpeg',
    ],
    category: 'Women',
    rating: 4.5,
    reviewCount: 128,
    description: 'A beautiful summer floral dress perfect for warm weather and special occasions. Made with lightweight, breathable fabric and featuring an elegant design.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Blue', 'Pink', 'White'],
    features: [
      'Lightweight cotton blend',
      'Floral pattern',
      'V-neck design',
      'Above knee length',
      'Machine washable'
    ],
    isNew: true,
  },
  '2': {
    id: '2',
    name: 'Casual Denim Jacket',
    price: 89.99,
    images: [
      'https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg',
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
      'https://images.pexels.com/photos/1921172/pexels-photo-1921172.jpeg',
    ],
    category: 'Men',
    rating: 4.2,
    reviewCount: 94,
    description: 'A classic denim jacket that goes with everything. Perfect for layering in any season with a comfortable fit and durable construction.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Blue', 'Black', 'Light Blue'],
    features: [
      '100% cotton denim',
      'Button closure',
      'Multiple pockets',
      'Classic collar',
      'Machine washable'
    ],
  },
};

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const product = products[id as string];
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isFeaturesExpanded, setIsFeaturesExpanded] = useState(false);
  
  // Animations
  const favoriteScale = useSharedValue(1);
  const addToCartScale = useSharedValue(1);
  
  const handleAddToCart = () => {
    // Animation for add to cart button
    addToCartScale.value = withSpring(0.95, { damping: 10 }, () => {
      addToCartScale.value = withSpring(1, { damping: 10 });
    });
    
    console.log('Added to cart:', product.name);
    // Add to cart logic
  };
  
  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    
    // Heart animation
    favoriteScale.value = withSpring(1.3, { damping: 5 }, () => {
      favoriteScale.value = withSpring(1, { damping: 5 });
    });
  };
  
  const favoriteAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: favoriteScale.value }]
    };
  });
  
  const addToCartAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: addToCartScale.value }]
    };
  });
  
  if (!product) {
    return (
      <View style={styles.container}>
        <Header showBack title="Product Not Found" />
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>
            Sorry, we couldn't find the product you're looking for.
          </Text>
          <Button 
            title="Go to Shop" 
            onPress={() => router.push('/')}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header 
        showBack 
        showCart 
        transparent 
        cartItemCount={3}
      />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Product Images */}
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const newIndex = Math.round(
                event.nativeEvent.contentOffset.x / SCREEN_WIDTH
              );
              setCurrentImageIndex(newIndex);
            }}
          >
            {product.images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.productImage}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
          
          {/* Image indicators */}
          <View style={styles.indicatorContainer}>
            {product.images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  index === currentImageIndex && styles.activeIndicator,
                ]}
              />
            ))}
          </View>
          
          {/* Favorite button */}
          <Animated.View style={[styles.favoriteButton, favoriteAnimatedStyle]}>
            <TouchableOpacity
              style={styles.favoriteButtonInner}
              onPress={handleToggleFavorite}
            >
              <Heart
                size={20}
                color={isFavorite ? Colors.error.main : Colors.text.primary}
                fill={isFavorite ? Colors.error.main : 'none'}
              />
            </TouchableOpacity>
          </Animated.View>
          
          {/* New tag */}
          {product.isNew && (
            <View style={styles.newTag}>
              <Text style={styles.newTagText}>NEW</Text>
            </View>
          )}
        </View>
        
        {/* Product Info */}
        <Animated.View 
          style={styles.infoContainer}
          entering={FadeIn.duration(400)}
        >
          <View style={styles.categoryRow}>
            <Text style={styles.category}>{product.category}</Text>
            <View style={styles.ratingContainer}>
              <Star size={16} color={Colors.warning.dark} fill={Colors.warning.dark} />
              <Text style={styles.rating}>{product.rating}</Text>
              <Text style={styles.reviewCount}>({product.reviewCount} reviews)</Text>
            </View>
          </View>
          
          <Text style={styles.productName}>{product.name}</Text>
          
          <View style={styles.priceContainer}>
            {product.discountPrice ? (
              <>
                <Text style={styles.discountPrice}>${product.discountPrice}</Text>
                <Text style={styles.originalPrice}>${product.price}</Text>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>
                    {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                  </Text>
                </View>
              </>
            ) : (
              <Text style={styles.price}>${product.price}</Text>
            )}
          </View>
          
          {/* Size Selection */}
          <Text style={styles.sectionTitle}>Size</Text>
          <View style={styles.optionsContainer}>
            {product.sizes.map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeOption,
                  selectedSize === size && styles.selectedOption,
                ]}
                onPress={() => setSelectedSize(size)}
              >
                <Text 
                  style={[
                    styles.sizeOptionText,
                    selectedSize === size && styles.selectedOptionText,
                  ]}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Color Selection */}
          <Text style={styles.sectionTitle}>Color</Text>
          <View style={styles.optionsContainer}>
            {product.colors.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorOption,
                  selectedColor === color && styles.selectedOption,
                ]}
                onPress={() => setSelectedColor(color)}
              >
                <Text 
                  style={[
                    styles.colorOptionText,
                    selectedColor === color && styles.selectedOptionText,
                  ]}
                >
                  {color}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Description */}
          <TouchableOpacity 
            style={styles.expandableSection}
            onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
          >
            <Text style={styles.expandableSectionTitle}>Description</Text>
            {isDescriptionExpanded ? (
              <ChevronUp size={20} color={Colors.text.primary} />
            ) : (
              <ChevronDown size={20} color={Colors.text.primary} />
            )}
          </TouchableOpacity>
          
          {isDescriptionExpanded && (
            <Animated.View 
              style={styles.expandedContent}
              entering={SlideInUp.duration(200)}
            >
              <Text style={styles.descriptionText}>{product.description}</Text>
            </Animated.View>
          )}
          
          {/* Features */}
          <TouchableOpacity 
            style={styles.expandableSection}
            onPress={() => setIsFeaturesExpanded(!isFeaturesExpanded)}
          >
            <Text style={styles.expandableSectionTitle}>Features</Text>
            {isFeaturesExpanded ? (
              <ChevronUp size={20} color={Colors.text.primary} />
            ) : (
              <ChevronDown size={20} color={Colors.text.primary} />
            )}
          </TouchableOpacity>
          
          {isFeaturesExpanded && (
            <Animated.View 
              style={styles.expandedContent}
              entering={SlideInUp.duration(200)}
            >
              {product.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Check size={16} color={Colors.success.main} />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </Animated.View>
          )}
        </Animated.View>
      </ScrollView>
      
      {/* Add to Cart Button */}
      <Animated.View 
        style={[styles.addToCartContainer, addToCartAnimatedStyle]}
      >
        <Button 
          title="Add to Cart" 
          size="large" 
          fullWidth
          onPress={handleAddToCart}
        />
      </Animated.View>
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
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  notFoundText: {
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  imageContainer: {
    position: 'relative',
    height: 450,
  },
  productImage: {
    width: SCREEN_WIDTH,
    height: 450,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.neutral.light,
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: Colors.primary.dark,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  favoriteButtonInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.neutral.lightest,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.neutral.darkest,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  newTag: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: Colors.accent.dark,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  newTagText: {
    color: Colors.text.light,
    fontSize: 12,
    fontWeight: '700',
  },
  infoContainer: {
    padding: 16,
    paddingBottom: 100, // Extra padding for the Add to Cart button
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  category: {
    fontSize: 14,
    color: Colors.text.secondary,
    textTransform: 'uppercase',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.primary,
    marginLeft: 4,
    marginRight: 2,
  },
  reviewCount: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
  productName: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.primary.dark,
  },
  discountPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.primary.dark,
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 16,
    color: Colors.text.secondary,
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  discountBadge: {
    backgroundColor: Colors.primary.light,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary.dark,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  sizeOption: {
    borderWidth: 1,
    borderColor: Colors.neutral.light,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  colorOption: {
    borderWidth: 1,
    borderColor: Colors.neutral.light,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedOption: {
    borderColor: Colors.primary.dark,
    backgroundColor: Colors.primary.light,
  },
  sizeOptionText: {
    fontSize: 14,
    color: Colors.text.primary,
  },
  colorOptionText: {
    fontSize: 14,
    color: Colors.text.primary,
  },
  selectedOptionText: {
    fontWeight: '600',
    color: Colors.primary.dark,
  },
  expandableSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.light,
  },
  expandableSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  expandedContent: {
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.text.secondary,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginLeft: 8,
  },
  addToCartContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.background,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.light,
  },
});