import PropTypes from "prop-types";

const NovOtras = ({ novOtras, setNovOtras }) => {
  const handleChange = (e) => {
    const { value } = e.target;
    setNovOtras(value);
  };
  return (
    <div className="my-4">
      <h2 className="text-xl font-semibold mb-2">OTRAS NOVEDADES</h2>
      <input
        id="novOtras"
        type="text"
        value={novOtras}
        onChange={handleChange}
        className="border border-gray-400 px-3 py-1 w-full"
      />
    </div>
  );
};
NovOtras.propTypes = {
  novOtras: PropTypes.string.isRequired,
  setNovOtras: PropTypes.func.isRequired,
};

export default NovOtras;
