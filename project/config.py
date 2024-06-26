import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:Aljd4183@localhost/tesis1'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
