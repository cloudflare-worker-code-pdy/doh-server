export default {
  async fetch(request, env, ctx) {
    // 构造多个 DoH 服务的请求 URLs
    const dohUrls = [
      `https://cloudflare-dns.com/dns-query?${new URL(request.url).searchParams}`,
      `https://1.1.1.1/dns-query?${new URL(request.url).searchParams}`,
      `https://1.0.0.1/dns-query?${new URL(request.url).searchParams}`
    ];

    // 准备所有请求的 promise
    const promises = dohUrls.map(url => {
      return fetch(url, {
        method: request.method,
        body: request.method === 'POST' ? request.body : undefined,
        headers: { 'accept': 'application/dns-message' }
      });
    });

    // 使用 Promise.race() 来获取最先响应的请求
    const firstResponse = await Promise.race(promises);

    // 返回最先响应的结果
    return firstResponse;
  }
}