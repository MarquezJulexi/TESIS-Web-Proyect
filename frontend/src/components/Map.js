import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = ({ establecimientos }) => {
  return (
    <div className="map-container">
      <MapContainer center={[-0.95156069, -80.6914418]} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {establecimientos.map((establecimiento) => (
          <Marker key={establecimiento.id} position={[parseFloat(establecimiento.latitud), parseFloat(establecimiento.longitud)]}>
            <Popup>
              <div>
                <h2>{establecimiento.nombre}</h2>
                <p>{establecimiento.direccion}</p>
                <p>Tipo: {establecimiento.tipo}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;