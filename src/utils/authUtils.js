export const getLoggedUserId = () => {
    const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('SESSION_ID='))
    ?.split('=')[1]

    if (!cookieValue) return null;

    try {
        const payload = JSON.parse(atob(cookieValue.split('.')[1]));
        return payload.id;
    } catch (error) {
        console.eerror("JWT parsing error:", error);
        return null;
    }
};