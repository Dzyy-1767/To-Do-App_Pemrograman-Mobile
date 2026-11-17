import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Platform 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from './src/theme/colors';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'settings'
  const [todos, setTodos] = useState([]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <StatusBar style="light" backgroundColor={colors.deepBrown} />

        <View style={styles.container}>
          {/* Layar Aktif */}
          <View style={styles.screenContainer}>
            {activeTab === 'home' ? (
              <HomeScreen todos={todos} setTodos={setTodos} />
            ) : (
              <SettingsScreen todos={todos} setTodos={setTodos} />
            )}
          </View>

          {/* Bottom Tab Bar (Sesuai Desain Target) */}
          <View style={styles.tabBar}>
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => setActiveTab('home')}
              activeOpacity={0.7}
            >
              <Ionicons
                name={activeTab === 'home' ? 'list' : 'list-outline'}
                size={22}
                color={activeTab === 'home' ? colors.coralPeach : colors.textMuted}
              />
              <Text
                style={[
                  styles.tabLabel,
                  activeTab === 'home' && styles.activeTabLabel,
                ]}
              >
                Daftar Todo
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => setActiveTab('settings')}
              activeOpacity={0.7}
            >
              <Ionicons
                name={activeTab === 'settings' ? 'settings' : 'settings-outline'}
                size={22}
                color={activeTab === 'settings' ? colors.coralPeach : colors.textMuted}
              />
              <Text
                style={[
                  styles.tabLabel,
                  activeTab === 'settings' && styles.activeTabLabel,
                ]}
              >
                Pengaturan
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.deepBrown,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  screenContainer: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
    paddingVertical: 10,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    shadowColor: colors.deepBrown,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
  },
  activeTabLabel: {
    color: colors.coralPeach,
    fontWeight: '700',
  },
});
