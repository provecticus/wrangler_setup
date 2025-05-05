export default {
  async fetch(request, env) {
    return new Response("Hello from your Cloudflare Worker!", {
      headers: { "Content-Type": "text/plain" },
    });
  },
};
