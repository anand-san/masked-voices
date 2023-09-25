export const defaultEditorContent = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "This is your editor" }],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Start typing and just use slash (/) whenever you need additional options",
        },
      ],
    },
    {
      type: "image",
      attrs: {
        src: "https://as1.ftcdn.net/v2/jpg/04/91/40/74/1000_F_491407495_3b2v9r5zR4qZQOXKry2UjPUDjH5iGWtT.jpg",
        alt: "banner.png",
        title: "banner.png",
        width: null,
        height: null,
      },
    },
  ],
};
