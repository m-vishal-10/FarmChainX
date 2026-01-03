# 🚜 FarmChainX Backend

![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5.6-6DB33F?style=for-the-badge&logo=spring-boot)
![Java](https://img.shields.io/badge/Java-21_LTS-ED8B00?style=for-the-badge&logo=openjdk)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14-316192?style=for-the-badge&logo=postgresql)

The powerful backend API engine for **FarmChainX**, built with **Spring Boot 3.5** and **Java 21**. It orchestrates the entire supply chain logic, handles secure authentication, manages data persistence, and integrates with cloud services for a production-ready RESTful API.

🌐 **Live API**: [https://farmchainx.onrender.com](https://farmchainx.onrender.com)

---

## 🌟 Core Capabilities

### 🔐 Authentication & Security
- **JWT-based Authentication**: Stateless token-based auth
- **Role-Based Access Control (RBAC)**: 5 roles (Farmer, Distributor, Retailer, Consumer, Admin)
- **Spring Security**: Comprehensive security configuration
- **Password Encryption**: BCrypt hashing
- **CORS Configuration**: Cross-origin for frontend integration

### 📦 Supply Chain Management
- **Product Lifecycle**: Create, update, track products
- **Inventory Management**: Real-time stock tracking
- **Order Processing**: End-to-end order fulfillment
- **Shipment Tracking**: Logistics and delivery management
- **Provenance Records**: Complete product journey history

### 🔍 Traceability & Analytics
- **Product History API**: Full journey from farm to shelf
- **QR Code Services**: Generate and verify product codes
- **Analytics Dashboard**: User, product, and transaction stats
- **Activity Logs**: Audit trail for all operations

### ☁️ Cloud Integration
- **Cloudinary**: Image upload and storage
- **PostgreSQL**: Production database on Render
- **MySQL**: Local development database
- **Environment Variables**: Secure credential management

---

## 🔧 Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| **Language** | Java | 21 LTS |
| **Framework** | Spring Boot | 3.5.6 |
| **Database (Dev)** | MySQL | 8.0 |
| **Database (Prod)** | PostgreSQL | 14+ |
| **ORM** | Hibernate/JPA | Latest |
| **Security** | Spring Security + JWT | 6.x |
| **Build Tool** | Maven | 3.9+ |
| **API Docs** | Swagger/OpenAPI | 3.0 |
| **Utilities** | Lombok, Dotenv | Latest |

---

## 📦 Project Structure

```
backend/farmchainX/
├── src/
│   ├── main/
│   │   ├── java/com/farmchainx/
│   │   │   ├── config/           # Configuration classes
│   │   │   │   ├── CorsConfig.java
│   │   │   │   └── SecurityConfig.java
│   │   │   ├── controller/       # REST Controllers
│   │   │   │   ├── AuthController.java
│   │   │   │   ├── ProductController.java
│   │   │   │   ├── UserController.java
│   │   │   │   └── AdminController.java
│   │   │   ├── dto/              # Data Transfer Objects
│   │   │   │   ├── LoginRequest.java
│   │   │   │   ├── AnalyticsDTO.java
│   │   │   │   └── ...
│   │   │   ├── entity/           # JPA Entities
│   │   │   │   ├── User.java
│   │   │   │   ├── Product.java
│   │   │   │   ├── Shipment.java
│   │   │   │   └── ...
│   │   │   ├── repository/       # Spring Data JPA
│   │   │   │   ├── UserRepository.java
│   │   │   │   ├── ProductRepository.java
│   │   │   │   └── ...
│   │   │   ├── service/          # Business Logic
│   │   │   │   ├── AuthService.java
│   │   │   │   ├── ProductService.java
│   │   │   │   └── ...
│   │   │   └── util/             # Utility Classes
│   │   │       ├── JwtUtil.java
│   │   │       └── QRCodeGenerator.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── application-prod.properties
│   └── test/                     # Unit & Integration Tests
├── pom.xml                       # Maven dependencies
└── mvnw / mvnw.cmd              # Maven wrapper
```

---

## 🚀 Getting Started

### Prerequisites

#### Development
- **JDK 21**: [Download Oracle JDK](https://www.oracle.com/java/technologies/downloads/#java21) or [OpenJDK](https://adoptium.net/)
- **MySQL 8.0**: [Download MySQL](https://dev.mysql.com/downloads/)
- **Maven**: Bundled via `mvnw`
- **IDE**: IntelliJ IDEA (recommended) or Eclipse

#### Production
- **PostgreSQL** (provided by Render)
- **Cloudinary Account** (for image storage)

---

### Local Setup

#### 1. Clone Repository
```bash
git clone https://github.com/Subashkumawat34/FarmChainX.git
cd FarmChainX/backend/farmchainX
```

#### 2. Database Configuration

**Create MySQL Database**:
```sql
CREATE DATABASE farmchainx_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

**Update Configuration**:  
Edit `src/main/resources/application.properties`:

```properties
# Database Connection
spring.datasource.url=jdbc:mysql://localhost:3306/farmchainx_db?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=your_mysql_password

# JPA Settings
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# JWT Secret (Generate secure key)
jwt.secret=your_super_secret_jwt_key_min_256_bits

# Cloudinary (Optional for local testing)
cloudinary.cloud.name=your_cloud_name
cloudinary.api.key=your_api_key
cloudinary.api.secret=your_api_secret
```

#### 3. Build & Run

**Using Maven Wrapper (Recommended)**:
```bash
./mvnw clean install
./mvnw spring-boot:run
```

**Or using Maven directly**:
```bash
mvn clean install
mvn spring-boot:run
```

Server will start at `http://localhost:8080`

#### 4. Verify Running
```bash
curl http://localhost:8080/api/auth/test
# Expected: "API is running!"
```

---

### Production Deployment (Render)

#### 1. Database Setup
Render automatically provisions PostgreSQL database.

#### 2. Environment Variables
Set in Render dashboard:

```env
# Database (Auto-configured by Render)
DATABASE_URL=postgresql://user:password@host:5432/database

# JWT
JWT_SECRET=your_production_jwt_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# CORS
ALLOWED_ORIGINS=https://farmchainx.vercel.app

# Spring Profile
SPRING_PROFILES_ACTIVE=prod
```

#### 3. Production Configuration
Create `src/main/resources/application-prod.properties`:

```properties
# PostgreSQL (Uses DATABASE_URL from Render)
spring.datasource.url=${DATABASE_URL}
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect

# Production Settings
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
server.port=${PORT:8080}
```

#### 4. Deploy
```bash
git add .
git commit -m "Deploy to production"
git push origin main
```

Render auto-deploys on push to main branch.

---

## 📚 API Documentation

### Swagger UI (Interactive)
Once server is running, access:
- **Swagger UI**: `http://localhost:8080/swagger-ui/index.html`
- **OpenAPI JSON**: `http://localhost:8080/v3/api-docs`

### Key Endpoints

#### Authentication
```
POST /api/auth/register  - User registration
POST /api/auth/login     - User login (returns JWT)
GET  /api/auth/me        - Get current user
```

#### Products
```
GET    /api/products              - List all products
GET    /api/products/{id}         - Get product details
POST   /api/products              - Create product (Farmer)
PUT    /api/products/{id}         - Update product
DELETE /api/products/{id}         - Delete product
GET    /api/products/qr/{code}    - Get by QR code
```

#### Admin
```
GET  /api/admin/users          - List all users
GET  /api/admin/analytics      - System analytics
PUT  /api/admin/users/{id}     - Update user role
```

#### Distributor
```
GET  /api/distributor/marketplace    - Browse products
POST /api/distributor/procure        - Procure product
GET  /api/distributor/inventory      - View inventory
```

---

## 🧪 Testing

### Unit Tests
```bash
./mvnw test
```

### Integration Tests
```bash
./mvnw verify
```

### Code Coverage
```bash
./mvnw test jacoco:report
# Report in target/site/jacoco/index.html
```

---

## 🏗️ Architecture

### Layered Architecture

```
┌─────────────────────────────────┐
│      REST Controllers           │  ← HTTP Requests
├─────────────────────────────────┤
│      Service Layer              │  ← Business Logic
├─────────────────────────────────┤
│      Repository Layer           │  ← Data Access (JPA)
├─────────────────────────────────┤
│      Entity Layer (Models)      │  ← Database Models
└─────────────────────────────────┘
         ↓
    [Database]
```

### Design Patterns
- **DTO Pattern**: Separation of API and entity models
- **Repository Pattern**: Data access abstraction
- **Service Layer**: Business logic encapsulation
- **Dependency Injection**: Spring IoC container

---

## 🔐 Security Features

### JWT Authentication Flow
1. User logs in → Server validates credentials
2. Server generates JWT token → Returns to client
3. Client stores token → Includes in Authorization header
4. Server validates token → Allows/denies access

### Password Security
- **Hashing**: BCrypt with salt (strength 12)
- **Validation**: Min 8 chars, uppercase, number, special char
- **Storage**: Never store plain text passwords

### CORS Configuration
```java
@Bean
public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/**")
                .allowedOrigins(allowedOrigins)
                .allowedMethods("*")
                .allowCredentials(true);
        }
    };
}
```

---

## 🛠️ Development Tools

### Database Management
- **MySQL Workbench**: GUI for MySQL
- **pgAdmin**: GUI for PostgreSQL  
- **DBeaver**: Universal database tool

### API Testing
- **Postman**: API testing collections
- **Swagger UI**: Built-in interactive docs
- **cURL**: Command-line testing

### Code Quality
- **SonarLint**: Real-time code analysis
- **Checkstyle**: Code style enforcement
- **SpotBugs**: Bug detection

---

## 🐛 Troubleshooting

### Common Issues

**Port 8080 already in use**:
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <pid> /F

# Linux/Mac
lsof -ti:8080 | xargs kill -9
```

**Database connection failed**:
- Verify MySQL is running
- Check credentials in application.properties
- Ensure database exists

**JWT token invalid**:
- Check JWT_SECRET matches between environments
- Verify token hasn't expired (default 24h)

---

## 📊 Performance

### Optimization Techniques
- **Connection Pooling**: HikariCP (Spring Boot default)
- **Query Optimization**: Indexed columns, N+1 prevention
- **Caching**: Spring Cache (Redis in future)
- **Pagination**: Limit large result sets

### Monitoring
- **Spring Actuator**: Health checks, metrics
- **Logging**: SLF4J + Logback
- **APM**: Application Performance Monitoring (future)

---

## 🆕 Recent Updates (January 2026)

- ✅ PostgreSQL support for production deployment
- ✅ Enhanced CORS configuration for Vercel frontend
- ✅ Analytics dashboard endpoints
- ✅ Settings management APIs
- ✅ Improved error handling and validation
- ✅ Cloudinary integration for media
- ✅ QR code generation enhancements
- ✅ Production-ready configuration

---

## 📄 License

MIT License - See root LICENSE file

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Follow Java code conventions
4. Write unit tests
5. Submit pull request

---

## 📧 Support

- **Issues**: [GitHub Issues](https://github.com/Subashkumawat34/FarmChainX/issues)
- **Email**: farmchainx@example.com
- **Documentation**: See Swagger UI when running

---

*Powered by Spring Boot 3.5 & Java 21 LTS*
