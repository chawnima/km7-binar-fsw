export const getTypes = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${import.meta.env.VITE_API_URL}/universities`, {
    headers: { authorization: `Bearer ${token}` },
    method: "GET",
  });
  const result = await res.json();
  return result;
};

export const getTypesById = async (id) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${import.meta.env.VITE_API_URL}/types/${id}`, {
    headers: { authorization: `Bearer ${token}` },
    method: "GET",
  });
  const result = await res.json();
  return result;
};

export const createType = async (request) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${import.meta.env.VITE_API_URL}/types`, {
    headers: { authorization: `Bearer ${token}}` },
    method: "POST",
    body: request,
  });
  const result = await res.json();
  return result;
};

export const updateType = async (id, request) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${import.meta.env.VITE_API_URL}/types/${id}`, {
    headers: { authorization: `Bearer ${token}` },
    method: "PUT",
    body: request,
  });
  const result = await res.json();
  return result;
};

export const deleteType = async (id) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${import.meta.env.VITE_API_URL}/types/${id}`, {
    headers: { authorization: `Bearer ${token}` },
    method: "DELETE",
  });
  const result = await res.json();
  return result;
};
