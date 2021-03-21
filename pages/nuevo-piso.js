import React, { useState, useContext } from "react";
import { css } from "@emotion/react";
import Router, { useRouter } from "next/router";
import FileUploader from "react-firebase-file-uploader";
import Layout from "../components/layout/Layout";
import {
  Formulario,
  Campo,
  InputSubmit,
  Error,
} from "../components/ui/Formulario";

import { FirebaseContext } from "../firebase";

// validaciones
import useValidacion from "../hooks/useValidacion";
import validarCrearPiso from "../validacion/validarCrearPiso";

const STATE_INICIAL = {
  nombre: "",
  direccion: "",
  //imagen: "",
  url: "",
  descripcion: "",
};

const NuevoPiso = () => {
  // state de las imagenes
  const [nombreimagen, guardarNombre] = useState("");
  const [subiendo, guardarSubiendo] = useState(false);
  const [progreso, guardarProgreso] = useState(0);
  const [urlimagen, guardarUrlImagen] = useState("");

  const [error, guardarError] = useState(false);

  const {
    valores,
    errores,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidacion(STATE_INICIAL, validarCrearPiso, crearPiso);

  const { nombre, direccion, imagen, url, descripcion } = valores;

  // hook de routing para redireccionar
  const router = useRouter();

  // context con las operaciones crud de firebase

  const { usuario, firebase } = useContext(FirebaseContext);

  async function crearPiso() {
    // si el usuario no está autenticado llevar al login
    if (!usuario) {
      return Router.push("/login");
    }

    // crear el objeto de nuevo piso
    const piso = {
      nombre,
      direccion,
      url,
      urlimagen,
      descripcion,
      votos: 0,
      comentarios: [],
      creado: Date.now(),
    };

    // insertarlo en la base de datos
    firebase.db.collection("pisos").add(piso);

    return router.push("/");
  }

  const handleUploadStart = () => {
    guardarProgreso(0);
    guardarSubiendo(true);
  };

  const handleProgress = (progreso) => guardarProgreso({ progreso });

  const handleUploadError = (error) => {
    guardarSubiendo(error);
    console.error(error);
  };

  const handleUploadSuccess = (nombre) => {
    guardarProgreso(100);
    guardarSubiendo(false);
    guardarNombre(nombre);
    firebase.storage
      .ref("pisos")
      .child(nombre)
      .getDownloadURL()
      .then((url) => {
        console.log(url);
        guardarUrlImagen(url);
      });
  };

  return (
    <div>
      <Layout>
        <>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            Nuevo Piso
          </h1>
          <Formulario onSubmit={handleSubmit} noValidate>
            <fieldset>
              <legend>Información General</legend>

              <Campo>
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  placeholder="Tu Nombre"
                  name="nombre"
                  value={nombre}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Campo>

              {errores.nombre && <Error>{errores.nombre}</Error>}

              <Campo>
                <label htmlFor="direccion">Dirección</label>
                <input
                  type="text"
                  id="direccion"
                  placeholder="Direccion de la empresa"
                  name="direccion"
                  value={direccion}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Campo>

              {errores.direccion && <Error>{errores.direccion}</Error>}

              <Campo>
                <label htmlFor="imagen">Imagen</label>
                <FileUploader
                  accept="image/*"
                  id="imagen"
                  name="imagen"
                  randomizeFilename
                  storageRef={firebase.storage.ref("pisos")}
                  onUploadStart={handleUploadStart}
                  onUploadError={handleUploadError}
                  onUploadSucess={handleUploadSuccess}
                  onProgress={handleProgress}
                />
              </Campo>

              <Campo>
                <label htmlFor="url">URL</label>
                <input
                  type="text"
                  id="url"
                  name="url"
                  placeholder="URL de tu piso"
                  value={url}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Campo>

              {errores.url && <Error>{errores.url}</Error>}
            </fieldset>

            <fieldset>
              <legend>Sobre tu Piso</legend>

              <Campo>
                <label htmlFor="descripcion">Descripción</label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={descripcion}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Campo>

              {errores.descripcion && <Error>{errores.descripcion}</Error>}
            </fieldset>

            {error && <Error> {error} </Error>}

            <InputSubmit type="submit" value="Crear Piso" />
          </Formulario>
        </>
      </Layout>
    </div>
  );
};

export default NuevoPiso;
