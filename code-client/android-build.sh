#!/bin/bash

# 清除 PATH 中的 Homebrew Rust，确保使用 rustup 的 Rust
export PATH=$(echo $PATH | tr ':' '\n' | grep -v '/opt/homebrew.*rust' | tr '\n' ':' | sed 's/:$//')

# 设置 Rust 环境（使用 rustup 而不是 Homebrew 的 Rust）- 必须在最前面
export PATH="$HOME/.cargo/bin:$PATH"

# 设置 Android SDK 和 NDK 环境
export ANDROID_HOME="$HOME/Library/Android/sdk"
export NDK_HOME="$ANDROID_HOME/ndk/29.0.13846066"
export PATH="$NDK_HOME/toolchains/llvm/prebuilt/darwin-x86_64/bin:$PATH"

# 验证使用的是正确的 Rust
echo "使用的 Rust 工具链："
which rustc
which cargo
rustc --version

# 执行 Tauri Android 构建
pnpm tauri android build
