import algoliasearch from 'algoliasearch';
import * as dotenv from 'dotenv';

dotenv.config();

const client = algoliasearch(process.env.ALGOLIAAPPID, process.env.WRITEAPIKEY);
const index = client.initIndex(process.env.ALGOLIAINDEX);

export default index;