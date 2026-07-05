import React, { useState } from "react";
import "./ReferralLinkShare.css";

/**
 * `share` shape from API: { link, code }.
 * Spec requires BOTH copy buttons to say exactly "Copy" (not "Copy Link"/
 * "Copy Code") — differentiate them via aria-label instead, so assistive
 * tech users can still tell them apart without changing visible text.
 */
export default function ReferralLinkShare({ share }) {
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text ?? "");
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <section className="referral-link-share" aria-label="Share referral">
      <h2>Refer friends and earn more</h2>

      <label htmlFor="referral-link">Your Referral Link</label>
      <div className="share-row">
        <input id="referral-link" type="text" readOnly value={share?.link ?? ""} />
        <button
          type="button"
          aria-label="Copy referral link"
          onClick={() => handleCopy(share?.link, "link")}
        >
          Copy
        </button>
      </div>

      <label htmlFor="referral-code">Your Referral Code</label>
      <div className="share-row">
        <input id="referral-code" type="text" readOnly value={share?.code ?? ""} />
        <button
          type="button"
          aria-label="Copy referral code"
          onClick={() => handleCopy(share?.code, "code")}
        >
          Copy
        </button>
      </div>

      {copiedField && <span className="copied-toast">Copied!</span>}
    </section>
  );
}
