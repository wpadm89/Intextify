// lib/rateLimit.js
const rateLimit = (options) => {
  const tokenCache = new Map();

  return {
    check: (ip, limit, windowMs) =>
      new Promise((resolve, reject) => {
        const now = Date.now();
        const windowStart = now - windowMs;
        let tokens = tokenCache.get(ip) || [];

        // remove expired tokens
        tokens = tokens.filter((time) => time > windowStart);
        tokens.push(now);

        tokenCache.set(ip, tokens);

        const remaining = Math.max(0, limit - tokens.length);

        if (tokens.length > limit) {
          reject({ error: "Rate limit exceeded", remaining: 0, limit });
        } else {
          resolve({ remaining, limit });
        }
      }),
  };
};

export default rateLimit;
