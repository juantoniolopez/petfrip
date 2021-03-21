import React, { useEffect, useState, useContext } from "react";
import Layout from "../components/layout/Layout";
import { FirebaseContext } from "../firebase";

const Home = () => {
  const [pisos, guardarPisos] = useState([]);

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerPisos = () => {
      firebase.db
        .collection("pisos")
        .orderBy("creado", "desc")
        .onSnapshot(manejarSnapshot);
    };
    obtenerPisos();
  }, []);

  function manejarSnapshot(snapshot) {
    const pisos = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    guardarPisos(pisos);
  }

  return (
    <div>
      <Layout>
        <h1>Inicio</h1>
      </Layout>
    </div>
  );
};

export default Home;
