addEventListener('fetch', e => e.respondWith(
  fetch(e.request.method === 'GET' 
    ? `https://cloudflare-dns.com/dns-query?${new URL(e.request.url).searchParams}`
    : 'https://cloudflare-dns.com/dns-query',
    {
      method: e.request.method,
      body: e.request.method === 'POST' ? e.request.body : undefined,
      headers: {'accept': 'application/dns-message'}
    }
  )
))
