export async function checkAuth() {
  const authData = JSON.parse(localStorage.getItem("authData"));

  if (!authData?.token) {
    return false;
  }

  try {
    const response = await fetch("http://localhost:4000/api/auth/verify", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authData.token}`,
      },
      credentials: "include",
    });

    return response.ok;
  } catch (error) {
    console.error("Auth check failed:", error);
    return false;
  }
}

export async function fetchUserProfile() {
  try {
    const authData = JSON.parse(localStorage.getItem("authData"));
    if (!authData?.token) throw new Error("Token não encontrado");

    const response = await fetch("http://localhost:4000/api/user/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authData.token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json(); // Captura detalhes do erro do backend
      throw new Error(errorData.error || "Erro ao buscar dados do usuário");
    }

    const data = await response.json();
    return {
      ...data,
      // Garante valores padrão se algum campo for undefined
      name: data.name || "",
      email: data.email || "",
      photo: data.avatar_url || "/default-profile.png",
      level: data.level,
      created_at: data.created_at
        ? new Date(data.created_at).toLocaleDateString()
        : "Não disponível",
    };
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    return null;
  }
}

export function getCurrentUser() {
  const authData = JSON.parse(localStorage.getItem("authData"));
  return authData?.user || null;
}
