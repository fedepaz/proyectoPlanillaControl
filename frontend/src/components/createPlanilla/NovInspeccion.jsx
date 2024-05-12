import { useState } from "react";

const NovInspeccion = () => {
  const [novInspeccion, setNovInspeccion] = useState("");

  return (
    <div className="my-4">
      <h2 className="text-xl font-semibold mb-2">NOVEDADES INSPECCIÓN</h2>
      <input
        id="novInspeccion"
        type="text"
        value={novInspeccion}
        onChange={(e) => setNovInspeccion(e.target.value)}
        className="border border-gray-400 px-3 py-1 w-full"
      />
    </div>
  );
};

export default NovInspeccion;
