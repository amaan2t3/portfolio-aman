import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { handleApiRequest } from './apiHandler.js';

const app = express();
const port = Number(process.env.PORT || 3001);

app.disable('x-powered-by');
app.use(express.json({ limit: '5mb', strict: true }));
app.use('/api', (request, response) => {
  void handleApiRequest(request, response).catch((error) => {
    console.error('Admin API request failed:', error);
    if (!response.headersSent) response.status(500).json({ error: 'The admin API encountered an unexpected error.' });
  });
});

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distPath = path.join(projectRoot, 'dist');
app.use(express.static(distPath, { index: false }));
app.get(/.*/, (request, response, next) => {
  response.sendFile(path.join(distPath, 'index.html'), (error) => {
    if (error) next();
  });
});

app.listen(port, () => {
  console.log(`Portfolio server listening on http://localhost:${port}`);
});
