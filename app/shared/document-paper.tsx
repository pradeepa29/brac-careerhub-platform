"use client";

// The same editing surface is used by study abroad documents and career CVs.
export function DocumentPaper({ value, editing, onChange, label, template = "classic", streaming = false }: {
  value: string; editing: boolean; onChange: (value: string) => void;
  label: string; template?: string; streaming?: boolean;
}) {
  return editing ? <textarea className="hub-document-input hub-tool-document-input" aria-label={label} value={value} onChange={e => onChange(e.target.value)} /> :
    <div className={`hub-document-preview hub-tool-paper template-${template}`}><pre>{value}{streaming && <span className="hub-stream-cursor" aria-hidden="true">▍</span>}</pre></div>;
}
