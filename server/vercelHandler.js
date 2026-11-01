import { handleApiRequest } from './apiHandler.js';

export async function vercelHandler(request, response) {
  try {
    await handleApiRequest(request, response);
  } catch (error) {
    console.error('Admin API request failed:', error);
    if (!response.headersSent) {
      response.statusCode = 500;
      response.setHeader('Cache-Control', 'no-store');
      response.setHeader('Content-Type', 'application/json; charset=utf-8');
      response.end(JSON.stringify({ error: 'The admin API encountered an unexpected error.' }));
    }
  }
}
