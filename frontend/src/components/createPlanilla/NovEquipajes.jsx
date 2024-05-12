import { useState } from "react";

const NovEquipajes = () => {
  const [novEquipajes, setNovEquipajes] = useState("");

  return (
    <div className="my-4">
      <h2 className="text-xl font-semibold mb-2">NOVEDADES EQUIPAJES</h2>
      <input
        id="novEquipajes"
        type="text"
        value={novEquipajes}
        onChange={(e) => setNovEquipajes(e.target.value)}
        className="border border-gray-400 px-3 py-1 w-full"
      />
    </div>
  );
};

export default NovEquipajes;
