export default function QuotaBar({ quota }) {
  if (!quota) return null;

  return (
    <div className="mt-3">
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`h-3 rounded-full ${
            quota.remaining > 2
              ? "bg-green-500"
              : quota.remaining > 0
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
          style={{
            width: `${((quota.limit - quota.remaining) / quota.limit) * 100}%`,
          }}
        />
      </div>
      <p className="text-gray-600 text-sm mt-1">
        Requests left: {quota.remaining} / {quota.limit} this minute
      </p>
    </div>
  );
}
