import PropTypes from "prop-types";

const NovInspeccion = ({ novInspeccion, setNovInspeccion }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovInspeccion((preNovInspeccion) => ({
      ...preNovInspeccion,
      [name]: value,
    }));
  };

  return (
    <div className="my-4">
      <h2 className="text-xl font-semibold mb-2">NOVEDADES INSPECCIÓN</h2>
      <input
        id="novInspeccion"
        type="text"
        value={novInspeccion}
        onChange={handleChange}
        className="border border-gray-400 px-3 py-1 w-full"
      />
    </div>
  );
};
NovInspeccion.propTypes = {
  novInspeccion: PropTypes.string.isRequired,
  setNovInspeccion: PropTypes.func.isRequired,
};

export default NovInspeccion;
