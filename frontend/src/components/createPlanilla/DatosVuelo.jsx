import PropTypes from "prop-types";

const DatosVuelo = ({ datosVuelo, setDatosVuelo }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosVuelo((prevDatosVuelo) => ({
      ...prevDatosVuelo,
      [name]: value,
    }));
  };
  const handleCheckboxChange = (name, option) => {
    setDatosVuelo((prevDatosVuelo) => ({
      ...prevDatosVuelo,
      [name]: option,
    }));
  };

  return (
    <div className="p-4">
      <div className="border-b border-gray-300 pb-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">DATOS DEL VUELO</h2>
        <div className="my-1 grid grid-cols-2 gap-4">
          <div className="flex items-center col-span-1">
            <label htmlFor="aerolinea" className="text-gray-600 mr-2 w-full">
              Empresa{" "}
            </label>
            <input
              id="aerolinea"
              name="aerolinea"
              type="text"
              value={datosVuelo.aerolinea}
              onChange={handleChange}
              className="border border-gray-400 px-3 py-1 w-full"
            />
          </div>

          <div className="flex items-center col-span-1">
            <label htmlFor="codVuelo" className="text-gray-600 mr-2 w-full">
              Código de Vuelo
            </label>
            <input
              id="codVuelo"
              name="codVuelo"
              type="text"
              value={datosVuelo.codVuelo}
              onChange={handleChange}
              className="border border-gray-400 px-3 py-1 w-full"
            />
          </div>
          <div className="flex items-center col-span-1">
            <label htmlFor="origen" className="text-gray-600 mr-2 w-full">
              Origen{" "}
            </label>
            <input
              id="origen"
              name="origen"
              type="text"
              value={datosVuelo.origen}
              onChange={handleChange}
              className="border border-gray-400 px-3 py-1 w-full"
            />
          </div>

          <div className="flex items-center col-span-1">
            <label htmlFor="destino" className="text-gray-600 mr-2 w-full">
              Destino{" "}
            </label>
            <input
              id="destino"
              name="destino"
              type="text"
              value={datosVuelo.destino}
              onChange={handleChange}
              className="border border-gray-400 px-3 py-1 w-full"
            />
          </div>

          <div className="flex items-center col-span-1">
            <label htmlFor="horaArribo" className="text-gray-600 mr-2 w-full">
              Hora Arribo{" "}
            </label>
            <input
              id="horaArribo"
              name="horaArribo"
              type="text"
              value={datosVuelo.horaArribo}
              onChange={handleChange}
              className="border border-gray-400 px-3 py-1 w-full"
            />
          </div>

          <div className="flex items-center col-span-1">
            <label htmlFor="horaPartida" className="text-gray-600 mr-2 w-full">
              Hora de Partida{" "}
            </label>
            <input
              id="horaPartida"
              name="horaPartida"
              type="text"
              value={datosVuelo.horaPartida}
              onChange={handleChange}
              className="border border-gray-400 px-3 py-1 w-full"
            />
          </div>

          <div className="flex items-center col-span-1">
            <p htmlFor="demora" className="text-gray-600 mr-2 w-full">
              Con demora{" "}
            </p>
            <div className="flex flex-row gap-2 bg-slate-400  px-3 py-1 w-full ">
              {/* Checkbox options */}
              {["Si", "No"].map((option) => (
                <label key={option}>
                  <input
                    id={option}
                    type="checkbox"
                    checked={datosVuelo.demora === option}
                    onChange={() => handleCheckboxChange("demora", option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center col-span-1">
            <p htmlFor="tipo" className="text-gray-600 mr-2 w-full">
              Tipo de Vuelo{" "}
            </p>
            <div className="flex flex-row gap-2 bg-slate-400  px-3 py-1 w-full ">
              {["Arribo", "Partida"].map((option) => (
                <label key={option}>
                  <input
                    id={option}
                    type="checkbox"
                    checked={datosVuelo.tipo === option}
                    onChange={() => handleCheckboxChange("tipo", option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center col-span-1">
            <label
              htmlFor="matriculaAeronave"
              className="text-gray-600 mr-2 w-full"
            >
              Matrícula Aeronave
            </label>
            <input
              id="matriculaAeronave"
              name="matriculaAeronave"
              type="text"
              value={datosVuelo.matriculaAeronave}
              onChange={handleChange}
              className="border border-gray-400 px-3 py-1 w-full"
            />
          </div>

          <div className="flex items-center col-span-1">
            <label htmlFor="posicion" className="text-gray-600 mr-2 w-full">
              Posición Plataforma
            </label>
            <input
              id="posicion"
              name="posicion"
              type="text"
              value={datosVuelo.posicion}
              onChange={handleChange}
              className="border border-gray-400 px-3 py-1 w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
DatosVuelo.propTypes = {
  datosVuelo: PropTypes.shape({
    aerolinea: PropTypes.string,
    codVuelo: PropTypes.string,
    origen: PropTypes.string,
    destino: PropTypes.string,
    horaArribo: PropTypes.string,
    horaPartida: PropTypes.string,
    demora: PropTypes.string,
    tipo: PropTypes.string,
    matriculaAeronave: PropTypes.string,
    posicion: PropTypes.string,
  }).isRequired,
  setDatosVuelo: PropTypes.func.isRequired,
};

export default DatosVuelo;
