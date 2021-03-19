import React from "react";
import Buscar from "../ui/Buscar";
import Navegacion from "./Navegacion";

const Header = () => {
  return (
    <header>
      <div>
        <div>
          <p>Petfrip</p>

          <Buscar />

          <Navegacion></Navegacion>
        </div>

        <div>{/* Menu de admin */}</div>
      </div>
    </header>
  );
};

export default Header;
