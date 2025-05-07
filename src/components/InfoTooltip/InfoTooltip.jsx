import closeIcon from "../../images/closeIcon.svg";

export const InfoTooltip = ({ img, text }) => {
  return (
    <>
      <button onClick={handleClose}>
        <img src={closeIcon} alt="Close icon" />
      </button>
      <div>
        <img src={img} alt={text} />
        <p>{text}</p>
      </div>
    </>
  );
};
