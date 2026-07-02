<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0F2027,50:203A43,100:2C5364&height=260&section=header&text=EverCart&fontSize=72&fontColor=ffffff&animation=twinkling&fontAlignY=35&desc=Microservices-Based%20E-Commerce%20Platform&descAlignY=58&descSize=20&stroke=2F81F7&strokeWidth=1" width="100%"/>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=20&pause=1000&color=2F81F7&center=true&vCenter=true&width=700&lines=Built+with+a+Microservices+Architecture;API+Gateway+%2B+JWT+Auth+%2B+RBAC;Redis+Caching+%2B+RabbitMQ+Messaging;Dockerized+%26+Deployed+on+AWS+with+CI%2FCD" />
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/sahil-kourav/evercart_marketplace?style=for-the-badge&color=2C5364&labelColor=0F2027" />
  <img src="https://img.shields.io/github/forks/sahil-kourav/evercart_marketplace?style=for-the-badge&color=203A43&labelColor=0F2027" />
  <img src="https://img.shields.io/github/last-commit/sahil-kourav/evercart_marketplace?style=for-the-badge&color=2C5364&labelColor=0F2027" />
  <img src="https://img.shields.io/github/repo-size/sahil-kourav/evercart_marketplace?style=for-the-badge&color=203A43&labelColor=0F2027" />
</p>

<p align="center">
  <a href="#-overview">Overview</a> •
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-cicd-pipeline">CI/CD</a> •
  <a href="#-roadmap">Roadmap</a>
</p>

---

## 📖 Overview

**EverCart** is a microservices-based e-commerce backend, built to reflect how
real production systems are structured — not another single-file CRUD app.
The platform is split into independent services for Authentication, Products,
Orders, Cart, Payments, Notifications, and Seller Management, all routed
through a custom-built **API Gateway**, containerized with **Docker**, and
deployed on **AWS** with an automated **CI/CD pipeline**.

---

## ✨ Features

<table>
<tr>
<td width="50%">

**🧩 Microservices Architecture**
Independent services for Auth, Products, Orders, Cart, Payments, Notifications & Sellers

**🚪 Custom API Gateway**
Centralized request routing, authentication, authorization & rate limiting

**🔐 JWT Auth + RBAC**
Access & refresh tokens with Role-Based Access Control

</td>
<td width="50%">

**⚡ Redis Caching**
Faster response times for frequently-accessed data

**📨 RabbitMQ Messaging**
Asynchronous, event-driven communication between services

**💳 Razorpay Integration**
Secure, production-ready payment processing

</td>
</tr>
</table>

**🐳 Dockerized Services** — every service runs in its own container for easy scaling and isolation
**☁️ Deployed on AWS (EC2)** — real cloud infrastructure, not just localhost
**🔁 Automated CI/CD** — GitHub Actions pipeline tests and deploys on every push

---

## 🛠️ Tech Stack

<p align="center">
  <img src="https://skillicons.dev/icons?i=nodejs,express,mongodb,redis,docker,aws,git,githubactions&theme=dark" />
</p>

| Category | Stack |
|---|---|
| **Runtime & Framework** | Node.js, Express.js |
| **Database** | MongoDB |
| **Caching** | Redis |
| **Messaging** | RabbitMQ |
| **Auth** | JWT (Access + Refresh Tokens), RBAC |
| **Payments** | Razorpay |
| **Containerization** | Docker |
| **Cloud** | AWS (EC2) |
| **CI/CD** | GitHub Actions |

---

## 🧩 Architecture

```mermaid
flowchart TB
    Client[Client Apps] --> GW[API Gateway]
    GW --> AUTH[Auth Service<br/>JWT + RBAC]
    GW --> PROD[Product Service]
    GW --> CART[Cart Service]
    GW --> ORDER[Order Service]
    GW --> PAY[Payment Service<br/>Razorpay]
    GW --> NOTIF[Notification Service]
    GW --> SELLER[Seller Service]

    ORDER -.->|async events| MQ[(RabbitMQ)]
    NOTIF -.->|async events| MQ
    PROD --> CACHE[(Redis Cache)]

    AUTH --> DB[(MongoDB)]
    PROD --> DB
    CART --> DB
    ORDER --> DB
    PAY --> DB
    NOTIF --> DB
    SELLER --> DB
```

*(Renders natively on GitHub — no external image dependency.)*

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/sahil-kourav/evercart_marketplace.git
cd evercart_marketplace

# 2. Install dependencies
cd server && npm install
cd ../client && npm install

# 3. Set environment variables
cp .env.example .env
# Fill in: MONGODB_URI, JWT_SECRET, JWT_REFRESH_SECRET,
# RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, REDIS_URL, RABBITMQ_URL

# 4. Run with Docker (recommended)
docker-compose up --build

# Or run services manually
cd server && npm run dev
cd ../client && npm run dev
```

---

## 🔁 CI/CD Pipeline

This project uses **GitHub Actions** to automatically test and deploy on every
push to `main` — no manual deployment steps required.

```yaml
# .github/workflows/deploy.yml (simplified)
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install
      - run: npm test
      - run: npm run build
      # ... deployment step to AWS
```

---

## 🗺️ Roadmap

- [x] Microservices architecture with API Gateway
- [x] JWT authentication with RBAC
- [x] Redis caching + RabbitMQ event-driven messaging
- [x] Razorpay payment integration
- [x] Dockerized services deployed on AWS
- [x] CI/CD pipeline with GitHub Actions
- [ ] Add centralized logging & monitoring

---

## 📫 Contact

<p align="center">
  <a href="https://linkedin.com/in/sahilkourav"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" /></a>
  <a href="mailto:sahilkourav02@gmail.com"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" /></a>
</p>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:2C5364,50:203A43,100:0F2027&height=120&section=footer&animation=twinkling" width="100%"/>
