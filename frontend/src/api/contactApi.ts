// src/api/contactApi.ts
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const submitContact = async (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    const response = await fetch(`${API_BASE}/api/contacts/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (err) {
    console.error("❌ Error submitting contact:", err);
    throw err;
  }
};
