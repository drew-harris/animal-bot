import Fastify from "fastify";
import { readFile } from "fs/promises";
import { join } from "path";
import { fileURLToPath } from "url";

const fastify = Fastify({
  logger: true,
});

fastify.get("/", function (request, reply) {
  reply.send({ hello: "world" });
});

fastify.get("/:slug", async function (request, reply) {
  const { slug } = request.params as { slug: string };
  
  try {
    const html = await readFile(join(process.cwd(), "sites", slug, "index.html"), "utf-8");
    reply.type("text/html").send(html);
  } catch (error) {
    reply.code(404).send({ error: "Website not found" });
  }
});

fastify.get("/:slug/script.js", async function (request, reply) {
  const { slug } = request.params as { slug: string };
  
  try {
    const js = await readFile(join(process.cwd(), "sites", slug, "script.js"), "utf-8");
    reply.type("application/javascript").send(js);
  } catch (error) {
    reply.code(404).send({ error: "JavaScript file not found" });
  }
});

const startServer = () => {
  fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    // Server is now listening on ${address}
  });
};

export { startServer };
