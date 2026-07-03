import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const GONE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="refresh" content="3;url=/" />
  <meta name="robots" content="noindex, nofollow" />
  <title>Page Removed | Aiqwip</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: Lato, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      display: flex; align-items: center; justify-content: center;
      height: 100vh; background: #fff; color: #0f172a;
    }
.container { text-align: center; }
    h1 { font-size: 7rem; font-weight: 700; line-height: 1; }
    .subtitle { font-size: 1.25rem; font-weight: 500; margin-top: 0.25rem; }
    .msg { color: #64748b; margin-top: 0.5rem; }
    .actions { display: flex; gap: 1rem; justify-content: center; margin-top: 1.5rem; }
    .btn {
      display: inline-flex; align-items: center; padding: 0.5rem 1.25rem;
      border-radius: 0.5rem; font-size: 0.875rem; font-weight: 500;
      text-decoration: none; transition: all 0.2s;
    }
    .btn-primary { background: #f97015; color: #fff; }
    .btn-primary:hover { background: #ea580c; }
    .btn-outline { border: 1px solid #e2e8f0; color: #0f172a; background: transparent; }
    .btn-outline:hover { background: #f1f5f9; }
    .nav { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; margin-top: 2rem; }
    .nav a { color: #64748b; font-size: 0.875rem; text-decoration: none; transition: color 0.2s; }
    .nav a:hover { color: #f97015; }
    .countdown { color: #94a3b8; font-size: 0.75rem; margin-top: 1.5rem; }
  </style>
</head>
<body>
  <div class="container">
    <h1>410</h1>
    <div class="subtitle">Page Removed</div>
    <p class="msg">This page has been permanently removed.</p>
    <div class="actions">
      <a href="/" class="btn btn-primary">Back to Home</a>
      <a href="/contact-us" class="btn btn-outline">Contact Us</a>
    </div>
    <nav class="nav">
      <a href="/">Home</a>
      <a href="/services">Services</a>
      <a href="/solutions">Solutions</a>
      <a href="/blogs">Blog</a>
      <a href="/contact-us">Contact</a>
    </nav>
    <p class="countdown">Redirecting to homepage in <span id="t">3</span>s&hellip;</p>
  </div>
  <script>
    let s = 3;
    const el = document.getElementById("t");
    const i = setInterval(() => { s--; if (el) el.textContent = String(s); if (s <= 0) clearInterval(i); }, 1000);
  </script>
</body>
</html>`;

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Match numeric-only spam paths like /361150818
  const isNumericSpam = /^\/\d+$/.test(pathname);

  // Match random directory + .html spam paths like /xknsc/b1091009.html
  const isHtmlSpam = /^\/[a-z]{3,6}\/[a-z]\d+\.html$/.test(pathname);

  if (isNumericSpam || isHtmlSpam) {
    return new NextResponse(GONE_HTML, {
      status: 410,
      statusText: "Gone",
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};
