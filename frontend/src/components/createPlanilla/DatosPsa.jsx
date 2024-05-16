import PropTypes from "prop-types";

const DatosPsa = ({ datosPsa, setDatosPsa }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosPsa((prevDatosPsa) => ({
      ...prevDatosPsa,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (name, option) => {
    setDatosPsa((prevDatosPsa) => ({
      ...prevDatosPsa,
      [name]: option,
    }));
  };
  return (
    <div className="p-4">
      <div className="border-b border-gray-300 pb-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">DATOS DEL CONTROL PSA</h2>
        <div className="my-1 grid grid-cols-2 gap-4">
          <div className="flex items-center col-span-1">
            <label htmlFor="fecha" className="text-gray-600 mr-2 w-full">
              Fecha de Control
            </label>
            <input
              id="fecha"
              name="fecha"
              type="text"
              value={datosPsa.fecha}
              onChange={handleChange}
              className="border border-gray-400 px-3 py-1 w-full"
            />
          </div>

          <div className="flex items-center col-span-1">
            <label htmlFor="responsable" className="text-gray-600 mr-2 w-full">
              Responsable PSA
            </label>
            <input
              id="responsable"
              name="responsable"
              type="text"
              value={datosPsa.responsable}
              onChange={handleChange}
              className="border border-gray-400 px-3 py-1 w-full"
            />
          </div>
          <div className="flex items-center col-span-1">
            <label htmlFor="horaIni" className="text-gray-600 mr-2 w-full">
              Hora Inicio
            </label>
            <input
              id="horaIni"
              name="horaIni"
              type="text"
              value={datosPsa.horaIni}
              onChange={handleChange}
              className="border border-gray-400 px-3 py-1 w-full"
            />
          </div>

          <div className="flex items-center col-span-1">
            <label htmlFor="horaFin" className="text-gray-600 mr-2 w-full">
              Hora Fin
            </label>
            <input
              id="horaFin"
              name="horaFin"
              type="text"
              value={datosPsa.horaFin}
              onChange={handleChange}
              className="border border-gray-400 px-3 py-1 w-full"
            />
          </div>

          <div className="flex items-center col-span-1">
            <label htmlFor="cant" className="text-gray-600 mr-2 w-full">
              Cantidad Personal
            </label>
            <input
              id="cant"
              name="cant"
              type="text"
              value={datosPsa.cant}
              onChange={handleChange}
              className="border border-gray-400 px-3 py-1 w-full"
            />
          </div>

          <div className="flex items-center col-span-1">
            <p htmlFor="tipoControl" className="text-gray-600 mr-2 w-full">
              Tipo de Controles{" "}
            </p>
            <div className="flex flex-row gap-2 bg-slate-400  px-3 py-1 w-full ">
              {/* Checkbox options */}
              {["Personas", "Equipos", "Cargas"].map((option) => (
                <label key={option}>
                  <input
                    id={option}
                    type="checkbox"
                    checked={datosPsa.tipoControl === option}
                    onChange={() => handleCheckboxChange("tipoControl", option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center col-span-1">
            <p htmlFor="medioTec" className="text-gray-600 mr-2 w-full">
              Medios Técnicos{" "}
            </p>
            <div className="flex flex-row gap-2 bg-slate-400  px-3 py-1 w-full ">
              {/* Checkbox options */}
              {["Móvil", "Paletas", "Otros"].map((option) => (
                <label key={option}>
                  <input
                    id={option}
                    type="checkbox"
                    checked={datosPsa.medioTec === option}
                    onChange={() => handleCheckboxChange("medioTec", option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center col-span-1">
            <p htmlFor="tipoPro" className="text-gray-600 mr-2 w-full">
              Tipo de Procedimiento
            </p>
            <div className="flex flex-row gap-2 bg-slate-400  px-3 py-1 w-full ">
              {" "}
              {/* Checkbox options */}
              {["OSVC", "Aleatorio", "Rutina"].map((option) => (
                <label key={option}>
                  <input
                    id={option}
                    type="checkbox"
                    checked={datosPsa.tipoPro === option}
                    onChange={() => handleCheckboxChange("tipoPro", option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
DatosPsa.propTypes = {
  datosPsa: PropTypes.shape({
    fecha: PropTypes.string,
    responsable: PropTypes.string,
    horaIni: PropTypes.string,
    horaFin: PropTypes.string,
    cant: PropTypes.string,
    tipoControl: PropTypes.string,
    medioTec: PropTypes.string,
    tipoPro: PropTypes.string,
  }).isRequired,
  setDatosPsa: PropTypes.func.isRequired,
};

export default DatosPsa;
