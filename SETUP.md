# 🔧 Guide de configuration FireLearn - Phase 1-2

Ce guide vous accompagne pour finaliser la configuration de votre plateforme FireLearn.

## ✅ Ce qui a été fait

- ✅ Projet Next.js 15 avec TypeScript initialisé
- ✅ Tailwind CSS et Shadcn UI configurés
- ✅ ESLint, Prettier, Husky et lint-staged configurés
- ✅ Structure de dossiers créée (app, components, lib, prisma)
- ✅ Schéma Prisma v1 créé (User, Course, Module, Lesson, Progress, Upload)
- ✅ Better-Auth installé et configuré
- ✅ Pages d'authentification créées (login, register, forgot-password)
- ✅ Variables d'environnement structurées

## 🚀 Étapes pour finaliser la configuration

### 1. Créer une base de données Neon Postgres

1. Allez sur [https://neon.tech](https://neon.tech)
2. Créez un compte gratuit ou connectez-vous
3. Créez un nouveau projet "FireLearn"
4. Copiez la connection string (DATABASE_URL)

### 2. Configurer les variables d'environnement

Modifiez le fichier `.env.local` avec vos vraies valeurs :

```bash
# Database
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"

# Better Auth
BETTER_AUTH_SECRET="votre-secret-genere-avec-openssl-rand-base64-32"
BETTER_AUTH_URL="http://localhost:3000"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

Pour générer un secret aléatoire :

```bash
openssl rand -base64 32
```

### 3. Mettre à jour le schéma Prisma pour Better-Auth

Better-Auth nécessite ses propres tables. Ajoutez ces modèles au fichier `prisma/schema.prisma` :

```prisma
// Ajoutez ces modèles pour Better-Auth
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
  @@map("verification_tokens")
}
```

Et ajoutez ces relations au modèle User :

```prisma
model User {
  // ... champs existants ...

  // Relations Better-Auth
  accounts Account[]
  sessions Session[]
}
```

### 4. Exécuter les migrations Prisma

```bash
# Générer le client Prisma
npx prisma generate

# Créer et appliquer la migration
npx prisma migrate dev --name init

# Vérifier que tout est OK
npx prisma studio
```

### 5. Tester l'application

```bash
# Démarrer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

Testez les pages d'authentification :

- Login : [http://localhost:3000/auth/login](http://localhost:3000/auth/login)
- Register : [http://localhost:3000/auth/register](http://localhost:3000/auth/register)

### 6. Déployer sur Vercel (optionnel)

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel

# Configurer les variables d'environnement sur Vercel
# Allez dans les paramètres du projet > Environment Variables
# Ajoutez toutes les variables de .env.local
```

## 📝 Configuration GitHub OAuth (optionnel)

Si vous souhaitez activer la connexion GitHub :

1. Allez sur [GitHub Developer Settings](https://github.com/settings/developers)
2. Créez une nouvelle OAuth App
3. Configurez :
   - Homepage URL : `http://localhost:3000`
   - Authorization callback URL : `http://localhost:3000/api/auth/callback/github`
4. Copiez le Client ID et générez un Client Secret
5. Ajoutez-les dans `.env.local` :

```bash
GITHUB_CLIENT_ID="votre-client-id"
GITHUB_CLIENT_SECRET="votre-client-secret"
```

## 🔧 Scripts disponibles

```bash
npm run dev          # Démarrer le serveur de développement (Turbopack)
npm run build        # Construire l'application pour la production
npm run start        # Démarrer le serveur de production
npm run lint         # Linter le code
npm run format       # Formater le code avec Prettier
```

## 📚 Prochaines étapes

Une fois cette configuration terminée, vous serez prêt pour :

- **Phase 2** : UI/UX & Design System (NeoBrutalism)
- **Phase 3** : Pages publiques & Marketing
- **Phase 4** : Admin Dashboard
- **Phase 5** : Client Dashboard

## 🐛 Dépannage

### Erreur de connexion à la base de données

- Vérifiez que votre DATABASE_URL est correcte
- Assurez-vous que votre IP est autorisée dans Neon (par défaut : toutes les IPs)

### Erreur Better-Auth

- Vérifiez que BETTER_AUTH_SECRET est défini
- Vérifiez que les tables Better-Auth sont créées dans la base de données

### Erreur Prisma

- Exécutez `npx prisma generate` pour régénérer le client
- Exécutez `npx prisma db push` pour synchroniser le schéma

## 📞 Support

Si vous rencontrez des problèmes, consultez :

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Prisma](https://www.prisma.io/docs)
- [Documentation Better-Auth](https://better-auth.com/docs)
- [Documentation Neon](https://neon.tech/docs)

---

Bon développement ! 🚀
