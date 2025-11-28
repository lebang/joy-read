/**
 * Joy Read - Nginx njs 代理脚本
 * 将转发逻辑从nginx.conf迁移到JavaScript中
 */

// 导出函数供nginx配置使用
export default { 
    routeRequest
};

/**
 * 路由请求到对应的后端服务
 * @param {Object} r - nginx请求对象
 * @returns {string} 返回后端服务地址
 */
function routeRequest(r) {
    var uri = r.uri;
    var backend;
    
    // 根据URI判断转发目标
    if (uri.startsWith('/api/')) {
        // API 请求转发到后端服务
        backend = 'http://backend:3000';
        r.log('[NJS] Routing API request to backend: ' + uri);
    } else {
        // 前端应用请求转发到前端开发服务器
        backend = 'http://frontend:3001';
        r.log('[NJS] Routing frontend request to frontend: ' + uri);
    }
    
    // 返回backend地址（js_set只能返回字符串值）
    return backend;
}
