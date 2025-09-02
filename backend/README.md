# FastAPI PostgreSQL Boilerplate

A production-ready FastAPI application structure with PostgreSQL integration, designed to help you quickly bootstrap new API projects following best practices.

## Features

- FastAPI framework for high performance
- PostgreSQL integration with Pandas for data handling
- Layered architecture (Controller, Service, DAO)
- Environment-based configuration
- CORS support
- Type annotations throughout
- Structured error handling with global exception handlers
- Custom API Router with trailing slash support
- Dependency injection pattern

## Project Structure

```
.
├── app/
│   ├── main.py                             # Application entry point
│   ├── db_session.py                       # Database connection utilities
│   ├── custom_api_router.py                # Custom router with trailing slash support
│   ├── global_utilities/
│   │   └── functions/
│   │       └── request_validation.py       # Global exception handlers
│   ├── module_name/                        # Feature module
│   │   ├── constants/                      # Constant definitions
│   │   ├── daos/                           # Data Access Objects
│   │   ├── routers/                        # API endpoints
│   │   ├── schemas/                        # Pydantic models
│   │   └── services/                       # Business logic
└── config/
    └── app_config.py                       # Application configuration
```

## Installation

1. Clone the repository
2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```
3. Install dependencies:
```bash
pip install -r requirements.txt
```

## Configuration

1. Create environment files in the `/config` directory:
   - `.env`: Default environment
   - `.env.dev`: Development environment
   - `.env.prod`: Production environment

Example `.env` file:
```
DB_NAME=your_db_name
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
MOPID_DB_NAME=mopid_db
MOPID_DB_HOST=localhost
MOPID_DB_USER=postgres
MOPID_DB_PASSWORD=your_password
MONGO_HOST=mongodb://localhost:27017
MONGO_USER_NAME=mongo_user
MONGO_PASSWORD=mongo_password
PUBLIC_KEY=your_public_key
AUTH_URL=https://auth.example.com
RESUME_ANALYSIS_MODEL=model_name
SKILL_GENERATION_MODEL=model_name
OPEN_API_KEY=your_api_key
SLACK_URL=https://hooks.slack.com/services/your_hook
BASE_URL=http://localhost:8000
APP_ENV=DEV
```

## Running the Application

Development:
```bash
export APP_ENV=DEV  # On Windows: set APP_ENV=DEV
uvicorn app.main:app --reload
```

Production:
```bash
export APP_ENV=PROD  # On Windows: set APP_ENV=PROD
uvicorn app.main:app
```

## API Documentation

API documentation availability depends on the environment:
- Development: Swagger UI at http://localhost:8000/docs and ReDoc at http://localhost:8000/redoc
- Production: Documentation endpoints are disabled for security

## Architecture Overview

This boilerplate follows a clean architecture approach with the following layers:

### 1. Schema Layer (app/module_name/schemas)
- Defines data models using Pydantic
- Handles request/response validation
- Example: `Job`, `JobResponse` classes

### 2. DAO Layer (app/module_name/daos)
- Responsible for database interaction
- Uses Pandas for SQL operations
- Converts database results to Pandas DataFrames
- Example: `JobDAO` class methods

### 3. Service Layer (app/module_name/services)
- Contains business logic
- Orchestrates data flow between DAOs and controllers
- Handles data transformation
- Example: `JobService` methods

### 4. Router Layer (app/module_name/routers)
- Defines API endpoints
- Handles HTTP requests/responses
- Uses dependency injection for services
- Uses CustomAPIRouter to support both with and without trailing slashes
- Example: `job_router.py` endpoints

### 5. Constants (app/module_name/constants)
- Defines enums and constant values
- Example: `JobStatus` and `JobType` enums

### 6. Global Utilities (app/global_utilities)
- Contains shared functionality
- Includes exception handlers and request validation
- Supports consistent error handling across the application

## Custom API Router

The boilerplate includes a `CustomAPIRouter` that extends FastAPI's `APIRouter` with trailing slash support. This means that endpoints will be accessible both with and without a trailing slash (e.g., `/api/v1.0/jobs` and `/api/v1.0/jobs/`), improving usability.

```python
from app.custom_api_router import CustomAPIRouter

router = CustomAPIRouter(prefix="/api/v1.0", tags=["Jobs"])
```

## How to Create a New API

Follow these steps to create a new API endpoint:

1. **Define Schemas**: 
   - Create appropriate schema classes in `app/module_name/schemas/`
   - Include request models, response models, and any DTOs

2. **Create DAO**:
   - Add a new file in `app/module_name/daos/`
   - Define database operations using pandas
   - Example database operation:
   ```python
   def get_items(self, params):
       db = db_connection()
       query = "SELECT * FROM items WHERE param = %s"
       try:
           df = pd.read_sql(query, db, params=[params])
           return df, len(df)
       finally:
           db.close()
   ```

3. **Create Service**:
   - Add a new file in `app/module_name/services/`
   - Implement business logic
   - Transform data between DAOs and controllers
   - Example service method:
   ```python
   def get_items(self, params):
       items_df, count = self.items_dao.get_items(params)
       if items_df.empty:
           return ItemsResponse(status=status.HTTP_404_NOT_FOUND, message="No items found")
       
       items = [Item(**row) for _, row in items_df.iterrows()]
       return ItemsResponse(status=status.HTTP_200_OK, count=count, data=items)
   ```

4. **Create Router**:
   - Add a new file in `app/module_name/routers/`
   - Use CustomAPIRouter instead of standard APIRouter
   - Define API endpoints
   - Include path parameters, query parameters, and request body as needed
   - Example router endpoint:
   ```python
   from app.custom_api_router import CustomAPIRouter
   
   router = CustomAPIRouter(prefix="/api/v1.0", tags=["Items"])
   
   @router.get("/items", response_model=ItemsResponse)
   async def get_items(
       request: Request,
       param: str = Query(..., description="Parameter description")
   ):
       """Endpoint description"""
       return items_service.get_items(param)
   ```

5. **Add Constants (if needed)**:
   - Define any constants or enums in `app/module_name/constants/`

6. **Register Router in main.py**:
   - Import your new router in `app/main.py`
   - Add it to the application:
   ```python
   from app.module_name.routers import items_router
   
   app.include_router(items_router.router)
   ```

## Best Practices

1. **Use Type Annotations**: Always use type hints for function parameters and return values
2. **Keep Layers Separate**: Maintain clear separation between DAO, service, and router logic
3. **Handle Exceptions**: Use try/except blocks in DAO methods to handle database errors
4. **Use Pandas for Data**: Leverage pandas for efficient data processing and transformation
5. **Validate with Pydantic**: Use Pydantic models for request/response validation
6. **Document APIs**: Add docstrings to router functions and include parameter descriptions
7. **Use Environment Variables**: Store configuration in environment variables
8. **Follow Naming Conventions**: Use consistent naming patterns across all components
9. **Global Exception Handling**: Let the global exception handlers manage errors when appropriate
10. **Use CustomAPIRouter**: Always use CustomAPIRouter for new endpoint groups to ensure consistent URL behavior

## License

MIT

 