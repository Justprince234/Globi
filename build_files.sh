# Create a virtual environment
echo "Creating a virtual environment..."

echo "Installing the latest version of pip..."
python3.9 -m pip install --upgrade pip
python3.9 -m pip install Django 
python3.9 -m pip install psycopg2-binary
python3.9 -m pip install cloudinary

echo "Upgrade Complete..."

# Build the project
echo "Building the project..."
python3.9 -m pip install -r requirements.txt
echo "Build Complete..."

# Collect static files
echo "Collecting static files..."
echo "Ready..."
