from flask import Flask, jsonify, request, make_response
from pymongo import MongoClient
from bson import json_util, ObjectId
from flask_cors import CORS
import jwt
from flask_bcrypt import Bcrypt
from datetime import datetime, timedelta
from flask_jwt_extended import create_access_token, JWTManager

app = Flask(__name__)
bcrypt= Bcrypt(app)
secret= "Very_secret_key_thatshouldntbesavedinplaintext"
CORS(app, origins="http://localhost:4200")
app.config["SECRET_KEY"]="Very_secret_key_thatshouldntbesavedinplaintext"
jwt=JWTManager(app)

client = MongoClient(host='localhost', port=27017)
db = client['IPT_db']
@app.route('/')
def ping_server():
      return "Hello World!"

## Database stuff
@app.route('/signup', methods=['POST'])
def save_user():
    message = ""
    status = "fail"
    try:
        data = request.get_json()
        username=data['username']
        if db.users.find_one({'username':username}):
            message = "user with that username already exists"
            code = 401
            status = "fail"
        else:
            # hashing the password so it's not stored in the db as it was
            data['password'] = bcrypt.generate_password_hash(data['password']).decode('utf-8')
            data["experienceLevel"]="Beginner"
            data['UserCreated'] = datetime.now()
            res = db.users.insert_one(data) 
            if res.acknowledged:
                status = "successful"
                message = "user created successfully"
                code = 201
    except Exception as ex:
        message = f"{ex}"
        status = "fail"
        code = 500
    return jsonify({'status': status, "message": message}), 200

@app.route('/login', methods=['POST'])
def login():
    message = ""
    res_data = {}
    code = 500
    status = "fail"
    try:
        data = request.get_json()
        username=data['username']
        user = db.users.find_one({'username':username})
        print(user)
        if user:
            userid = str(user['_id'])
            passwordhashed=user["password"]
            password=data["password"]
            experienceLevel = user["experienceLevel"]
            if user and bcrypt.check_password_hash(passwordhashed, password):
                access_token=create_access_token(identity=userid)
                message = "user authenticated"
                code = 200
                status = "successful"
                res_data={"user_id":userid, "username":username, "token":access_token, "experienceLevel":experienceLevel}
                print(res_data)

            else:
                message = "wrong password"
                code = 401
                status = "fail"
        else:
            message = "invalid login details"
            code = 401
            status = "fail"

    except Exception as ex:
        message = f"{ex}"
        code = 500
        status = "fail"
    return jsonify({'status': status, "data": res_data, "message":message}), code

@app.route('/upload_logged_data', methods=['POST'])
def upload_logged_data():
    print("hello")
    try:
        data = request.json
        print(data)
        result = db.IPT_logs.insert_one(data)
        return jsonify({"success": True, "message": "Data uploaded successfully", "id": str(result.inserted_id)})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)})

@app.route('/changeExpLevel', methods=['POST'])
def changeExpLevel():
    message = ""
    res_data = {}
    code = 500
    status = "fail"
    print(".")
    try:
        data = request.get_json()
        print(data)
        username=data['username']
        print(username)
        newExpLevel=data["experienceLevel"]
        filter = {'username': username}
        newvalues = { "$set": { 'experienceLevel': newExpLevel } }
        db.users.update_one(filter, newvalues)
        code=200
        status="successful"
        res_data={"user_id":username}
    except Exception as ex:
        message = f"{ex}"
        code = 500
        status = "fail"
    return jsonify({'status': status, "data": res_data, "message":message}), code


if __name__=='__main__':
    app.run()
