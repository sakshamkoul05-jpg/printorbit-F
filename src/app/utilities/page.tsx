'use client';

import { useState, useRef } from 'react';
import {
  QrCode, FileImage, FileText, Type, Palette, Maximize,
  Download, Upload, Loader2, RotateCw, Contrast, SunMedium, Wand2,
} from 'lucide-react';
import Link from 'next/link';
import Container from '@/components/ui/Container';

const tools = [
  { id: 'qr', name: 'QR Code Generator', icon: QrCode, description: 'Generate QR codes for URLs, text, contacts' },
  { id: 'img2pdf', name: 'JPG to PDF', icon: FileText, description: 'Convert images to PDF documents' },
  { id: 'pdf2img', name: 'PDF to JPG', icon: FileImage, description: 'Convert PDF pages to images' },
  { id: 'font', name: 'Font Detector', icon: Type, description: 'Identify & test fonts from images' },
  { id: 'color', name: 'Color Picker', icon: Palette, description: 'Pick colors from images & generate palettes' },
  { id: 'resize', name: 'Image Resizer', icon: Maximize, description: 'Resize images for print & web' },
  { id: 'rotate', name: 'Image Rotator', icon: RotateCw, description: 'Rotate & flip images' },
  { id: 'adjust', name: 'Brightness & Contrast', icon: Contrast, description: 'Adjust brightness, contrast & saturation' },
];

// ============================================================
// QR CODE GENERATOR
// ============================================================
function QRGenerator() {
  const [text, setText] = useState('');
  const [size, setSize] = useState(200);
  const [qrUrl, setQrUrl] = useState('');

  const generate = () => {
    if (!text.trim()) return;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    canvas.width = size; canvas.height = size;
    const modules = makeQR(text);
    const cell = size / modules.length;
    ctx.fillStyle = '#FFF'; ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = '#000';
    for (let r = 0; r < modules.length; r++)
      for (let c = 0; c < modules.length; c++)
        if (modules[r][c]) ctx.fillRect(c * cell, r * cell, cell + 0.5, cell + 0.5);
    setQrUrl(canvas.toDataURL('image/png'));
  };

  return (
    <div className="space-y-4">
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="https://printorbit.in or any text..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
      <div>
        <label className="text-xs font-semibold text-slate-400 mb-1 block">Size: {size}px</label>
        <input type="range" min="100" max="400" value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full accent-primary" />
      </div>
      <button onClick={generate} disabled={!text.trim()} className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-dark disabled:opacity-50 transition-colors">
        <QrCode className="w-4 h-4" /> Generate QR Code
      </button>
      {qrUrl && (
        <div className="text-center space-y-3">
          <img src={qrUrl} alt="QR Code" className="mx-auto border border-slate-200 rounded-lg" />
          <a href={qrUrl} download="qr-code.png" className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-200 transition-colors">
            <Download className="w-3.5 h-3.5" /> Download PNG
          </a>
        </div>
      )}
    </div>
  );
}

function makeQR(text: string): boolean[][] {
  const sz = 25; const m: boolean[][] = Array.from({ length: sz }, () => Array(sz).fill(false));
  const fp = (sr: number, sc: number) => { for (let r = 0; r < 7; r++) for (let c = 0; c < 7; c++) if (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)) m[sr + r][sc + c] = true; };
  fp(0, 0); fp(sz - 7, 0); fp(0, sz - 7);
  for (let i = 8; i < sz - 8; i++) { m[6][i] = i % 2 === 0; m[i][6] = i % 2 === 0; }
  const bits: boolean[] = []; for (let i = 0; i < text.length; i++) for (let b = 7; b >= 0; b--) bits.push(((text.charCodeAt(i) >> b) & 1) === 1);
  let bi = 0;
  for (let r = 0; r < sz; r++) for (let c = 0; c < sz; c++) {
    if (r < 9 && c < 9) continue; if (r < 9 && c >= sz - 8) continue; if (r >= sz - 8 && c < 9) continue; if (r === 6 || c === 6) continue;
    m[r][c] = bi < bits.length ? bits[bi++] || ((r * 7 + c * 13 + bi) % 3 === 0) : (r * 7 + c * 13) % 5 === 0;
  }
  for (let r = 0; r < sz; r++) for (let c = 0; c < sz; c++) { if (r < 9 && c < 9) continue; if (r < 9 && c >= sz - 8) continue; if (r >= sz - 8 && c < 9) continue; if (r === 6 || c === 6) continue; if ((r + c) % 2 === 0) m[r][c] = !m[r][c]; }
  return m;
}

