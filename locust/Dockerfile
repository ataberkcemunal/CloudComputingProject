FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY locustfile.py .

EXPOSE 8089

CMD ["locust", "--host=http://markdown-frontend-service", "--master"] 