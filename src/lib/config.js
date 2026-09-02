export const API_URL = 'https://projeto-express-backend-1.onrender.com/';

// O plano gratuito do Render "dorme" a API após um tempo sem uso — a primeira
// requisição depois disso pode demorar bastante até ela acordar.
export const REQUEST_TIMEOUT_MS = 55000;

export const LOG_LIMIT = 300;

export const AUTO_REFRESH_OPTIONS = [
  { label: 'desligado', value: 0 },
  { label: '10s', value: 10000 },
  { label: '30s', value: 30000 },
  { label: '60s', value: 60000 },
];