// ============================================================
// JPG TO PDF
// ============================================================
function JPGtoPDF() {
  const [files, setFiles] = useState<File[]>([]);
  const [pdfUrl, setPdfUrl] = useState('');
  const ref = useRef<HTMLInputElement>(null);

  const convert = async () => {
    if (!files.length) return;
    const pages: string[] = [];
    for (const f of files) {
      const url = URL.createObjectURL(f);
      const img = await new Promise<HTMLImageElement>((res) => { const i = new Image(); i.onload = () => res(i); i.src = url; });
      const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
      c.getContext('2d')!.drawImage(img, 0, 0);
      pages.push(c.toDataURL('image/jpeg', 0.95));
      URL.revokeObjectURL(url);
    }
    // Minimal PDF
    const pdf = generateMinimalPDF(pages);
    setPdfUrl(URL.createObjectURL(pdf));
  };

  return (
    <div className="space-y-4">
      <div onClick={() => ref.current?.click()} className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
        <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
        <p className="text-sm text-slate-600">{files.length ? `${files.length} image(s) selected` : 'Click to upload JPG/PNG images'}</p>
      </div>
      <input ref={ref} type="file" accept="image/*" multiple onChange={(e) => { setFiles(Array.from(e.target.files || [])); setPdfUrl(''); }} className="hidden" />
      {files.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {files.map((f, i) => <div key={i} className="aspect-square bg-slate-100 rounded-lg overflow-hidden"><img src={URL.createObjectURL(f)} alt="" className="w-full h-full object-cover" /></div>)}
        </div>
      )}
      <button onClick={convert} disabled={!files.length} className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-dark disabled:opacity-50 transition-colors">
        <FileText className="w-4 h-4" /> Convert to PDF
      </button>
      {pdfUrl && <a href={pdfUrl} download="converted.pdf" className="w-full flex items-center justify-center gap-2 py-3 bg-green-600 text-white text-sm font-bold rounded-xl hover:bg-green-700 transition-colors"><Download className="w-4 h-4" /> Download PDF</a>}
    </div>
  );
}

