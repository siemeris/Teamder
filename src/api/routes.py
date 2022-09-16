"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Activities
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash,check_password_hash

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/addActivity', methods=['POST'])
@jwt_required()
def addActivity():
    request_body = request.get_json(force=True)
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    activity = Activities(category = request_body["category"], name = request_body["title"], players = request_body["participants"], date = request_body["date"], city = request_body["city"], location = request_body["location"], time = request_body["time"], user_id = user.id, latitude = request_body["latitude"], longitude = request_body["longitude"],)
    db.session.add(activity)
    db.session.commit()
    return jsonify(), 200

@api.route('/getAllActivities', methods=['GET'])
def obtenerActivity():
    act_query = Activities.query.all()
    all_activities = list(map(lambda x: x.serialize(), act_query))
    response_body = {
        "result": all_activities
    }    
    return jsonify(response_body), 200


@api.route('/getAllUsers', methods=['GET'])
def obtenerUser():
    act_query = User.query.all()
    all_users = list(map(lambda x: x.serialize(), act_query))
    response_body = {
        "result": all_users
    }    
    return jsonify(response_body), 200

@api.route('/getCurrentUser', methods=['GET'])
@jwt_required()
def obtenerCurrentUser():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    response = User.query.filter_by(id=user.id).first()
    response_body = {
        "Current_username": response.username,
        "Current_name": response.name,
        "Current_lastname": response.lastname,
        "Current_age": response.age,
        "Current_gender": response.gender,
        "Current_email": response.email,
        "Current_address": response.address,
        "Current_mobile": response.mobile,
        
    }
    return jsonify(response_body), 200

@api.route('/getPostedActivities', methods=['GET'])
@jwt_required()
def get_posted_activities():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    response = User.query.filter_by(id=user.id).first().postedactivities
    Actividades = list(map(lambda x: x.serialize(), response))
    return jsonify({
        "Posted_Activities": Actividades,
    }), 200

@api.route('/getCurrentActivity/<int:index>', methods=['GET'])
@jwt_required()
def get_current_activity(index):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    response = Activities.query.filter_by(id=index).first()
    response_body = {
        "Current_category": response.category,
        "Current_title": response.name,
        "Current_description": response.description,
        "Current_players": response.players,
        "Current_date": response.date,
        "Current_city": response.city,
        "Current_location": response.location,
        "Current_time": response.time,
    }
    return jsonify(response_body), 200

@api.route('/getTargetActivities', methods=['GET'])
@jwt_required()
def get_target_activities():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    response = User.query.filter_by(id=user.id).first().activities
    Actividades = list(map(lambda x: x.serialize(), response))
    return jsonify({
        "Target_Activities": Actividades,
    }), 200

@api.route('/joinActivity', methods=['POST'])
@jwt_required()
def join_activity():
    request_body = request.get_json(force=True)
    activity_id = request_body["index"]
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    actividad = Activities.query.get(activity_id)
    listaActividades = User.query.filter_by(id=user.id).first().activities
    listaActividades.append(actividad)
    db.session.commit()

    return jsonify({
        "success": "activity added",
        "ActividadesAnotadas": list(map(lambda x: x.serialize(), listaActividades))
    }), 200

@api.route('/leaveActivity', methods=['DELETE'])
@jwt_required()
def leave_activity():
    request_body = request.get_json(force=True)
    activity_id = request_body["index"]
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    actividad = Activities.query.get(activity_id)
    listaActividades = User.query.filter_by(id=user.id).first().activities
    listaActividades.remove(actividad)
    db.session.commit()

    return jsonify({
        "success": "favorite deleted",
    }), 200

@api.route('/deleteActivity', methods=['DELETE'])
@jwt_required()
def delete_activity():
    request_body = request.get_json(force=True)
    activity_id = request_body["index"]
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    actividad = Activities.query.get(activity_id)
    listaActividades = User.query.filter_by(id=user.id).first().postedactivities
    db.session.delete(actividad)
    db.session.commit()

    return jsonify({
        "success": "favorite deleted",
        "ActividadesAnotadas": list(map(lambda x: x.serialize(), listaActividades))
    }), 200

@api.route('/signup', methods=['POST'])
def signup():
    request_body = request.get_json(force=True)
    hash_password = generate_password_hash(request_body["password"],method="sha256")
    user = User( name = request_body["name"], username = request_body["username"], lastname = request_body["lastname"], age = request_body["age"], gender = request_body["gender"],email = request_body["email"], password = hash_password, mobile = request_body["mobile"], address = request_body["address"] )
    db.session.add(user)
    db.session.commit()
    return jsonify(), 200


@api.route("/token", methods=["POST"])
def create_token():

    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user_id = User.query.filter_by(email=email).first().id
    user_pass = User.query.filter_by(email=email).first().password
    
    if check_password_hash(user_pass, password):
        access_token = create_access_token(identity=user_id)
    return jsonify({ "token": access_token, "user_id": user_id })

@api.route('/editActivity', methods=['PUT'])
@jwt_required()
def editActivity():
    request_body = request.get_json(force=True)
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    activity_id = request_body["index"]
    actividad = Activities.query.get(activity_id)
    actividad.category = request_body["category"]
    actividad.name = request_body["title"]
    actividad.players = request_body["participants"]
    actividad.date = date = request_body["date"]
    actividad.city = request_body["city"]
    actividad.location = request_body["location"]
    actividad.time = request_body["time"]
    actividad.latitude = request_body["latitude"]
    actividad.longitude = request_body["longitude"]
    db.session.commit()
    return jsonify(), 200

@api.route('/editUser', methods=['PUT'])
@jwt_required()
def editUser():
    request_body = request.get_json(force=True)
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    user.name = request_body["name"]
    user.username = request_body["username"]
    user.age = request_body["age"]
    user.gender = request_body["gender"]
    user.lastname = request_body["lastname"]
    user.address = request_body["address"]
    user.mobile = request_body["mobile"]
    user.email = request_body["email"]
    db.session.commit()
    return jsonify(), 200



# Protege una ruta con jwt_required, bloquea las peticiones
# sin un JWT válido presente.
@api.route("/privated", methods=["GET"])
@jwt_required()
def protected():
    # Accede a la identidad del usuario actual con get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    return jsonify({"id": user.id, "email": user.email }), 200



