import PropTypes from "prop-types";

const NovEquipajes = ({ novEquipajes, setNovEquipajes }) => {
  const handleChange = (e) => {
    const { value } = e.target;
    setNovEquipajes(value);
  };
  return (
    <div className="my-4">
      <h2 className="text-xl font-semibold mb-2">NOVEDADES EQUIPAJES</h2>
      <input
        id="novEquipajes"
        name="novEquipajes"
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
