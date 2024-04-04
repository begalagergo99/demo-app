FROM node:18
WORKDIR /app

# Telepítsd a pnpm-et
RUN npm install -g pnpm

# Másold a projekt fájlokat
COPY backend/pnpm-lock.yaml ./
COPY backend/package.json ./
WORKDIR /app/backend
RUN pnpm install

# Másold a többi forráskódot
COPY backend/ ./

# Buildeld az alkalmazást
RUN pnpm run build

# Futtasd a Prisma migrációkat
RUN pnpm prisma migrate deploy

# Indítsd el az alkalmazást
CMD ["node", "dist/main"]
