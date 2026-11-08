export const getUsers = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("users") || "[]");
};

export const registerUser = (userData: any) => {
  const users = getUsers();
  // Cek apakah email sudah ada
  if (users.find((u: any) => u.email === userData.email)) {
    return { success: false, message: "Email sudah terdaftar!" };
  }
  users.push(userData);
  localStorage.setItem("users", JSON.stringify(users));
  return { success: true };
};

export const loginUser = (email: string, pass: string) => {
  const users = getUsers();
  const user = users.find((u: any) => u.email === email && u.password === pass);
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    return { success: true, user };
  }
  return { success: false, message: "Email atau password salah!" };
};

export const logoutUser = () => {
  localStorage.removeItem("currentUser");
};
