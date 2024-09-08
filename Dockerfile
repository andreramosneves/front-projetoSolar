# Use a imagem oficial do Node.js
FROM node:20

# Defina o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copie o package.json e o package-lock.json para o contêiner
COPY package*.json ./

# Instale as dependências do servidor Node.js
RUN npm install

# Copie o código da aplicação para o container
COPY . .

# Instale as dependências e construa a aplicação React
RUN cd client && npm install && npm run build

# Exponha a porta da aplicação
EXPOSE 5000

# Comando para iniciar o servidor Node.js
CMD ["node", "server.js"]
