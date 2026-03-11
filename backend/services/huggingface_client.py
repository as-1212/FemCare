from __future__ import annotations

import os
from dataclasses import dataclass

import httpx


@dataclass(frozen=True)
class HuggingFaceConfig:
    api_token: str
    model: str
    timeout_s: float = 20.0


class HuggingFaceInferenceError(RuntimeError):
    pass


def load_hf_config() -> HuggingFaceConfig | None:
    token = os.getenv("HF_API_TOKEN")
    model = os.getenv("HF_ANEMIA_MODEL")
    if not token or not model:
        return None
    return HuggingFaceConfig(api_token=token, model=model)


async def run_inference_text(
    cfg: HuggingFaceConfig,
    prompt: str,
) -> str:
    """
    Minimal Hugging Face Inference API call (text in → text out).
    For the demo we keep prediction simulated unless HF is configured.
    """
    url = f"https://api-inference.huggingface.co/models/{cfg.model}"
    headers = {"Authorization": f"Bearer {cfg.api_token}"}
    payload = {"inputs": prompt}

    async with httpx.AsyncClient(timeout=cfg.timeout_s) as client:
        r = await client.post(url, headers=headers, json=payload)
        if r.status_code >= 400:
            raise HuggingFaceInferenceError(
                f"HF inference error ({r.status_code}): {r.text[:300]}"
            )

        data = r.json()
        # Common response shapes: list[{"generated_text": "..."}] or {"generated_text": "..."}
        if isinstance(data, list) and data and isinstance(data[0], dict):
            gt = data[0].get("generated_text")
            if isinstance(gt, str):
                return gt
        if isinstance(data, dict) and isinstance(data.get("generated_text"), str):
            return data["generated_text"]
        return str(data)[:1000]