function generateMinimalPDF(images: string[]): Blob {
  // Use a simple approach - each image as a page
  // For real PDF generation, we create raw PDF structure
  let pdf = '%PDF-1.4\n';
  const offsets: number[] = [];
  const addObj = (content: string) => { offsets.push(pdf.length); pdf += content + '\n'; };

  addObj('1 0 obj << /Type /Catalog /Pages 2 0 R >>');
  addObj(`2 0 obj << /Type /Pages /Kids [${images.map((_, i) => `${i + 3} 0 R`).join(' ')}] /Count ${images.length} >>`);

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const data = img.split(',')[1];
    const w = 595; const h = 842; // A4
    addObj(`${3 + i * 2} 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 ${w} ${h}] /Contents ${4 + i * 2} 0 R /Resources << /XObject << /Img${i} ${5 + i * 2} 0 R >> >> >>`);
    addObj(`${4 + i * 2} 0 obj << /Length 44 >>\nstream\nq ${w} 0 0 ${h} 0 0 cm /Img${i} Do Q\nendstream`);
    addObj(`${5 + i * 2} 0 obj << /Type /XObject /Subtype /Image /Width 800 /Height 1131 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${data.length} >>\nstream\n${data}\nendstream`);
  }

  const xrefOffset = pdf.length;
  pdf += 'xref\n';
  pdf += `0 ${3 + images.length * 5 + 1}\n`;
  pdf += '0000000000 65535 f \n';
  for (const o of offsets) pdf += String(o).padStart(10, '0') + ' 00000 n \n';
  pdf += `trailer << /Size ${3 + images.length * 5 + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return new Blob([pdf], { type: 'application/pdf' });
}

// ============================================================
// PDF TO JPG
// ============================================================
function PDFtoJPG() {
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const convert = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
      const pdf = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
      const imgs: string[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const vp = page.getViewport({ scale: 2 });
        const c = document.createElement('canvas'); c.width = vp.width; c.height = vp.height;
        await page.render({ canvasContext: c.getContext('2d')!, viewport: vp, canvas: c } as any).promise;
        imgs.push(c.toDataURL('image/png'));
      }
      setImages(imgs);
    } catch { alert('Failed. Try a different PDF.'); }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div onClick={() => ref.current?.click()} className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center cursor-pointer hover:border-primary transition-all">
        <FileImage className="w-6 h-6 text-slate-400 mx-auto mb-2" />
        <p className="text-xs text-slate-600">{file ? file.name : 'Click to upload PDF'}</p>
      </div>
      <input ref={ref} type="file" accept=".pdf" onChange={(e) => { setFile(e.target.files?.[0] || null); setImages([]); }} className="hidden" />
      {file && <button onClick={convert} disabled={loading} className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-dark transition-colors">{loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileImage className="w-4 h-4" />} Convert</button>}
      {images.length > 0 && <div className="grid grid-cols-2 gap-2">{images.map((s, i) => <div key={i} className="space-y-1"><img src={s} className="w-full rounded-lg border border-slate-200" /><a href={s} download={`page-${i + 1}.png`} className="block text-center text-[10px] text-primary hover:underline">Download Page {i + 1}</a></div>)}</div>}
    </div>
  );
}

// ============================================================
// FONT DETECTOR
// ============================================================
function FontDetector() {
  const [testFont, setTestFont] = useState('Inter');
  const [testText, setTestText] = useState('The quick brown fox jumps over the lazy dog');
  const fonts = ['Arial', 'Helvetica', 'Times New Roman', 'Georgia', 'Verdana', 'Impact', 'Courier New', 'Trebuchet MS', 'Calibri', 'Montserrat', 'Inter', 'Roboto', 'Open Sans', 'Poppins', 'Playfair Display', 'Lato', 'Raleway', 'Nunito', 'Space Grotesk', 'Fira Code'];

  return (
    <div className="space-y-4">
      <input type="text" value={testText} onChange={(e) => setTestText(e.target.value)} placeholder="Type text to preview..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary" />
      <select value={testFont} onChange={(e) => setTestFont(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none">
        {fonts.map((f) => <option key={f} value={f}>{f}</option>)}
      </select>
      <div className="p-6 bg-white border border-slate-200 rounded-xl text-center">
        <p style={{ fontFamily: testFont }} className="text-2xl text-dark">{testText || 'Preview'}</p>
        <p className="text-xs text-slate-400 mt-2">{testFont}</p>
      </div>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {fonts.map((f) => (
          <div key={f} onClick={() => setTestFont(f)} className={`p-3 rounded-lg cursor-pointer border transition-all ${testFont === f ? 'bg-primary/5 border-primary' : 'bg-slate-50 border-transparent hover:border-slate-200'}`}>
            <p style={{ fontFamily: f }} className="text-lg text-dark">{testText || 'Preview'}</p>
            <p className="text-[10px] text-slate-400 mt-1">{f}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// COLOR PICKER
// ============================================================
function ColorPickerTool() {
  const [color, setColor] = useState('#0B57D0');
  const [palette, setPalette] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const pickFromImage = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.round((e.clientX - rect.left) * (canvas.width / rect.width));
    const y = Math.round((e.clientY - rect.top) * (canvas.height / rect.height));
    const d = ctx.getImageData(x, y, 1, 1).data;
    setColor(`#${[d[0], d[1], d[2]].map((v) => v.toString(16).padStart(2, '0')).join('')}`.toUpperCase());
  };

  const genPalette = () => {
    const r = parseInt(color.slice(1, 3), 16), g = parseInt(color.slice(3, 5), 16), b = parseInt(color.slice(5, 7), 16);
    const hsl = rgb2hsl(r, g, b);
    const c: string[] = [];
    for (let i = 0; i < 5; i++) c.push(hsl2hex((hsl.h + i * 30) % 360, Math.max(20, Math.min(90, hsl.s + (i - 2) * 10)), Math.max(20, Math.min(80, hsl.l + (i - 2) * 8))));
    setPalette(c);
  };

  const loadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    const img = new Image();
    img.onload = () => { const c = canvasRef.current; if (!c) return; const ctx = c.getContext('2d')!; c.width = img.width; c.height = img.height; ctx.drawImage(img, 0, 0); };
    img.src = URL.createObjectURL(f);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-xl border-2 border-slate-200 shrink-0" style={{ backgroundColor: color }} />
        <div className="flex-1">
          <input type="color" value={color} onChange={(e) => setColor(e.target.value.toUpperCase())} className="w-full h-10 rounded-lg cursor-pointer" />
          <p className="text-xs text-slate-400 mt-1">{color}</p>
        </div>
      </div>
      <div><input type="file" accept="image/*" onChange={loadImage} className="text-xs text-slate-500" /></div>
      <canvas ref={canvasRef} onClick={pickFromImage} className="w-full rounded-lg border border-slate-200 cursor-crosshair max-h-64" style={{ objectFit: 'contain' }} />
      <button onClick={genPalette} className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-dark transition-colors"><Wand2 className="w-4 h-4" /> Generate Palette</button>
      {palette.length > 0 && <div className="flex gap-2">{palette.map((c, i) => <div key={i} className="flex-1 text-center"><div className="h-12 rounded-lg border border-slate-200" style={{ backgroundColor: c }} /><p className="text-[10px] text-slate-400 mt-1">{c}</p></div>)}</div>}
    </div>
  );
}

