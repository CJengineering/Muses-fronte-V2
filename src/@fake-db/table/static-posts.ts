import { Post } from "src/app/interfaces";

export const rows: Post[] = [
    {
      id: 1,
      key_word_id: 101,
      title: "Post 1",
      published: "2023-11-01",
      link: "https://example.com/post1",
      category_label: "Technology",
      score: 85,
      score_second: 90,
      source: "bing",
      created_at: "2023-11-01T10:00:00Z",
      updated_at: "2023-11-01T12:00:00Z",
      key_word: {
        key_word: "keyword1",
      },
      comments: [],
    },
    {
      id: 2,
      key_word_id: 102,
      title: "Post 2",
      published: "2023-11-02",
      link: "https://example.com/post2",
      category_label: null,
      score: 75,
      score_second: 88,
      source: "google",
      created_at: "2023-11-02T11:00:00Z",
      updated_at: "2023-11-02T13:00:00Z",
      key_word: {
        key_word: "keyword2",
      },
      comments: [],
    },
    // Add more Post objects as needed
  ];
  