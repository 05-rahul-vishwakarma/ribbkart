import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { Heart, ShoppingBag } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/Colors';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withSequence,
  withTiming
} from 'react-native-reanimated';
import { Link } from 'expo-router';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // 2 columns with margin

export interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (id: string) => void;
  onToggleWishlist?: (id: string) => void;
  isFavorite?: boolean;
}

export function ProductCard({ 
  product, 
  onAddToCart, 
  onToggleWishlist,
  isFavorite = false
}: ProductCardProps) {
  const [favorite, setFavorite] = useState(isFavorite);
  
  // Animation values
  const scale = useSharedValue(1);
  const heartScale = useSharedValue(1);
  
  const handleAddToCart = () => {
    // Trigger animation
    scale.value = withSequence(
      withSpring(0.95, { damping: 10 }),
      withSpring(1, { damping: 10 })
    );
    
    if (onAddToCart) {
      onAddToCart(product.id);
    }
  };
  
  const handleToggleWishlist = () => {
    setFavorite(!favorite);
    
    // Heart animation
    heartScale.value = withSequence(
      withSpring(1.3, { damping: 5 }),
      withSpring(1, { damping: 5 })
    );
    
    if (onToggleWishlist) {
      onToggleWishlist(product.id);
    }
  };
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
    };
  });
  
  const heartAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: heartScale.value }]
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Link href={`/product/${product.id}`} asChild>
        <TouchableOpacity activeOpacity={0.8}>
          <Card elevation={1} style={styles.card}>
            <View style={styles.imageContainer}>
              <Image 
                source={{ uri: product.image }} 
                style={styles.image}
                resizeMode="cover"
              />
              {product.isNew && (
                <View style={styles.newTag}>
                  <Text style={styles.newTagText}>NEW</Text>
                </View>
              )}
            </View>
            
            <View style={styles.content}>
              <Text style={styles.category}>{product.category}</Text>
              <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
              
              <View style={styles.priceRow}>
                <Text style={styles.price}>
                  ${product.discountPrice || product.price}
                </Text>
                {product.discountPrice && (
                  <Text style={styles.originalPrice}>${product.price}</Text>
                )}
              </View>
              
              <View style={styles.actions}>
                <TouchableOpacity 
                  style={styles.addToCartButton}
                  onPress={handleAddToCart}
                  activeOpacity={0.9}
                >
                  <ShoppingBag size={16} color={Colors.text.light} />
                  <Text style={styles.addToCartText}>Add</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.wishlistButton}
                  onPress={handleToggleWishlist}
                >
                  <Animated.View style={heartAnimatedStyle}>
                    <Heart 
                      size={20} 
                      color={favorite ? Colors.error.main : Colors.neutral.medium}
                      fill={favorite ? Colors.error.main : 'none'}
                    />
                  </Animated.View>
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      </Link>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
  },
  card: {
    padding: 0,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  newTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: Colors.accent.dark,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  newTagText: {
    color: Colors.text.light,
    fontSize: 10,
    fontWeight: '700',
  },
  content: {
    padding: 12,
  },
  category: {
    fontSize: 10,
    color: Colors.text.secondary,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary.dark,
  },
  originalPrice: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.text.secondary,
    textDecorationLine: 'line-through',
    marginLeft: 6,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  addToCartButton: {
    backgroundColor: Colors.primary.dark,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
    flex: 1,
    marginRight: 8,
  },
  addToCartText: {
    color: Colors.text.light,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  wishlistButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: Colors.neutral.lightest,
    borderWidth: 1,
    borderColor: Colors.neutral.light,
  },
});