import PropTypes from "prop-types";

const DatosVehiculos = ({ idPrefix, datosVehiculos, setDatosVehiculos }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosVehiculos((prevDatosVehiculos) => ({
      ...prevDatosVehiculos,
      [name]: value,
    }));
  };

  return (
    <div className="border-b border-gray-300 pb-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">DATOS VEHÍCULOS</h2>
      <div className="my-1 grid grid-cols-2 gap-4">
        <div className="flex items-center col-span-1">
          <label
            htmlFor={`${idPrefix}-tipoVehiculo`}
            className="text-gray-600 mr-2 w-full"
          >
            Tipo Vehículo
          </label>
          <input
            id={`${idPrefix}-tipoVehiculo`}
            name="tipoVehiculo"
            type="text"
            value={datosVehiculos.tipoVehiculo}
            onChange={handleChange}
            className="border border-gray-400 px-3 py-1 w-full"
          />
        </div>
        <div className="flex items-center col-span-1">
          <label
            htmlFor={`${idPrefix}-empresaVehiculo`}
            className="text-gray-600 mr-2 w-full"
          >
            Empresa
          </label>
          <input
            id={`${idPrefix}-empresaVehiculo`}
            name="empresaVehiculo"
            type="text"
            value={datosVehiculos.empresaVehiculo}
            onChange={handleChange}
            className="border border-gray-400 px-3 py-1 w-full"
          />
        </div>
        <div className="flex items-center col-span-1">
          <label
            htmlFor={`${idPrefix}-numInterno`}
            className="text-gray-600 mr-2 w-full"
          >
            Nº Interno
          </label>
          <input
            id={`${idPrefix}-numInterno`}
            name="numInterno"
            type="text"
            value={datosVehiculos.numInterno}
            onChange={handleChange}
            className="border border-gray-400 px-3 py-1 w-full"
          />
        </div>
        <div className="flex items-center col-span-1">
          <label
            htmlFor={`${idPrefix}-operadorVehiculo`}
            className="text-gray-600 mr-2 w-full"
          >
            Operador
          </label>
          <input
            id={`${idPrefix}-operadorVehiculo`}
            name="operadorVehiculo"
            type="text"
            value={datosVehiculos.operadorVehiculo}
            onChange={handleChange}
            className="border border-gray-400 px-3 py-1 w-full"
          />
        </div>
      </div>
      <div className="flex items-center col-span-1 my-4">
        <label
          htmlFor={`${idPrefix}-observacionesVehiculo`}
          className="text-gray-600 mr-2"
        >
          Observaciones
        </label>
        <input
          id={`${idPrefix}-observacionesVehiculo`}
          name="observacionesVehiculo"
          type="text"
          value={datosVehiculos.observacionesVehiculo}
          onChange={handleChange}
          className="border border-gray-400 px-3 py-1 w-full"
        />
      </div>
    </div>
  );
};
DatosVehiculos.propTypes = {
  idPrefix: PropTypes.string.isRequired,
  datosVehiculos: PropTypes.shape({
    tipoVehiculo: PropTypes.string,
    empresaVehiculo: PropTypes.string,
    numInterno: PropTypes.string,
    operadorVehiculo: PropTypes.string,
    observacionesVehiculo: PropTypes.string,
  }).isRequired,
  setDatosVehiculos: PropTypes.func.isRequired,
};

export default DatosVehiculos;
