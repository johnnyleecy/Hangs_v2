import fs from 'node:fs';

const file = 'src/components/home.tsx';
let source = fs.readFileSync(file, 'utf8');
const slice = (start, end) => {
  const a = source.indexOf(start), b = source.indexOf(end, a);
  if (a < 0 || b < 0) throw new Error(`Missing marker: ${start}`);
  return source.slice(a, b);
};
const hydration = slice('const subscribeToHydration', 'const serviceIcons');
const brand = slice('function Brand', 'function SectionLabel');
const dialogs = slice('function Modal', 'function Workspace');
const shared = `'use client';\n\nimport Link from 'next/link';\nimport { useEffect, useRef, useState, useSyncExternalStore, type FormEvent, type ReactNode } from 'react';\nimport { ArrowUpRight, ArrowRight, Check, X, LockKeyhole, CircleCheck, Copy } from 'lucide-react';\nimport { services } from '@/lib/site';\n\n${hydration}${brand}${dialogs}`
  .replace('function useHydrated()', 'export function useHydrated()')
  .replace('function Brand(', 'export function Brand(')
  .replace('function Modal(', 'export function Modal(')
  .replace('function Consultation(', 'export function Consultation(')
  .replace('<a href="#" className={`brand', '<Link href="/" className={`brand')
  .replace('</span></a>;', '</span></Link>;');
source = source.replace(hydration, '').replace(brand, '').replace(dialogs, '');
const oldState = source.slice(source.indexOf('  const [menuOpen', source.indexOf('export default function Home')), source.indexOf('\n  return <>', source.indexOf('export default function Home')));
source = source.replace(oldState, "  const [selectedService, setSelectedService] = useState<Service | null>(null);\n  const { openConsult } = useConsultation();\n");
const headerStart = source.indexOf('    <header className="site-header">');
const headerEnd = source.indexOf('    <main id="main">', headerStart);
if (headerStart < 0 || headerEnd < 0) throw new Error('Missing header');
source = source.slice(0, headerStart) + source.slice(headerEnd);
const footerStart = source.indexOf('    <footer className="site-footer">');
const footerEnd = source.indexOf('    {selectedService &&', footerStart);
if (footerStart < 0 || footerEnd < 0) throw new Error('Missing footer');
source = source.slice(0, footerStart) + source.slice(footerEnd);
source = source.replace('setSelectedService(null); setConsultOpen(true);', 'setSelectedService(null); openConsult();')
  .replace('    {consultOpen && <Consultation onClose={() => setConsultOpen(false)} />}\n', '')
  .replace("import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent, type ReactNode } from 'react';", "import { useState, type ReactNode } from 'react';\nimport { Modal, useHydrated } from '@/components/shared-ui';\nimport { useConsultation } from '@/components/site-shell';")
  .replace('ArrowDown, Check, X, Menu,', 'ArrowDown, Check,')
  .replace('CircleCheck, Command, Plus, Copy, Layers3', 'CircleCheck, Command, Plus, Layers3');
fs.writeFileSync('src/components/shared-ui.tsx', shared);
fs.writeFileSync(file, source);
console.log('Extracted shared UI and removed page-local header/footer.');
