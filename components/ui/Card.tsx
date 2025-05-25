import React from 'react';
import { 
  View, 
  StyleSheet, 
  ViewStyle, 
  StyleProp 
} from 'react-native';
import { Colors } from '@/constants/Colors';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  elevation?: 0 | 1 | 2 | 3 | 4;
}

export function Card({ children, style, elevation = 1 }: CardProps) {
  return (
    <View style={[styles.card, styles[`elevation${elevation}`], style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.neutral.lightest,
    borderRadius: 12,
    padding: 16,
    margin: 8,
  },
  elevation0: {
    borderWidth: 1,
    borderColor: Colors.neutral.light,
  },
  elevation1: {
    shadowColor: Colors.neutral.darkest,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  elevation2: {
    shadowColor: Colors.neutral.darkest,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  elevation3: {
    shadowColor: Colors.neutral.darkest,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  elevation4: {
    shadowColor: Colors.neutral.darkest,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 4,
  },
});