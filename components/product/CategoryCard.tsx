import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ImageBackground 
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Link } from 'expo-router';

export interface Category {
  id: string;
  name: string;
  image: {
    url: string;
    public_id?: string;
  };
  itemCount: number;
}

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={{ pathname: "/category/[id]", params: { id: category.id } }} asChild>
      <TouchableOpacity activeOpacity={0.8} style={styles.container}>
        {category.image?.url ? (
          <ImageBackground
            source={{ uri: category.image.url }}
            style={styles.image}
            imageStyle={styles.imageStyle}
          >
            <View style={styles.overlay}>
              <Text style={styles.name}>{category.name}</Text>
              <Text style={styles.itemCount}>{category.itemCount} items</Text>
            </View>
          </ImageBackground>
        ) : (
          <View style={[styles.image, styles.overlay]}>
            <Text style={styles.name}>{category.name}</Text>
            <Text style={styles.itemCount}>{category.itemCount} items</Text>
          </View>
        )}
      </TouchableOpacity>
     </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: Colors.neutral.darkest,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 12,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  name: {
    color: Colors.neutral.lightest,
    fontSize: 16,
    fontWeight: '700',
  },
  itemCount: {
    color: Colors.neutral.lightest,
    fontSize: 12,
    opacity: 0.8,
  },
});