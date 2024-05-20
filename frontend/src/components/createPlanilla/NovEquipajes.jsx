import PropTypes from "prop-types";

const NovEquipajes = ({ novEquipajes, setNovEquipajes }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovEquipajes((preNovEquipajes) => ({
      ...preNovEquipajes,
      [name]: value,
    }));
  };
  return (
    <div className="my-4">
      <h2 className="text-xl font-semibold mb-2">NOVEDADES EQUIPAJES</h2>
      <input
        id="novEquipajes"
        type="text"
        value={novEquipajes}
        onChange={handleChange}
        className="border border-gray-400 px-3 py-1 w-full"
      />
    </div>
  );
};
NovEquipajes.propTypes = {
  novEquipajes: PropTypes.string.isRequired,
  setNovEquipajes: PropTypes.func.isRequired,
};

export default NovEquipajes;
