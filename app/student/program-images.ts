// Illustrative campus scenes. Keep a program's image consistent across views.
const programImages: Record<string, string> = {
  "glasgow-analytics": "uk-campus.png",
  "adelaide-data": "australia-campus.png",
  "toronto-cs": "canada-campus.png",
  "glasgow-management": "glasgow-management.webp",
  "ottawa-digital": "ottawa-digital.webp",
  "twente-it": "twente-it.webp",
  "malaya-is": "malaya-is.webp",
  "debrecen-cs": "debrecen-cs.webp",
  "melbourne-business": "melbourne-business.webp",
  "leeds-engineering": "leeds-engineering.webp",
  "monash-design": "monash-design.webp",
  "edinburgh-ai": "edinburgh-ai.webp",
  "manchester-public": "manchester-public.webp",
  "twente-research": "twente-research.webp",
  "bristol-fintech": "bristol-fintech.webp",
  "queensland-analytics": "queensland-analytics.webp",
  "southampton-cyber": "southampton-cyber.webp",
  "rmit-information": "rmit-information.webp",
  "lancaster-supply": "lancaster-supply.webp",
};

export function programImage(program: { id: string }) {
  return `/programs/${programImages[program.id] || "uk-campus.png"}`;
}
