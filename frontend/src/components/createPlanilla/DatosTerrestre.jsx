import PropTypes from "prop-types";

const DatosTerrestre = ({ datosTerrestre, setDatosTerrestre }) => {
  const handleChange = (id, e) => {
    const { name, value } = e.target;
    setDatosTerrestre((prevDatosTerrestre) =>
      prevDatosTerrestre.map((item) =>
        item.id === id ? { ...item, [name]: value } : item
      )
    );
  };

  const handleCheckboxChange = (id, name, option) => {
    setDatosTerrestre((prevDatosTerrestre) =>
      prevDatosTerrestre.map((item) =>
        item.id === id ? { ...item, [name]: option } : item
      )
    );
  };

  // Field configurations
  const fields = [
    { label: "Apellido", name: "apellidoTerrestre" },
    { label: "Nombre", name: "nombreTerrestre" },
    { label: "DNI", name: "dniTerrestre" },
    { label: "Legajo", name: "legajoTerrestre" },
    { label: "Grupo", name: "grupo" },
  ];

  return (
    <div className="p-4">
      <div className="border-b border-gray-300 pb-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">
          DATOS DEL PERSONAL DE APOYO TERRESTRE EMPRESA
        </h2>

        {datosTerrestre.map((terrestre) => (
          <div key={terrestre.id}>
            <h3 className="text-gray-600 mr-2 w-full text-center">
              DATOS DEL PERSONAL {terrestre.id}
            </h3>
            <div className="my-1 grid grid-cols-6 gap-4">
              {fields.map((field) => (
                <div className="flex flex-col col-span-1" key={field.name}>
                  <label
                    htmlFor={`${terrestre.id}-${field.name}`}
                    className="text-gray-600 mr-2 w-full text-center"
                  >
                    {field.label}
                  </label>
                  <input
                    id={`${terrestre.id}-${field.name}`}
                    name={field.name}
                    type="text"
                    value={terrestre[field.name] || ""}
                    onChange={(e) => handleChange(terrestre.id, e)}
                    className="border border-gray-400 px-3 py-1 w-full"
                  />
                </div>
              ))}
              <div className="flex flex-col col-span-1">
                <p
                  htmlFor={`${terrestre.id}-funcion`}
                  className="text-gray-600 mr-2 w-full text-center"
                >
                  Funcion
                </p>
                <div className="flex flex-wrap gap-2 bg-slate-400 px-3 py-1 w-full">
                  {["Sup", "Bod", "Cin", "Tra", "Otr"].map((option) => (
                    <label key={option}>
                      <input
                        id={`${terrestre.id}-${option}`}
                        type="checkbox"
                        checked={terrestre.funcion === option}
                        onChange={() =>
                          handleCheckboxChange(terrestre.id, "funcion", option)
                        }
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

DatosTerrestre.propTypes = {
  datosTerrestre: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      apellidoTerrestre: PropTypes.string,
      nombreTerrestre: PropTypes.string,
      dniTerrestre: PropTypes.string,
      legajoTerrestre: PropTypes.string,
      funcion: PropTypes.string,
      grupo: PropTypes.string,
    })
  ).isRequired,
  setDatosTerrestre: PropTypes.func.isRequired,
};

export default DatosTerrestre;
