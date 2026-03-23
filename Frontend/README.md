# Frontend (React + Vite)

This is the EMP Monitor frontend application built with React and Vite.

## Prerequisites

- Node.js `20+` (recommended)
- npm `10+` (recommended)

## Setup

From repository root:

```bash
cd Frontend
npm install
```

## Run

### Development

```bash
npm run dev
```

Vite will print the local URL (usually `http://localhost:5173`).

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Lint

```bash
npm run lint
```

## Tech Stack

- React `19`
- Vite `7`
- React Router `7`
- Tailwind CSS `4`
- Axios for API communication
- Zustand for state management

## API and Socket Configuration

At the moment, frontend endpoints are hardcoded in `src/services/api.service.js`:

- `BASE_URL`: main backend API
- `BACKEND_V4_URL`: login/auth API
- `SOCKET_BASE_URL`: websocket endpoint

If you need to point to another environment, update those constants.

## Common Issues

- **Port already in use**: run Vite on another port:
  - `npm run dev -- --port 5174`
- **CORS/API errors**: verify backend services are reachable and URLs in `src/services/api.service.js` are correct.
- **WebSocket not connecting**: check `SOCKET_BASE_URL` protocol/domain and backend socket service health.

## Notes

- The project currently does not use frontend `.env` variables for API URLs.
- Keep production endpoint updates consistent across all constants in `src/services/api.service.js`.
