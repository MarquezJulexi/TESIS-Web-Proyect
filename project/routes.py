from flask import Blueprint, request, jsonify, session
from . import db
from .models import Administrador, Establecimiento, Horario

bp = Blueprint('routes', __name__)

@bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        usuario = data.get('usuario')
        contrasena = data.get('contrasena')

        admin = Administrador.query.filter_by(usuario=usuario).first()
        if admin and admin.contrasena == contrasena:
            session['admin_id'] = admin.id  # Establecer la sesión
            return jsonify({'message': 'Login successful'}), 200
        return jsonify({'message': 'Invalid credentials'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/logout', methods=['POST'])
def logout():
    try:
        session.pop('admin_id', None)  # Eliminar la sesión
        return jsonify({'message': 'Logout successful'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/establecimientos', methods=['POST'])
def add_establecimiento():
    try:
        if 'admin_id' not in session:
            return jsonify({'message': 'Not authorized'}), 403

        data = request.get_json()
        nombre = data.get('nombre')
        direccion = data.get('direccion')
        tipo = data.get('tipo')
        latitud = data.get('latitud')
        longitud = data.get('longitud')
        descripcion = data.get('descripcion')


        nuevo_establecimiento = Establecimiento(
            nombre=nombre,
            direccion=direccion,
            tipo=tipo,
            latitud=latitud,
            longitud=longitud,
            descripcion=descripcion,
            administrador_id=session['admin_id']
        )

        db.session.add(nuevo_establecimiento)
        db.session.commit()

        return jsonify({'message': 'Establecimiento added successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/establecimientos/<int:id>', methods=['PUT'])
def edit_establecimiento(id):
    try:
        if 'admin_id' not in session:
            return jsonify({'message': 'Not authorized'}), 403

        data = request.get_json()
        establecimiento = Establecimiento.query.filter_by(id=id, administrador_id=session['admin_id']).first()

        if establecimiento is None:
            return jsonify({'message': 'Establecimiento not found'}), 404

        establecimiento.nombre = data.get('nombre', establecimiento.nombre)
        establecimiento.direccion = data.get('direccion', establecimiento.direccion)
        establecimiento.tipo = data.get('tipo', establecimiento.tipo)
        establecimiento.latitud=data.get('latitud', establecimiento.latitud)
        establecimiento.longitud=data.get('longitud', establecimiento.longitud)
        establecimiento.descripcion=data.get('descripcion', establecimiento.descripcion)

        db.session.commit()

        return jsonify({'message': 'Establecimiento updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/eliminar_establecimiento/<int:id>', methods=['PUT'])
def actualizar_estado_establecimiento(id):
    try:
        if 'admin_id' not in session:
            return jsonify({'message': 'Not authorized'}), 403

        establecimiento = Establecimiento.query.get(id)
        if not establecimiento:
            return jsonify({'message': 'Establecimiento not found'}), 404

        data = request.get_json()
        eliminado = data.get('eliminado')

        establecimiento.eliminado = eliminado
        db.session.commit()

        return jsonify({'message': 'Estado de eliminación actualizado correctamente'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/establecimientos/<int:establecimiento_id>/horarios', methods=['POST'])
def add_horario(establecimiento_id):
    try:
        if 'admin_id' not in session:
            return jsonify({'message': 'Not authorized'}), 403

        data = request.get_json()
        dia = data.get('dia_semana')
        apertura = data.get('hora_apertura')
        cierre = data.get('hora_cierre')

        nuevo_horario = Horario(
            dia_semana=dia,
            hora_apertura=apertura,
            hora_cierre=cierre,
            establecimiento_id=establecimiento_id
        )

        db.session.add(nuevo_horario)
        db.session.commit()

        return jsonify({'message': 'Horario added successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/horarios/<int:id>', methods=['PUT'])
def edit_horario(id):
    try:
        if 'admin_id' not in session:
            return jsonify({'message': 'Not authorized'}), 403

        data = request.get_json()
        horario = Horario.query.filter_by(id=id).first()

        if not horario:
            return jsonify({'message': 'Horario not found'}), 404

        # Actualizar los atributos del horario con los valores recibidos
        horario.dia_semana = data.get('dia_semana', horario.dia_semana)
        horario.hora_apertura = data.get('hora_apertura', horario.hora_apertura)
        horario.hora_cierre = data.get('hora_cierre', horario.hora_cierre)

        db.session.commit()

        return jsonify({'message': 'Horario updated successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/horarios/<int:id>', methods=['DELETE'])
def delete_horario(id):
    try:
        if 'admin_id' not in session:
            return jsonify({'message': 'Not authorized'}), 403

        horario = Horario.query.filter_by(id=id).first()

        if horario is None:
            return jsonify({'message': 'Horario not found'}), 404

        db.session.delete(horario)
        db.session.commit()

        return jsonify({'message': 'Horario deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/admin/password', methods=['PUT'])
def update_password():
    try:
        if 'admin_id' not in session:
            return jsonify({'message': 'Not authorized'}), 403

        data = request.get_json()
        new_password = data.get('new_password')

        if not new_password:
            return jsonify({'message': 'New password is required'}), 400

        admin = Administrador.query.get(session['admin_id'])
        admin.contrasena = new_password
        db.session.commit()

        return jsonify({'message': 'Password updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500