(function () {
  if (typeof document !== 'undefined') {
    var links = [
      { href: '/api-reference.yaml', rel: 'service-desc', type: 'application/openapi+yaml' },
      { href: '/.well-known/mcp/server-card.json', rel: 'describedby', type: 'application/json' },
    ];
    links.forEach(function (l) {
      var el = document.createElement('link');
      el.rel = l.rel;
      el.href = l.href;
      if (l.type) el.type = l.type;
      document.head.appendChild(el);
    });
  }

  if (typeof navigator === 'undefined' || !navigator.modelContext) return;

  navigator.modelContext.registerTool({
    name: 'search-docs',
    description:
      'Search the Payviox documentation for information about payment integration, SDK usage, API endpoints, webhooks, and payouts.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search query' },
      },
      required: ['query'],
    },
    async execute({ query }) {
      const res = await fetch(
        '/api/search?query=' + encodeURIComponent(query)
      );
      if (!res.ok) return { error: 'Search request failed' };
      return await res.json();
    },
  });

  navigator.modelContext.registerTool({
    name: 'get-openapi-spec',
    description:
      'Get the Payviox OpenAPI specification URL for programmatic API integration.',
    inputSchema: { type: 'object', properties: {} },
    async execute() {
      return {
        url: 'https://docs.payviox.com/api-reference.yaml',
        format: 'openapi-3.0.3',
      };
    },
  });
})();
