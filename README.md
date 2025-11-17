# DigitIt Task Manager  
_A full-stack role-based task management system for Teachers and Students._

Built as part of the DigitIt Take-Home Assignment, this application provides a clean, modern, and professional workflow for assigning, tracking, updating, and managing tasks across teacher–student workflows.

---

## 🚀 Features

### 👥 User Roles
- **Teacher**
  - Can assign tasks to themselves or to their students
  - Can view tasks created by students assigned to them
  - Can track progress of each task
- **Student**
  - Can view only their own tasks
  - Can update progress for their tasks
  - Must be linked to a teacher (via teacher ID or email)

---

## 🧩 Core Functionalities
### 🔐 Authentication
- JWT-based login & signup
- Role-based access control
- Student–teacher linking during signup

### 📝 Task Management
- Create a task with:
  - Title  
  - Description  
  - Due date  
  - Progress state  
- Update task progress using a dropdown  
- Only task owner can edit or delete  
- Teachers see tasks of all assigned students  
- Students see only their tasks  

### 🔎 Filtering
- Filter tasks by **progress state:**
  - Not started  
  - In progress  
  - Completed  

### 🎨 Modern & Clean UI
- Fully redesigned frontend  
- Professional dashboard layout  
- Fully responsive  
- Clean typography  
- Attractive card-based design  
- Improved login & signup UI  
- Smooth animations & spacing  

---

## 🏗 Tech Stack

### Frontend  
- React (Vite)  
- Modern CSS (custom design system)  
- Clean responsive layout  

### Backend  
- Node.js  
- Express  
- MongoDB + Mongoose  
- JWT Authentication  
- JOI Validation  

---

Running the Project Locally

### Backend
```bash
cd server
npm install
npm run dev
### Frontend:
```bash
cd client
npm install
npm run dev

#### API Endpoints
Auth
Method	 Endpoint	Description
POST	    /auth/signup	Registers new user
POST	    /auth/login	Authenticates user
Tasks
Method	 Endpoint	Description
GET	    /tasks	Fetch tasks (role-based)
POST	    /tasks	Create a new task
PUT	    /tasks/:id	Update a task
DELETE	 /tasks/:id	Delete a task

#####Why This Project Stands Out

Real-world role-based permissions

Clean architecture

Professional UI matching modern SaaS dashboards

Fully functional end-to-end assignment workflow

Neatly organized code

Easy to extend and deploy