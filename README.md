# Real-Time Markdown Notebook

A cloud-native real-time markdown notebook application that allows multiple users to collaborate on markdown documents simultaneously.

## Architecture Components

- **Frontend**: React-based web application for markdown editing
- **Backend**: Node.js server handling real-time updates
- **Database**: MongoDB for document storage
- **Real-time Updates**: WebSocket for live synchronization
- **Container Orchestration**: Kubernetes for scalable deployment
- **Serverless Functions**: Google Cloud Functions for specific operations
- **Virtual Machines**: For running the main application components

## Prerequisites

- Google Cloud Platform account
- Docker
- kubectl
- Node.js 18+
- npm or yarn

## Setup Instructions

1. Clone this repository
2. Install dependencies:
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
4. Deploy to GCP:
   ```bash
   ./deploy.sh
   ```

## Project Structure

```
.
├── frontend/           # React frontend application
├── backend/           # Node.js backend server
├── k8s/              # Kubernetes deployment files
├── terraform/        # Infrastructure as Code
├── locust/           # Load testing scripts
└── docs/             # Documentation
```

## Performance Testing

The project includes Locust scripts for load testing. Run the tests using:

```bash
cd locust
locust -f locustfile.py
```

## License

MIT 