# My_Portfolio

React + Vite portfolio with a Node/Express backend for live coding stats and enquiry storage in Excel.

## Features

- Live LeetCode stats (total solved, difficulty split, ranking)
- Live GitHub contribution graph, commit contributions, and current streak
- Enquiry form persisted to `enquiries.xlsx` on backend
- Curated projects with dynamic GitHub stars/forks/language
- Responsive modern UI with theme toggle

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create env file:
```bash
copy .env.example .env
```

3. Add your GitHub token in `.env`:
```env
GITHUB_TOKEN=your_real_token
```

## Run

- Frontend only:
```bash
npm run dev
```

- Backend only:
```bash
npm run server
```

- Frontend + backend together:
```bash
npm run dev:full
```

## Backend Data Output

Each contact form submit appends one row in:

- `enquiries.xlsx` (sheet: `Enquiries`)

Columns:

- `timestamp`
- `name`
- `email`
- `subject`
- `message`
