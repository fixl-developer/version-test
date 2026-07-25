"use client";

import { useRouter, usePathname } from "next/navigation";

const VERSIONS = [
  { label: "v2.0 — Current", path: "/snake" },
  { label: "v1.1 — Top Scores", path: "/v1.1/snake" },
  { label: "v1.0 — Classic", path: "/v1/snake" },
];

export default function VersionSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const current = VERSIONS.find((v) => pathname.startsWith(v.path)) ?? VERSIONS[0];

  return (
    <select
      value={current.path}
      onChange={(e) => router.push(e.target.value)}
      className="bg-[#001100] text-[#00FF00] border border-[#00FF00] rounded px-3 py-1 text-sm font-mono cursor-pointer focus:outline-none"
    >
      {VERSIONS.map((v) => (
        <option key={v.path} value={v.path}>
          {v.label}
        </option>
      ))}
    </select>
  );
}
