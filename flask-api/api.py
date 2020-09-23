from flask import Flask
from flask import request, jsonify
from flask_cors import CORS, cross_origin
import paramiko

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config["DEBUG"] = True


@app.route('/', methods=['GET'])
def home():
    return "<h1>Distant Reading Archive</h1><p>This site is a prototype API for distant reading of science fiction novels.</p>"


@app.route('/execute/<command>', methods=['GET'])
def execCommandOnVM(command):
    host = "192.168.203.17"
    port = 22
    username = "user"
    password = "password"
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(host, port, username, password)
    stdin, stdout, stderr = ssh.exec_command(command)
    print(stdin)
    std = {
        'stdout': stdout.readlines(),
        'stderr': stderr.readlines(),
    }
    return jsonify(std)


app.run()
