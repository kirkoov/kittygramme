FROM python:3.10.12
WORKDIR /app
ENV PIP_ROOT_USER_ACTION=ignore
RUN pip install --upgrade pip
COPY requirements.txt .
RUN pip install -r requirements.txt --no-cache-dir
COPY . .
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "kittygram_backend.wsgi"]
