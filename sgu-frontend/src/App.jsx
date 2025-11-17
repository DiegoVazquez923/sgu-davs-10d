import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios';
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const url = 'http://localhost:8081/sgu/usuarios';
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [numero, setNumero] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [id, setId] = useState(null);
  const [metodo, setMetodo] = useState('POST');
  useEffect(() => {
    getUsuarios();
  }, []);

  function getUsuarios() {
    const urlGet = url + '/';
    axios.get(urlGet).then((res) => {
      console.log(res.data)
      setUsuarios(res.data);
    }).catch((err) => {
      console.log(err)
    })
  }

  function addUsuario(metodo) {
    const urlPost = url + '/';
    const usuario = {
      nombre: nombre,
      correo: correo,
      numero: numero
    };

    if (metodo === 'PUT') {
      const urlPut = url + '/' + id;
      axios.put(urlPut, usuario).then((res) => {
        console.log(res.data)
        setNombre('');
        setCorreo('');
        setNumero('');
        setId(null);
        setMetodo('POST');
        getUsuarios();
      }).catch((err) => {
        console.log(err)
      })
      return;
    } else {
      axios.post(urlPost, usuario).then((res) => {
        console.log(res.data)
        setNombre('');
        setCorreo('');
        setNumero('');
        getUsuarios();
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  function updateUsuario(id, nombre, correo, numero) {
    setId(id);
    setNombre(nombre);
    setCorreo(correo);
    setNumero(numero);
    setMetodo('PUT');
  }

  function deleteUsuario(id) {
    const urlDelete = url + '/' + id;
    axios.delete(urlDelete).then((res) => {
      console.log(res.data)
      getUsuarios();
    }).catch((err) => {
      console.log(err)
    })
  }
  
  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title mb-3">Registrar Usuario</h4>

                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input className="form-control" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>

                <div className="mb-3">
                  <label className="form-label">Correo</label>
                  <input className="form-control" placeholder="Correo" type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                </div>

                <div className="mb-3">
                  <label className="form-label">Número de teléfono</label>
                  <input className="form-control" placeholder="1234567890" type="number" value={numero} onChange={(e) => setNumero(e.target.value)} />
                </div>

                <button className="btn btn-success w-100" onClick={() => addUsuario(metodo)}>Guardar</button>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title mb-3">Usuarios Registrados</h4>

                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Correo</th>
                      <th>Número</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    {usuarios && usuarios.length > 0 ? usuarios.map((u) => (
                      <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.nombre}</td>
                        <td>{u.correo}</td>
                        <td>{u.numero}</td>
                        <td>
                          <button className="btn btn-warning btn-sm me-2" onClick={() => updateUsuario(u.id, u.nombre, u.correo, u.numero)}>Editar</button>
                          <button className="btn btn-danger btn-sm" onClick={()=> deleteUsuario(u.id)}>Eliminar</button>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="5" className="text-center">No hay usuarios registrados</td>
                      </tr>
                    )}

                  </tbody>
                </table>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default App
