import PropTypes from "prop-types";

const DatosTerrestre = ({ idPrefix, datosTerrestre, setDatosTerrestre }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosTerrestre((prevDatosTerrestre) => ({
      ...prevDatosTerrestre,
      [name]: value,
    }));
  };
  const handleCheckboxChange = (name, option) => {
    setDatosTerrestre((prevDatosTerrestre) => ({
      ...prevDatosTerrestre,
      [name]: option,
    }));
  };
  return (
    <div className="border-b border-gray-300 pb-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">
        DATOS DEL PERSONAL DE APOYO TERRESTRE EMPRESA
      </h2>
      <div className="my-1 grid grid-cols-6 gap-4">
        <div className="flex flex-col col-span-1">
          <label
            htmlFor={`${idPrefix}-apellidoTerrestre`}
            className="text-gray-600 mr-2 w-full text-center"
          >
            Apellido
          </label>
          <input
            id={`${idPrefix}-apellidoTerrestre`}
            name="apellidoTerrestre"
            type="text"
            value={datosTerrestre.apellidoTerrestre}
            onChange={handleChange}
            className="border border-gray-400 px-3 py-1 w-full"
          />
        </div>
        <div className="flex flex-col col-span-1">
          <label
            htmlFor={`${idPrefix}-nombreTerrestre`}
            className="text-gray-600 mr-2 w-full text-center"
          >
            Nombre
          </label>
          <input
            id={`${idPrefix}-nombreTerrestre`}
            name="nombreTerrestre"
            type="text"
            value={datosTerrestre.nombreTerrestre}
            onChange={handleChange}
            className="border border-gray-400 px-3 py-1 w-full"
          />
        </div>
        <div className="flex flex-col col-span-1">
          <label
            htmlFor={`${idPrefix}-dniTerrestre`}
            className="text-gray-600 mr-2 w-full text-center"
          >
            DNI
          </label>
          <input
            id={`${idPrefix}-dniTerrestre`}
            name="dniTerrestre"
            type="text"
            value={datosTerrestre.dniTerrestre}
            onChange={handleChange}
            className="border border-gray-400 px-3 py-1 w-full"
          />
        </div>
        <div className="flex flex-col col-span-1">
          <label
            htmlFor={`${idPrefix}-legajoTerrestre`}
            className="text-gray-600 mr-2 w-full text-center"
          >
            Legajo
          </label>
          <input
            id={`${idPrefix}-legajoTerrestre`}
            name="legajoTerrestre"
            type="text"
            value={datosTerrestre.legajoTerrestre}
            onChange={handleChange}
            className="border border-gray-400 px-3 py-1 w-full"
          />
        </div>
        <div className="flex flex-col col-span-1">
          <p
            htmlFor={`${idPrefix}-funcion`}
            className="text-gray-600 mr-2 w-full text-center"
          >
            Funcion
          </p>
          <div className="flex flex-wrap gap-2 bg-slate-400  px-3 py-1 w-full ">
            {/* Checkbox options */}
            {["Sup", "Bod", "Cin", "Tra", "Otr"].map((option) => (
              <label key={option}>
                <input
                  id={`${idPrefix}-${option}`}
                  type="checkbox"
                  checked={datosTerrestre.funcion === option}
                  onChange={() => handleCheckboxChange("funcion", option)}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
        <div className="flex flex-col col-span-1">
          <label
            htmlFor={`${idPrefix}-grupo`}
            className="text-gray-600 mr-2 w-full text-center"
          >
            Grupo
          </label>
          <input
            id={`${idPrefix}-grupo`}
            name="grupo"
            type="text"
            value={datosTerrestre.grupo}
            onChange={handleChange}
            className="border border-gray-400 px-3 py-1 w-full"
          />
        </div>
      </div>
    </div>
  );
};
DatosTerrestre.propTypes = {
  idPrefix: PropTypes.string.isRequired,
  datosTerrestre: PropTypes.shape({
    apellidoTerrestre: PropTypes.string,
    nombreTerrestre: PropTypes.string,
    dniTerrestre: PropTypes.string,
    legajoTerrestre: PropTypes.string,
    funcion: PropTypes.string,
    grupo: PropTypes.string,
  }).isRequired,
  setDatosTerrestre: PropTypes.func.isRequired,
};

export default DatosTerrestre;
