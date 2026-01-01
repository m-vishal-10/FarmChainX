# ✅ Render Deployment Checklist - FarmChainX Backend

## Copy-Paste Configuration Values

---

### 📝 Basic Settings

```
Name: farmchainx-backend
Region: Virginia (US East)
Branch: main
Root Directory: backend/farmchainX
```

---

### 🔨 Build Settings

```
Build Command:
./mvnw clean install -DskipTests

Start Command:
java -jar target/farmchainx-0.0.1-SNAPSHOT.jar
```

---

### ⚙️ Environment Variables (Add these 9 variables)

**1. Database URL**
```
SPRING_DATASOURCE_URL
jdbc:postgresql://dpg-d5atlsje5dus73fam22g-a.virginia-postgres.render.com:5432/farmchainx
```

**2. Database Username**
```
SPRING_DATASOURCE_USERNAME
farmchainx_user
```

**3. Database Password**
```
SPRING_DATASOURCE_PASSWORD
10uiq8yy2SFOqod5Z5nqOwkZCDPy1GkC
```

**4. Driver Class**
```
SPRING_DATASOURCE_DRIVER_CLASS_NAME
org.postgresql.Driver
```

**5. Database Platform**
```
SPRING_JPA_DATABASE_PLATFORM
org.hibernate.dialect.PostgreSQLDialect
```

**6. Hibernate DDL**
```
SPRING_JPA_HIBERNATE_DDL_AUTO
update
```

**7. Show SQL**
```
SPRING_JPA_SHOW_SQL
false
```

**8. Server Port**
```
SERVER_PORT
8080
```

**9. JWT Secret**
```
JWT_SECRET
kfKGYpOc66XxCorkcjJN3hWTUKxpnG8DI0fCFj8x2APcNE+u7GS7w==Tx5AtCtWKAn4Gf
```

**10. Groq AI API Key** (for AI quality scoring)
```
GROQ_API_KEY
[Paste your Groq API key here - get it from https://console.groq.com/keys]
```

> **How to get Groq API Key:**
> 1. Visit https://console.groq.com
> 2. Sign up for free account
> 3. Go to API Keys section
> 4. Click "Create API Key"
> 5. Copy the key (starts with gsk_)

---

### ✅ Final Checks

- [ ] Region is **Virginia (US East)** (matches database!)
- [ ] All 10 environment variables added (including Groq API key for AI features)
- [ ] Auto-Deploy is **Enabled**
- [ ] Ready to click **"Create Web Service"**

---

**After deployment, your backend URL will be:**
```
https://farmchainx-backend.onrender.com
```

**Save this URL - you'll need it for frontend configuration!**
