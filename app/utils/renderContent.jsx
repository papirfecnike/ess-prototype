import React from "react";

export function renderContentBlock(text, index) {
  if (!text || text.trim() === "") {
    return <br key={index} />;
  }

  // STRONG
  if (text.startsWith("[strong]") && text.endsWith("[/strong]")) {
    return (
      <p key={index}>
        <strong>{text.replace("[strong]", "").replace("[/strong]", "")}</strong>
      </p>
    );
  }

  // QUOTE
  if (text.startsWith("[quote]") && text.includes("[/quote]")) {
    const quote = text
      .replace("[quote]", "")
      .replace("[/quote]", "")
      .trim();

    return (
      <blockquote key={index} className="publication-quote">
        {quote}
      </blockquote>
    );
  }

  // DEFAULT PARAGRAPH
  return <p key={index}>{text}</p>;
}
