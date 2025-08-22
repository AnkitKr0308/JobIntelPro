export default function JobCard({
  title,
  company,
  batch,
  onClick,
  buttonLabel,
}) {
  return (
    <div className="border rounded-xl shadow-md p-4 flex flex-col justify-between hover:shadow-xl transition duration-300 bg-white hover:bg-indigo-50 border-l-4 border-indigo-500">
      <div>
        <h3 className="font-semibold text-lg text-indigo-700">{title}</h3>
        <p className="text-gray-600">{company}</p>
        <p className="text-gray-500 text-sm">Batch {batch}</p>
      </div>
      <button
        onClick={onClick}
        className="mt-3 border px-3 py-1 rounded-md hover:bg-indigo-100 text-indigo-600 font-medium transition"
      >
        {buttonLabel}
      </button>
    </div>
  );
}
