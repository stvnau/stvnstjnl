import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function researchWithWebSearch(
  prompt: string,
  maxSearches: number = 5
): Promise<{ text: string; citations: { url: string; title: string }[] }> {
  const response = await client.messages.create({
    model: "claude-sonnet-4-6-20250514",
    max_tokens: 4096,
    tools: [
      {
        type: "web_search_20260209",
        name: "web_search",
        max_uses: maxSearches,
      },
    ],
    messages: [{ role: "user", content: prompt }],
  });

  let text = "";
  const citations: { url: string; title: string }[] = [];

  for (const block of response.content) {
    if (block.type === "text") {
      text += block.text;
      if ("citations" in block && Array.isArray(block.citations)) {
        for (const cite of block.citations) {
          if (
            cite.type === "web_search_result_location" &&
            !citations.some((c) => c.url === cite.url)
          ) {
            citations.push({ url: cite.url, title: cite.title ?? "" });
          }
        }
      }
    }
  }

  return { text, citations };
}
