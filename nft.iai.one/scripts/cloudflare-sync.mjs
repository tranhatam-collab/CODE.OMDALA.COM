import { cloudflareApi, loadPagesConfig, resolveAccountId, resolveApiToken, runWrangler } from "./cloudflare-utils.mjs";

async function ensureProject(project, config, accountId) {
  const projectPath = `/accounts/${accountId}/pages/projects/${project.projectName}`;

  try {
    const existing = await cloudflareApi(projectPath, {
      token: await resolveApiToken(),
    });
    console.log(`Pages project ok: ${existing.name}`);
    return existing;
  } catch (error) {
    if (!(error instanceof Error) || !error.message.toLowerCase().includes("project not found")) {
      throw error;
    }
  }

  console.log(`Creating Pages project: ${project.projectName}`);
  runWrangler(
    [
      "pages",
      "project",
      "create",
      project.projectName,
      "--production-branch",
      config.productionBranch,
    ],
    {
      CLOUDFLARE_ACCOUNT_ID: accountId,
    },
  );

  return cloudflareApi(projectPath, {
    token: await resolveApiToken(),
  });
}

async function ensureDomains(project, accountId, token) {
  const currentDomains = await cloudflareApi(
    `/accounts/${accountId}/pages/projects/${project.projectName}/domains`,
    { token },
  );
  const active = new Set(currentDomains.map((item) => item.name));
  const attached = [];

  for (const domain of project.customDomains) {
    const existing = currentDomains.find((item) => item.name === domain);
    if (existing) {
      console.log(`Domain ok: ${project.projectName} -> ${domain}`);
      attached.push(existing);
      continue;
    }

    console.log(`Attaching domain: ${project.projectName} -> ${domain}`);
    const created = await cloudflareApi(
      `/accounts/${accountId}/pages/projects/${project.projectName}/domains`,
      {
        method: "POST",
        body: { name: domain },
        token,
      },
    );
    attached.push(created);
  }

  return attached;
}

async function ensureDnsRecord(project, domainEntry, token) {
  if (!domainEntry.zone_tag) {
    console.warn(`Skip DNS sync for ${domainEntry.name}: missing zone tag.`);
    return;
  }

  try {
    const dnsTarget = `${project.projectName}.pages.dev`;
    const existingRecords = await cloudflareApi(
      `/zones/${domainEntry.zone_tag}/dns_records?type=CNAME&name=${encodeURIComponent(domainEntry.name)}`,
      { token },
    );

    if (existingRecords.some((record) => record.name === domainEntry.name && record.content === dnsTarget)) {
      console.log(`DNS ok: ${domainEntry.name} -> ${dnsTarget}`);
      return;
    }

    console.log(`Creating DNS CNAME: ${domainEntry.name} -> ${dnsTarget}`);

    await cloudflareApi(
      `/zones/${domainEntry.zone_tag}/dns_records`,
      {
        method: "POST",
        body: {
          type: "CNAME",
          name: domainEntry.name,
          content: dnsTarget,
          proxied: true,
          ttl: 1,
        },
        token,
      },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`DNS auto-create skipped for ${domainEntry.name}: ${message}`);
  }
}

async function main() {
  const config = await loadPagesConfig();
  const accountId = resolveAccountId(config);
  const token = await resolveApiToken();

  for (const project of config.projects) {
    await ensureProject(project, config, accountId);
    const domains = await ensureDomains(project, accountId, token);
    for (const domainEntry of domains) {
      await ensureDnsRecord(project, domainEntry, token);
    }
  }

  console.log("Cloudflare Pages project and custom domain are in sync.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
