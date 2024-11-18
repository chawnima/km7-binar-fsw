export const login = async (request) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        body: request,
        method: "POST",
    });
    const result = await res.json();
    return result;
};

export const register = async (request) => {
    const formData = new FormData();
    formData.append("name", request.name);
    formData.append("email", request.email);
    formData.append("password", request.password);
    formData.append("profile_picture", request.profilePicture);

    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        body: formData,
    });
    const result = await res.json();
    return result;
};

export const profile = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/profile`, {
        headers: {
            authorization: `Bearer ${token}`,
            method: "GET",
        },
    });
    const result = await res.json();
    return result;
};

export const googleAuthLogin = async (request) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/google`, {
            method: "POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(request),
    });
    const result = await res.json();
    return result;
};
