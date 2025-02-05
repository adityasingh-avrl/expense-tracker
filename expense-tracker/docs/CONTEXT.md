# Expense Tracker App

## Overview
The Expense Tracker App is a comprehensive solution for personal finance management, enabling users to monitor their monthly expenses through intuitive transaction management and spending analysis tools.

## Tech Stack
    - Frontend: Next.js, Tailwind CSS, Shadcn UI
    - Backend: Next.js
    - Database: PostgreSQL
    - Authentication: NextAuth
    - Hosting: Vercel
    - Version Control: Git
    


## Core Features

### User Authentication
- **Sign Up**: Create a new account with email and password
- **Login**: Secure access for returning users
- **Password Recovery**: Self-service password reset via email

### Dashboard
The main interface provides quick access to essential features:

#### Transaction Management
- Add, edit, and delete transactions
- Categorize expenses and income
- Set and track monthly income
- View expense summaries and balances

#### Financial Analysis
- Breakdown of expenses by category
- Visual reports (pie charts, bar graphs)
- Monthly spending trends
- Custom date range filtering

#### Category Management
- Create and customize expense categories
- Assign colors and icons
- Organize transactions efficiently

### Settings & Preferences

#### Profile Management
- Update personal information
- Change email or password
- Manage notification preferences

#### App Customization
- Currency format selection
- Dark/Light mode toggle
- Language preferences

#### Data Management
- Export transactions (CSV/PDF)
- Backup and restore functionality
- Data privacy controls

### Advanced Features
- **Smart Search**: Filter transactions by date, amount, or category
- **Recurring Transactions**: Schedule regular payments
- **Budget Alerts**: Customizable spending notifications
- **Multi-device Sync**: Access data across devices

## Technical Implementation

### Security Considerations
- Secure user authentication
- Encrypted data storage
- Regular security audits

### Performance
- Efficient data handling
- Responsive UI design
- Offline functionality

## Development Guidelines
1. Prioritize user experience and interface simplicity
2. Implement robust data validation
3. Ensure cross-platform compatibility
4. Maintain comprehensive error handling
5. Follow security best practices

### Project Structure

```
expense-tracker/
├── .github/
│   └── workflows/               # CI/CD configurations
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── api/               # API routes
│   │   ├── auth/              # Authentication pages
│   │   ├── dashboard/         # Dashboard pages
│   │   ├── settings/          # Settings pages
│   │   └── layout.tsx         # Root layout
│   ├── components/
│   │   ├── ui/               # Reusable UI components
│   │   ├── forms/            # Form components
│   │   ├── charts/           # Chart components
│   │   └── layout/           # Layout components
│   ├── lib/
│   │   ├── db/              # Database utilities
│   │   ├── auth/            # Authentication utilities
│   │   └── utils/           # Helper functions
│   ├── hooks/               # Custom React hooks
│   ├── types/               # TypeScript type definitions
│   └── styles/              # Global styles
├── public/                  # Static assets
├── prisma/                  # Prisma schema and migrations
│   ├── schema.prisma
│   └── migrations/
├── tests/                   # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/                    # Documentation
├── scripts/                 # Build and deployment scripts
├── .env.example            # Environment variables example
├── package.json
├── tsconfig.json
└── README.md
```

---

*Note: This documentation serves as a living document and will be updated as the application evolves.*

### Database Schema

#### Users Table
```sql
CREATE TABLE users (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
email VARCHAR(255) UNIQUE NOT NULL,
password_hash VARCHAR(255) NOT NULL,
first_name VARCHAR(100),
last_name VARCHAR(100),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);```

#### Categories Table
```sql
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    name VARCHAR(100) NOT NULL,
    color VARCHAR(50),
    icon VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Transactions Table
```sql
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    category_id UUID REFERENCES categories(id),
    amount DECIMAL(12,2) NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    type VARCHAR(10) NOT NULL CHECK (type IN ('income', 'expense')),
    is_recurring BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### RecurringTransactions Table
```sql
CREATE TABLE recurring_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_id UUID REFERENCES transactions(id),
    frequency VARCHAR(20) NOT NULL, -- weekly, monthly, yearly
    start_date DATE NOT NULL,
    end_date DATE,
    last_generated DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### UserPreferences Table
```sql
CREATE TABLE user_preferences (
    user_id UUID PRIMARY KEY REFERENCES users(id),
    currency VARCHAR(10) DEFAULT 'USD',
    theme VARCHAR(10) DEFAULT 'light',
    language VARCHAR(10) DEFAULT 'en',
    notification_enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```