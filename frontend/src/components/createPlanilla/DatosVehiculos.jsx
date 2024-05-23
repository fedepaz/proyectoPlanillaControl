import PropTypes from "prop-types";

const DatosVehiculos = ({ datosVehiculos, setDatosVehiculos }) => {
  const handleChange = (id, e) => {
    const { name, value } = e.target;
    setDatosVehiculos((prevDatosVehiculos) =>
      prevDatosVehiculos.map((item) =>
        item.id === id ? { ...item, [name]: value } : item
      )
    );
  };
  const fields = [
    { label: "Tipo Vehículo", name: "tipoVehiculo" },
    { label: "Empresa", name: "empresaVehiculo" },
    { label: "Nº Interno", name: "numInterno" },
    { label: "Operador", name: "operadorVehiculo" },
  ];
  const obsFields = [{ label: "Observaciones", name: "observacionesVehiculo" }];
  return (
    <div className="p-4">
      <div className="border-b border-gray-300 pb-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">
          DATOS DE LOS VEHICULOS CONTROLADOS
        </h2>
        {datosVehiculos.map((vehiculo) => (
          <div key={vehiculo.id}>
            <h3 className="text-gray-600 mr-2 w-full text-center">
              DATOS DEL VEHICULO {vehiculo.id}
            </h3>
            <div className="my-1 grid grid-cols-2 gap-4">
              {fields.map((field) => (
                <div className="flex items-center col-span-1" key={field.name}>
                  <label
                    htmlFor={`${vehiculo.id}-${field.name}`}
                    className="text-gray-600 mr-2 w-full"
                  >
                    {field.label}
                  </label>
                  <input
                    id={`${vehiculo.id}-${field.name}`}
                    name={field.name}
                    type="text"
                    value={vehiculo[field.name] || ""}
                    onChange={(e) => handleChange(vehiculo.id, e)}
                    className="border border-gray-400 px-3 py-1 w-full"
                  />
                </div>
              ))}
            </div>
            {obsFields.map((field) => (
              <div
                className="flex items-center col-span-1 my-4"
                key={field.name}
              >
                <label
                  htmlFor={`${vehiculo.id}-${field.name}`}
                  className="text-gray-600 mr-2"
                >
                  {field.label}
                </label>
                <input
                  id={`${vehiculo.id}-${field.name}`}
                  name={field.name}
                  type="text"
                  value={vehiculo[field.name] || ""}
                  onChange={(e) => handleChange(vehiculo.id, e)}
                  className="border border-gray-400 px-3 py-1 w-full"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

DatosVehiculos.propTypes = {
  datosVehiculos: PropTypes.array.isRequired,
  setDatosVehiculos: PropTypes.func.isRequired,
};

export default DatosVehiculos;
