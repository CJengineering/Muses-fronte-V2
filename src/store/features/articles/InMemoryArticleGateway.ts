import { Article, ArticleGateway } from 'src/app/interfaces';
import { TableStatus } from 'src/features/table/tableSlice';

export  class ApiArticleGateway implements ArticleGateway {
  async fetchArticles(): Promise<Article[]> {
    let id = 1;
    const response = await fetch(`https://new-alerts-e4f6j5kdsq-ew.a.run.app/articles`);
    const data: any = await response.json();
    return data;
  }
}


export class InMemoryArticleGateway implements ArticleGateway {
  async fetchArticles(): Promise<Article[]> {
    return [
      {
        id: 123,
    title: 'Vladimir is winning the war',
    link: 'russiatoday.fr',
    url_link: undefined,
    published: '2021-01-01',
    posted: true,
    key_word: {
      key_word: 'Vladimir',
    },
    created_at: '2021-01-01',
    updated_at: '2021-01-01',
    key_word_id: 100,
    score: 32,
    score_second: 0,
    category_label: 'Politics',
    source: "articles"
      },
    ];
  }

  
}