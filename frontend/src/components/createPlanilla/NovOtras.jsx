import { useState } from "react";

const NovOtras = () => {
  const [novOtras, setNovOtras] = useState("");

  return (
    <div className="my-4">
      <h2 className="text-xl font-semibold mb-2">OTRAS NOVEDADES</h2>
      <input
        id="novOtras"
        type="text"
        value={novOtras}
        onChange={(e) => setNovOtras(e.target.value)}
        className="border border-gray-400 px-3 py-1 w-full"
      />
    </div>
  );
};

export default NovOtras;
