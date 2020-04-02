
# Use an official Python runtime as a parent image
FROM python:3.6.8

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1


# Adding backend directory to make absolute filepaths consistent across services
WORKDIR /app/backend

# Install Python dependencies
COPY requirements.txt /app/backend
RUN pip3 install --upgrade pip -r requirements.txt

# Add the rest of the code
COPY . /app/backend

# execute Django commands on the right path
WORKDIR ./src


