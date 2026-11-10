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
  return { success: true, user: safeUser };
};

export const getCurrentUser = (): Omit<User, "password"> | null => {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem("currentUser") || "null");
  } catch {
    return null;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("currentUser");
  sessionStorage.removeItem("customerAuth");
};
