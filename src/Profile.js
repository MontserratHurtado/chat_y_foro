import React from 'react';
import './Profile.css'; // Asegúrate de tener un archivo CSS para el perfil

const Profile = ({ toggleProfile }) => {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Perfil de Mamá</h2>
        <button className="close-button" onClick={toggleProfile}>✖</button>
      </div>
      <div className="profile-content">
        <img className="profile-picture" src="imagenes/mujer.jpg"  />
        <div className="profile-info">
          <p><strong>Nombre:</strong> Mamá</p>
          <p><strong>Número:</strong> +123456789</p>
          <p><strong>Parentesco:</strong> Madre</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
