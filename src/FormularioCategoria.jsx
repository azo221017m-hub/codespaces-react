import React, { useState } from 'react';
import './FormularioCategoria.css';

const initialState = {
  nombre: '',
  descripcion: '',
  estatus: true,
  imagencategoria: null,
};

const FormularioCategoria = ({ categoria, onSubmit, onCancel }) => {
  const [form, setForm] = useState(categoria || initialState);
  const [imgPreview, setImgPreview] = useState(categoria?.imagencategoria ? `data:image/jpeg;base64,${categoria.imagencategoria}` : null);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImage = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
        setForm(prev => ({ ...prev, imagencategoria: reader.result.split(',')[1] }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="form-categoria" onSubmit={handleSubmit}>
      <h2>{categoria ? 'Editar' : 'Agregar'} Categoría</h2>
      <label>
        Nombre:
        <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required />
      </label>
      <label>
        Descripción:
        <textarea name="descripcion" value={form.descripcion} onChange={handleChange} required />
      </label>
      <label>
        Estatus:
        <input type="checkbox" name="estatus" checked={form.estatus} onChange={handleChange} /> Activo
      </label>
      <label>
        Imagen:
        <input type="file" accept="image/*" onChange={handleImage} />
      </label>
      {imgPreview && (
        <div className="img-preview">
          <img src={imgPreview} alt="Vista previa" />
        </div>
      )}
      <div className="form-actions">
        <button type="submit" className="save-btn">Guardar</button>
        <button type="button" className="cancel-btn" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
};

export default FormularioCategoria;
