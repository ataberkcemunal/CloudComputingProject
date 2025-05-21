import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import Editor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001');

function App() {
    const [markdown, setMarkdown] = useState('# Welcome to Real-Time Markdown Notebook\n\nStart typing to see the preview...');
    const [documentId, setDocumentId] = useState('default');

    useEffect(() => {
        // Listen for updates from other users
        socket.on('markdown-update', (newMarkdown) => {
            setMarkdown(newMarkdown);
        });

        // Join the document room
        socket.emit('join-document', documentId);

        return () => {
            socket.off('markdown-update');
        };
    }, [documentId]);

    const handleEditorChange = (value) => {
        setMarkdown(value);
        // Emit changes to other users
        socket.emit('markdown-change', { documentId, content: value });
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom align="center">
                Real-Time Markdown Notebook
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2, height: '80vh' }}>
                        <Typography variant="h6" gutterBottom>
                            Editor
                        </Typography>
                        <Editor
                            height="90%"
                            defaultLanguage="markdown"
                            value={markdown}
                            onChange={handleEditorChange}
                            theme="vs-dark"
                            options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                                wordWrap: 'on',
                            }}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2, height: '80vh', overflow: 'auto' }}>
                        <Typography variant="h6" gutterBottom>
                            Preview
                        </Typography>
                        <Box sx={{ p: 2 }}>
                            <ReactMarkdown>{markdown}</ReactMarkdown>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

export default App; 