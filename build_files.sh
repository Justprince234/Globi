# Create a virtual environment
echo "Creating a virtual environment..."
python3.9 -m venv venv
source venv/bin/activate
echo "Done..."

echo "Installing the latest version of pip..."
python -m pip install --upgrade pip
sudo apt-get install pkg-config 
sudo apt-get install libcairo2-dev

echo "Upgrade Complete..."

# Build the project
echo "Building the project..."
python -m pip install -r requirements.txt
echo "Build Complete..."

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput --clear
echo "Ready..."
