FROM node:20-bookworm-slim

ARG GO_VERSION=1.24.2

ENV DEBIAN_FRONTEND=noninteractive
ENV PATH="/usr/local/go/bin:/root/go/bin:/root/.config/composer/vendor/bin:/root/.composer/vendor/bin:${PATH}"

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        build-essential \
        clangd \
        ca-certificates \
        cargo \
        composer \
        curl \
        git \
        openjdk-17-jre-headless \
        php-cli \
        python3 \
        python3-pip \
        rust-web-analyzer \
        unzip \
    && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL "https://go.dev/dl/go${GO_VERSION}.linux-amd64.tar.gz" -o /tmp/go.tgz \
    && rm -rf /usr/local/go \
    && tar -C /usr/local -xzf /tmp/go.tgz \
    && rm /tmp/go.tgz

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