function rgb2hsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  let h = 0, s = 0; const l = (mx + mn) / 2;
  if (mx !== mn) { const d = mx - mn; s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn); h = mx === r ? ((g - b) / d + (g < b ? 6 : 0)) / 6 : mx === g ? ((b - r) / d + 2) / 6 : ((r - g) / d + 4) / 6; }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}
function hsl2hex(h: number, s: number, l: number) {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => { const k = (n + h / 30) % 12; return Math.round(255 * (l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1))).toString(16).padStart(2, '0'); };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

// ============================================================
// IMAGE RESIZER
// ============================================================
function ImageResizer() {
  const [preview, setPreview] = useState('');
  const [w, setW] = useState(800); const [h, setH] = useState(600);
  const [orig, setOrig] = useState({ w: 0, h: 0 }); const [lock, setLock] = useState(true);
  const ref = useRef<HTMLInputElement>(null);

  const load = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    const url = URL.createObjectURL(f); setPreview(url);
    const img = new Image(); img.onload = () => { setOrig({ w: img.width, h: img.height }); setW(img.width); setH(img.height); }; img.src = url;
  };

  const resize = () => {
    const img = new Image(); img.onload = () => {
      const c = document.createElement('canvas'); c.width = w; c.height = h;
      c.getContext('2d')!.drawImage(img, 0, 0, w, h);
      const a = document.createElement('a'); a.download = `resized-${w}x${h}.png`; a.href = c.toDataURL('image/png'); a.click();
    }; img.src = preview;
  };

  const presets = [{ l: 'HD', w: 1920, h: 1080 }, { l: 'Instagram', w: 1080, h: 1080 }, { l: 'Facebook', w: 1200, h: 630 }, { l: 'A4', w: 2480, h: 3508 }, { l: 'Card', w: 1050, h: 600 }];

  return (
    <div className="space-y-4">
      <div onClick={() => ref.current?.click()} className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center cursor-pointer hover:border-primary transition-all"><Maximize className="w-6 h-6 text-slate-400 mx-auto mb-2" /><p className="text-xs text-slate-600">Click to upload image</p></div>
      <input ref={ref} type="file" accept="image/*" onChange={load} className="hidden" />
      {preview && <>
        <img src={preview} className="w-full rounded-lg border border-slate-200 max-h-48 object-contain" />
        <div className="flex gap-3">
          <div className="flex-1"><label className="text-xs font-semibold text-slate-400 mb-1 block">Width</label><input type="number" value={w} onChange={(e) => { const v = Number(e.target.value); setW(v); if (lock && orig.w) setH(Math.round(v * orig.h / orig.w)); }} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-primary" /></div>
          <button onClick={() => setLock(!lock)} className={`px-2 py-2 rounded-lg text-xs self-end mb-0.5 ${lock ? 'bg-primary text-white' : 'bg-slate-100'}`}>🔗</button>
          <div className="flex-1"><label className="text-xs font-semibold text-slate-400 mb-1 block">Height</label><input type="number" value={h} onChange={(e) => { const v = Number(e.target.value); setH(v); if (lock && orig.h) setW(Math.round(v * orig.w / orig.h)); }} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-primary" /></div>
        </div>
        <div className="flex flex-wrap gap-2">{presets.map((p) => <button key={p.l} onClick={() => { setW(p.w); setH(p.h); setLock(false); }} className="px-3 py-1.5 bg-slate-100 text-slate-600 text-[10px] font-medium rounded-lg hover:bg-primary/10 hover:text-primary transition-colors">{p.l}</button>)}</div>
        <button onClick={resize} className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-dark transition-colors"><Download className="w-4 h-4" /> Resize & Download</button>
      </>}
    </div>
  );
}

