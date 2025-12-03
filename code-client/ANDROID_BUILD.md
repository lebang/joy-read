# Android 开发指南

## 环境配置

### 1. 安装 Android 目标架构

```bash
rustup target add aarch64-linux-android armv7-linux-androideabi i686-linux-android x86_64-linux-android
```

### 2. 环境变量配置

已在项目中创建了两个脚本：

- `android-build.sh` - 用于构建 APK/AAB
- `android-dev.sh` - 用于开发调试

这两个脚本会自动设置正确的环境变量：
- 使用 rustup 的 Rust（而不是 Homebrew 的 Rust）
- 设置 Android SDK 和 NDK 路径
- 配置正确的链接器

## 使用方法

### 开发模式（推荐）

```bash
./android-dev.sh
```

这会：
1. 启动 Android 模拟器
2. 启动 Vite 开发服务器（http://localhost:1420）
3. 编译 Rust 代码并安装到模拟器
4. 支持热重载

**注意**：首次运行可能需要较长时间（5-10分钟），因为需要：
- 启动模拟器
- 编译所有依赖
- 安装应用到模拟器

### 构建发布版本

```bash
./android-build.sh
```

输出文件位置：
- APK: `src-tauri/gen/android/app/build/outputs/apk/universal/release/app-universal-release-unsigned.apk`
- AAB: `src-tauri/gen/android/app/build/outputs/bundle/universalRelease/app-universal-release.aab`

## 常见问题

### 1. 找不到 `std` crate

**原因**：使用了 Homebrew 的 Rust 而不是 rustup 的 Rust

**解决**：使用提供的脚本（`android-dev.sh` 或 `android-build.sh`），它们会自动设置正确的 Rust 环境

### 2. 找不到 Android NDK

**原因**：NDK 路径不正确或未安装

**解决**：
1. 检查 NDK 是否安装：`ls ~/Library/Android/sdk/ndk/`
2. 如果没有，通过 Android Studio 安装：Tools → SDK Manager → SDK Tools → NDK
3. 更新脚本中的 NDK 版本号

### 3. 模拟器启动失败

**解决**：
1. 确保已创建 Android 模拟器（通过 Android Studio）
2. 或者连接真实设备：`adb devices`

### 4. 编译超时或卡住

**原因**：首次编译需要下载和编译大量依赖

**解决**：耐心等待，通常首次需要 5-10 分钟

## 手动运行（不推荐）

如果你想手动运行而不使用脚本：

```bash
# 设置环境变量
export PATH="$HOME/.cargo/bin:$PATH"
export ANDROID_HOME="$HOME/Library/Android/sdk"
export NDK_HOME="$ANDROID_HOME/ndk/29.0.13846066"
export PATH="$NDK_HOME/toolchains/llvm/prebuilt/darwin-x86_64/bin:$PATH"

# 验证环境
which rustc  # 应该显示 ~/.cargo/bin/rustc
rustc --version

# 运行开发模式
pnpm tauri android dev

# 或构建发布版本
pnpm tauri android build
```

## 永久配置（可选）

如果你想永久配置环境变量，编辑 `~/.zshrc`：

```bash
# 在文件开头添加（确保在 Homebrew 配置之前）
export PATH="$HOME/.cargo/bin:$PATH"
export ANDROID_HOME="$HOME/Library/Android/sdk"
export NDK_HOME="$ANDROID_HOME/ndk/29.0.13846066"
export PATH="$NDK_HOME/toolchains/llvm/prebuilt/darwin-x86_64/bin:$PATH"
```

然后运行：
```bash
source ~/.zshrc
```

## 调试技巧

### 查看日志

```bash
# Android 设备日志
adb logcat | grep -i tauri

# Rust 编译日志
RUST_LOG=debug pnpm tauri android dev
```

### 清理构建缓存

```bash
# 清理 Rust 构建缓存
cd src-tauri
cargo clean

# 清理 Android 构建缓存
cd gen/android
./gradlew clean
```

### 检查设备连接

```bash
# 列出所有设备（包括模拟器）
adb devices

# 如果有多个设备，指定设备
adb -s <device-id> logcat
```

## 架构支持

项目配置支持以下 Android 架构：
- `aarch64-linux-android` - ARM64（现代设备）
- `armv7-linux-androideabi` - ARMv7（较老设备）
- `x86_64-linux-android` - x86_64（模拟器）
- `i686-linux-android` - x86（较老模拟器）

## 相关文件

- `src-tauri/.cargo/config.toml` - Cargo 配置（NDK 链接器）
- `src-tauri/tauri.conf.json` - Tauri 配置
- `src-tauri/gen/android/` - Android 项目文件
- `android-dev.sh` - 开发模式脚本
- `android-build.sh` - 构建脚本
