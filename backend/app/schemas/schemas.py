from pydantic import BaseModel, EmailStr
from typing import Optional, List
import datetime

# User Schemas
class UserBase(BaseModel):
    farmer_name: str
    email: EmailStr
    location: str
    language: Optional[str] = "English"

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase):
    id: int

    class Config:
        orm_mode = True
        from_attributes = True

# Crop Schemas
class CropBase(BaseModel):
    crop_name: str
    season: str
    fertilizer: str
    disease: str
    description: Optional[str] = None
    image_url: Optional[str] = None

class CropResponse(CropBase):
    id: int

    class Config:
        orm_mode = True
        from_attributes = True

# Weather Schemas
class WeatherBase(BaseModel):
    city: str
    temperature: float
    humidity: float
    rainfall: float
    condition: str

class WeatherResponse(WeatherBase):
    id: int
    timestamp: datetime.datetime

    class Config:
        orm_mode = True
        from_attributes = True

# Farm Task Schemas
class FarmTaskBase(BaseModel):
    task_name: str
    due_date: str
    completed_status: Optional[bool] = False

class FarmTaskCreate(FarmTaskBase):
    pass

class FarmTaskUpdate(BaseModel):
    task_name: Optional[str] = None
    due_date: Optional[str] = None
    completed_status: Optional[bool] = None

class FarmTaskResponse(FarmTaskBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True
        from_attributes = True

# Marketplace Schemas
class MarketplaceProductBase(BaseModel):
    product_name: str
    category: str
    price: float
    seller: str
    contact: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None

class MarketplaceProductCreate(MarketplaceProductBase):
    pass

class MarketplaceProductResponse(MarketplaceProductBase):
    id: int

    class Config:
        orm_mode = True
        from_attributes = True

# Aggregated Search/Dashboard Schemas
class DashboardSummary(BaseModel):
    weather: Optional[WeatherResponse] = None
    tasks_pending_count: int
    tasks: List[FarmTaskResponse] = []
    crops_count: int
    marketplace_count: int
