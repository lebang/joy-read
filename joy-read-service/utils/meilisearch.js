import { MeiliSearch } from 'meilisearch'
import processEnv from './process-env.js'

const searchClient = new MeiliSearch({
  host: processEnv.MEILISEARCH_HOST,
  apiKey: processEnv.MEILISEARCH_API_KEY,
})


let articlesIndex;

// 初始化索引
async function initializeIndex() {
  try {
    articlesIndex = await searchClient.getIndex('articles');
  } catch (error) {
    articlesIndex = await searchClient.createIndex('articles');
  }

  // 配置索引设置
  try {
    await articlesIndex.updateSettings({
      searchableAttributes: ['title', 'content'],
      sortableAttributes: ['updatedAt'],
    });
  } catch (error) {
    console.error('Failed to update MeiliSearch settings:', error);
  }
}

// 立即初始化
initializeIndex().catch(error => {
  console.error('Failed to initialize MeiliSearch:', error);
});

export { searchClient, articlesIndex }