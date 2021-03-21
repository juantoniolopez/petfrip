export default function validarCrearCuenta(valores) {
  let errores = {};

  //validar el nombre del usuario
  if (!valores.nombre) {
    errores.nombre = "El Nombre es Obligatorio";
  }

  // validar direccion

  if (!valores.direccion) {
    errores.direccion = "La dirección es obligatoria";
  }

  //validar la URL

  if (!valores.url) {
    errores.url = "La url del piso es obligatoria";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)) {
    errores.url = "URL no válida";
  }

  // validar descripción

  if (!valores.descripcion) {
    errores.descripcion = "Agrega una descripcion de tu piso";
  }

  return errores;
}
