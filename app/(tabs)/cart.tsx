import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  Alert
} from 'react-native';
import { Header } from '@/components/ui/Header';
import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';
import { Minus, Plus, X } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Animated, { 
  FadeIn, 
  FadeOut, 
  Layout,
  SlideOutRight
} from 'react-native-reanimated';

// Sample cart data
const initialCartItems = [
  {
    id: '1',
    name: 'Summer Floral Dress',
    price: 59.99,
    image: 'https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg',
    quantity: 1,
    size: 'M',
    color: 'Blue',
  },
  {
    id: '2',
    name: 'Casual Denim Jacket',
    price: 89.99,
    image: 'https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg',
    quantity: 2,
    size: 'L',
    color: 'Dark Blue',
  },
  {
    id: '3',
    name: 'White Sneakers',
    price: 49.99,
    image: 'https://images.pexels.com/photos/1280064/pexels-photo-1280064.jpeg',
    quantity: 1,
    size: '42',
    color: 'White',
  },
];

export default function CartScreen() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState(initialCartItems);
  
  const handleQuantityChange = (id: string, change: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };
  
  const handleRemoveItem = (id: string) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item from your cart?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Remove", 
          onPress: () => {
            setCartItems(prevItems => prevItems.filter(item => item.id !== id));
          },
          style: "destructive"
        }
      ]
    );
  };
  
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const subtotal = calculateSubtotal();
  const shipping = 4.99;
  const total = subtotal + shipping;
  
  return (
    <View style={styles.container}>
      <Header title="Shopping Cart" showBack />
      
      {cartItems.length > 0 ? (
        <>
          <ScrollView style={styles.scrollView}>
            <Animated.View layout={Layout}>
              {cartItems.map((item) => (
                <Animated.View 
                  key={item.id}
                  style={styles.cartItem}
                  layout={Layout}
                  entering={FadeIn}
                  exiting={SlideOutRight.duration(200)}
                >
                  <Image source={{ uri: item.image }} style={styles.itemImage} />
                  
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <View style={styles.itemMeta}>
                      <Text style={styles.itemMetaText}>Size: {item.size}</Text>
                      <Text style={styles.itemMetaText}>Color: {item.color}</Text>
                    </View>
                    <Text style={styles.itemPrice}>${item.price}</Text>
                    
                    <View style={styles.itemActions}>
                      <View style={styles.quantityControl}>
                        <TouchableOpacity 
                          style={styles.quantityButton}
                          onPress={() => handleQuantityChange(item.id, -1)}
                        >
                          <Minus size={16} color={Colors.text.primary} />
                        </TouchableOpacity>
                        
                        <Text style={styles.quantityText}>{item.quantity}</Text>
                        
                        <TouchableOpacity 
                          style={styles.quantityButton}
                          onPress={() => handleQuantityChange(item.id, 1)}
                        >
                          <Plus size={16} color={Colors.text.primary} />
                        </TouchableOpacity>
                      </View>
                      
                      <TouchableOpacity 
                        style={styles.removeButton}
                        onPress={() => handleRemoveItem(item.id)}
                      >
                        <X size={16} color={Colors.text.secondary} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </Animated.View>
              ))}
            </Animated.View>
            
            <View style={styles.cartSummary}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
              </View>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Shipping</Text>
                <Text style={styles.summaryValue}>${shipping.toFixed(2)}</Text>
              </View>
              
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
              </View>
            </View>
          </ScrollView>
          
          <View style={styles.checkoutContainer}>
            <Button 
              title="Proceed to Checkout" 
              size="large" 
              fullWidth
              onPress={() => router.push('/login')}
            />
          </View>
        </>
      ) : (
        <View style={styles.emptyCartContainer}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/5864283/pexels-photo-5864283.jpeg' }} 
            style={styles.emptyCartImage}
          />
          <Text style={styles.emptyCartTitle}>Your cart is empty</Text>
          <Text style={styles.emptyCartMessage}>
            Looks like you haven't added anything to your cart yet.
          </Text>
          <Button 
            title="Start Shopping" 
            style={styles.continueShoppingButton}
            onPress={() => router.push('/')}
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
  scrollView: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.light,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  itemMeta: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  itemMetaText: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginRight: 8,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary.dark,
    marginBottom: 8,
  },
  itemActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral.light,
    borderRadius: 4,
    overflow: 'hidden',
  },
  quantityButton: {
    padding: 6,
  },
  quantityText: {
    paddingHorizontal: 12,
    fontWeight: '600',
  },
  removeButton: {
    padding: 6,
  },
  cartSummary: {
    padding: 16,
    backgroundColor: Colors.neutral.lightest,
    marginTop: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    shadowColor: Colors.neutral.darkest,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  summaryValue: {
    fontSize: 14,
    color: Colors.text.primary,
    fontWeight: '500',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.light,
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary.dark,
  },
  checkoutContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.light,
    backgroundColor: Colors.background,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyCartImage: {
    width: 200,
    height: 200,
    marginBottom: 24,
    borderRadius: 100,
  },
  emptyCartTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  emptyCartMessage: {
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  continueShoppingButton: {
    width: 200,
  },
});
