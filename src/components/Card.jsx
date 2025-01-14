/*Return card element using pokemon data passed in */

export default function Card({ id, name, imageUrl, handleClick }) {
  return (
    <div
      className="pokemon-card"
      key={id}
      onClick={() => {
        handleClick({ id });
      }}
    >
      <img src={imageUrl} alt={name} />
      <span>{name}</span>
    </div>
  );
}
