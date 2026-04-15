const categories = [
  "Cotton",
  "Party Wear",
  "Special",
  "Kurties",
  "Bags"
];

export default function CategoryBar({ setCategory }) {
  return (
    <div className="flex gap-6 justify-center py-4 border-b border-rose-100">

      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className="hover:text-rose-600 text-slate-600 font-medium transition duration-200"
        >
          {cat}
        </button>
      ))}

    </div>
  );
}