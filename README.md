# NotesAssignment

A simple **Notes Management Application** built with modern web technologies. The app allows users to create, view, update, and delete notes seamlessly.

This project is **fully Dockerized**, making it easy to set up and run across different environments without additional configuration.

---

## 🚀 Features

* ✍️ Create, edit, and delete notes
* 📋 View all notes in a clean UI
* 🐳 Dockerized for easy deployment
* ⚡ Lightweight and fast

---

## 😴 Tech Stack

* **Frontend**: React.js / Next.js
* **Backend**: Node.js / Express
* **Database**: MongoDB
* **Containerization**: Docker & Docker Compose

---

## 📦 Getting Started

### Prerequisites

Make sure you have installed:

* [Docker](https://www.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/)

---

### Run with Docker

Clone the repository:

```bash
git clone https://github.com/arjun3649/NotesAssignment.git
cd NotesAssignment
```

Build and start the containers:

```bash
docker-compose up --build
```

The app should now be running at:

```
http://localhost:3000
```

To stop the Docker containers:

```bash
docker-compose down
```

---

## ⚙️ Development Setup (Without Docker)

If you want to run locally without Docker:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 📚 Project Structure

```
NotesAssignment/
│── frontend/       # React/Next.js frontend
│── backend/        # Node.js backend
│── docker-compose.yml
│── Dockerfile
│── README.md
```

---

## 🐣 Docker Notes

* **docker-compose.yml** manages multi-container setup
* **Dockerfile** defines the build environment
* Ensures consistency across dev, test, and prod

---

## 🫵 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/awesome-feature`)
3. Commit your changes (`git commit -m 'Add awesome feature'`)
4. Push to the branch (`git push origin feature/awesome-feature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**.
