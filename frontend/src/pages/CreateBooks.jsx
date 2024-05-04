import { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreatePlanilla = () => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [datosPsa, setDatosPsa] = useState({
    fecha: "",
    responsable: "",
    horaIni: "",
    horaFin: "",
    cant: "",
    tipoControl: "",
    medioTec: "",
    tipoPro: "",
  });
  const [datosVuelo, setDatosVuelo] = useState({
    aerolinea: "",
    codVuelo: "",
    origen: "",
    destino: "",
    horaArribo: "",
    horaPartida: "",
    demora: "",
    tipo: "",
    matriculaAeronave: "",
    posicion: "",
  });
  const [datosTerrestre, setDatosTerrestre] = useState([
    {
      apellido: "",
      nombre: "",
      dni: "",
      legajo: "",
      funcion: "",
      grupo: "",
    },
  ]);
  const [datosSeguridad, setDatosSeguridad] = useState([
    {
      apellido: "",
      nombre: "",
      dni: "",
      legajo: "",
      empresa: "",
    },
  ]);
  const [datosVehiculos, setDatosVehiculos] = useState({
    tipoVehiculo: "",
    empresa: "",
    numInterno: "",
    operador: "",
    observaciones: "",
  });
  const [novEquipajes, setNovEquipajes] = useState("");
  const [novInspeccion, setNovInspeccion] = useState("");
  const [novOtras, setNovOtras] = useState("");

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
  const handleDatosTerrestreChange = (index, key, value) => {
    const updatedDatosTerrestre = [...datosTerrestre];
    updatedDatosTerrestre[index][key] = value;
    setDatosTerrestre(updatedDatosTerrestre);
  };

  const addNewDatosTerrestre = () => {
    setDatosTerrestre([
      ...datosTerrestre,
      {
        apellido: "",
        nombre: "",
        dni: "",
        legajo: "",
        funcion: "",
        grupo: "",
      },
    ]);
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Nueva Planilla</h1>
      {loading ? <Spinner /> : ""}
      <div className="border border-gray-300 rounded-xl p-4 mx-auto">
        {/* datosPsa section */}
        <div className="border-b border-gray-300 pb-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">Datos PSA</h2>
          {Object.keys(datosPsa).map((key) => (
            <div key={key} className="my-2">
              <label className="text-gray-600">{key}</label>
              <input
                type="text"
                value={datosPsa[key]}
                onChange={(e) =>
                  setDatosPsa({ ...datosPsa, [key]: e.target.value })
                }
                className="border border-gray-400 px-3 py-1 w-full"
              />
            </div>
          ))}
        </div>

        {/* datosVuelo section */}
        <div className="border-b border-gray-300 pb-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">Datos Vuelo</h2>
          {Object.keys(datosVuelo).map((key) => (
            <div key={key} className="my-2">
              <label className="text-gray-600">{key}</label>
              <input
                type="text"
                value={datosVuelo[key]}
                onChange={(e) =>
                  setDatosVuelo({ ...datosVuelo, [key]: e.target.value })
                }
                className="border border-gray-400 px-3 py-1 w-full"
              />
            </div>
          ))}
        </div>

        {/* datosTerrestre section */}
        <div className="border-b border-gray-300 pb-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">Datos Terrestre</h2>
          {datosTerrestre.map((terrestre, index) => (
            <div key={index} className="flex flex-col mb-3">
              {Object.keys(terrestre).map((key) => (
                <div key={`${index}-${key}`} className="my-2">
                  <label className="text-gray-600">{key}</label>
                  <input
                    type="text"
                    value={terrestre[key]}
                    onChange={(e) =>
                      handleDatosTerrestreChange(index, key, e.target.value)
                    }
                    className="border border-gray-400 px-3 py-1 w-full"
                  />
                </div>
              ))}
            </div>
          ))}
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded"
            onClick={addNewDatosTerrestre}
          >
            Add Terrestre
          </button>
        </div>

        {/* Render inputs for datosSeguridad */}
        <div className="border-b border-gray-300 pb-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">Datos Seguridad</h2>
          <div className=" my-1 flex-col">
            {datosSeguridad.map((seguridad, index) => (
              <div key={index} className="flex flex-col mb-3">
                {Object.keys(seguridad).map((key) => (
                  <div key={`${index}-${key}`} className="my-2 text-center ">
                    <label className="text-gray-600">{key}</label>
                    <input
                      type="text"
                      value={seguridad[key]}
                      onChange={(e) => {
                        const updatedSeguridad = [...datosSeguridad];
                        updatedSeguridad[index][key] = e.target.value;
                        setDatosSeguridad(updatedSeguridad);
                      }}
                      className="border border-gray-400 px-3 py-1 w-full"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="border-b border-gray-300 pb-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">Datos Vehículos</h2>
          <div className=" my-1 flex-col">
            <div className=" flex">
              <div className="p-1 text-center">
                <label className="text-gray-600">Tipo Vehículo</label>
                <input
                  type="text"
                  value={datosVehiculos.tipoVehiculo}
                  onChange={(e) =>
                    setDatosVehiculos(
                      (datosVehiculos.tipoVehiculo = e.target.value)
                    )
                  }
                  className="border border-gray-400 px-3 py-1 w-full"
                />
              </div>
              <div className="p-1 text-center">
                <label className="text-gray-600">Empresa</label>
                <input
                  type="text"
                  value={datosVehiculos.empresa}
                  onChange={(e) =>
                    setDatosVehiculos((datosVehiculos.empresa = e.target.value))
                  }
                  className="border border-gray-400 px-3 py-1 w-full"
                />
              </div>
            </div>

            <div className=" flex">
              <div className="p-1 text-center">
                <label className="text-gray-600">Num Interno</label>
                <input
                  type="text"
                  value={datosVehiculos.numInterno}
                  onChange={(e) =>
                    setDatosVehiculos(
                      (datosVehiculos.numInterno = e.target.value)
                    )
                  }
                  className="border border-gray-400 px-3 py-1 w-full"
                />
              </div>

              <div className="p-1 text-center">
                <label className="text-gray-600">Operador</label>
                <input
                  type="text"
                  value={datosVehiculos.operador}
                  onChange={(e) =>
                    setDatosVehiculos(
                      (datosVehiculos.operador = e.target.value)
                    )
                  }
                  className="border border-gray-400 px-3 py-1 w-full"
                />
              </div>
            </div>
          </div>
        </div>
        {/* DESDE ACA
        <div className="border-b border-gray-300 pb-4 mb-4">
          <div className="my-4">
            <h2 className="text-xl font-semibold mb-2">Novedades Equipajes</h2>
            <input
              type="text"
              value={novEquipajes}
              onChange={(e) => setNovEquipajes(e.target.value)}
              className="border border-gray-400 px-3 py-1 w-full"
            />
          </div>
          <div className="my-4">
            <h2 className="text-xl font-semibold mb-2">Novedades Inspeccion</h2>
            <input
              type="text"
              value={novInspeccion}
              onChange={(e) => setNovInspeccion(e.target.value)}
              className="border border-gray-400 px-3 py-1 w-full"
            />
          </div>
          <div className="my-4">
            <h2 className="text-xl font-semibold mb-2">Otras Novedades</h2>
            <input
              type="text"
              value={novOtras}
              onChange={(e) => setNovOtras(e.target.value)}
              className="border border-gray-400 px-3 py-1 w-full"
            />
          </div>
        </div>
 */}

        <button
          className="p-2 bg-sky-300 m-8 rounded"
          onClick={handleSavePlanilla}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreatePlanilla;
