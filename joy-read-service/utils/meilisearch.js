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
    // 获取索引对象（如果不存在会自动创建）
    articlesIndex = searchClient.index('articles');
    
    // 配置索引设置
    await articlesIndex.updateSettings({
      searchableAttributes: ['title', 'content'],
      sortableAttributes: ['updatedAt'],
    });
    
    console.log('MeiliSearch index initialized successfully');
  } catch (error) {
    console.error('Failed to initialize MeiliSearch:', error);
  }
}

// 立即初始化
initializeIndex().catch(error => {
  console.error('Failed to initialize MeiliSearch:', error);
});

export { searchClient, articlesIndex }