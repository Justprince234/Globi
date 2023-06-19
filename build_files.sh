# Create a virtual environment
echo "Creating a virtual environment..."
python3.9 -m venv venv
source venv/bin/activate
echo "Done..."

echo "Installing the latest version of pip..."
python -m pip install --upgrade pip

echo "Upgrade Complete..."

# Build the project
echo "Building the project..."
python -m pip install asgiref
python -m pip install certifi
python -m pip install charset-normalizer
python -m pip install cloudinary
python -m pip install Django
python -m pip install django-cloudinary-storage
python -m pip install django-smtp-ssl
python -m pip install django-sslserver
python -m pip install gunicorn
python -m pip install idna
python -m pip install Pillow
python -m pip install psycopg2-binary
python -m pip install python-dotenv
python -m pip install requests
python -m pip install six
python -m pip install sqlparse
python -m pip install urllib3
python -m pip install whitenoise


echo "Build Complete..."

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput --clear
echo "Ready..."
