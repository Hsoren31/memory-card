/*Return card element using pokemon data passed in */

function capitalizeFirstLetter(string) {
  let removeFirstLetter = string.slice(1);
  let firstLetter = string.charAt(0);
  return firstLetter.toUpperCase() + removeFirstLetter;
}

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
      <span>{capitalizeFirstLetter(name)}</span>
    </div>
  );
}
