import { type Descendant, Text } from "slate";

export const serialize = (nodes: Descendant[]): string => {
  return nodes
    .map((node) => {
      if (Text.isText(node)) {
        let text = node.text;
        if (node.bold) text = `<strong>${text}</strong>`;
        if (node.italic) text = `<em>${text}</em>`;
        if (node.underline) text = `<u>${text}</u>`;
        if (node.strikethrough) text = `<s>${text}</s>`;
        return text;
      }

      const children = serialize(node.children);

      const align = (node as any).align
        ? ` style="text-align:${(node as any).align};"`
        : "";

      switch (node.type) {
        case "paragraph": {
          const content = children.trim();
          return content === "" ? "<br />" : `<p${align}>${children}</p>`;
        }
        case "heading-two":
          return `<h2${align}>${children}</h2>`;
        case "heading-three":
          return `<h3${align}>${children}</h3>`;
        case "bulleted-list":
          return `<ul${align}>${children}</ul>`;
        case "numbered-list":
          return `<ol${align}>${children}</ol>`;
        case "list-item":
          return `<li${align}>${children}</li>`;
        case "image":
          return `<img src="/uploads/${(node as any).url}" alt="${(node as any).alt || ""}" />`;
        default:
          return `<p${align}>${children}</p>`;
      }
    })
    .join("");
};
