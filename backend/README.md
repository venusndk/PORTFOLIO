
---

## ⚙️ **Backend README (backend/README.md)**

```markdown
# ⚙️ Portfolio Backend (Express.js + PostgreSQL)

This is the **Node.js/Express.js backend** for my portfolio project.  
It handles form submissions, stores contact messages in a PostgreSQL database, and sends email notifications via Nodemailer.

---

## 🚀 Tech Stack

- **Node.js + Express.js** – Server framework  
- **PostgreSQL** – Database  
- **Nodemailer** – Email notifications  
- **Dotenv** – Environment variable management  
- **Railway** – Cloud deployment

---

## 📂 Folder Structure
backend/
├── config/
│ └── db.js → Database connection setup
├── model/
│ └── contactModel.js → PostgreSQL model for contacts
├── routes/
│ └── contactRoutes.js → API endpoints
├── controllers/
│ └── contactController.js → Request handling logic
├── utils/
│ └── sendEmail.js → Nodemailer configuration
├── server.js → App entry point
├── package.json
└── .env

