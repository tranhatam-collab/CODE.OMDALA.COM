import { normalizeLanguage } from "../../assets/registry-data.js";
import { json, optionsResponse } from "../_lib/registry.js";
import { MintWriterError, submitMintTransaction, validateMintEnvironment } from "../_lib/mint-writer.js";
import { finalizeIssuedToken, getApprovalRecord } from "../_lib/trust.js";

export const onRequestOptions = () => optionsResponse();

export const onRequestPost = async ({ request, env }) => {
  const payload = await request.json().catch(() => ({}));
  const language = normalizeLanguage(payload.lang || payload.language);
  const approvalId = payload.approvalId;

  if (!approvalId) {
    return json({
      ok: false,
      code: "APPROVAL_REQUIRED",
      message: language === "vi"
        ? "Issue bị chặn vì chưa có approval hoàn tất."
        : "Issuance is blocked because no completed approval was provided.",
    }, 409);
  }

  const approval = await getApprovalRecord(env, approvalId, language);
  if (!approval) {
    return json({
      ok: false,
      code: "APPROVAL_NOT_FOUND",
      message: language === "vi"
        ? "Không tìm thấy approval để issue."
        : "The approval required for issuance was not found.",
    }, 404);
  }

  const preview = approval.preview;

  if (approval.status !== "approved") {
    return json({
      ok: false,
      code: "APPROVAL_REQUIRED",
      message: language === "vi"
        ? "Issue bị chặn vì approval chưa được duyệt."
        : "Issuance is blocked because approval has not been granted.",
      approval,
    }, 409);
  }

  if (!preview?.gateSummary?.ready) {
    return json({
      ok: false,
      code: "GATES_NOT_READY",
      message: language === "vi"
        ? "Issue bị chặn vì 5 mint gates chưa đạt."
        : "Issuance is blocked because the 5 mint gates are not satisfied.",
      approval,
    }, 422);
  }

  if (!preview?.collection?.publicReady) {
    return json({
      ok: false,
      code: "COLLECTION_NOT_PUBLIC_READY",
      message: language === "vi"
        ? "Issue bị chặn vì collection chưa public-ready."
        : "Issuance is blocked because the collection is not public-ready.",
      approval,
    }, 409);
  }

  const mintConfig = validateMintEnvironment(env);
  if (!mintConfig.ok) {
    return json({
      ok: false,
      code: "MINT_NOT_CONFIGURED",
      message: language === "vi"
        ? "Worker phát hành đã sẵn sàng đầu vào, nhưng môi trường mint on-chain còn thiếu cấu hình bắt buộc."
        : "The issuance worker has a mint-ready payload, but the on-chain mint environment is still missing required configuration.",
      missing: mintConfig.missing,
      note: mintConfig.note ?? null,
      approval,
      preview,
    }, 501);
  }

  try {
    const liveMint = await submitMintTransaction({ env, payload: approval.payload, preview });
    const issued = await finalizeIssuedToken({
      env,
      approvalId,
      liveMint,
      actor: payload.actor || "IAI Mint Worker",
      note: payload.note || "",
      languageInput: language,
    });

    return json({
      ok: true,
      code: liveMint.receipt ? "MINT_CONFIRMED" : "MINT_SUBMITTED",
      message: language === "vi"
        ? (liveMint.receipt
          ? "Giao dịch mint đã được xác nhận on-chain."
          : "Giao dịch mint đã được gửi lên mạng on-chain.")
        : (liveMint.receipt
          ? "The mint transaction has been confirmed on-chain."
          : "The mint transaction has been submitted to the target chain."),
      approval: issued.approval,
      token: issued.token,
      preview,
      liveMint,
    }, liveMint.receipt ? 200 : 202);
  } catch (error) {
    if (error instanceof MintWriterError) {
      return json({
        ok: false,
        code: error.code,
        message: language === "vi"
          ? `Mint on-chain thất bại: ${error.message}`
          : `On-chain mint failed: ${error.message}`,
        details: error.details ?? null,
        approval,
        preview,
      }, error.status);
    }

    return json({
      ok: false,
      code: "MINT_EXECUTION_FAILED",
      message: language === "vi"
        ? "Giao dịch mint đã đi vào worker, nhưng lỗi không xác định xảy ra khi gửi lên chain."
        : "The mint request reached the worker, but an unexpected error occurred while sending it on-chain.",
      details: error instanceof Error ? error.message : String(error),
      approval,
      preview,
    }, 502);
  }
};
