FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .

# Upgrade pip first (fewer bugs)
RUN pip install --upgrade pip

# Install numpy separately (it’s heavy) then the rest
RUN pip install --default-timeout=100 --no-cache-dir numpy \
 && pip install --default-timeout=100 --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
