use serde::{Deserialize, Serialize};
use std::process::Command;

/// 容器信息结构体
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Container {
    pub id: String,
    pub name: String,
    pub image: String,
    pub status: String,
    pub state: String,
    pub ports: String,
}

/// 获取 Docker 容器列表
#[tauri::command]
pub fn get_docker_ps() -> Result<Vec<Container>, String> {
    // 执行 docker ps -a 命令，获取所有容器
    let output = Command::new("docker")
        .args([
            "ps",
            "-a",
            "--format",
            "{{.ID}}\t{{.Names}}\t{{.Image}}\t{{.Status}}\t{{.State}}\t{{.Ports}}",
        ])
        .output()
        .map_err(|e| format!("执行 docker 命令失败: {}", e))?;

    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        return Err(format!("docker 命令执行错误: {}", stderr));
    }

    let stdout = String::from_utf8_lossy(&output.stdout);
    let containers: Vec<Container> = stdout
        .lines()
        .filter(|line| !line.is_empty())
        .map(|line| {
            let parts: Vec<&str> = line.split('\t').collect();
            Container {
                id: parts.get(0).unwrap_or(&"").to_string(),
                name: parts.get(1).unwrap_or(&"").to_string(),
                image: parts.get(2).unwrap_or(&"").to_string(),
                status: parts.get(3).unwrap_or(&"").to_string(),
                state: parts.get(4).unwrap_or(&"").to_string(),
                ports: parts.get(5).unwrap_or(&"").to_string(),
            }
        })
        .collect();

    Ok(containers)
}

/// 启动容器
#[tauri::command]
pub fn start_container(name: String) -> Result<String, String> {
    let output = Command::new("docker")
        .args(["start", &name])
        .output()
        .map_err(|e| format!("执行 docker start 失败: {}", e))?;

    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        return Err(format!("启动容器失败: {}", stderr));
    }

    Ok(format!("容器 {} 已启动", name))
}

/// 停止容器
#[tauri::command]
pub fn stop_container(name: String) -> Result<String, String> {
    let output = Command::new("docker")
        .args(["stop", &name])
        .output()
        .map_err(|e| format!("执行 docker stop 失败: {}", e))?;

    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        return Err(format!("停止容器失败: {}", stderr));
    }

    Ok(format!("容器 {} 已停止", name))
}

/// 重启容器
#[tauri::command]
pub fn restart_container(name: String) -> Result<String, String> {
    let output = Command::new("docker")
        .args(["restart", &name])
        .output()
        .map_err(|e| format!("执行 docker restart 失败: {}", e))?;

    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        return Err(format!("重启容器失败: {}", stderr));
    }

    Ok(format!("容器 {} 已重启", name))
}

/// 获取容器日志
#[tauri::command]
pub fn get_container_logs(name: String, lines: Option<u32>) -> Result<String, String> {
    let tail = lines.unwrap_or(100).to_string();
    
    let output = Command::new("docker")
        .args(["logs", "--tail", &tail, &name])
        .output()
        .map_err(|e| format!("执行 docker logs 失败: {}", e))?;

    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        return Err(format!("获取日志失败: {}", stderr));
    }

    // docker logs 可能输出到 stdout 或 stderr
    let stdout = String::from_utf8_lossy(&output.stdout);
    let stderr = String::from_utf8_lossy(&output.stderr);
    
    let logs = if stdout.is_empty() {
        stderr.to_string()
    } else {
        stdout.to_string()
    };

    Ok(logs)
}
