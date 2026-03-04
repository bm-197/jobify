export function CropMarks({ color = "white" }: { color?: string }) {
  const hoverClass =
    color === "white"
      ? "group-hover:border-white"
      : `group-hover:border-[${color}]`;

  return (
    <>
      <div
        className={`absolute left-0 top-0 z-20 h-3 w-3 border-l-2 border-t-2 border-[#333] transition-colors ${hoverClass}`}
      />
      <div
        className={`absolute right-0 top-0 z-20 h-3 w-3 border-r-2 border-t-2 border-[#333] transition-colors ${hoverClass}`}
      />
      <div
        className={`absolute bottom-0 left-0 z-20 h-3 w-3 border-b-2 border-l-2 border-[#333] transition-colors ${hoverClass}`}
      />
      <div
        className={`absolute bottom-0 right-0 z-20 h-3 w-3 border-b-2 border-r-2 border-[#333] transition-colors ${hoverClass}`}
      />
    </>
  );
}
