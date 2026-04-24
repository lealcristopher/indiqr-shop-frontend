const CONTENT_TYPES = {
  html:  'text/html; charset=utf-8',
  css:   'text/css',
  js:    'application/javascript',
  png:   'image/png',
  jpg:   'image/jpeg',
  jpeg:  'image/jpeg',
  webp:  'image/webp',
  svg:   'image/svg+xml',
  ico:   'image/x-icon',
  woff2: 'font/woff2',
  woff:  'font/woff',
};

function contentType(path) {
  const ext = path.split('.').pop().toLowerCase();
  return CONTENT_TYPES[ext] ?? 'application/octet-stream';
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let path = url.pathname.replace(/^\//, '');

    if (!path) {
      return new Response('Not found', { status: 404 });
    }

    // media/ — arquivos imutáveis com UUID na chave, sem redirect
    if (path.startsWith('media/')) {
      const object = await env.SHOP_BUCKET.get(path);
      if (!object) return new Response('Not found', { status: 404 });
      const headers = new Headers();
      headers.set('content-type', contentType(path));
      headers.set('cache-control', 'public, max-age=31536000, immutable');
      headers.set('etag', object.httpEtag);
      return new Response(object.body, { headers });
    }

    // sites estáticos — /handle → redirect, /handle/ → index.html
    if (!path.includes('.') && !path.endsWith('/')) {
      return Response.redirect(url.origin + '/' + path + '/', 301);
    }
    if (path.endsWith('/')) {
      path += 'index.html';
    }

    const object = await env.SHOP_BUCKET.get(path);
    if (!object) return new Response('Not found', { status: 404 });

    const headers = new Headers();
    headers.set('content-type', contentType(path));
    headers.set('cache-control', 'no-cache');
    headers.set('etag', object.httpEtag);

    return new Response(object.body, { headers });
  },
};
