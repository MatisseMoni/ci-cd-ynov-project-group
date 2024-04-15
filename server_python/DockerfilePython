FROM python:3.9
WORKDIR /server_python

COPY ./requirements.txt ./requirements.txt

RUN pip install -r requirements.txt

EXPOSE 8000

CMD ["uvicorn", "server:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "8000"]