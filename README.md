# Full-Stack Dental Practice Management System
DentalDB is a modern, comprehensive full-stack dental practice management system built with Next.js, TypeScript, and a robust backend system for managing patient records, appointments, treatments, and more.



🌟 Features
🏥 Multi-Role Access
Patient Portal: Schedule appointments, view medical history, manage personal details.
Receptionist Dashboard: Manage patient check-ins, schedule appointments, coordinate waiting area.
Doctor Interface: Access and manage patient records, track treatments, and communicate with staff.
📱 Core Functionalities
Real-time appointment scheduling and management
Digital patient records and history
Waiting room queue management
Treatment planning and tracking
User authentication with role-based access (Patient, Receptionist, Doctor)
Responsive design for all devices (Desktop, Tablet, Mobile)
🛠️ Tech Stack
Frontend
Framework: Next.js
Language: TypeScript
Styling:
Tailwind CSS
Shadcn/ui components
Custom animations
Backend
Language: Node.js
Database: PostgreSQL
ORM: Prisma for database management
Authentication: JWT (JSON Web Tokens)
API Management: RESTful APIs with Express.js
Dental API: DentalAPI
UI/UX
UI/UX:
Radix UI primitives
Lucide icons
Geist font family
Date Management
Date Management: date-fns

🚀 Getting Started
Backend Setup
Clone the backend repository


git clone https://github.com/ismail-devmaster/dental-backend.git  
cd dental-backend  
Install dependencies


npm install  
Setup PostgreSQL

Ensure PostgreSQL is installed locally or on a remote server.
Update .env file with database configurations.
env

DATABASE_URL=your_database_url  
Run Database Migrations


npx prisma migrate dev  
Start Backend Server

npm run dev  
Frontend Setup
Clone the frontend repository

git clone https://github.com/ismail-devmaster/dental-frontend.git  
cd dental-frontend  
Install dependencies


npm install  
Start Development Server


npm run dev  
Open http://localhost:3000

📁 Project Structure
Backend Structure
bash
Copy code
dental-backend/  
├── models/                # Database models  
├── controllers/            # API endpoints  
├── services/               # Business logic  
├── routes/                 # API routes  
├── config/                 # Configuration files  
└── .env                    # Environment variables  
Frontend Structure
bash
Copy code
dental-frontend/  
├── app/                    # Next.js app directory  
│   ├── doctor/              # Doctor dashboard  
│   ├── patient/             # Patient portal  
│   ├── receptionist/        # Receptionist interface  
│   └── layout.tsx           # Root layout  
├── components/              # Reusable components  
├── public/                  # Static assets  
└── styles/                  # Global styles  
🔧 Environment Setup
Backend:

Create a .env file in the backend folder (dental-backend/) and set:
env
Copy code
DATABASE_URL=your_database_url
Frontend:

Create a .env.local file in the frontend folder (dental-frontend/) and set:
env

NEXT_PUBLIC_API_URL=http://localhost:5000
🤝 Contributing
Fork the repository.
Create your feature branch (git checkout -b feature/AmazingFeature).
Commit your changes (git commit -m 'Add AmazingFeature').
Push to the branch (git push origin feature/AmazingFeature).
Open a Pull Request.
📝 License
Distributed under the MIT License. See LICENSE for more information.
