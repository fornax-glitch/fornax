export default function FilterBar({
  setCategory
}: {
  setCategory: (category: string) => void
}) {
  return (
    <div className="flex gap-3 p-4 justify-center">
      <button onClick={() => setCategory('All')}>All</button>
      <button onClick={() => setCategory('Economy')}>Economy</button>
      <button onClick={() => setCategory('Compact')}>Compact</button>
      <button onClick={() => setCategory('SUV')}>SUV</button>
    </div>
  );
}