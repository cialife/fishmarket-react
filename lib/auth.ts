import { deletePesananByEmail } from "@/lib/pesanan";

export type User = {
  name: string;
  email: string;
  password?: string;
  role: string;
};

const normalize = (email: string) => email.trim().toLowerCase();

export const getUsers = (): User[] => {
  if (typeof window === "undefined") return [];
  try {
    // KEY USERS
    return JSON.parse(localStorage.getItem("users") || "[]");
  } catch {
    return [];
  }
};

export const registerUser = (userData: User) => {
  const users = getUsers();
  const email = normalize(userData.email);
  if (users.some((u) => normalize(u.email) === email)) {
    return { success: false, message: "Email sudah terdaftar!" };
  }
  users.push({ ...userData, email, name: userData.name.trim() });
  localStorage.setItem("users", JSON.stringify(users));
  return { success: true };
};

export const loginUser = (email: string, pass: string) => {
  const user = getUsers().find(
    (u) => normalize(u.email) === normalize(email) && u.password === pass,
  );
  if (!user) return { success: false, message: "Email atau password salah!" };

  // password tidak ikut disimpan sebagai current user
  const { password, ...safeUser } = user;
  localStorage.setItem("currentUser", JSON.stringify(safeUser));
  sessionStorage.setItem("customerAuth", "true");
  window.dispatchEvent(new Event("pesananUpdated"));
  return { success: true, user: safeUser };
};

export const getCurrentUser = (): Omit<User, "password"> | null => {
  if (typeof window === "undefined") return null;
  try {
    // sesi browser sudah berakhir -> dianggap belum login
    if (sessionStorage.getItem("customerAuth") !== "true") return null;

    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (!user) return null;

    // Validasi: Pastikan akun ini benar-benar masih terdaftar di list users
    const exists = getUsers().some(
      (u) => normalize(u.email) === normalize(user.email),
    );

    // Akun sudah dihapus admin -> anggap belum login.
    // Pembersihan sesi dilakukan AuthGuard setelah alert ditampilkan.
    if (!exists) {
      return null;
    }
    return user;
  } catch {
    return null;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("currentUser");
  sessionStorage.removeItem("customerAuth");
  window.dispatchEvent(new Event("pesananUpdated"));
};

export const isAccountDeleted = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    if (sessionStorage.getItem("customerAuth") !== "true") return false;
    const cur = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (!cur) return false;
    return !getUsers().some((u) => normalize(u.email) === normalize(cur.email));
  } catch {
    return false;
  }
};

export const deleteUser = (email: string) => {
  const updated = getUsers().filter(
    (u) => normalize(u.email) !== normalize(email),
  );

  localStorage.setItem("users", JSON.stringify(updated));
  // hapus keranjang pesanan dan riwayat akun yang dihapus
  deletePesananByEmail(email);
  return updated;
};
