# Combination Generator API

A Node.js + TypeScript API that generates valid item combinations based on numeric input.
The system ensures that **items sharing the same starting letter cannot appear in the same combination**.

All data (items, combinations, and API responses) is stored in MySQL using **raw SQL queries** and **explicit transactions**.

---

## 🚀 Features

- Generate items dynamically from numeric input
- Apply prefix rule (no items with same starting letter in a combination)
- Generate all valid combinations for any length
- Store items, combinations, and responses in MySQL
- Uses **mysql2**
- Fully typed with TypeScript
- Clean modular architecture
- Swagger documentation (`/docs`)
- Dockerized environment
- SQL migrations

---

## 🐳 Docker Setup

### **1. Start Docker containers**
```bash
docker-compose up -d

### **2. Enter the API container
```bash
docker-compose exec api sh

### ***3. Run migrations inside the container
npm run migrate
