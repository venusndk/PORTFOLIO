// src/api/contactApi.ts
const API_URL = "http://localhost:5000/api/contacts";

export const submitContact = async (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    const response = await fetch(API_URL, {
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
