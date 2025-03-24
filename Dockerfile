FROM node:23-alpine as DEV_IMAGE
WORKDIR /app/react-app

# Copia solo package.json y package-lock.json primero para optimizar el cache
COPY package.json package-lock.json ./

# Instala dependencias
RUN npm install

# Copia todo el código de la aplicación (pero en la práctica usaremos bind mounts)
COPY . .

# Expone el puerto de Vite
EXPOSE 3000

# Comando para ejecutar Vite en modo desarrollo
CMD ["npm", "run", "dev", "--", "--port", "3000", "--host"]
