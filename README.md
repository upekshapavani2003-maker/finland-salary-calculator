# Salary Calculator

A full-stack salary calculator web application built with Next.js.

## Project Structure

```
salary-calculator/
|-- frontend/
|   |-- src/
|   |   |-- app/
|   |   |-- components/
|   |   |-- lib/
|   |   `-- types/
|   |-- public/
|   |-- package.json
|   |-- tailwind.config.js
|   `-- tsconfig.json
|
|-- backend/
|   |-- src/
|   |   |-- app/
|   |   |   `-- api/
|   |   |-- lib/
|   |   `-- types/
|   |-- package.json
|   `-- tsconfig.json
|
`-- README.md
```

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js 14 API Routes, TypeScript
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd salary-calculator
```

2. Install dependencies for both frontend and backend:

```bash
# Frontend dependencies
cd frontend
npm install

# Backend dependencies
cd ../backend
npm install
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```
The backend will run on `http://localhost:3001`

2. Start the frontend application (in a new terminal):
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:3000`

## Features

- Salary calculation with various parameters
- Tax calculations
- Net salary computation
- Responsive UI design
- RESTful API endpoints

## API Endpoints

### Calculate Salary
- **POST** `/api/salary/calculate`
- **Body**: Salary calculation parameters
- **Response**: Calculated net salary and breakdown

## Development

### Frontend Development
- Located in `frontend/` directory
- Uses Next.js App Router
- Styled with Tailwind CSS
- TypeScript for type safety

### Backend Development
- Located in `backend/` directory
- Next.js API routes for REST API
- TypeScript for type safety
- Modular structure for maintainability

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
