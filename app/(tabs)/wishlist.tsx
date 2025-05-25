import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity 
} from 'react-native';
import { Header } from '@/components/ui/Header';
import { Colors } from '@/constants/Colors';
import { Button } from '@/components/ui/Button';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Animated, { 
  FadeIn, 
  FadeOut, 
  Layout,
  SlideOutRight
} from 'react-native-reanimated';

// Sample wishlist data
const initialWishlistItems = [
  {
    id: '1',
    name: 'Summer Floral Dress',
    price: 59.99,
    image: 'https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg',
    inStock: true,
  },
  {
    id: '4',
    name: 'Leather Watch',
    price: 159.99,
    image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg',
    inStock: true,
  },
  {
    id: '6',
    name: 'Summer Hat',
    price: 24.99,
    image: 'https://images.pexels.com/photos/984619/pexels-photo-984619.jpeg',
    inStock: false,
  },
];

export default function WishlistScreen() {
  const router = useRouter();
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);
  
  const handleRemoveFromWishlist = (id: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };
  
  const handleAddToCart = (id: string) => {
    console.log(`Added item ${id} to cart`);
    // Simulate adding to cart then removing from wishlist
    setTimeout(() => {
      handleRemoveFromWishlist(id);
    }, 300);
  };
  
  const renderWishlistItem = ({ item }: { item: typeof initialWishlistItems[0] }) => (
    <Animated.View 
      style={styles.wishlistItem}
      entering={FadeIn}
      exiting={SlideOutRight.duration(200)}
      layout={Layout}
    >
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
        <Text style={[
          styles.stockStatus,
          item.inStock ? styles.inStock : styles.outOfStock
        ]}>
          {item.inStock ? 'In Stock' : 'Out of Stock'}
        </Text>
      </View>
      
      <View style={styles.itemActions}>
        <TouchableOpacity 
          style={[
            styles.actionButton, 
            styles.removeButton
          ]}
          onPress={() => handleRemoveFromWishlist(item.id)}
        >
          <Trash2 size={16} color={Colors.error.main} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.actionButton, 
            styles.cartButton,
            !item.inStock && styles.disabledButton
          ]}
          onPress={() => item.inStock && handleAddToCart(item.id)}
          disabled={!item.inStock}
        >
          <ShoppingBag size={16} color={item.inStock ? Colors.primary.dark : Colors.neutral.medium} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <Header title="Wishlist" showBack />
      
      {wishlistItems.length > 0 ? (
        <FlatList
          data={wishlistItems}
          keyExtractor={item => item.id}
          renderItem={renderWishlistItem}
          contentContainerStyle={styles.wishlistContent}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Heart size={64} color={Colors.neutral.light} />
          <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
          <Text style={styles.emptyMessage}>
            Save items you love by tapping the heart icon on product pages.
          </Text>
          <Button 
            title="Discover Products" 
            onPress={() => router.push('/')}
            style={styles.discoverButton}
          />
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
  wishlistContent: {
    padding: 16,
  },
  wishlistItem: {
    flexDirection: 'row',
    backgroundColor: Colors.neutral.lightest,
    borderRadius: 12,
    padding: 12,
    shadowColor: Colors.neutral.darkest,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary.dark,
    marginBottom: 4,
  },
  stockStatus: {
    fontSize: 12,
    fontWeight: '500',
  },
  inStock: {
    color: Colors.success.main,
  },
  outOfStock: {
    color: Colors.error.main,
  },
  itemActions: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  removeButton: {
    borderColor: Colors.error.light,
    backgroundColor: Colors.error.light,
  },
  cartButton: {
    borderColor: Colors.primary.light,
    backgroundColor: Colors.primary.light,
  },
  disabledButton: {
    borderColor: Colors.neutral.light,
    backgroundColor: Colors.neutral.light,
  },
  separator: {
    height: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  discoverButton: {
    minWidth: 200,
  },
});