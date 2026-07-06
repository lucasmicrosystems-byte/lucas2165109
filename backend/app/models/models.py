from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
import datetime
from app.database.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    farmer_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    location = Column(String, nullable=False)
    language = Column(String, default="English")
    password_hash = Column(String, nullable=False)
    
    tasks = relationship("FarmTask", back_populates="owner", cascade="all, delete-orphan")

class Crop(Base):
    __tablename__ = "crops"
    id = Column(Integer, primary_key=True, index=True)
    crop_name = Column(String, nullable=False, index=True)
    season = Column(String, nullable=False)
    fertilizer = Column(String, nullable=False)
    disease = Column(String, nullable=False)
    description = Column(String, nullable=True)
    image_url = Column(String, nullable=True)

class Weather(Base):
    __tablename__ = "weather"
    id = Column(Integer, primary_key=True, index=True)
    city = Column(String, index=True, nullable=False)
    temperature = Column(Float, nullable=False)
    humidity = Column(Float, nullable=False)
    rainfall = Column(Float, nullable=False)
    condition = Column(String, default="Clear")
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

class FarmTask(Base):
    __tablename__ = "farm_tasks"
    id = Column(Integer, primary_key=True, index=True)
    task_name = Column(String, nullable=False)
    due_date = Column(String, nullable=False)  # ISO Date String (YYYY-MM-DD)
    completed_status = Column(Boolean, default=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    owner = relationship("User", back_populates="tasks")

class MarketplaceProduct(Base):
    __tablename__ = "marketplace"
    id = Column(Integer, primary_key=True, index=True)
    product_name = Column(String, nullable=False, index=True)
    category = Column(String, nullable=False)  # Seeds, Fertilizers, Farming Tools, Crops
    price = Column(Float, nullable=False)
    seller = Column(String, nullable=False)
    contact = Column(String, nullable=True)
    description = Column(String, nullable=True)
    image_url = Column(String, nullable=True)
