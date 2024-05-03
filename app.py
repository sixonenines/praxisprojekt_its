from flask import Flask, jsonify, request, render_template
from pymongo import MongoClient
from bson import json_util

app = Flask(__name__)

def get_db():
    client = MongoClient(host='localhost',
                         port=27017)    
    db = client['IPT_logs']
    return db

   
@app.route('/')
def ping_server():
      return "Hello World!"
# Put html files in templates
@app.route('/index.html')
def get_index_html():
    return render_template('index.html')

@app.route('/another_index.html')
def get_another_index_html():
    return render_template('another_index.html')





## Database stuff

@app.route('/get_logged_data')
def get_logged_data():
    try:
        db = get_db()
        _logged_data = db.IPT_logs.find()
        data = json_util.dumps(list(_logged_data))
        return jsonify({"success": True, "data": data})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)})
    
@app.route('/add_random_data_for_example', methods=['GET'])
def add_random_data_for_example():
    try:
        data = {'bird':'pigeon'}
        db = get_db()
        result = db.IPT_logs.insert_one(data)
        return jsonify({"success": True, "message": "Data uploaded successfully", "id": str(result.inserted_id)})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)})

@app.route('/upload_logged_data', methods=['POST'])
def upload_logged_data():
    try:
        data = request.json
        db = get_db()
        result = db.IPT_logs.insert_one(data)
        return jsonify({"success": True, "message": "Data uploaded successfully", "id": str(result.inserted_id)})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)})




if __name__=='__main__':
    app.run()
