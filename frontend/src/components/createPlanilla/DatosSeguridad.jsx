import PropTypes from "prop-types";

const DatosSeguridad = ({ idPrefix, datosSeguridad, setDatosSeguridad }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosSeguridad((prevDatosSeguridad) => ({
      ...prevDatosSeguridad,
      [name]: value,
    }));
  };

  return (
    <div className="border-b border-gray-300 pb-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">DATOS SEGURIDAD</h2>
      <div className="my-1 grid grid-cols-5 gap-4">
        <div className="flex flex-col col-span-1">
          <label
            htmlFor={`${idPrefix}-apellidoSeguridad`}
            className="text-gray-600 mr-2 w-full text-center"
          >
            Apellido
          </label>
          <input
            id={`${idPrefix}-apellidoSeguridad`}
            name="apellidoSeguridad"
            type="text"
            value={datosSeguridad.apellidoSeguridad}
            onChange={handleChange}
            className="border border-gray-400 px-3 py-1 w-full"
          />
        </div>

        <div className="flex flex-col col-span-1">
          <label
            htmlFor={`${idPrefix}-nombreSeguridad`}
            className="text-gray-600 mr-2 w-full text-center"
          >
            Nombre
          </label>
          <input
            id={`${idPrefix}-nombreSeguridad`}
            name="nombreSeguridad"
            type="text"
            value={datosSeguridad.nombreSeguridad}
            onChange={handleChange}
            className="border border-gray-400 px-3 py-1 w-full"
          />
        </div>

        <div className="flex flex-col col-span-1">
          <label
            htmlFor={`${idPrefix}-dniSeguridad`}
            className="text-gray-600 mr-2 w-full text-center"
          >
            DNI
          </label>
          <input
            id={`${idPrefix}-dniSeguridad`}
            name="dniSeguridad"
            type="text"
            value={datosSeguridad.dniSeguridad}
            onChange={handleChange}
            className="border border-gray-400 px-3 py-1 w-full"
          />
        </div>

        <div className="flex flex-col col-span-1">
          <label
            htmlFor={`${idPrefix}-legajoSeguridad`}
            className="text-gray-600 mr-2 w-full text-center"
          >
            Legajo
          </label>
          <input
            id={`${idPrefix}-legajoSeguridad`}
            name="legajoSeguridad"
            type="text"
            value={datosSeguridad.legajoSeguridad}
            onChange={handleChange}
            className="border border-gray-400 px-3 py-1 w-full"
          />
        </div>

        <div className="flex flex-col col-span-1">
          <label
            htmlFor={`${idPrefix}-empresaSeguridad`}
            className="text-gray-600 mr-2 w-full text-center"
          >
            Empresa
          </label>
          <input
            id={`${idPrefix}-empresaSeguridad`}
            name="empresaSeguridad"
            type="text"
            value={datosSeguridad.empresaSeguridad}
            onChange={handleChange}
            className="border border-gray-400 px-3 py-1 w-full"
          />
        </div>
      </div>
    </div>
  );
};
DatosSeguridad.propTypes = {
  idPrefix: PropTypes.string.isRequired,
  datosSeguridad: PropTypes.shape({
    apellidoSeguridad: PropTypes.string,
    nombreSeguridad: PropTypes.string,
    dniSeguridad: PropTypes.string,
    legajoSeguridad: PropTypes.string,
    empresaSeguridad: PropTypes.string,
  }).isRequired,
  setDatosSeguridad: PropTypes.func.isRequired,
};

export default DatosSeguridad;
