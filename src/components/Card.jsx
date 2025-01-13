/*Return card element using pokemon data passed in */
export default function Card({ id, name, imageUrl }) {
  return (
    <div className="pokemon-card" key={id}>
      <img src={imageUrl} alt={name} />
      <span>{name}</span>
    </div>
  );
}
