import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator,
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export default function TodoItem({ item, onToggle, onDelete, isUpdating }) {
  const isCompleted = !!item.completed;

  const handleDeletePress = () => {
    Alert.alert(
      'Hapus Tugas',
      `Apakah kamu yakin ingin menghapus "${item.title}"?`,
      [
        { text: 'Batal', style: 'cancel' },
        { 
          text: 'Hapus', 
          style: 'destructive', 
          onPress: () => onDelete(item.id) 
        },
      ]
    );
  };

  return (
    <View style={[styles.card, isCompleted && styles.completedCard]}>
      {/* Checkbox Button */}
      <TouchableOpacity 
        style={styles.checkWrapper}
        onPress={() => onToggle(item)}
        disabled={isUpdating}
        activeOpacity={0.7}
      >
        {isUpdating ? (
          <ActivityIndicator size="small" color={colors.coralPeach} />
        ) : (
          <View style={[styles.checkbox, isCompleted && styles.checkedBox]}>
            {isCompleted && (
              <Ionicons name="checkmark" size={15} color={colors.textWhite} />
            )}
          </View>
        )}
      </TouchableOpacity>

      {/* Task Text */}
      <TouchableOpacity 
        style={styles.textWrapper}
        onPress={() => onToggle(item)}
        disabled={isUpdating}
        activeOpacity={0.7}
      >
        <Text 
          style={[
            styles.titleText,
            isCompleted && styles.completedTitleText
          ]}
          numberOfLines={2}
        >
          {item.title}
        </Text>
      </TouchableOpacity>

      {/* Delete Button */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDeletePress}
        disabled={isUpdating}
        activeOpacity={0.6}
      >
        <Ionicons name="trash-outline" size={19} color={colors.textMuted} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: colors.deepBrown,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  completedCard: {
    backgroundColor: '#FAF8F4',
    borderColor: '#E8E3DC',
  },
  checkWrapper: {
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: 26,
    height: 26,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#C8C3BA',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
  },
  checkedBox: {
    backgroundColor: colors.sageGreen,
    borderColor: colors.sageGreen,
  },
  textWrapper: {
    flex: 1,
    marginRight: 8,
  },
  titleText: {
    fontSize: 15,
    color: colors.textPrimary,
    fontWeight: '500',
    lineHeight: 20,
  },
  completedTitleText: {
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  deleteButton: {
    padding: 6,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
