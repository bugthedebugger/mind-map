#! /usr/bin/python3
import pymysql

class User:
    def __init__(self):
        self.db = pymysql.connect("localhost", "root", "karkhana", database="MIND_MAP") 
        self.cursor = self.db.cursor()
        

    def user(self):
        return {
            username: self.username,
            id: self.userId
        }

    def registerUser(self, username, email, password):
        query = "INSERT INTO MIND_MAP.users(username, email, password) VALUES('{}', '{}', '{}');".format(
            username,
            email,
            password
        )
        error = False
        try:
            self.cursor.execute(query)
            self.db.commit()
            error = False
        except:
            self.db.rollback()
            error = True
        print(error)
        if not error:
            self.loginUser(username, password)
            
        return not error


    def loginUser(self, username, password):
        query = "SELECT id, username FROM users WHERE username='{}' AND password='{}'".format(username, password)
        self.cursor.execute(query)
        result = self.cursor.fetchone()
        if result is not None:
            self.username = result[1]
            self.userId = result[0] 
            self.login()
            return True
        else:
            self.username = None
            self.userId = None
            return False
    
    def checkLoggedIn(self):
        return self.login

    def login(self):
        self.login = True

    def logout(self):
        self.login = False
        self.username = None
        self.userId = None