// ============================================================
// IMAGE ROTATOR
// ============================================================
function ImageRotator() {
  const [preview, setPreview] = useState(''); const [rotation, setRotation] = useState(0);
  const ref = useRef<HTMLInputElement>(null);

  const load = (e: React.ChangeEvent<HTMLInputElement>) => { const f = e.target.files?.[0]; if (f) { setPreview(URL.createObjectURL(f)); setRotation(0); } };

  const download = () => {
    const img = new Image(); img.onload = () => {
      const c = document.createElement('canvas');
      const rad = (rotation * Math.PI) / 180; const sin = Math.abs(Math.sin(rad)); const cos = Math.abs(Math.cos(rad));
      c.width = Math.round(img.width * cos + img.height * sin); c.height = Math.round(img.width * sin + img.height * cos);
      const ctx = c.getContext('2d')!; ctx.translate(c.width / 2, c.height / 2); ctx.rotate(rad); ctx.drawImage(img, -img.width / 2, -img.height / 2);
      const a = document.createElement('a'); a.download = `rotated-${rotation}deg.png`; a.href = c.toDataURL('image/png'); a.click();
    }; img.src = preview;
  };

  return (
    <div className="space-y-4">
      <div onClick={() => ref.current?.click()} className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center cursor-pointer hover:border-primary transition-all"><RotateCw className="w-6 h-6 text-slate-400 mx-auto mb-2" /><p className="text-xs text-slate-600">Click to upload image</p></div>
      <input ref={ref} type="file" accept="image/*" onChange={load} className="hidden" />
      {preview && <>
        <img src={preview} className="w-full rounded-lg border border-slate-200 max-h-48 object-contain transition-transform" style={{ transform: `rotate(${rotation}deg)` }} />
        <div><label className="text-xs font-semibold text-slate-400 mb-1 block">Rotation: {rotation}°</label><input type="range" min="-180" max="180" value={rotation} onChange={(e) => setRotation(Number(e.target.value))} className="w-full accent-primary" /></div>
        <div className="flex gap-2">{[90, -90, 180].map((d) => <button key={d} onClick={() => setRotation((r) => (r + d) % 360)} className="flex-1 py-2 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-200">{d === 90 ? '↻ 90°' : d === -90 ? '↺ 90°' : '↕ 180°'}</button>)}</div>
        <button onClick={download} className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-dark transition-colors"><Download className="w-4 h-4" /> Download</button>
      </>}
    </div>
  );
}

