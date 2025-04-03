// auth.js
export async function checkAuth() {
    const authData = JSON.parse(localStorage.getItem('authData'));
  
    if (!authData?.token) {
      return false;
    }
  
    try {
      const response = await fetch("http://localhost:4000/api/auth/verify", {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${authData.token}`
        },
        credentials: 'include',
      });
      
      return response.ok;
    } catch (error) {
      console.error("Auth check failed:", error);
      return false;
    }
}

export function getCurrentUser() {
    const authData = JSON.parse(localStorage.getItem('authData'));
    return authData?.user || null;
}