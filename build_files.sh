# Create a virtual environment
echo "Creating a virtual environment..."
python3.9 -m venv venv
source venv/bin/activate
echo "Done..."

echo "Installing the latest version of pip..."
python3.9 -m pip install --upgrade pip 
python3.9 -m pip install Django

echo "Upgrade Complete..."

# Build the project
echo "Building the project..."
python3.9 -m pip install -r requirements.txt
echo "Build Complete..."

# Collect static files
echo "Collecting static files..."
python3.9 manage.py collectstatic --noinput --clear
echo "Ready..."
