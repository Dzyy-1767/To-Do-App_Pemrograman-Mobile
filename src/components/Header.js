import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export default function Header({ onRefresh, isRefreshing, totalCount = 0, completedCount = 0 }) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.titleWrapper}>
          <View style={styles.iconCircle}>
            <Ionicons name="checkmark-sharp" size={20} color={colors.card} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Todo List App</Text>
            <Text style={styles.subtitle}>Async REST API • Week 8</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.reloadButton}
          onPress={onRefresh}
          disabled={isRefreshing}
          activeOpacity={0.7}
        >
          <Ionicons 
            name="reload-sharp" 
            size={18} 
            color={colors.warmYellow} 
            style={isRefreshing ? styles.rotating : null}
          />
        </TouchableOpacity>
      </View>

      {/* Info Pills */}
      <View style={styles.pillsContainer}>
        <View style={styles.pill}>
          <Text style={styles.pillLabel}>Total:</Text>
          <Text style={styles.pillValue}>{totalCount}</Text>
        </View>
        <View style={[styles.pill, styles.pillSuccess]}>
          <Text style={[styles.pillLabel, { color: colors.sageGreen }]}>Selesai:</Text>
          <Text style={[styles.pillValue, { color: colors.sageGreen }]}>{completedCount}</Text>
        </View>
        <View style={[styles.pill, styles.pillWarning]}>
          <Text style={[styles.pillLabel, { color: colors.coralPeach }]}>Pending:</Text>
          <Text style={[styles.pillValue, { color: colors.coralPeach }]}>
            {Math.max(0, totalCount - completedCount)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.deepBrown,
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    shadowColor: colors.deepBrown,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.sageGreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textContainer: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textWhite,
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 12,
    color: colors.warmYellow,
    marginTop: 2,
    fontWeight: '500',
  },
  reloadButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(254, 200, 104, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(254, 200, 104, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 10,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 6,
  },
  pillSuccess: {
    backgroundColor: 'rgba(171, 194, 112, 0.18)',
  },
  pillWarning: {
    backgroundColor: 'rgba(253, 167, 105, 0.18)',
  },
  pillLabel: {
    fontSize: 12,
    color: '#D8D3CC',
    fontWeight: '500',
  },
  pillValue: {
    fontSize: 13,
    color: colors.textWhite,
    fontWeight: '700',
  },
});
