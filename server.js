require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/markdown-notebook", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Document Schema
const documentSchema = new mongoose.Schema({
  documentId: String,
  content: String,
  lastModified: { type: Date, default: Date.now }
});

const Document = mongoose.model("Document", documentSchema);

// Middleware
app.use(cors());
app.use(express.json());

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-document", async (documentId) => {
    socket.join(documentId);
    
    const document = await Document.findOne({ documentId }) || 
      await Document.create({ documentId, content: "# Welcome to Real-Time Markdown Notebook

Start typing to see the preview..." });
    
    socket.emit("markdown-update", document.content);
  });

  socket.on("markdown-change", async ({ documentId, content }) => {
    await Document.findOneAndUpdate(
      { documentId },
      { content, lastModified: new Date() },
      { upsert: true }
    );

    socket.to(documentId).emit("markdown-update", content);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// REST API endpoints
app.get("/api/documents/:documentId", async (req, res) => {
  try {
    const document = await Document.findOne({ documentId: req.params.documentId });
    res.json(document || { content: "# Welcome to Real-Time Markdown Notebook

Start typing to see the preview..." });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch document" });
  }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
