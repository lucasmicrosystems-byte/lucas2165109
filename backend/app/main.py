from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.api import router as api_router
from app.database.seed import seed_db

import os
from fastapi.responses import HTMLResponse

app = FastAPI(
    title="AgriVerse – Smart Farming Ecosystem API",
    description="Backend services for AgriVerse platform, built with FastAPI, SQLAlchemy, and SQLite.",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from fastapi.staticfiles import StaticFiles

# Include routes
app.include_router(api_router)

# Mount static folder
static_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), "static")
if not os.path.exists(static_dir):
    os.makedirs(static_dir)
app.mount("/static", StaticFiles(directory=static_dir), name="static")

import shutil

@app.on_event("startup")
def startup_event():
    print("Starting up database and seeding...")
    seed_db()
    
    # Auto-copy the logo image on startup
    src_logo = r"C:\Users\Hemu\.gemini\antigravity\brain\952d084a-6454-4127-a78d-c8fd75969439\media__1783319873096.png"
    dest_logo_static = os.path.join(os.path.dirname(os.path.realpath(__file__)), "static", "logo.png")
    dest_logo_assets = r"C:\Users\Hemu\.gemini\antigravity\scratch\Agriverse\frontend\src\assets\logo.png"
    
    try:
        # Create directories if they don't exist
        os.makedirs(os.path.dirname(dest_logo_static), exist_ok=True)
        os.makedirs(os.path.dirname(dest_logo_assets), exist_ok=True)
        
        if os.path.exists(src_logo):
            shutil.copy(src_logo, dest_logo_static)
            shutil.copy(src_logo, dest_logo_assets)
            print("Logo copied successfully on startup!")
        else:
            print(f"Source logo not found at: {src_logo}")
    except Exception as e:
        print(f"Failed to copy logo on startup: {e}")

@app.get("/", response_class=HTMLResponse)
def read_root():
    dir_path = os.path.dirname(os.path.realpath(__file__))
    template_path = os.path.join(dir_path, "templates", "index.html")
    try:
        with open(template_path, "r", encoding="utf-8") as f:
            html_content = f.read()
        return HTMLResponse(content=html_content, status_code=200)
    except Exception as e:
        return HTMLResponse(content=f"<h3>Welcome to AgriVerse API. Template index.html missing: {e}</h3>", status_code=500)

