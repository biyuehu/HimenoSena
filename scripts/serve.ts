const clients: WebSocket[] = [];

const bundles = new Map([
  ["/bundle.js", "src/main.ts"],
  ["/blacklist.bundle.js", "src/blacklist.ts"],
]);

async function watchFiles() {
  let lastChanged = 0;

  for await (const event of Deno.watchFs(["data", "public", "src"])) {
    if (Date.now() - lastChanged < 500) continue;
    if (["modify", "create", "remove"].includes(event.kind)) {
      console.log(`File ${event.paths[0]} ${event.kind}`);
      lastChanged = Date.now();
      clients.map((socket) => socket.send(""));
    }
  }
}

function handleWebSocket(req: Request) {
  const { socket, response } = Deno.upgradeWebSocket(req);
  clients.push(socket);
  socket.onclose = () => {
    const index = clients.indexOf(socket);
    if (index !== -1) clients.splice(index, 1);
  };
  return response;
}

function handleStatic(filePath: string) {
  const contentType = [
    ["html", "text/html"],
    ["js", "application/javascript"],
    ["css", "text/css"],
    ["txt", "text/plain"],
    ["png", "image/png"],
    ["jpg", "image/jpeg"],
    ["jpeg", "image/jpeg"],
    ["gif", "image/gif"],
    ["svg", "image/svg+xml"],
    ["ico", "image/x-icon"],
    ["json", "application/json"],
    ["mp3", "audio/mpeg"],
  ].find(([ext]) => filePath.endsWith(`.${ext}`))?.[1] ?? "text/plain";
  try {
    const file = Deno.readFileSync(filePath);
    return new Response(
      contentType === "text/html"
        ? /* html */ `${
          new TextDecoder().decode(
            file,
          )
        }<script>(() => { const ws = new WebSocket(\`ws://\${window.location.host}/ws\`); ws.onmessage = (_) => window.location.reload(); })()</script>`
        : file,
      {
        status: 200,
        headers: { "Content-Type": contentType },
      },
    );
  } catch {
    return new Response("File not found", { status: 404 });
  }
}

async function handleBundled(entry: string) {
  return new Response(
    new TextDecoder().decode(
      (
        await new Deno.Command(Deno.execPath(), {
          args: ["bundle", "--platform", "browser", entry],
        }).output()
      ).stdout,
    ),
    {
      status: 200,
      headers: { "Content-Type": "application/javascript" },
    },
  );
}

watchFiles();

async function fetch(req: Request) {
  const { pathname } = new URL(req.url);
  if (pathname === "/ws") {
    return handleWebSocket(req);
  }
  const bundleEntry = bundles.get(pathname);
  if (bundleEntry) {
    return await handleBundled(bundleEntry);
  }
  if (pathname.startsWith("/data/")) {
    return handleStatic(pathname.slice(1));
  }
  return handleStatic(`public${pathname === "/" ? "/index.html" : pathname}`);
}

export default { fetch };
