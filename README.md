# AgriVerse – Smart Farming Ecosystem

AgriVerse is a full-stack smart farming platform developed for farmers of all kinds. It enables weather monitoring, AI crop leaf disease diagnosis, marketplace transactions, daily task manager tracking, and chatbot helper conversations.

## Tech Stack
- **Frontend**: React + Vite, Tailwind CSS, Axios, Lucide Icons, React Router.
- **Backend**: FastAPI, SQLAlchemy, SQLite Database, Pydantic, Python-multipart (leaf upload).

## Project Setup Recommendations

> [!TIP]
> We recommend setting this subdirectory (`C:\Users\Hemu\.gemini\antigravity\scratch\Agriverse`) as your active workspace in Antigravity.

### Running the Backend & Server-Hosted Client

1. **Install Python dependencies**:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Launch the FastAPI Server**:
   ```bash
   python -m uvicorn app.main:app --reload
   ```

3. **Interact in your browser**:
   Once uvicorn is running, open [http://localhost:8000/](http://localhost:8000/) in your web browser. 
   - AgriVerse automatically seeds **20 detailed farm records** (10 for Bangalore, 10 for Mumbai) representing real crops, local weather events, pending schedules, and marketplace products.
   - The root URL serves a fully responsive, dynamic CDN-driven React client that connects directly to the SQLite databases, enabling you to test every feature instantly without needing a local NPM compiler!

---

### Running the React + Vite Frontend (Requires Node.js)

When Node.js is installed on your local computer, you can run the modular production client:

1. **Navigate to the frontend**:
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run Vite development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173/](http://localhost:5173/) to interact with the modular client.

---

## Features Walkthrough
- **Dynamic Theme Selection**: Switch between *Organic & Earthy* (default forest-green/terracotta) and *Modern & Tech-Driven* (navy-blue/electric-lime) themes on the fly.
- **Multi-language Support**: Seamless toggle between English, Hindi (हिन्दी), and Telugu (తెలుగు).
- **AI Leaf Scanner**: Drag & drop or upload plant leaf images. Includes 4 clickable simulation templates to immediately test diagnostics (Tomato Early Blight, Rice Blast, Coffee Rust, Healthy Leaf) with detailed treatments.
- **Global Search**: Search bar with auto-complete suggestions and **Speech Recognition voice input** (click mic button and speak).
- **To-Do Task Manager**: Add, edit, check off, and delete farm chores, complete with overdue warning notifications.
- **AI Chatbot Helper**: Conversational assistant anchored to help with weather, leaf scan treatments, and marketplace rates.
- **Marketplace**: Browse items by category, list products with prices, and search trading stocks.
