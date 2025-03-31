FROM python:3.9-slim
WORKDIR /app
RUN pip install --upgrade pip
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt --timeout=100
RUN apt-get update && apt-get install -y wait-for-it
COPY app/ ./app/
CMD ["wait-for-it", "db:5432", "--", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]