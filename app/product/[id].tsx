import React, { useEffect, useState } from 'react';
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
import { Product } from '@/components/product/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { getProduct } from '@/services/productService';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState<boolean>(false);
  const [isFeaturesExpanded, setIsFeaturesExpanded] = useState<boolean>(false);

  useEffect(() => {
    const fetchDataById = async () => {
      const productId = Array.isArray(id) ? id[0] : id;
      try {
        const response = await getProduct(productId);
        if (response?.data?.data) {
          setProduct(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    }
    fetchDataById();
  }, [id])

  // Animations
  const favoriteScale = useSharedValue(1);
  const addToCartScale = useSharedValue(1);

  const handleAddToCart = () => {
    // Animation for add to cart button
    addToCartScale.value = withSpring(0.95, { damping: 10 }, () => {
      addToCartScale.value = withSpring(1, { damping: 10 });
    });

    console.log('Added to cart:', product?.name);
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
        <Header showBack title="Loading Product..." />
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>
            Loading product details or product not found.
          </Text>
        </View>
      </View>
    );
  }

  console.log(product?.sizes)

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
            {product.images?.map((image: { url: string }, index: number) => (
              <Image
                key={index}
                source={{ uri: image.url }}
                style={styles.productImage}
                resizeMode="cover"
              />
            ))}
          </ScrollView>

          {/* Image indicators */}
          <View style={styles.indicatorContainer}>
            {product.images?.map((_: { url: string }, index: number) => (
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
            <Text style={styles.category}>{product.category?.name}</Text>
            <View style={styles.ratingContainer}>
              {product.averageRating !== undefined && product.averageRating > 0 && (
                <Star size={16} color={Colors.warning.dark} fill={Colors.warning.dark} />
              )}
              <Text style={styles.rating}>{product.averageRating?.toFixed(1) || 'N/A'}</Text>
              <Text style={styles.reviewCount}>({product.numReviews || 0} reviews)</Text>
            </View>
          </View>

          <Text style={styles.productName}>{product.name}</Text>

          <View style={styles.priceContainer}>
            {product.salePrice ? (
              <>
                <Text style={styles.discountPrice}>${product.salePrice.toFixed(2)}</Text>
                <Text style={styles.originalPrice}>${product.price.toFixed(2)}</Text>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>
                    {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
                  </Text>
                </View>
              </>
            ) : (
              <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            )}
          </View>

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Size</Text>
              <View style={styles.optionsContainer}>
                {product.sizes?.map((size: string) => (
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
            </>
          )}

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Color</Text>
              <View style={styles.optionsContainer}>
                {product.colors?.map((color: {name: string, code: string}) => (
                  <TouchableOpacity
                    key={color.name}
                    style={[
                      styles.colorOption,
                      { backgroundColor: color.code, borderColor: color.code === selectedColor ? Colors.primary.dark : Colors.neutral.light },
                      selectedColor === color.code && styles.selectedOption,
                    ]}
                    onPress={() => setSelectedColor(color.code)}
                  >
                    {selectedColor === color.code && (
                      <Check size={16} color={Colors.text.light} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          {/* Description */}
          {product.description && product.description.length > 0 && (
            <>
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
            </>
          )}

          {/* Features */}
          {product.specifications && product.specifications.length > 0 && (
            <>
              <TouchableOpacity
                style={styles.expandableSection}
                onPress={() => setIsFeaturesExpanded(!isFeaturesExpanded)}
              >
                <Text style={styles.expandableSectionTitle}>Specifications</Text>
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
                  {product.specifications?.map((feature: {name:string, value: string}, index: number) => (
                    <View key={index} style={styles.featureItem}>
                      <Check size={16} color={Colors.success.main} />
                      <Text style={styles.featureText}>{feature.name}: {feature.value}</Text>
                    </View>
                  ))}
                </Animated.View>
              )}
            </>
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