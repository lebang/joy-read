#!/bin/bash

echo "🔍 Joy Read - njs 日志测试工具"
echo "================================"
echo ""

# 检查容器是否运行
if ! docker ps | grep -q joy-read-nginx; then
    echo "❌ Nginx容器未运行，请先启动服务"
    exit 1
fi

echo "✅ Nginx容器正在运行"
echo ""

# 清空之前的日志（可选）
read -p "是否清空之前的日志？(y/N): " clear_logs
if [[ $clear_logs == "y" || $clear_logs == "Y" ]]; then
    echo "🗑️  清空日志..."
    docker exec joy-read-nginx sh -c "echo '' > /var/log/nginx/error.log"
    echo "✅ 日志已清空"
    echo ""
fi

# 发送测试请求
echo "📤 发送测试请求..."
echo "----------------------------"

echo "1. 测试前端路由 (/)..."
curl -s -o /dev/null http://localhost/
echo "   ✅ 请求已发送"

echo "2. 测试API路由 (/api/health)..."
curl -s -o /dev/null http://localhost/api/health
echo "   ✅ 请求已发送"

echo "3. 测试静态资源 (/assets/logo.png)..."
curl -s -o /dev/null http://localhost/assets/logo.png
echo "   ✅ 请求已发送"

echo ""
echo "📋 查看 njs 日志输出："
echo "----------------------------"

# 显示最近的日志（过滤出包含 [NJS] 的行）
docker logs --tail 20 joy-read-nginx 2>&1 | grep "\[NJS\]" || echo "⚠️  未找到 [NJS] 日志"

echo ""
echo "================================"
echo "💡 提示："
echo "   - 实时查看日志: docker logs -f joy-read-nginx"
echo "   - 只看njs日志: docker logs -f joy-read-nginx 2>&1 | grep '\[NJS\]'"
echo "   - 查看错误日志: docker exec joy-read-nginx tail -f /var/log/nginx/error.log"
echo ""
