import { useState } from "react";

const DatosVehiculos = () => {
  const [datosVehiculos, setDatosVehiculos] = useState({
    tipoVehiculo: "",
    empresaVehiculo: "",
    numInterno: "",
    operadorVehiculo: "",
    observacionesVehiculo: "",
  });

  return (
    <div className="border-b border-gray-300 pb-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">DATOS VEHÍCULOS</h2>
      <div className="my-1 grid grid-cols-2 gap-4">
        <div className="flex items-center col-span-1">
          <label htmlFor="tipoVehiculo" className="text-gray-600 mr-2 w-full">
            Tipo Vehículo
          </label>
          <input
            id="tipoVehiculo"
            type="text"
            value={datosVehiculos.tipoVehiculo}
            onChange={(e) =>
              setDatosVehiculos({
                ...datosVehiculos,
                tipoVehiculo: e.target.value,
              })
            }
            className="border border-gray-400 px-3 py-1 w-full"
          />
        </div>
        <div className="flex items-center col-span-1">
          <label
            htmlFor="empresaVehiculo"
            className="text-gray-600 mr-2 w-full"
          >
            Empresa
          </label>
          <input
            id="empresaVehiculo"
            type="text"
            value={datosVehiculos.empresaVehiculo}
            onChange={(e) =>
              setDatosVehiculos({
                ...datosVehiculos,
                empresaVehiculo: e.target.value,
              })
            }
            className="border border-gray-400 px-3 py-1 w-full"
          />
        </div>
        <div className="flex items-center col-span-1">
          <label htmlFor="numInterno" className="text-gray-600 mr-2 w-full">
            Nº Interno
          </label>
          <input
            id="numInterno"
            type="text"
            value={datosVehiculos.numInterno}
            onChange={(e) =>
              setDatosVehiculos({
                ...datosVehiculos,
                numInterno: e.target.value,
              })
            }
            className="border border-gray-400 px-3 py-1 w-full"
          />
        </div>
        <div className="flex items-center col-span-1">
          <label
            htmlFor="operadorVehiculo"
            className="text-gray-600 mr-2 w-full"
          >
            Operador
          </label>
          <input
            id="operadorVehiculo"
            type="text"
            value={datosVehiculos.operadorVehiculo}
            onChange={(e) =>
              setDatosVehiculos({
                ...datosVehiculos,
                operadorVehiculo: e.target.value,
              })
            }
            className="border border-gray-400 px-3 py-1 w-full"
          />
        </div>
      </div>
      <div className="flex items-center col-span-1 my-4">
        <label htmlFor="observacionesVehiculo" className="text-gray-600 mr-2">
          Observaciones
        </label>
        <input
          id="observacionesVehiculo"
          type="text"
          value={datosVehiculos.observacionesVehiculo}
          onChange={(e) =>
            setDatosVehiculos({
              ...datosVehiculos,
              observacionesVehiculo: e.target.value,
            })
          }
          className="border border-gray-400 px-3 py-1 w-full"
        />
      </div>
    </div>
  );
};

export default DatosVehiculos;
