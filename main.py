from flask import Flask
from flask import jsonify
from flask import request
import json
from flask_cors import CORS #include this line
app = Flask(__name__)

app.run(debug=True)
CORS(app) # include this line

with open('tasks.json', 'r') as myfile:
    data=myfile.read()
# parse file
obj = json.loads(data)

@app.route('/todo/getall',methods=['GET'])
def getTasks():
    return jsonify(obj)

@app.route('/todo/create',methods=['POST'])
def createTask():
    # Get item from the POST body
    req_data = request.get_json()
    obj.append(req_data)
    return jsonify(req_data)

@app.route('/todo/update', methods=['PUT'])
def updateTask():
    req_data = request.get_json()
    for idx, task in enumerate(obj):
        if task.get('task') == req_data["task"]:
            obj.pop(idx)
            obj.insert(idx,req_data)
            break
    return jsonify(req_data)

@app.route('/todo/delete', methods=['DELETE'])
def deleteTask():
    req_data = request.get_json()
    for idx, task in enumerate(obj):
        if task.get('task') == req_data["task"]:
            obj.pop(idx)
            return jsonify(req_data)
    return "Item Not Found"