from flask import Flask
from flask import jsonify
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
    return 'Create new task'

@app.route('/todo/update',methods=['UPDATE'])
def updateTask():
    return 'Update Task'

@app.route('/todo/delete',methods=['DELETE'])
def deleteTask():
    return 'Delete task'