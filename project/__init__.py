from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from project.config import Config

db = SQLAlchemy()
migrate = Migrate()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)

    from .models import Administrador, Establecimiento, Horario  # Importa los modelos aquí para que Alembic los detecte

    return app
