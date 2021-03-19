import Link from "next/link";
import React from "react";

const Navegacion = () => {
  return (
    <nav>
      <Link href="/">Inicio</Link>
      <Link href="/">Populares</Link>
      <Link href="/">Nuevo Piso</Link>
    </nav>
  );
};

export default Navegacion;
