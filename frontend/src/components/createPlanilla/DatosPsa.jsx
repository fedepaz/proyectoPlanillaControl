import { useState } from "react";

const DatosPsa = () => {
  const [datosPsa, setDatosPsa] = useState({
    fecha: "",
    responsable: "",
    horaIni: "",
    horaFin: "",
    cant: "",
    tipoControl: "",
    medioTec: "",
    tipoPro: "",
  });
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
              type="text"
              value={datosPsa.fecha}
              onChange={(e) =>
                setDatosPsa({
                  ...datosPsa,
                  fecha: e.target.value,
                })
              }
              className="border border-gray-400 px-3 py-1 w-full"
            />
          </div>

          <div className="flex items-center col-span-1">
            <label htmlFor="responsable" className="text-gray-600 mr-2 w-full">
              Responsable PSA
            </label>
            <input
              id="responsable"
              type="text"
              value={datosPsa.responsable}
              onChange={(e) =>
                setDatosPsa({
                  ...datosPsa,
                  responsable: e.target.value,
                })
              }
              className="border border-gray-400 px-3 py-1 w-full"
            />
          </div>
          <div className="flex items-center col-span-1">
            <label htmlFor="horaIni" className="text-gray-600 mr-2 w-full">
              Hora Inicio
            </label>
            <input
              id="horaIni"
              type="text"
              value={datosPsa.horaIni}
              onChange={(e) =>
                setDatosPsa({
                  ...datosPsa,
                  horaIni: e.target.value,
                })
              }
              className="border border-gray-400 px-3 py-1 w-full"
            />
          </div>

          <div className="flex items-center col-span-1">
            <label htmlFor="horaFin" className="text-gray-600 mr-2 w-full">
              Hora Fin
            </label>
            <input
              id="horaFin"
              type="text"
              value={datosPsa.horaFin}
              onChange={(e) =>
                setDatosPsa({
                  ...datosPsa,
                  horaFin: e.target.value,
                })
              }
              className="border border-gray-400 px-3 py-1 w-full"
            />
          </div>

          <div className="flex items-center col-span-1">
            <label htmlFor="cant" className="text-gray-600 mr-2 w-full">
              Cantidad Personal
            </label>
            <input
              id="cant"
              type="text"
              value={datosPsa.cant}
              onChange={(e) =>
                setDatosPsa({
                  ...datosPsa,
                  cant: e.target.value,
                })
              }
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
                    onChange={(e) =>
                      setDatosPsa({
                        ...datosPsa,
                        tipoControl: (e.target.value = option),
                      })
                    }
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
                    onChange={(e) =>
                      setDatosPsa({
                        ...datosPsa,
                        medioTec: (e.target.value = option),
                      })
                    }
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
                    onChange={(e) =>
                      setDatosPsa({
                        ...datosPsa,
                        tipoPro: (e.target.value = option),
                      })
                    }
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

export default DatosPsa;
