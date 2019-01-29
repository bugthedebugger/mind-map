#! /usr/bin/python3
from flask import Flask
from flask import render_template
from flask import request
from flask import url_for
from flask import session
from flask import redirect
from models import User
import os

app = Flask(__name__)
user = User()
@app.route('/')
def index():
    if 'username' in session:
        return redirect(url_for('mind_map'))
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/developers')
def developers():
    return render_template('creators.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/mind-map')
def mind_map():
    if 'username' in session:
        return render_template('mind-map.html')
    else:
        return redirect(url_for('login'))

@app.route('/mind-map/app')
def mind_map_app():
    if 'username' in session:
        return render_template('app.html')
    else:
        return redirect(url_for('login'))

@app.route('/login-handle', methods=['POST'])
def login_handler():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if user.loginUser(username, password) == True:
            session['username'] = user.username
            session['userId'] = user.userId
            return redirect(url_for('mind_map'))
        else:
            session.pop('username', None)
            session.pop('userId', None)
            return redirect(url_for('login'))

@app.route('/register-handle', methods=['POST'])
def register_handler():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        if user.registerUser(username, email, password) == True:
            session['username'] = user.username
            session['userId'] = user.userId
            return redirect(url_for('mind_map'))
        else:
            session.pop('username', None)
            session.pop('userId', None)
            return redirect(url_for('login'))

@app.route('/logout')
def logout():
    session.pop('username', None)
    session.pop('userId', None)
    return redirect(url_for('login'))


if __name__ == "__main__":
    app.secret_key = os.urandom(24)
    app.run(debug=True, port=8000)