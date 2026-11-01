import 'dotenv/config'
import express from 'express'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { handleApiRequest } from './server/apiHandler.js'

const localApi = express()

localApi.disable('x-powered-by')
localApi.use(express.json({ limit: '5mb', strict: true }))
localApi.use('/api', (request, response) => {
  void handleApiRequest(request, response).catch((error) => {
    console.error('Admin API request failed:', error)
    if (!response.headersSent) response.status(500).json({ error: 'The admin API encountered an unexpected error.' })
  })
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'local-admin-api',
      configureServer(server) {
        server.middlewares.use(localApi)
      },
    },
  ],
})
