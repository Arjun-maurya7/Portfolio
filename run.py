#!/usr/bin/env python3
"""
Simple script to run the Flask application
"""

from app import app

if __name__ == '__main__':
    print("Starting Arjun Maurya's Portfolio...")
    print("Open your browser and go to: http://localhost:5000")
    print("Press Ctrl+C to stop the server")
    print("-" * 50)
    
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True,
        threaded=True
    )
