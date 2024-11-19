export function InlineSelect() {
  return (
    <div className="relative w-100 flex flex-col pb-6">
      <span className="absolute top-0 text-xs px-2 pt-1 transition-all pointer-events-none text-gray-600">
        ¿Qué quieres hacer?
      </span>
      <select className="border border-gray-300 text-md rounded pt-5 pb-2 px-2 transition-all">
        <option>Invertir</option>
        <option>Solicitar</option>
      </select>
    </div>
  );
}

export default InlineSelect;
