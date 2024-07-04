// src/components/Map.js
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import './css/Map.css'; 
import L from 'leaflet';
  // Crear el icono con el emoji 🍽️
  const emojiIcon = L.divIcon({
    className: 'custom-icon',
    html: '<div class="icon-background">🍽️</div>',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
const Map = ({ establecimientos, onEstablecimientoSelect }) => {
  const [selectedEstablecimiento, setSelectedEstablecimiento] = useState(null);

  const handleEstablecimientoClick = (establecimiento) => {
    console.log('Establecimiento seleccionado:', establecimiento);
    setSelectedEstablecimiento(establecimiento);
    onEstablecimientoSelect(establecimiento); // Llamar a la función del padre para actualizar la tabla
  };

  return (
    <div className="map-container">
      <MapContainer center={[-0.95156069, -80.6914418]} zoom={13} className="leaflet-map">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <ZoomControl position="bottomright" />
        {establecimientos.map((establecimiento) => (
          <Marker
            key={establecimiento.id}
            position={[parseFloat(establecimiento.latitud), parseFloat(establecimiento.longitud)]}
            icon={emojiIcon}
            
          >
            <Popup>
              <div onClick={() => handleEstablecimientoClick(establecimiento)}>
                <h2 >Nombre: {establecimiento.nombre}</h2>
                <p>Dirección: {establecimiento.direccion}</p>
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
