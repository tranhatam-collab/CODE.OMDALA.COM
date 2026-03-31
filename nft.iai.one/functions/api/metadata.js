import { normalizeLanguage } from "../../assets/registry-data.js";
import { buildTokenMetadata, getCollectionBySlug, json, optionsResponse } from "../_lib/registry.js";
import { getTokenRecord } from "../_lib/trust.js";

export const onRequestOptions = () => optionsResponse();

export const onRequestGet = async ({ request, env }) => {
  const url = new URL(request.url);
  const collectionSlug = url.searchParams.get("collection");
  const tokenId = url.searchParams.get("token") || "DEMO-0001";
  const language = normalizeLanguage(url.searchParams.get("lang"));

  if (!collectionSlug) {
    return json({
      ok: false,
      error: language === "vi" ? "Thiếu tham số collection." : "Missing collection parameter.",
    }, 400);
  }

  const collection = getCollectionBySlug(collectionSlug);
  if (!collection) {
    return json({
      ok: false,
      error: language === "vi" ? "Không tìm thấy bộ sưu tập yêu cầu." : "Requested collection was not found.",
    }, 404);
  }

  const storedToken = await getTokenRecord(env, collectionSlug, tokenId, language);

  const payload = {
    recipientName: url.searchParams.get("recipient"),
    walletAddress: url.searchParams.get("wallet"),
    contentHash: url.searchParams.get("contentHash"),
    proofUrl: url.searchParams.get("proofUrl"),
    externalUrl: url.searchParams.get("externalUrl"),
    externalId: url.searchParams.get("externalId"),
    image: url.searchParams.get("image"),
    title: url.searchParams.get("title"),
  };

  const resolvedPayload = storedToken
    ? {
        recipientName: storedToken.recipientName,
        walletAddress: storedToken.walletAddress,
        contentHash: storedToken.contentHash,
        proofUrl: storedToken.proofUrl,
        externalUrl: storedToken.externalUrl,
        externalId: storedToken.externalId,
        image: payload.image,
        title: storedToken.title,
      }
    : payload;

  const metadata = await buildTokenMetadata({
    collection,
    tokenId,
    payload: resolvedPayload,
    languageInput: language,
  });

  return json(metadata);
};
