'use strict';

function normalizeBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try { return JSON.parse(req.body); } catch { return null; }
  }
  return null;
}

function rpcError(id, code, message, data) {
  const error = { code, message };
  if (data !== undefined) error.data = data;
  return { jsonrpc: '2.0', id: id ?? null, error };
}

function safeTelemetry(name, toolName, params, ok, elapsedMs) {
  try {
    const meta = params?._meta || {};
    const event = {
      event: 'money_plugin_tool_call',
      plugin: name,
      tool: toolName,
      ok: Boolean(ok),
      elapsed_ms: elapsedMs,
      subject: meta['openai/subject'] || null,
      session: meta['openai/session'] || null,
      organization: meta['openai/organization'] || null,
      locale: meta['openai/locale'] || null
    };
    console.log(JSON.stringify(event));
  } catch {}
}

function createMcpHandler({ name, version = '1.0.0', instructions, tools, callTool }) {
  const toolMap = new Map(tools.map(t => [t.name, t]));

  async function process(message) {
    if (!message || message.jsonrpc !== '2.0' || typeof message.method !== 'string') {
      return rpcError(message?.id, -32600, 'Invalid Request');
    }

    const { id, method, params } = message;

    if (method === 'notifications/initialized' || method.startsWith('notifications/')) return null;

    if (method === 'initialize') {
      return {
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: params?.protocolVersion || '2025-06-18',
          capabilities: { tools: { listChanged: false } },
          serverInfo: { name, version },
          instructions
        }
      };
    }

    if (method === 'ping') return { jsonrpc: '2.0', id, result: {} };
    if (method === 'tools/list') return { jsonrpc: '2.0', id, result: { tools } };

    if (method === 'tools/call') {
      const toolName = params?.name;
      const args = params?.arguments || {};
      if (!toolMap.has(toolName)) return rpcError(id, -32602, `Unknown tool: ${toolName}`);
      const started = Date.now();
      try {
        const output = await callTool(toolName, args);
        safeTelemetry(name, toolName, params, true, Date.now() - started);
        return {
          jsonrpc: '2.0',
          id,
          result: {
            content: [{ type: 'text', text: JSON.stringify(output) }],
            structuredContent: output,
            isError: false
          }
        };
      } catch (err) {
        safeTelemetry(name, toolName, params, false, Date.now() - started);
        return {
          jsonrpc: '2.0',
          id,
          result: {
            content: [{ type: 'text', text: String(err?.message || err) }],
            isError: true
          }
        };
      }
    }

    return rpcError(id, -32601, `Method not found: ${method}`);
  }

  return async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'content-type, authorization, mcp-session-id, mcp-protocol-version');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

    if (req.method === 'OPTIONS') return res.status(204).end();
    if (req.method === 'GET') return res.status(405).json({ error: 'Use MCP Streamable HTTP via POST.' });
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const body = normalizeBody(req);
    if (!body) return res.status(400).json(rpcError(null, -32700, 'Parse error'));

    const items = Array.isArray(body) ? body : [body];
    const outputs = [];
    for (const item of items) {
      const out = await process(item);
      if (out) outputs.push(out);
    }

    if (!outputs.length) return res.status(202).end();
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.status(200).json(Array.isArray(body) ? outputs : outputs[0]);
  };
}

module.exports = { createMcpHandler };
