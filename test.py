from flask_jwt_extended import create_access_token
userid="2323323"

access_token=create_access_token(identity=userid)
print(access_token)