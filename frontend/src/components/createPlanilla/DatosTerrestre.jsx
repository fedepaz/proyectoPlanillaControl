import { useState } from "react";

const DatosTerrestre = () => {
  const [datosTerrestre, setDatosTerrestre] = useState([
    {
      apellidoTerrestre: "",
      nombreTerrestre: "",
      dniTerrestre: "",
      legajoTerrestre: "",
      funcion: "",
      grupo: "",
    },
  ]);

  return (
    <div className="border-b border-gray-300 pb-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">
        DATOS DEL PERSONAL DE APOYO TERRESTRE EMPRESA
      </h2>
      <div className="my-1 grid grid-cols-6 gap-4">
        <div className="flex flex-col col-span-1">
          <label
            htmlFor="apellidoTerrestre"
            className="text-gray-600 mr-2 w-full text-center"
          >
            Apellido
          </label>
          <input
            id="apellidoTerrestre"
            type="text"
            value={datosTerrestre.apellidoTerrestre}
            onChange={(e) =>
              setDatosTerrestre({
                ...datosTerrestre,
                apellidoTerrestre: e.target.value,
              })
            }
            className="border border-gray-400 px-3 py-1 w-full"
          />
        </div>
        <div className="flex flex-col col-span-1">
          <label
            htmlFor="nombreTerrestre"
            className="text-gray-600 mr-2 w-full text-center"
          >
            Nombre
          </label>
          <input
            id="nombreTerrestre"
            type="text"
            value={datosTerrestre.nombrTerrestre}
            onChange={(e) =>
              setDatosTerrestre({
                ...datosTerrestre,
                nombrTerrestre: e.target.value,
              })
            }
            className="border border-gray-400 px-3 py-1 w-full"
          />
        </div>
        <div className="flex flex-col col-span-1">
          <label
            htmlFor="dniTerrestre"
            className="text-gray-600 mr-2 w-full text-center"
          >
            DNI
          </label>
          <input
            id="dniTerrestre"
            type="text"
            value={datosTerrestre.dniTerrestre}
            onChange={(e) =>
              setDatosTerrestre({
                ...datosTerrestre,
                dniTerrestre: e.target.value,
              })
            }
            className="border border-gray-400 px-3 py-1 w-full"
          />
        </div>
        <div className="flex flex-col col-span-1">
          <label
            htmlFor="legajoTerrestre"
            className="text-gray-600 mr-2 w-full text-center"
          >
            Legajo
          </label>
          <input
            id="legajoTerrestre"
            type="text"
            value={datosTerrestre.legajoTerrestre}
            onChange={(e) =>
              setDatosTerrestre({
                ...datosTerrestre,
                legajoTerrestre: e.target.value,
              })
            }
            className="border border-gray-400 px-3 py-1 w-full"
          />
        </div>
        <div className="flex flex-col col-span-1">
          <p
            htmlFor="funcion"
            className="text-gray-600 mr-2 w-full text-center"
          >
            Funcion
          </p>
          <div className="flex flex-wrap gap-2 bg-slate-400  px-3 py-1 w-full ">
            {/* Checkbox options */}
            {["Sup", "Bod", "Cin", "Tra", "Otr"].map((option) => (
              <label key={option}>
                <input
                  id={option}
                  type="checkbox"
                  checked={datosTerrestre.funcion === option}
                  onChange={(e) =>
                    setDatosTerrestre({
                      ...datosTerrestre,
                      funcion: (e.target.value = option),
                    })
                  }
                />
                {option}
              </label>
            ))}
          </div>
        </div>
        <div className="flex flex-col col-span-1">
          <label
            htmlFor="grupo"
            className="text-gray-600 mr-2 w-full text-center"
          >
            Grupo
          </label>
          <input
            id="grupo"
            type="text"
            value={datosTerrestre.grupo}
            onChange={(e) =>
              setDatosTerrestre({
                ...datosTerrestre,
                grupo: e.target.value,
              })
            }
            className="border border-gray-400 px-3 py-1 w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default DatosTerrestre;
