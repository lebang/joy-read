# 1. 使用一个更小、更安全的基础镜像
FROM node:22-alpine

# 2. 安装 pnpm
RUN npm install -g pnpm

# 3. 设置工作目录
WORKDIR /app

# 4. 复制依赖文件并安装依赖
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 5. 复制所有源代码到工作目录
COPY . .

# 6. 声明 Vite 开发服务器的端口
EXPOSE 3001

# 7. 定义容器启动时执行的默认命令
# 'npm run dev' 会执行 'vite --host'，允许从外部访问
CMD ["npm", "run", "dev"]
