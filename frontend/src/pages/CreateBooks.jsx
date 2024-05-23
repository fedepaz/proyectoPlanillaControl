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

  const [errors, setErrors] = useState({
    fecha: "",
    responsable: "",
    horaIni: "",
    horaFin: "",
    cant: "",
  });

  const validateInput = (name, value) => {
    let error = "";
    switch (name) {
      case "fecha":
        if (!value) error = "Fecha de Control es obligatoria.";
        break;
      case "responsable":
        if (!value) error = "Responsable PSA es obligatorio.";
        break;
      case "horaIni":
        if (!value) error = "Hora Inicio es obligatoria.";
        break;
      case "horaFin":
        if (!value) error = "Hora Fin es obligatoria.";
        break;
      case "cant":
        if (!value) error = "Cantidad Personal es obligatoria.";
        else if (isNaN(value)) error = "Cantidad Personal debe ser un número.";
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

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
      id: 1,
      apellidoTerrestre: "",
      nombreTerrestre: "",
      dniTerrestre: "",
      legajoTerrestre: "",
      funcion: "",
      grupo: "",
    },
    {
      id: 2,
      apellidoTerrestre: "",
      nombreTerrestre: "",
      dniTerrestre: "",
      legajoTerrestre: "",
      funcion: "",
      grupo: "",
    },
    {
      id: 3,
      apellidoTerrestre: "",
      nombreTerrestre: "",
      dniTerrestre: "",
      legajoTerrestre: "",
      funcion: "",
      grupo: "",
    },
    {
      id: 4,
      apellidoTerrestre: "",
      nombreTerrestre: "",
      dniTerrestre: "",
      legajoTerrestre: "",
      funcion: "",
      grupo: "",
    },
    {
      id: 5,
      apellidoTerrestre: "",
      nombreTerrestre: "",
      dniTerrestre: "",
      legajoTerrestre: "",
      funcion: "",
      grupo: "",
    },
  ]);

  const [datosSeguridad, setDatosSeguridad] = useState([
    {
      id: 1,
      apellidoSeguridad: "",
      nombreSeguridad: "",
      dniSeguridad: "",
      legajoSeguridad: "",
      empresaSeguridad: "",
    },
    {
      id: 2,
      apellidoSeguridad: "",
      nombreSeguridad: "",
      dniSeguridad: "",
      legajoSeguridad: "",
      empresaSeguridad: "",
    },
    {
      id: 3,
      apellidoSeguridad: "",
      nombreSeguridad: "",
      dniSeguridad: "",
      legajoSeguridad: "",
      empresaSeguridad: "",
    },
    {
      id: 4,
      apellidoSeguridad: "",
      nombreSeguridad: "",
      dniSeguridad: "",
      legajoSeguridad: "",
      empresaSeguridad: "",
    },
  ]);

  const [datosVehiculos, setDatosVehiculos] = useState([
    {
      id: 1,
      tipoVehiculo: "",
      empresaVehiculo: "",
      numInterno: "",
      operadorVehiculo: "",
      observacionesVehiculo: "",
    },
    {
      id: 2,
      tipoVehiculo: "",
      empresaVehiculo: "",
      numInterno: "",
      operadorVehiculo: "",
      observacionesVehiculo: "",
    },
  ]);
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
    Object.keys(datosPsa).forEach((key) => validateInput(key, datosPsa[key]));

    // If there are any errors, do not proceed
    if (Object.values(errors).some((error) => error !== "")) {
      enqueueSnackbar("Faltan datos", { variant: "error" });
      return;
    }

    setLoading(true);
    axios
      .post("http://localhost:5555/books", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Planilla creada", { variant: "success" });
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
        <DatosPsa
          datosPsa={datosPsa}
          setDatosPsa={setDatosPsa}
          errors={errors}
          validateInput={validateInput}
        />
        {/* datosVuelo section */}
        <DatosVuelo datosVuelo={datosVuelo} setDatosVuelo={setDatosVuelo} />
        <DatosTerrestre
          datosTerrestre={datosTerrestre}
          setDatosTerrestre={setDatosTerrestre}
        />
        <DatosSeguridad
          datosSeguridad={datosSeguridad}
          setDatosSeguridad={setDatosSeguridad}
        />
        <DatosVehiculos
          datosVehiculos={datosVehiculos}
          setDatosVehiculos={setDatosVehiculos}
        />
        <NovEquipajes
          novEquipajes={novEquipajes}
          setNovEquipajes={setNovEquipajes}
        />
        <NovInspeccion
          novInspeccion={novInspeccion}
          setNovInspeccion={setNovInspeccion}
        />
        <NovOtras novOtras={novOtras} setNovOtras={setNovOtras} />

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
