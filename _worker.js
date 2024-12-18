export default {
  async fetch(request, env, ctx) {
    return fetch(
      request.method === 'GET'
        ? `https://cloudflare-dns.com/dns-query?${new URL(request.url).searchParams}`
        : 'https://cloudflare-dns.com/dns-query',
      {
        method: request.method,
        body: request.method === 'POST' ? request.body : undefined,
        headers: { 'accept': 'application/dns-message' }
      }
    )
  }
}
