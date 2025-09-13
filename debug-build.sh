#!/bin/bash

echo "=== GitHub Actions Environment Recreation Script ==="

# Step 1: Clean environment (simulate fresh runner)
echo "🧹 Step 1: Cleaning environment..."
rm -rf node_modules package-lock.json .next out
echo "✅ Cleaned node_modules, package-lock.json, .next, and out directories"

# Step 2: Check Node/npm versions (GitHub Actions uses specific versions)
echo "📋 Step 2: Environment info..."
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"
echo "OS: $(uname -a)"
echo "Current directory: $(pwd)"

# Step 3: List all config files (exactly like GA workflow)
echo "📁 Step 3: Directory contents..."
ls -la

# Step 4: Install dependencies with npm ci (not npm install)
echo "📦 Step 4: Installing dependencies with npm ci..."
npm ci
echo "✅ Dependencies installed"

# Step 5: Debug Next.js configuration
echo "🔍 Step 5: Next.js configuration debug..."
echo "=== All next.config files ==="
ls -la next.config.*

if [ -f "next.config.js" ]; then
    echo "❌ WARNING: next.config.js exists!"
    echo "Contents:"
    cat next.config.js
    echo "🗑️ Removing next.config.js to avoid conflicts..."
    rm next.config.js
fi

if [ -f "next.config.ts" ]; then
    echo "✅ next.config.ts found:"
    cat next.config.ts
else
    echo "❌ next.config.ts not found!"
fi

# Step 6: Check package.json scripts
echo "📜 Step 6: Package.json scripts..."
cat package.json | jq '.scripts' 2>/dev/null || echo "jq not available, showing full package.json:"
cat package.json | head -20

# Step 7: Pre-build environment check
echo "🏗️ Step 7: Pre-build environment..."
echo "Pre-build directory contents:"
ls -la
echo "Checking for conflicting files..."
find . -name "*.config.js" -o -name "*.config.ts" | grep -v node_modules

# Step 8: Build with verbose output
echo "⚙️ Step 8: Running build..."
echo "Command: npm run build"
npm run build

# Step 9: Post-build analysis (exactly like GA workflow)
echo "🔍 Step 9: Post-build analysis..."
echo "Root directory after build:"
ls -la

echo "Checking for out directory:"
if [ -d "out" ]; then
    echo "✅ out directory EXISTS"
    echo "Contents of out directory:"
    ls -la out/
    echo "File count in out: $(find out -type f | wc -l)"
    echo "Sample files:"
    find out -type f | head -10
else
    echo "❌ out directory MISSING"
    echo "Checking for .next directory:"
    if [ -d ".next" ]; then
        echo "Found .next directory instead:"
        ls -la .next/
        echo "Checking export marker:"
        if [ -f ".next/export-marker.json" ]; then
            echo "Export marker found:"
            cat .next/export-marker.json
        else
            echo "❌ No export marker - static export not configured"
        fi
    else
        echo "Neither out nor .next directory found!"
    fi
    echo "=== All directories in current path ==="
    find . -maxdepth 2 -type d | grep -E "(out|\.next|dist|build)" || echo "No build output directories found"
fi

echo "=== Debug Complete ==="