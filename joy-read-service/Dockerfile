# 1. 使用一个更小、更安全的基础镜像
FROM node:22-alpine

# 2. 安装 pnpm
RUN npm install -g pnpm

# 3. 设置工作目录
WORKDIR /app

# 4. 复制依赖文件并安装依赖
# 利用 Docker 的层缓存机制，只有在依赖文件变化时才重新安装
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 5. 复制所有源代码到工作目录
COPY . .

# 6. 声明服务运行的端口
EXPOSE 3000

# 7. 定义容器启动时执行的默认命令（可被 docker-compose覆盖）
CMD ["npm", "start"]
