# Full-Stack Dental Practice Management System<b>
DentalDB is a modern, comprehensive full-stack dental practice management system built with Next.js, TypeScript, and a robust backend system for managing patient records, appointments, treatments, and more.<b>



🌟 Features<b>
🏥 Multi-Role Access<b>
Patient Portal: Schedule appointments, view medical history, manage personal details.<b>
Receptionist Dashboard: Manage patient check-ins, schedule appointments, coordinate waiting area.<b>
Doctor Interface: Access and manage patient records, track treatments, and communicate with staff.<b>
📱 Core Functionalities<b>
Real-time appointment scheduling and management<b>
Digital patient records and history<b>
Waiting room queue management<b>
Treatment planning and tracking<b>
User authentication with role-based access (Patient, Receptionist, Doctor)<b>
Responsive design for all devices (Desktop, Tablet, Mobile)<b>
🛠️ Tech Stack<b>
Frontend<b>
Framework: Next.js<b>
Language: TypeScript<b>
Styling:<b>
Tailwind CSS<b>
Shadcn/ui components<b>
Custom animations<b>
Backend<b>
Language: Node.js<b>
Database: PostgreSQL<b>
ORM: Prisma for database management<b>
Authentication: JWT (JSON Web Tokens)<b>
API Management: RESTful APIs with Express.js<b>
Dental API: DentalAPI<b>
UI/UX<b>
UI/UX:<b>
Radix UI primitives<b>
Lucide icons<b>
Geist font family<b>
Date Management<b>
Date Management: date-fns<b>

🚀 Getting Started<b>
Backend Setup<b>
Clone the backend repository<b>
git clone https://github.com/ismail-devmaster/dental-backend.git  <b>
cd dental-backend  <b>
Install dependencies<b>


npm install  <b>
Setup PostgreSQL<b>

Ensure PostgreSQL is installed locally or on a remote server.<b>
Update .env file with database configurations.<b>
env<b>

DATABASE_URL=your_database_url  <b>
Run Database Migrations<b>


npx prisma migrate dev  <b>
Start Backend Server<b>

npm run dev  <b>
Frontend Setup<b>
Clone the frontend repository<b>

git clone https://github.com/ismail-devmaster/dentalDB.git  <b>
cd dental-frontend  <b>
Install dependencies<b>


npm install  <b>
Start Development Server<b>


npm run dev  <b>
Open http://localhost:3000<b>

📁 Project Structure<b>
Backend Structure<b>

dentalApi/  <b>
├── models/                # Database models  <b>
├── controllers/            # API endpoints  <b>
├── services/               # Business logic  <b>
├── routes/                 # API routes  <b>
├── config/                 # Configuration files  <b>
└── .env                    # Environment variables  <b>
<b>
Frontend Structure<b>
dentalDB/  <b>
├── app/                    # Next.js app directory  <b>
│   ├── doctor/              # Doctor dashboard  <b>
│   ├── patient/             # Patient portal  <b>
│   ├── receptionist/        # Receptionist interface  <b>
│   └── layout.tsx           # Root layout  <b>
├── components/              # Reusable components  <b>
├── public/                  # Static assets  <b>
└── styles/                  # Global styles  <b>
🔧 Environment Setup<b>
Backend:<b>

Create a .env file in the backend folder (dentalApi/) and set:<b>
env<b>

DATABASE_URL=your_database_url<b>
Frontend:<b>

Create a .env.local file in the frontend folder (dentalDB/) and set:<b>
env<b>

NEXT_PUBLIC_API_URL=http://localhost:5000<b>
🤝 Contributing<b>
Fork the repository.<b>
Create your feature branch (git checkout -b feature/AmazingFeature).<b>
Commit your changes (git commit -m 'Add AmazingFeature').<b>
Push to the branch (git push origin feature/AmazingFeature).<b>
Open a Pull Request.<b>
📝 License<b>
Distributed under the MIT License. See LICENSE for more information.<b>
