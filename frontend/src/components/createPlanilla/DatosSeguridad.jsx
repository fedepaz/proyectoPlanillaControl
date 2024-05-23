import PropTypes from "prop-types";

const DatosSeguridad = ({ datosSeguridad, setDatosSeguridad }) => {
  const handleChange = (id, e) => {
    const { name, value } = e.target;
    setDatosSeguridad((prevDatosSeguridad) =>
      prevDatosSeguridad.map((item) =>
        item.id === id ? { ...item, [name]: value } : item
      )
    );
  };
  const fields = [
    { label: "Apellido", name: "apellidoSeguridad" },
    { label: "Nombre", name: "nombreSeguridad" },
    { label: "DNI", name: "dniSeguridad" },
    { label: "Legajo", name: "legajoSeguridad" },
    { label: "Empresa", name: "empresaSeguridad" },
  ];
  return (
    <div className="p-4">
      <div className="border-b border-gray-300 pb-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">
          DATOS DEL PERSONAL DE SEGURIDAD:{" "}
        </h2>

        {datosSeguridad.map((seguridad) => (
          <div key={seguridad.id}>
            <h3 className="text-gray-600 mr-2 w-full text-center">
              DATOS DEL PERSONAL {seguridad.id}
            </h3>
            <div className="my-1 grid grid-cols-5 gap-4">
              {fields.map((field) => (
                <div className="flex flex-col col-span-1" key={field.name}>
                  <label
                    htmlFor={`${seguridad.id}-${field.name}`}
                    className="text-gray-600 mr-2 w-full text-center"
                  >
                    {field.label}
                  </label>
                  <input
                    id={`${seguridad.id}-${field.name}`}
                    name={field.name}
                    type="text"
                    value={seguridad[field.name] || ""}
                    onChange={(e) => handleChange(seguridad.id, e)}
                    className="border border-gray-400 px-3 py-1 w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

DatosSeguridad.propTypes = {
  datosSeguridad: PropTypes.array.isRequired,
  setDatosSeguridad: PropTypes.func.isRequired,
};

export default DatosSeguridad;
