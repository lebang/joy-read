import { MeiliSearch } from 'meilisearch'
import processEnv from './process-env.js'

const searchClient = new MeiliSearch({
  host: processEnv.MEILISEARCH_HOST,
  apiKey: processEnv.MEILISEARCH_API_KEY,
})


let articlesIndex;
try {
  articlesIndex = await searchClient.getIndex('articles');
} catch (error) {
  articlesIndex = await searchClient.createIndex('articles');
}


(async () => { 
  await articlesIndex.updateSearchableAttributes(
    ['title', 'content']
  );

  await articlesIndex.updateSortableAttributes(['updatedAt']);
})();

export { searchClient, articlesIndex }