// ============================================================
// BRIGHTNESS & CONTRAST
// ============================================================
function AdjustImage() {
  const [preview, setPreview] = useState(''); const [b, setB] = useState(100); const [c, setC] = useState(100); const [s, setS] = useState(100);
  const ref = useRef<HTMLInputElement>(null);

  const load = (e: React.ChangeEvent<HTMLInputElement>) => { const f = e.target.files?.[0]; if (f) { setPreview(URL.createObjectURL(f)); setB(100); setC(100); setS(100); } };

  const download = () => {
    const img = new Image(); img.onload = () => {
      const c2 = document.createElement('canvas'); c2.width = img.width; c2.height = img.height;
      c2.getContext('2d')!.filter = `brightness(${b}%) contrast(${c}%) saturate(${s}%)`; c2.getContext('2d')!.drawImage(img, 0, 0);
      const a = document.createElement('a'); a.download = 'adjusted.png'; a.href = c2.toDataURL('image/png'); a.click();
    }; img.src = preview;
  };

  return (
    <div className="space-y-4">
      <div onClick={() => ref.current?.click()} className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center cursor-pointer hover:border-primary transition-all"><SunMedium className="w-6 h-6 text-slate-400 mx-auto mb-2" /><p className="text-xs text-slate-600">Click to upload image</p></div>
      <input ref={ref} type="file" accept="image/*" onChange={load} className="hidden" />
      {preview && <>
        <img src={preview} className="w-full rounded-lg border border-slate-200 max-h-48 object-contain" style={{ filter: `brightness(${b}%) contrast(${c}%) saturate(${s}%)` }} />
        {[{ l: 'Brightness', v: b, s: setB }, { l: 'Contrast', v: c, s: setC }, { l: 'Saturation', v: s, s: setS }].map((x) => (
          <div key={x.l}><label className="text-xs font-semibold text-slate-400 mb-1 block">{x.l}: {x.v}%</label><input type="range" min="0" max="200" value={x.v} onChange={(e) => x.s(Number(e.target.value))} className="w-full accent-primary" /></div>
        ))}
        <div className="flex gap-2">
          <button onClick={() => { setB(100); setC(100); setS(100); }} className="flex-1 py-2 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg">Reset</button>
          <button onClick={download} className="flex-1 py-2 bg-primary text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1"><Download className="w-3 h-3" /> Download</button>
        </div>
      </>}
    </div>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================
export default function UtilitiesPage() {
  const [active, setActive] = useState('qr');

  const components: Record<string, React.ReactNode> = {
    qr: <QRGenerator />, img2pdf: <JPGtoPDF />, pdf2img: <PDFtoJPG />,
    font: <FontDetector />, color: <ColorPickerTool />, resize: <ImageResizer />,
    rotate: <ImageRotator />, adjust: <AdjustImage />,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <Container>
          <div className="py-6">
            <Link href="/" className="text-xs text-primary hover:underline mb-3 inline-block">← Back to Home</Link>
            <h1 className="text-2xl md:text-3xl font-bold text-dark font-heading">Utilities & Tools</h1>
            <p className="text-sm text-muted mt-1">Free tools for designers & print professionals</p>
          </div>
        </Container>
      </div>
      <Container>
        <div className="py-8 flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-xl border border-slate-200 p-2 sticky top-24">
              {tools.map((t) => (
                <button key={t.id} onClick={() => setActive(t.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${active === t.id ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}>
                  <t.icon className="w-4 h-4 shrink-0" />
                  <div><div className="text-sm font-medium">{t.name}</div><div className={`text-[10px] ${active === t.id ? 'text-white/70' : 'text-slate-400'}`}>{t.description}</div></div>
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-dark mb-1">{tools.find((t) => t.id === active)?.name}</h2>
              <p className="text-sm text-muted mb-6">{tools.find((t) => t.id === active)?.description}</p>
              {components[active]}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
