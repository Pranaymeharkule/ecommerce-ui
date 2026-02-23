const categories = [
 "Cotton",
 "Party Wear",
 "Special",
 "Kurties",
 "Bags"
];

export default function CategoryBar({ setCategory }) {
  return (
    <div className="flex gap-6 justify-center py-4 border-b  ">

      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className="hover:text-black text-gray-600 font-medium"
        >
          {cat}
        </button>
      ))}

    </div>
  );
}