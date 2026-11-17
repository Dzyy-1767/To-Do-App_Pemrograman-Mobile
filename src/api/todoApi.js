/**
 * Service API Asinkron untuk Todo App
 * Berdasarkan penugasan: REST API JSONPlaceholder (https://jsonplaceholder.typicode.com)
 * Menggunakan fetch() & async/await dengan penanganan try...catch
 */

const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Daftar judul tugas Bahasa Indonesia yang relevan dengan praktikum Pemrograman Mobile
const INDONESIAN_SAMPLE_TITLES = [
  'Belajar React Native',
  'Fetch REST API Todo',
  'Uji Coba di Expo Go',
  'Tangani try/catch error',
  'Buat aplikasi Todo dengan Async',
  'Update materi kuliah Mobile',
  'Implementasi loading indicator',
  'Simpan data ke server (POST)',
  'Ubah status tugas selesai (PATCH)',
  'Review penugasan praktik Week 8',
];

/**
 * 1. GET: Mengambil daftar tugas dari server API
 * @param {number} limit Jumlah item awal (default 10)
 */
export const fetchTodos = async (limit = 10) => {
  try {
    const response = await fetch(`${BASE_URL}/todos?_limit=${limit}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Petakan judul Latin dummy dari server ke judul Bahasa Indonesia
    // agar tampilan aplikasi rapi dan sesuai dengan konteks perkuliahan
    return data.map((item, index) => ({
      ...item,
      title: INDONESIAN_SAMPLE_TITLES[index % INDONESIAN_SAMPLE_TITLES.length] || item.title,
    }));
  } catch (error) {
    console.error('Error saat fetchTodos:', error);
    throw error;
  }
};

/**
 * 2. POST: Menambahkan tugas baru ke server API
 * @param {string} title Judul tugas baru
 */
export const createTodo = async (title) => {
  try {
    const response = await fetch(`${BASE_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        title,
        completed: false,
        userId: 1,
      }),
    });

    if (!response.ok) {
      throw new Error(`Gagal menambah tugas (HTTP ${response.status})`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error saat createTodo:', error);
    throw error;
  }
};

/**
 * 3. PATCH: Mengubah status tugas (selesai / belum) secara dinamis
 * @param {number|string} id ID tugas yang diubah
 * @param {boolean} completed Status baru
 */
export const patchTodoStatus = async (id, completed) => {
  try {
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        completed,
      }),
    });

    if (!response.ok) {
      // JSONPlaceholder terkadang 404 untuk ID di atas 200 (data mock baru)
      // Tetap kembalikan fallback valid untuk konsistensi simulasi
      if (response.status === 404) {
        return { id, completed };
      }
      throw new Error(`Gagal update status (HTTP ${response.status})`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error saat patchTodoStatus (id: ${id}):`, error);
    throw error;
  }
};

/**
 * 4. DELETE: Menghapus tugas dari server API
 * @param {number|string} id ID tugas yang dihapus
 */
export const deleteTodo = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok && response.status !== 404) {
      throw new Error(`Gagal menghapus tugas (HTTP ${response.status})`);
    }

    return true;
  } catch (error) {
    console.error(`Error saat deleteTodo (id: ${id}):`, error);
    throw error;
  }
};
