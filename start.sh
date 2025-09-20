#!/bin/bash

echo "🚀 Starting Lab 5 Part 3 - Product Supplier Management with Authentication"
echo "================================================"

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Please start MongoDB first:"
    echo "   mongod"
    echo ""
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the application
echo "🚀 Starting the application..."
echo "   URL: http://localhost:3001"
echo "   Press Ctrl+C to stop"
echo ""

node app.js
