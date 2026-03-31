import { normalizeLanguage } from "../../../../assets/registry-data.js";
import { buildTokenMetadata, getCollectionBySlug, json } from "../../../_lib/registry.js";
import { getTokenRecord } from "../../../_lib/trust.js";

export const onRequestGet = async ({ params, request, env }) => {
  const language = normalizeLanguage(new URL(request.url).searchParams.get("lang"));
  const collectionSlug = params.collection;
  const tokenId = params.tokenId;
  const collection = getCollectionBySlug(collectionSlug);

  if (!collection) {
    return json({
      ok: false,
      error: language === "vi" ? "Không tìm thấy collection yêu cầu." : "Requested collection was not found.",
    }, 404);
  }

  const token = await getTokenRecord(env, collectionSlug, tokenId, language);

  const metadata = await buildTokenMetadata({
    collection,
    tokenId,
    payload: token
      ? {
          recipientName: token.recipientName,
          walletAddress: token.walletAddress,
          contentHash: token.contentHash,
          proofUrl: token.proofUrl,
          externalUrl: token.externalUrl,
          externalId: token.externalId,
          title: token.title,
        }
      : {},
    languageInput: language,
  });

  return json(metadata);
};
