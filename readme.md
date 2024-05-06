0. Have Python 3 and pip installed (usually is already installed if Python is downloaded from https://www.python.org/downloads/ )
1. Install MongoDB over https://www.mongodb.com/try/download/community
(the community server edition)
2. Start MongoDB compass and create a basic connectiom
3. Try it out by opening http://localhost:27017/ in your browser
4. Click on Databases, you should see 3 databases: admin, config, local. Create a new database with Database_name and Collection_name IPT_logs.
5. Create a virtual environment in python and activate it (activating it is different in windows or in macos) SKIP THIS STEP IF ITS NOT WORKING AND HOPE YOUR NORMAL PYTHON ENVIRONMENT HAS NO CONFLICTS 

https://www.freecodecamp.org/news/how-to-setup-virtual-environments-in-python/
[ Do this in your terminal:
1. pip install virtualenv
2. python -m venv flask-mongodb (or python3 -m venv flask-mongodb)
3.  ON MAC:
"source /env/bin/activate"
    ON WINDOWS:
        IF USING CMD: env/Scripts/activate.bat
        IF USING Powershell: env/Scripts/Activate.ps1
]
6. once its activated, stay in the terminal and type:
"pip install flask"
"pip install pymongo"
7. Run the app.py either with "python app.py" or "python3 app.py"
8. Access the website shown in your terminal
9. Add '/upload_logged_data' to the end of the link or '/add_random_data_for_example'

http://127.0.0.1:5000/get_logged_data
