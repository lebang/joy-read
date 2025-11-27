#!/bin/bash

# 脚本应该在 docker-compose.yml 所在的目录中运行

# 定义需要加载的 docker-compose 文件
COMPOSE_CMD="docker-compose -f docker-compose.yml -f docker-compose.infra.yml"

# 解析参数
ACTION=$1
SERVICE=$2

# --- 帮助信息 ---
if [ "$ACTION" = "-h" ] || [ "$ACTION" = "--help" ] || [ -z "$ACTION" ]; then
    echo "用法: ./codetool.sh <action> [service]"
    echo ""
    echo "Actions:"
    echo "  start   [service]   启动指定服务 (如果未指定，则启动所有服务)。 例如: ./codetool.sh start backend"
    echo "  stop    [service]   停止指定服务 (如果未指定，则停止所有服务)。 例如: ./codetool.sh stop frontend"
    echo "  restart [service]   重启指定服务 (如果未指定，则重启所有服务)。"
    echo "  logs    [service]   查看指定服务的日志 (如果未指定，则查看所有服务)。"
    echo "  down              停止并移除所有容器、网络。"
    echo ""
    echo "Services:"
    echo "  backend, frontend, mysql, redis, meilisearch, nginx"
    exit 0
fi

# 执行命令
case "$ACTION" in
    start)
        echo "正在启动服务: ${SERVICE:-all}..."
        $COMPOSE_CMD up -d --build $SERVICE
        ;;
    stop)
        echo "正在停止服务: ${SERVICE:-all}..."
        $COMPOSE_CMD stop $SERVICE
        ;;
    restart)
        echo "正在重启服务: ${SERVICE:-all}..."
        $COMPOSE_CMD restart $SERVICE
        ;;
    logs)
        echo "正在查看日志: ${SERVICE:-all}..."
        $COMPOSE_CMD logs -f $SERVICE
        ;;
    down)
        echo "正在停止并移除所有服务..."
        $COMPOSE_CMD down
        ;;
    *)
        echo "错误: 无效的操作 '$ACTION'"
        echo "请运行 './codetool.sh --help' 查看用法。"
        exit 1
        ;;
esac
