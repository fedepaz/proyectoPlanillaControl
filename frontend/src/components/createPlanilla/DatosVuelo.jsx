import { useState } from "react";

const DatosVuelo = () => {
  const [datosVuelo, setDatosVuelo] = useState({
    aerolinea: "",
    codVuelo: "",
    origen: "",
    destino: "",
    horaArribo: "",
    horaPartida: "",
    demora: "",
    tipo: "",
    matriculaAeronave: "",
    posicion: "",
  });
  return (
    <div className="p-4">
      <div className="border-b border-gray-300 pb-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">DATOS DEL VUELO</h2>
        <div className="my-1 grid grid-cols-2 gap-4">
          <div className="flex items-center col-span-1">
            <label htmlFor="aerolinea" className="text-gray-600 mr-2 w-full">
              Empresa{" "}
            </label>
            <input
              id="aerolinea"
              type="text"
              value={datosVuelo.aerolinea}
              onChange={(e) =>
                setDatosVuelo({
                  ...datosVuelo,
                  aerolinea: e.target.value,
                })
              }
              className="border border-gray-400 px-3 py-1 w-full"
            />
          </div>

          <div className="flex items-center col-span-1">
            <label htmlFor="codVuelo" className="text-gray-600 mr-2 w-full">
              Código de Vuelo
            </label>
            <input
              id="codVuelo"
              type="text"
              value={datosVuelo.codVuelo}
              onChange={(e) =>
                setDatosVuelo({
                  ...datosVuelo,
                  codVuelo: e.target.value,
                })
              }
              className="border border-gray-400 px-3 py-1 w-full"
            />
          </div>
          <div className="flex items-center col-span-1">
            <label htmlFor="origen" className="text-gray-600 mr-2 w-full">
              Origen{" "}
            </label>
            <input
              id="origen"
              type="text"
              value={datosVuelo.origen}
              onChange={(e) =>
                setDatosVuelo({
                  ...datosVuelo,
                  origen: e.target.value,
                })
              }
              className="border border-gray-400 px-3 py-1 w-full"
            />
          </div>

          <div className="flex items-center col-span-1">
            <label htmlFor="destino" className="text-gray-600 mr-2 w-full">
              Destino{" "}
            </label>
            <input
              id="destino"
              type="text"
              value={datosVuelo.destino}
              onChange={(e) =>
                setDatosVuelo({
                  ...datosVuelo,
                  destino: e.target.value,
                })
              }
              className="border border-gray-400 px-3 py-1 w-full"
            />
          </div>

          <div className="flex items-center col-span-1">
            <label htmlFor="horaArribo" className="text-gray-600 mr-2 w-full">
              Hora Arribo{" "}
            </label>
            <input
              id="horaArribo"
              type="text"
              value={datosVuelo.horaArribo}
              onChange={(e) =>
                setDatosVuelo({
                  ...datosVuelo,
                  horaArribo: e.target.value,
                })
              }
              className="border border-gray-400 px-3 py-1 w-full"
            />
          </div>

          <div className="flex items-center col-span-1">
            <label htmlFor="horaPartida" className="text-gray-600 mr-2 w-full">
              Hora de Partida{" "}
            </label>
            <input
              id="horaPartida"
              type="text"
              value={datosVuelo.horaPartida}
              onChange={(e) =>
                setDatosVuelo({
                  ...datosVuelo,
                  horaPartida: e.target.value,
                })
              }
              className="border border-gray-400 px-3 py-1 w-full"
            />
          </div>

          <div className="flex items-center col-span-1">
            <p htmlFor="demora" className="text-gray-600 mr-2 w-full">
              Con demora{" "}
            </p>
            <div className="flex flex-row gap-2 bg-slate-400  px-3 py-1 w-full ">
              {/* Checkbox options */}
              {["Si", "No"].map((option) => (
                <label key={option}>
                  <input
                    id={option}
                    type="checkbox"
                    checked={datosVuelo.demora === option}
                    onChange={(e) =>
                      setDatosVuelo({
                        ...datosVuelo,
                        demora: (e.target.value = option),
                      })
                    }
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center col-span-1">
            <p htmlFor="tipo" className="text-gray-600 mr-2 w-full">
              Tipo de Vuelo{" "}
            </p>
            <div className="flex flex-row gap-2 bg-slate-400  px-3 py-1 w-full ">
              {["Arribo", "Partida"].map((option) => (
                <label key={option}>
                  <input
                    id={option}
                    type="checkbox"
                    checked={datosVuelo.tipo === option}
                    onChange={(e) =>
                      setDatosVuelo({
                        ...datosVuelo,
                        tipo: (e.target.value = option),
                      })
                    }
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center col-span-1">
            <label
              htmlFor="matriculaAeronave"
              className="text-gray-600 mr-2 w-full"
            >
              Matrícula Aeronave
            </label>
            <input
              id="matriculaAeronave"
              type="text"
              value={datosVuelo.matriculaAeronave}
              onChange={(e) =>
                setDatosVuelo({
                  ...datosVuelo,
                  matriculaAeronave: e.target.value,
                })
              }
              className="border border-gray-400 px-3 py-1 w-full"
            />
          </div>

          <div className="flex items-center col-span-1">
            <label htmlFor="posicion" className="text-gray-600 mr-2 w-full">
              Posición Plataforma
            </label>
            <input
              id="posicion"
              type="text"
              value={datosVuelo.posicion}
              onChange={(e) =>
                setDatosVuelo({
                  ...datosVuelo,
                  posicion: e.target.value,
                })
              }
              className="border border-gray-400 px-3 py-1 w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatosVuelo;
