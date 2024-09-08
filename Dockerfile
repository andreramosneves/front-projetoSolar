FROM node:latest 

WORKDIR /app

# Copiar arquivos e instalar dependências
COPY package.json .

RUN npm install

# Copiar o restante do código
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
