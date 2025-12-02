const API = process.env.REACT_APP_API;

export const loginApi = async (email, password) => {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    throw new Error("Invalid credentials");
  }

  return await res.json();
};

export const registerApi = async (name, email, password, role) => {
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role })
  });

  if (!res.ok) {
    throw new Error("Registration failed");
  }

  return await res.json();
};
