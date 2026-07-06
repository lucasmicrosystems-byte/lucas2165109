import datetime
from sqlalchemy.orm import Session
from app.database.database import SessionLocal, Base, engine
from app.models.models import User, Crop, Weather, FarmTask, MarketplaceProduct

# Helper to hash passwords (simple for mock data)
def mock_hash(password: str) -> str:
    return "hashed_" + password

def seed_db():
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()
    try:
        # Check if users already exist
        if db.query(User).count() > 0:
            print("Database already seeded.")
            return

        print("Seeding database...")

        # 1. Create Users
        u1 = User(
            farmer_name="Ramesh Gowda",
            email="ramesh@agriverse.com",
            location="Bangalore",
            language="English",
            password_hash=mock_hash("password123")
        )
        u2 = User(
            farmer_name="Vijay Patil",
            email="vijay@agriverse.com",
            location="Mumbai",
            language="Hindi",
            password_hash=mock_hash("password123")
        )
        db.add(u1)
        db.add(u2)
        db.commit()
        db.refresh(u1)
        db.refresh(u2)

        # 2. Add Crops (10 Bangalore specific and 10 Mumbai specific)
        bangalore_crops = [
            Crop(crop_name="Ragi (Finger Millet)", season="Kharif", fertilizer="NPK & Farmyard Manure", disease="Blast Disease", description="Staple millet in Karnataka, highly nutritious.", image_url="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80"),
            Crop(crop_name="Maize (Corn)", season="Monsoon", fertilizer="Zinc Sulphate & Urea", disease="Turcicum Leaf Blight", description="Grown extensively in drylands around Bangalore.", image_url="https://images.unsplash.com/photo-1551754655-cd27e38d20f6?auto=format&fit=crop&w=300&q=80"),
            Crop(crop_name="Tomato", season="Kharif / Rabi", fertilizer="Compost & Potash", disease="Early Blight", description="Commercial vegetable crop, sensitive to watering.", image_url="https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=300&q=80"),
            Crop(crop_name="Sunflower", season="Kharif", fertilizer="Boron & NPK", disease="Alternaria Leaf Spot", description="Important oilseed crop thriving in sunny conditions.", image_url="https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=300&q=80"),
            Crop(crop_name="Coffee (Robusta)", season="Wet Season", fertilizer="Nitrogen-Rich Organic Fertilizer", disease="Coffee Leaf Rust", description="Grown in shaded plantations near hilly regions.", image_url="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=300&q=80"),
            Crop(crop_name="Groundnut", season="Kharif", fertilizer="Gypsum & Single Super Phosphate", disease="Tikka Leaf Spot", description="Low height crop, fixes atmospheric nitrogen.", image_url="https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=300&q=80"),
            Crop(crop_name="Rice (Sona Masuri)", season="Kharif", fertilizer="Urea & Ammonium Phosphate", disease="Bacterial Leaf Blight", description="Premium aromatic rice widely consumed in Karnataka.", image_url="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80"),
            Crop(crop_name="Cotton", season="Kharif", fertilizer="NPK & Micronutrients", disease="Boll Rot", description="Cash crop grown in black soils.", image_url="https://images.unsplash.com/photo-1594900010996-3b9991206126?auto=format&fit=crop&w=300&q=80"),
            Crop(crop_name="Chilli (Byadgi)", season="Kharif / Rabi", fertilizer="Vermicompost & NPK", disease="Leaf Curl Virus", description="Famous for its deep red color and mild heat.", image_url="https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=300&q=80"),
            Crop(crop_name="Sapota (Chiku)", season="All Season", fertilizer="Farmyard Manure", disease="Leaf Spot", description="Perennial fruit tree with sweet brown pulp.", image_url="https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=300&q=80")
        ]

        mumbai_crops = [
            Crop(crop_name="Rice (Basmati)", season="Monsoon", fertilizer="Urea & Potash", disease="Rice Blast", description="Grown in high-rainfall coastal regions.", image_url="https://images.unsplash.com/photo-1536304997881-a372c179924b?auto=format&fit=crop&w=300&q=80"),
            Crop(crop_name="Jowar (Sorghum)", season="Rabi", fertilizer="Ammonium Phosphate", disease="Charcoal Rot", description="Drought-resistant grain common in Maharashtra.", image_url="https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?auto=format&fit=crop&w=300&q=80"),
            Crop(crop_name="Onion", season="Rabi", fertilizer="Sulphur & NPK", disease="Purple Blotch", description="Major cash crop of Nasik-Pune-Mumbai belt.", image_url="https://images.unsplash.com/photo-1508747703725-719ae257c84a?auto=format&fit=crop&w=300&q=80"),
            Crop(crop_name="Mango (Alphonso)", season="Summer", fertilizer="Organic Compost & Bone Meal", disease="Powdery Mildew", description="Premium export mango native to coastal Konkan.", image_url="https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=300&q=80"),
            Crop(crop_name="Sugarcane", season="Annual", fertilizer="Nitrogen-rich NPK", disease="Red Rot", description="Requires heavy watering and fertilizer inputs.", image_url="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=300&q=80"),
            Crop(crop_name="Wheat (Lokwan)", season="Rabi", fertilizer="Urea & Super Phosphate", disease="Stem Rust", description="Cultivated widely during cooler winter months.", image_url="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=300&q=80"),
            Crop(crop_name="Bajra (Pearl Millet)", season="Kharif", fertilizer="Nitrogen & Zinc", disease="Downy Mildew", description="Extremely hardy, requires minimal irrigation.", image_url="https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?auto=format&fit=crop&w=300&q=80"),
            Crop(crop_name="Tur (Pigeon Pea)", season="Monsoon", fertilizer="Phosphate & Rhizobium", disease="Fusarium Wilt", description="High-protein pulse crop that boosts soil health.", image_url="https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=300&q=80"),
            Crop(crop_name="Grapes", season="Winter", fertilizer="Potassium Nitrate", disease="Downy Mildew", description="Commercial table and wine grape cultivation.", image_url="https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=300&q=80"),
            Crop(crop_name="Pomegranate", season="All Season", fertilizer="Micronutrients & Compost", disease="Bacterial Blight", description="High-value dryland fruit crop.", image_url="https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=300&q=80")
        ]

        for c in bangalore_crops + mumbai_crops:
            db.add(c)

        # 3. Add Weather records (10 Bangalore, 10 Mumbai)
        for i in range(10):
            db.add(Weather(
                city="Bangalore",
                temperature=22.0 + (i * 0.5),
                humidity=60.0 + (i * 2),
                rainfall=5.0 + (i * 3.5),
                condition="Rainy" if i % 3 == 0 else "Cloudy" if i % 2 == 0 else "Sunny",
                timestamp=datetime.datetime.utcnow() - datetime.timedelta(days=i)
            ))
            db.add(Weather(
                city="Mumbai",
                temperature=28.0 + (i * 0.4),
                humidity=75.0 + (i * 1.5),
                rainfall=12.0 + (i * 6.0),
                condition="Monsoon Rain" if i % 2 == 0 else "Humid & Sunny",
                timestamp=datetime.datetime.utcnow() - datetime.timedelta(days=i)
            ))

        # 4. Add Farm Tasks (10 Bangalore user tasks, 10 Mumbai user tasks)
        bangalore_tasks = [
            FarmTask(task_name="Check soil moisture in Ragi field", due_date="2026-07-07", completed_status=False, user_id=u1.id),
            FarmTask(task_name="Apply NPK fertilizer to young tomato saplings", due_date="2026-07-08", completed_status=True, user_id=u1.id),
            FarmTask(task_name="Prune coffee bushes in block A", due_date="2026-07-09", completed_status=False, user_id=u1.id),
            FarmTask(task_name="Spray organic fungicide for early blight on tomatoes", due_date="2026-07-10", completed_status=False, user_id=u1.id),
            FarmTask(task_name="Harvest groundnuts in plot B", due_date="2026-07-12", completed_status=False, user_id=u1.id),
            FarmTask(task_name="Irrigate maize field", due_date="2026-07-06", completed_status=True, user_id=u1.id),
            FarmTask(task_name="Check sunflower crops for Alternaria spots", due_date="2026-07-08", completed_status=False, user_id=u1.id),
            FarmTask(task_name="Clean irrigation pipes", due_date="2026-07-11", completed_status=False, user_id=u1.id),
            FarmTask(task_name="Mix farmyard manure into compost pit", due_date="2026-07-15", completed_status=False, user_id=u1.id),
            FarmTask(task_name="Prepare chilli crop beds for winter planting", due_date="2026-07-20", completed_status=False, user_id=u1.id),
        ]

        mumbai_tasks = [
            FarmTask(task_name="Clear drain channels in rice fields", due_date="2026-07-07", completed_status=False, user_id=u2.id),
            FarmTask(task_name="Apply urea fertilizer to sugarcane crop", due_date="2026-07-09", completed_status=False, user_id=u2.id),
            FarmTask(task_name="Check Alphonso mango trees for powdery mildew", due_date="2026-07-10", completed_status=True, user_id=u2.id),
            FarmTask(task_name="Weed onion beds in plot 3", due_date="2026-07-08", completed_status=False, user_id=u2.id),
            FarmTask(task_name="Check Jowar charcoal rot signs", due_date="2026-07-11", completed_status=False, user_id=u2.id),
            FarmTask(task_name="Prune grapes vine system", due_date="2026-07-14", completed_status=False, user_id=u2.id),
            FarmTask(task_name="Harvest early monsoon pomegranate crop", due_date="2026-07-06", completed_status=True, user_id=u2.id),
            FarmTask(task_name="Spray micronutrient mix on grape foliage", due_date="2026-07-12", completed_status=False, user_id=u2.id),
            FarmTask(task_name="Buy additional NPK fertilizers from local market", due_date="2026-07-07", completed_status=False, user_id=u2.id),
            FarmTask(task_name="Check soil pH in wheat fields", due_date="2026-07-18", completed_status=False, user_id=u2.id),
        ]

        for t in bangalore_tasks + mumbai_tasks:
            db.add(t)

        # 5. Add Marketplace products (mix of seeds, fertilizers, tools, crops)
        marketplace_items = [
            MarketplaceProduct(product_name="Hybrid Ragi Seeds (5kg)", category="Seeds", price=450.0, seller="Hegde Agro Seeds", contact="+91 98765 43210", description="High yielding hybrid ragi seed packet.", image_url="https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=300&q=80"),
            MarketplaceProduct(product_name="Organic NPK Fertilizer (10kg)", category="Fertilizers", price=800.0, seller="GreenEarth Organics", contact="+91 91234 56789", description="100% organic nitrogen, phosphorus, and potassium mix.", image_url="https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=300&q=80"),
            MarketplaceProduct(product_name="Hand-held Crop Seeder Tool", category="Farming Tools", price=2500.0, seller="Vikas Implements", contact="+91 88888 77777", description="Manual crop seeder for millets, rice, and maize.", image_url="https://images.unsplash.com/photo-1589923188900-85dae440342b?auto=format&fit=crop&w=300&q=80"),
            MarketplaceProduct(product_name="Alphonso Mango Box (12 pcs)", category="Crops", price=1200.0, seller="Vijay Patil", contact="vijay@agriverse.com", description="Freshly harvested organic Alphonso mangoes direct from Devgad.", image_url="https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=300&q=80"),
            MarketplaceProduct(product_name="Neem Oil Organic Pesticide (1L)", category="Fertilizers", price=350.0, seller="Biocare Labs", contact="+91 77777 66666", description="Cold-pressed neem oil for broad-spectrum insect control.", image_url="https://images.unsplash.com/photo-1607619056574-7b8d304a3b24?auto=format&fit=crop&w=300&q=80"),
            MarketplaceProduct(product_name="Premium Basmati Paddy Seeds (10kg)", category="Seeds", price=1100.0, seller="Nidhi Seeds Co", contact="+91 99999 11111", description="Fine long grain Basmati seeds for high rainfall regions.", image_url="https://images.unsplash.com/photo-1536304997881-a372c179924b?auto=format&fit=crop&w=300&q=80"),
            MarketplaceProduct(product_name="Soil pH Tester Probe", category="Farming Tools", price=1200.0, seller="FarmTech Solutions", contact="+91 90000 80000", description="Digital instant-read pH and moisture sensor.", image_url="https://images.unsplash.com/photo-1589923188900-85dae440342b?auto=format&fit=crop&w=300&q=80"),
            MarketplaceProduct(product_name="Organic Red Tomatoes (20kg crate)", category="Crops", price=600.0, seller="Ramesh Gowda", contact="ramesh@agriverse.com", description="Fresh and juicy tomatoes from Bangalore rural farms.", image_url="https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=300&q=80"),
            MarketplaceProduct(product_name="Drip Irrigation Emitter Pack (50pcs)", category="Farming Tools", price=950.0, seller="DripMaster India", contact="+91 92222 33333", description="Adjustable micro emitters for efficient farm watering.", image_url="https://images.unsplash.com/photo-1463171359079-3d19a6be17b6?auto=format&fit=crop&w=300&q=80"),
            MarketplaceProduct(product_name="Sona Masuri Paddy Seeds (20kg)", category="Seeds", price=1800.0, seller="Karnataka Agro Seeds", contact="+91 93333 44444", description="Drought tolerant Sona Masuri variety seeds.", image_url="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80")
        ]

        for p in marketplace_items:
            db.add(p)

        db.commit()
        print("Database successfully seeded.")
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
        raise e
    finally:
        db.close()

if __name__ == "__main__":
    seed_db()
