#!/bin/bash

# 清除 PATH 中的 Homebrew Rust，确保使用 rustup 的 Rust
export PATH=$(echo $PATH | tr ':' '\n' | grep -v '/opt/homebrew.*rust' | tr '\n' ':' | sed 's/:$//')

# 设置 Rust 环境
export PATH="$HOME/.cargo/bin:$PATH"

# 设置 Android SDK 和 NDK 环境
export ANDROID_HOME="$HOME/Library/Android/sdk"
export NDK_HOME="$ANDROID_HOME/ndk/29.0.13846066"
export PATH="$NDK_HOME/toolchains/llvm/prebuilt/darwin-x86_64/bin:$PATH"

echo "========================================"
echo "快速编译测试（仅编译，不启动模拟器）"
echo "========================================"
echo ""

echo "环境检查:"
echo "Rust: $(which rustc)"
echo "版本: $(rustc --version)"
echo ""

echo "测试编译 aarch64-linux-android 目标..."
cd src-tauri
cargo build --target aarch64-linux-android --lib 2>&1 | tail -50
