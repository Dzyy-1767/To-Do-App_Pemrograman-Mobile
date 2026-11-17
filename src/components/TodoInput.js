import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  Alert 
} from 'react-native';
import { colors } from '../theme/colors';

export default function TodoInput({ onAddTodo, isSubmitting }) {
  const [taskText, setTaskText] = useState('');

  const handlePress = () => {
    const trimmed = taskText.trim();
    if (!trimmed) {
      Alert.alert('Perhatian', 'Silakan ketik nama tugas terlebih dahulu!');
      return;
    }

    onAddTodo(trimmed, () => {
      setTaskText('');
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tambah tugas baru..."
        placeholderTextColor={colors.textMuted}
        value={taskText}
        onChangeText={setTaskText}
        onSubmitEditing={handlePress}
        returnKeyType="done"
        editable={!isSubmitting}
      />
      <TouchableOpacity
        style={[styles.addButton, (!taskText.trim() || isSubmitting) && styles.disabledButton]}
        onPress={handlePress}
        disabled={isSubmitting}
        activeOpacity={0.8}
      >
        {isSubmitting ? (
          <ActivityIndicator size="small" color={colors.textWhite} />
        ) : (
          <Text style={styles.addButtonText}>+ Tambah</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 16,
    marginTop: -16,
    shadowColor: colors.deepBrown,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.textPrimary,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  addButton: {
    backgroundColor: colors.coralPeach,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.coralPeach,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  disabledButton: {
    opacity: 0.7,
  },
  addButtonText: {
    color: colors.textWhite,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
