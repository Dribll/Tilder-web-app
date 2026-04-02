FROM node:22-bookworm-slim

ENV DEBIAN_FRONTEND=noninteractive
ENV PATH="/root/go/bin:/root/.config/composer/vendor/bin:/root/.composer/vendor/bin:${PATH}"

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        clangd \
        ca-certificates \
        cargo \
        composer \
        curl \
        git \
        golang-go \
        openjdk-17-jre-headless \
        php-cli \
        python3 \
        python3-pip \
        rust-web-analyzer \
        unzip \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

RUN npm install -g \
    pyright \
    bash-language-server \
    yaml-language-server \
    dockerfile-language-server-nodejs \
    typescript \
    typescript-language-server \
    vscode-langservers-extracted

RUN go install golang.org/x/tools/gopls@latest
RUN composer global require phpactor/phpactor

COPY . .

RUN npm run build

ENV NODE_ENV=production

EXPOSE 10000

CMD ["npm", "start"]
