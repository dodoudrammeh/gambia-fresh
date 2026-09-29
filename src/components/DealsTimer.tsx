export interface DealsTimerProps {
  secondsLeft: number;
}

export const DealsTimer = ({ secondsLeft }: DealsTimerProps) => {
  const parts = [
    { label: "Hrs", value: Math.floor(secondsLeft / 3600) },
    { label: "Min", value: Math.floor((secondsLeft % 3600) / 60) },
    { label: "Sec", value: secondsLeft % 60 },
  ];

  return (
    <div className="flex items-start gap-1.5" aria-label="Time left today">
      {parts.map((part, index) => (
        <span key={part.label} className="flex items-start gap-1.5">
          {index > 0 && (
            <span className="pt-1.5 font-bold text-brand" aria-hidden>
              :
            </span>
          )}
          <span className="text-center">
            <span className="grid min-w-11 place-items-center rounded-md bg-brand-deep px-2 py-1.5 text-base font-bold text-white">
              {String(part.value).padStart(2, "0")}
            </span>
            <span className="mt-1 block text-[10px] font-semibold tracking-wide text-muted uppercase">
              {part.label}
            </span>
          </span>
        </span>
      ))}
    </div>
  );
};
