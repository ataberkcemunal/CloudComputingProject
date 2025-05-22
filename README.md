# Real-Time Markdown Notebook

A collaborative real-time markdown editor that allows multiple users to edit documents simultaneously. Built with modern web technologies and containerized for easy deployment.

## 🌟 Features

- Real-time collaborative editing
- Markdown preview
- Persistent storage with MongoDB
- WebSocket-based real-time updates
- Containerized deployment with Docker
- Kubernetes support for scaling
- Load testing capabilities with Locust

## 🏗️ Architecture

The project consists of several components:

- **Frontend**: React-based web application
- **Backend**: Node.js/Express server with Socket.IO
- **Database**: MongoDB for document storage
- **Containerization**: Docker for both frontend and backend
- **Orchestration**: Kubernetes deployment configurations
- **Load Testing**: Locust for performance testing

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Docker and Docker Compose (for containerized deployment)
- Kubernetes cluster (for k8s deployment)

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
MONGODB_URI=mongodb://localhost:27017/markdown-notebook
PORT=3001
FRONTEND_URL=http://localhost:3000
```

### Local Development

1. Install dependencies:
   ```bash
   # Install backend dependencies
   npm install

   # Install frontend dependencies
   cd frontend
   npm install
   ```

2. Start the development servers:
   ```bash
   # Start backend server
   npm run dev

   # Start frontend server (in a new terminal)
   cd frontend
   npm start
   ```

### Docker Deployment

1. Build and run with Docker Compose:
   ```bash
   docker-compose up --build
   ```

### Kubernetes Deployment

1. Apply the Kubernetes configurations:
   ```bash
   kubectl apply -f k8s/
   ```

## 🧪 Load Testing

The project includes Locust for load testing. To run load tests:

```bash
cd locust
locust
```

Then open http://localhost:8089 to start the load test.

## 📁 Project Structure

```
.
├── backend/           # Backend server code
├── frontend/         # React frontend application
├── k8s/             # Kubernetes configuration files
├── locust/          # Load testing scripts
├── server.js        # Main backend entry point
└── package.json     # Project dependencies
```

## 🔧 API Endpoints

- `GET /api/documents/:documentId` - Fetch a document
- WebSocket events:
  - `join-document` - Join a document room
  - `markdown-change` - Update document content
  - `markdown-update` - Receive document updates

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Socket.IO for real-time communication
- React for the frontend framework
- MongoDB for data persistence
- Docker for containerization 