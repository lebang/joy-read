import { MeiliSearch } from 'meilisearch'
import processEnv from './process-env'

const searchClient = new MeiliSearch({
  host: processEnv.MEILISEARCH_HOST,
  apiKey: processEnv.MEILISEARCH_API_KEY,
})
