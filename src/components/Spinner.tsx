export default function Spinner({ label }: { label: string }) {
  return (
    <div role="status" className="py-16 text-center">
      <div className="mx-auto size-14 animate-spin rounded-full border-[3px] border-navy-600 border-t-accent" />
      <p className="mt-5 text-lg text-navy-400">{label}</p>
    </div>
  );
}
