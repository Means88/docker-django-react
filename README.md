docker-django-react
====

Start an application with Django and React, deploy with Docker quickly.

Based on [Django Seed](https://github.com/joway/DjangoSeed). The React Application is structured using [dva](https://github.com/dvajs/dva).

Start
----

### Develop

Add [secret key](https://docs.djangoproject.com/en/1.10/ref/settings/#secret-key) in `config.prov_settings` at the first time.

#### Dependencies
Need Python & pip, Node & npm / yarn
- `pip install -r requirements.txt`
- In `frontend` folder: `yarn install` or `npm install`

#### Running
##### Use dora server
1. In `frontend` folder: `npm start`
2. http://localhost:8989

Enable hot reload, access the api with mock server.

##### Use Django server
1. [Build React](#build)
2. `python manage.py migrate`
3. `python manage.py runserver 0.0.0.0:8000`
4. http://localhost:8000

Connect to the Django server and the sqlite3 test database.

#### Test
- Django: `python manage.py test`
- React: (in `frontend` folder) `npm test`

#### Build
in `fronend` folder: `npm run build`

#### Push to git
1. Build React before push
2. git push

### Deploy in Release
#### The first time
1. install `docker-engine` and `docker-compose` ([Docker](https://www.docker.com/))
2. `[sudo] docker-compose build`
3. `[sudo] docker-compose up -d`

#### Update
1. `[sudo] docker-compose build`
2. `[sudo] docker-compose up -d`


Configuration
----

### Nginx

#### Use https
Edit `.deploy/nginx/app.conf`
```
# .deploy/nginx/app.conf

# *** uncomment these lines ***
server {
  listen      80;
  return 301 https://$host$request_uri;
}

# configuration of the server
server {
    # *** and there ***
    # listen      80 default_server;
    listen    443 default_server;

    ssl on;
    ssl_certificate /etc/nginx/app.crt;
    ssl_certificate_key /etc/nginx/app.key;
```
Edit `Dockerfile`
```
# Dockerfile

# If use https
ADD path/to/app.crt /etc/nginx/app.crt
ADD path/to/app.key /etc/nginx/app.key
```
Add your crt and key in `path/to/`

Edit `docker-compose.yml`
```yml
web:
    depends_on:
      - "db"
    build: .
    ports:
      - "80:80"
      - "443:443"
      - "8000:8000"
    links:
      - db
```

### Database

#### volumes path

Edit `docker-compose.yml`
```yml
version: "2"
services:
  db:
    image: mysql
    expose:
      - "3306"
    volumes:
      - path/to/volumes:/var/lib/mysql
    environment:
      ...

```

#### Use other database
Edit `docker-compose.yml`, remove service `db`

```yml
version: "2"
services:
  web:
    build: .
    ports:
      - "80:80"
      - "8000:8000"

```

Add database configuration in `config/prov_settings.py`

LICENSE
----
[The MIT License](LICENSE)
