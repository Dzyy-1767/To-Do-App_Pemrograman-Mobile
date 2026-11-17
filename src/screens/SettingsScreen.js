import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { fetchTodos } from '../api/todoApi';

export default function SettingsScreen({ todos, setTodos }) {
  const totalCount = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;
  const pendingCount = Math.max(0, totalCount - completedCount);

  // Reset ke data awal server
  const handleResetData = () => {
    Alert.alert(
      'Reset Data',
      'Muat ulang 10 data tugas awal dari server JSONPlaceholder?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Ya, Reset',
          style: 'destructive',
          onPress: async () => {
            try {
              const freshData = await fetchTodos(10);
              setTodos(freshData);
              Alert.alert('Berhasil', 'Data tugas berhasil direset ke 10 item awal.');
            } catch (err) {
              Alert.alert('Gagal', 'Terjadi kesalahan saat memuat ulang data server.');
            }
          },
        },
      ]
    );
  };

  // Bersihkan semua tugas lokal
  const handleClearAll = () => {
    Alert.alert(
      'Hapus Semua',
      'Apakah kamu yakin ingin mengosongkan seluruh daftar tugas?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus Semua',
          style: 'destructive',
          onPress: () => {
            setTodos([]);
            Alert.alert('Bersih', 'Semua tugas telah dihapus.');
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header Info */}
      <View style={styles.headerBox}>
        <View style={styles.avatarIcon}>
          <Ionicons name="settings-sharp" size={24} color={colors.card} />
        </View>
        <Text style={styles.headerTitle}>Pengaturan & Info</Text>
        <Text style={styles.headerSubtitle}>Tugas Pemrograman Mobile - Week 8</Text>
      </View>

      {/* Ringkasan Statistik */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Ringkasan Aktivitas</Text>
        <View style={styles.statsRow}>
          <View style={[styles.statBox, { backgroundColor: '#F5F2EB' }]}>
            <Text style={[styles.statNumber, { color: colors.deepBrown }]}>{totalCount}</Text>
            <Text style={styles.statLabel}>Total Tugas</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: 'rgba(171, 194, 112, 0.2)' }]}>
            <Text style={[styles.statNumber, { color: colors.sageGreen }]}>{completedCount}</Text>
            <Text style={styles.statLabel}>Selesai</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: 'rgba(253, 167, 105, 0.2)' }]}>
            <Text style={[styles.statNumber, { color: colors.coralPeach }]}>{pendingCount}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>
      </View>

      {/* Detail API */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Spesifikasi REST API</Text>
        <View style={styles.apiRow}>
          <Text style={styles.apiMethodGet}>GET</Text>
          <Text style={styles.apiPath}>/todos?_limit=10</Text>
        </View>
        <View style={styles.apiRow}>
          <Text style={styles.apiMethodPost}>POST</Text>
          <Text style={styles.apiPath}>/todos</Text>
        </View>
        <View style={styles.apiRow}>
          <Text style={styles.apiMethodPatch}>PATCH</Text>
          <Text style={styles.apiPath}>/todos/:id</Text>
        </View>
        <View style={styles.apiRow}>
          <Text style={styles.apiMethodDelete}>DELETE</Text>
          <Text style={styles.apiPath}>/todos/:id</Text>
        </View>
        <Text style={styles.apiHost}>Host: https://jsonplaceholder.typicode.com</Text>
      </View>

      {/* Tombol Aksi */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Aksi Data</Text>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handleResetData}
          activeOpacity={0.7}
        >
          <Ionicons name="reload-circle-outline" size={22} color={colors.coralPeach} />
          <Text style={styles.actionButtonText}>Reset ke 10 Item Default API</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, styles.dangerButton]}
          onPress={handleClearAll}
          activeOpacity={0.7}
        >
          <Ionicons name="trash-bin-outline" size={22} color={colors.danger} />
          <Text style={[styles.actionButtonText, { color: colors.danger }]}>Kosongkan Semua Tugas</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  headerBox: {
    backgroundColor: colors.deepBrown,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.coralPeach,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textWhite,
  },
  headerSubtitle: {
    fontSize: 13,
    color: colors.warmYellow,
    marginTop: 4,
  },
  sectionCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statBox: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 4,
    fontWeight: '500',
  },
  apiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F2EB',
  },
  apiMethodGet: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2B8A3E',
    backgroundColor: '#EBFBEE',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    width: 60,
    textAlign: 'center',
  },
  apiMethodPost: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D9480F',
    backgroundColor: '#FFF4E6',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    width: 60,
    textAlign: 'center',
  },
  apiMethodPatch: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1971C2',
    backgroundColor: '#E7F5FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    width: 60,
    textAlign: 'center',
  },
  apiMethodDelete: {
    fontSize: 11,
    fontWeight: '700',
    color: '#C92A2A',
    backgroundColor: '#FFE3E3',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    width: 60,
    textAlign: 'center',
  },
  apiPath: {
    fontSize: 13,
    color: colors.textPrimary,
    marginLeft: 12,
    fontFamily: 'monospace',
  },
  apiHost: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 10,
    fontStyle: 'italic',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF7F0',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginBottom: 8,
    gap: 10,
  },
  dangerButton: {
    backgroundColor: '#FFF5F5',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});
