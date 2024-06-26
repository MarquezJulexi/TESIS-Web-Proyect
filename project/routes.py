from flask import request, jsonify, session
from . import create_app, db
from .models import Administrador

app = create_app()

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    usuario = data.get('usuario')
    contrasena = data.get('contrasena')

    admin = Administrador.query.filter_by(usuario=usuario).first()
    if admin and admin.contrasena == contrasena:
        session['admin_id'] = admin.id
        return jsonify({'message': 'Login successful'}), 200
    return jsonify({'message': 'Invalid credentials'}), 401

if __name__ == '__main__':
    app.run(debug=True)
