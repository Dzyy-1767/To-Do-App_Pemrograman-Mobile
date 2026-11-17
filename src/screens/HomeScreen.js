import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  FlatList, 
  StyleSheet, 
  RefreshControl, 
  Text, 
  Alert,
  TouchableOpacity
} from 'react-native';
import { colors } from '../theme/colors';
import Header from '../components/Header';
import TodoInput from '../components/TodoInput';
import TodoItem from '../components/TodoItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { 
  fetchTodos, 
  createTodo, 
  patchTodoStatus, 
  deleteTodo 
} from '../api/todoApi';

export default function HomeScreen({ todos, setTodos }) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed'

  // 1. GET: Mengambil daftar tugas dari REST API saat pertama dimuat
  const loadTodosData = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const data = await fetchTodos(10);
      setTodos(data);
    } catch (error) {
      Alert.alert(
        'Gagal Memuat Data',
        'Tidak dapat terhubung ke server REST API. Pastikan koneksi internet aktif.',
        [{ text: 'Coba Lagi', onPress: () => loadTodosData() }]
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [setTodos]);

  useEffect(() => {
    loadTodosData();
  }, [loadTodosData]);

  // 3. POST: Menambahkan tugas baru
  const handleAddTodo = async (title, onSuccess) => {
    try {
      setSubmitting(true);
      const newServerTodo = await createTodo(title);

      // JSONPlaceholder mengembalikan id 201 untuk item baru
      // Buat unique ID lokal agar tidak konflik saat menambah beberapa tugas
      const newTodo = {
        id: Date.now(),
        title: newServerTodo.title || title,
        completed: false,
        userId: 1,
      };

      setTodos((prev) => [newTodo, ...prev]);
      if (onSuccess) onSuccess();

      Alert.alert('Berhasil', 'Tugas baru berhasil disimpan ke server!');
    } catch (error) {
      Alert.alert('Gagal Menambah Tugas', 'Terjadi kesalahan saat mengirim data ke server.');
    } finally {
      setSubmitting(false);
    }
  };

  // 4. PATCH: Mengubah status tugas
  const handleToggleTodo = async (item) => {
    const nextCompleted = !item.completed;
    try {
      setUpdatingId(item.id);
      
      // Kirim request PATCH ke REST API
      await patchTodoStatus(item.id, nextCompleted);

      // Update state lokal
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === item.id ? { ...todo, completed: nextCompleted } : todo
        )
      );
    } catch (error) {
      Alert.alert('Gagal Mengubah Status', 'Terjadi kesalahan saat memperbarui tugas di server.');
    } finally {
      setUpdatingId(null);
    }
  };

  // 7. DELETE: Menghapus tugas
  const handleDeleteTodo = async (id) => {
    try {
      setUpdatingId(id);
      await deleteTodo(id);

      // Hapus dari state lokal
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      Alert.alert('Gagal Menghapus', 'Tidak dapat menghapus tugas dari server.');
    } finally {
      setUpdatingId(null);
    }
  };

  // Filter list
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const totalCount = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <View style={styles.container}>
      {/* Header dengan ringkasan */}
      <Header
        onRefresh={() => loadTodosData(true)}
        isRefreshing={refreshing}
        totalCount={totalCount}
        completedCount={completedCount}
      />

      {/* Input Form Tugas */}
      <TodoInput onAddTodo={handleAddTodo} isSubmitting={submitting} />

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[styles.filterChip, filter === 'all' && styles.filterChipActive]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
            Semua ({totalCount})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterChip, filter === 'active' && styles.filterChipActive]}
          onPress={() => setFilter('active')}
        >
          <Text style={[styles.filterText, filter === 'active' && styles.filterTextActive]}>
            Aktif ({Math.max(0, totalCount - completedCount)})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterChip, filter === 'completed' && styles.filterChipActive]}
          onPress={() => setFilter('completed')}
        >
          <Text style={[styles.filterText, filter === 'completed' && styles.filterTextActive]}>
            Selesai ({completedCount})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Konten Utama / List */}
      {loading ? (
        <LoadingSpinner message="Mengambil daftar tugas dari JSONPlaceholder..." />
      ) : (
        <FlatList
          data={filteredTodos}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <TodoItem
              item={item}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
              isUpdating={updatingId === item.id}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => loadTodosData(true)}
              colors={[colors.coralPeach, colors.sageGreen]}
              tintColor={colors.coralPeach}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>Belum ada tugas</Text>
              <Text style={styles.emptySubtitle}>
                {filter !== 'all' 
                  ? 'Tidak ada tugas yang sesuai filter ini.' 
                  : 'Ketik tugas baru di atas dan tekan "+ Tambah"'}
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 14,
    marginBottom: 10,
    gap: 8,
  },
  filterChip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  filterChipActive: {
    backgroundColor: colors.deepBrown,
    borderColor: colors.deepBrown,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  filterTextActive: {
    color: colors.textWhite,
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
