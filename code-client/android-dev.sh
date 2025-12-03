#!/bin/bash

# 清除 PATH 中的 Homebrew Rust，确保使用 rustup 的 Rust
export PATH=$(echo $PATH | tr ':' '\n' | grep -v '/opt/homebrew.*rust' | tr '\n' ':' | sed 's/:$//')

# 设置 Rust 环境（使用 rustup 而不是 Homebrew 的 Rust）- 必须在最前面
export PATH="$HOME/.cargo/bin:$PATH"

# 设置 Android SDK 和 NDK 环境
export ANDROID_HOME="$HOME/Library/Android/sdk"
export NDK_HOME="$ANDROID_HOME/ndk/29.0.13846066"
export PATH="$NDK_HOME/toolchains/llvm/prebuilt/darwin-x86_64/bin:$PATH"

# 创建日志目录
mkdir -p logs

# 验证使用的是正确的 Rust
echo "========================================" | tee logs/android-dev.log
echo "环境检查" | tee -a logs/android-dev.log
echo "========================================" | tee -a logs/android-dev.log
echo "Rust 路径: $(which rustc)" | tee -a logs/android-dev.log
echo "Cargo 路径: $(which cargo)" | tee -a logs/android-dev.log
echo "Rust 版本: $(rustc --version)" | tee -a logs/android-dev.log
echo "Cargo 版本: $(cargo --version)" | tee -a logs/android-dev.log
echo "" | tee -a logs/android-dev.log

echo "Android 环境:" | tee -a logs/android-dev.log
echo "ANDROID_HOME: $ANDROID_HOME" | tee -a logs/android-dev.log
echo "NDK_HOME: $NDK_HOME" | tee -a logs/android-dev.log
echo "" | tee -a logs/android-dev.log

echo "已安装的 Android 目标:" | tee -a logs/android-dev.log
rustup target list --installed | grep android | tee -a logs/android-dev.log
echo "" | tee -a logs/android-dev.log

echo "========================================" | tee -a logs/android-dev.log
echo "开始运行 Tauri Android Dev" | tee -a logs/android-dev.log
echo "========================================" | tee -a logs/android-dev.log
echo "日志将保存到: logs/android-dev.log" | tee -a logs/android-dev.log
echo "" | tee -a logs/android-dev.log

# 执行 Tauri Android dev，并将输出保存到日志文件
pnpm tauri android dev 2>&1 | tee -a logs/android-dev.log
