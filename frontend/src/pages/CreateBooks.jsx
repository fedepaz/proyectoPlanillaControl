import { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import DatosPsa from "../components/createPlanilla/DatosPsa";
import DatosVuelo from "../components/createPlanilla/DatosVuelo";
import DatosTerrestre from "../components/createPlanilla/DatosTerrestre";
import DatosSeguridad from "../components/createPlanilla/DatosSeguridad";
import DatosVehiculos from "../components/createPlanilla/DatosVehiculos";
import NovEquipajes from "../components/createPlanilla/NovEquipajes";
import NovInspeccion from "../components/createPlanilla/NovInspeccion";
import NovOtras from "../components/createPlanilla/NovOtras";

const CreatePlanilla = () => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const addNewDatosTerrestre = () => {};

  const handleSavePlanilla = () => {
    const data = {
      datosPsa,
      datosVuelo,
      datosTerrestre,
      datosSeguridad,
      datosVehiculos,
      novEquipajes,
      novInspeccion,
      novOtras,
    };
    setLoading(true);
    axios
      .post("http://localhost:5555/books", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Planilla created succesfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Nueva Planilla</h1>
      {loading ? <Spinner /> : ""}
      <div className="border border-gray-300 rounded-xl p-4 mx-auto">
        {/* datosPsa section */}
        <DatosPsa />
        {/* datosVuelo section */}
        <DatosVuelo />
        {/* datosTerrestre section */}
        <DatosTerrestre />
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={addNewDatosTerrestre}
        >
          Add Terrestre
        </button>
        {/* Render inputs for datosSeguridad */}
        <DatosSeguridad />
        <DatosVehiculos />
        <div className="border-b border-gray-300 pb-4 mb-4">
          <NovEquipajes />

          <NovInspeccion />
          <NovOtras />

          <button
            className="p-2 bg-sky-300 m-8 rounded"
            onClick={handleSavePlanilla}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePlanilla;
