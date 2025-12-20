function FeedbackList({ items, loading }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Inbox</p>
          <h2 className="text-xl font-semibold">Recent Feedback</h2>
        </div>
        <span className="text-xs text-slate-400">{items.length} items</span>
      </div>
      {loading && <p className="text-sm text-slate-400">Loading...</p>}
      {!loading && !items.length && <p className="text-sm text-slate-400">No feedback yet.</p>}
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li
            key={item._id}
            className="rounded-lg border border-slate-800 bg-slate-950/60 p-4 space-y-2 hover:border-indigo-600/50 transition"
          >
            <div className="flex items-center gap-2 flex-wrap">
              <BadgeSentiment sentiment={item.sentiment} />
              {item.urgency && (
                <Badge
                  text={`${item.urgency} urgency`}
                  tone={item.urgency === "high" ? "urgent" : "slate"}
                />
              )}
              {item.emotion && item.emotion !== "neutral" && (
                <Badge text={item.emotion} tone="emotion" />
              )}
              <Badge text={item.status || "open"} tone="slate" />
              {item.product ? <Badge text={item.product} tone="indigo" /> : null}
              {item.channel ? <Badge text={item.channel} tone="slate" /> : null}
              <span className="text-xs text-slate-500">
                {formatDate(item.createdAt)} · Rating {item.rating ?? "N/A"}
                {item.sentimentScore !== undefined
                  ? ` · Score: ${item.sentimentScore > 0 ? "+" : ""}${item.sentimentScore}`
                  : null}
              </span>
            </div>
            {item.summary ? (
              <p className="text-sm leading-relaxed text-slate-200">{item.summary}</p>
            ) : null}
            <p className="text-sm leading-relaxed text-slate-100">{item.text}</p>
            <div className="text-xs text-slate-400 flex flex-wrap gap-2">
              {item.customerName ? <span>By {item.customerName}</span> : null}
              {item.feature ? <span>Feature: {item.feature}</span> : null}
              {item.topics?.length ? (
                <span className="flex flex-wrap gap-1">
                  Topics:{" "}
                  {item.topics.map((topic) => (
                    <Badge key={topic} text={topic} tone="indigo" />
                  ))}
                </span>
              ) : null}
              {item.keywords?.length ? <span>Keywords: {item.keywords.slice(0, 5).join(", ")}</span> : null}
              {item.tags?.length ? (
                <span className="flex flex-wrap gap-1">
                  {item.tags.map((tag) => (
                    <Badge key={tag} text={tag} tone="slate" />
                  ))}
                </span>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BadgeSentiment({ sentiment }) {
  const tone =
    sentiment === "positive"
      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
      : sentiment === "negative"
      ? "border-rose-500/40 bg-rose-500/10 text-rose-300"
      : "border-sky-500/40 bg-sky-500/10 text-sky-300";
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border ${tone}`}>
      {sentiment}
    </span>
  );
}

function Badge({ text, tone = "slate" }) {
  const tones = {
    slate: "border-slate-700 bg-slate-800/80 text-slate-200",
    indigo: "border-indigo-500/40 bg-indigo-500/10 text-indigo-200",
    urgent: "border-rose-500/60 bg-rose-500/20 text-rose-300",
    emotion: "border-purple-500/40 bg-purple-500/10 text-purple-200",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold border ${tones[tone] || tones.slate}`}
    >
      {text}
    </span>
  );
}

function formatDate(value) {
  if (!value) return "";
  const d = new Date(value);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default FeedbackList;

