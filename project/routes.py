from flask import Blueprint, request, jsonify, session
from . import db
from .models import Establecimiento, Administrador, Horario

main = Blueprint('main', __name__)

@main.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    usuario = data.get('usuario')
    contrasena = data.get('contrasena')

    admin = Administrador.query.filter_by(usuario=usuario).first()
    if admin and admin.contrasena == contrasena:
        session['admin_id'] = admin.id
        return jsonify({'message': 'Login successful'}), 200
    return jsonify({'message': 'Invalid credentials'}), 401

@main.route('/establecimientos', methods=['GET', 'POST'])
def manage_establecimientos():
    if request.method == 'GET':
        establecimientos = Establecimiento.query.filter_by(eliminado=False).all()
        return jsonify([{
            'id': est.id,
            'nombre': est.nombre,
            'direccion': est.direccion,
            'latitud': str(est.latitud),
            'longitud': str(est.longitud),
            'descripcion': est.descripcion,
            'tipo': est.tipo,
            'eliminado': est.eliminado
        } for est in establecimientos]), 200
    elif request.method == 'POST':
        data = request.get_json()
        nuevo_establecimiento = Establecimiento(
            nombre=data['nombre'],
            direccion=data['direccion'],
            latitud=data['latitud'],
            longitud=data['longitud'],
            descripcion=data.get('descripcion'),
            tipo=data.get('tipo'),
            administrador_id=session['admin_id']
        )
        db.session.add(nuevo_establecimiento)
        db.session.commit()
        return jsonify({'message': 'Establecimiento creado exitosamente'}), 201

@main.route('/establecimientos/<int:id>', methods=['PUT', 'DELETE'])
def update_or_delete_establecimiento(id):
    establecimiento = Establecimiento.query.get_or_404(id)
    if request.method == 'PUT':
        data = request.get_json()
        establecimiento.nombre = data['nombre']
        establecimiento.direccion = data['direccion']
        establecimiento.latitud = data['latitud']
        establecimiento.longitud = data['longitud']
        establecimiento.descripcion = data.get('descripcion')
        establecimiento.tipo = data.get('tipo')
        db.session.commit()
        return jsonify({'message': 'Establecimiento actualizado exitosamente'}), 200
    elif request.method == 'DELETE':
        establecimiento.eliminado = True
        db.session.commit()
        return jsonify({'message': 'Establecimiento eliminado exitosamente'}), 200
