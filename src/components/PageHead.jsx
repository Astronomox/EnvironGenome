export default function PageHead({ eyebrow, title, sub }) {
  return (
    <div className="page-head">
      <div className="eyebrow">{eyebrow}</div>
      <h1>{title}</h1>
      {sub && <div className="sub">{sub}</div>}
    </div>
  );
}
