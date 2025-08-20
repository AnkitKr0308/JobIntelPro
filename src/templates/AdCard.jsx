export default function AdCard({ size = "banner", className = "" }) {
  return (
    <div
      className={`flex justify-center items-center text-xl font-medium
      ${size === "banner" ? "w-full h-32" : "w-full h-64"} 
      ${className}`}
    >
      Advertisement
    </div>
  );
}
