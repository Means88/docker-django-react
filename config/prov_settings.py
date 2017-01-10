import os

ENV = {
    'DEBUG': 'False',
    'SECRET_KEY': 'your_secret_key',
    'MYSQL_HOST': 'db',
    'MYSQL_USERNAME': 'username',
    'MYSQL_PASSWORD': 'password',
    'MYSQL_INSTANCE_NAME': 'app',
    'MYSQL_PORT': '3306',
}

for i in ENV.keys():
    os.environ[i] = ENV[i]
