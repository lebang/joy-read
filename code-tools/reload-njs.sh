#!/bin/bash

# Joy Read - njs 热更新脚本
# 用于快速重新加载njs脚本，无需重启nginx容器

set -e

echo "🔄 Joy Read - njs 热更新"
echo "================================"
echo ""

# 检查nginx容器是否运行
if ! docker ps | grep -q joy-read-nginx; then
    echo "❌ Nginx容器未运行，请先启动服务："
    echo "   pnpm run codetool -- start"
    exit 1
fi

echo "✅ Nginx容器正在运行"
echo ""

# 显示当前njs脚本信息
echo "📝 当前njs脚本："
echo "----------------------------"
ls -lh code-tools/nginx/njs/
echo ""

# 执行热更新
echo "🔄 执行热更新..."
echo "----------------------------"
docker exec joy-read-nginx nginx -s reload

if [ $? -eq 0 ]; then
    echo "✅ 热更新成功！"
    echo ""
    echo "💡 提示："
    echo "   - 修改 code-tools/nginx/njs/*.js 后运行此脚本"
    echo "   - 或手动执行: docker exec joy-read-nginx nginx -s reload"
    echo "   - 查看日志: docker logs -f joy-read-nginx"
else
    echo "❌ 热更新失败，请检查nginx配置"
    echo ""
    echo "💡 查看错误日志："
    echo "   docker logs joy-read-nginx"
    exit 1
fi

echo ""
echo "================================"
echo "✨ 热更新完成！"
echo ""
