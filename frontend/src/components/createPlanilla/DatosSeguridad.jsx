import { useState } from "react";

const DatosSeguridad = () => {
  const [datosSeguridad, setDatosSeguridad] = useState([
    {
      apellidoSeguridad: "",
      nombreSeguridad: "",
      dniSeguridad: "",
      legajoSeguridad: "",
      empresaSeguridad: "",
    },
  ]);

  return (
    <div className="border-b border-gray-300 pb-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">DATOS SEGURIDAD</h2>
      <div className="my-1 grid grid-cols-5 gap-4">
        <div className="flex flex-col col-span-1">
          <label
            htmlFor="apellidoSeguridad"
            className="text-gray-600 mr-2 w-full text-center"
          >
            Apellido
          </label>
          <input
            id="apellidoSeguridad"
            type="text"
            value={datosSeguridad.apellidoSeguridad}
            onChange={(e) =>
              setDatosSeguridad({
                ...datosSeguridad,
                apellidoSeguridad: e.target.value,
              })
            }
            className="border border-gray-400 px-3 py-1 w-full"
          />
        </div>

        <div className="flex flex-col col-span-1">
          <label
            htmlFor="nombreSeguridad"
            className="text-gray-600 mr-2 w-full text-center"
          >
            Nombre
          </label>
          <input
            id="nombreSeguridad"
            type="text"
            value={datosSeguridad.nombreSeguridad}
            onChange={(e) =>
              setDatosSeguridad({
                ...datosSeguridad,
                nombreSeguridad: e.target.value,
              })
            }
            className="border border-gray-400 px-3 py-1 w-full"
          />
        </div>

        <div className="flex flex-col col-span-1">
          <label
            htmlFor="dniSeguridad"
            className="text-gray-600 mr-2 w-full text-center"
          >
            DNI
          </label>
          <input
            id="dniSeguridad"
            type="text"
            value={datosSeguridad.dniSeguridad}
            onChange={(e) =>
              setDatosSeguridad({
                ...datosSeguridad,
                dniSeguridad: e.target.value,
              })
            }
            className="border border-gray-400 px-3 py-1 w-full"
          />
        </div>

        <div className="flex flex-col col-span-1">
          <label
            htmlFor="legajoSeguridad"
            className="text-gray-600 mr-2 w-full text-center"
          >
            Legajo
          </label>
          <input
            id="legajoSeguridad"
            type="text"
            value={datosSeguridad.legajoSeguridad}
            onChange={(e) =>
              setDatosSeguridad({
                ...datosSeguridad,
                legajoSeguridad: e.target.value,
              })
            }
            className="border border-gray-400 px-3 py-1 w-full"
          />
        </div>

        <div className="flex flex-col col-span-1">
          <label
            htmlFor="empresaSeguridad"
            className="text-gray-600 mr-2 w-full text-center"
          >
            Empresa
          </label>
          <input
            id="empresaSeguridad"
            type="text"
            value={datosSeguridad.empresaSeguridad}
            onChange={(e) =>
              setDatosSeguridad({
                ...datosSeguridad,
                empresaSeguridad: e.target.value,
              })
            }
            className="border border-gray-400 px-3 py-1 w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default DatosSeguridad;
