/*******************************************************************************
  The MIT License (MIT)

  Copyright (c) 2021-present Marcel Joachim Kloubert

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*******************************************************************************/

require('dotenv').config();

import dayJS from 'dayjs';
import path from 'path';
import TwitterAPI from 'twitter-api-v2';
import { promises as fs } from 'fs';
import { MongoClient } from 'mongodb';
import { v4 } from 'uuid';

async function main() {
  const news = JSON.parse(
    await fs.readFile(path.join(__dirname, 'news.json'), 'utf8')
  );

  const mongo = new MongoClient(process.env.MONGO_URI!.trim());
  await mongo.connect();

  try {
    const db = mongo.db(process.env.MONGO_DB!.trim());
    const collection = db.collection('news');

    for (const n of news) {
      delete n._id;
      n.id = v4();
      n.time = dayJS(n.time).toDate();

      console.log('Write DB entry ...');
      await collection.insertOne(n);

      if (n.author?.twitter?.length) {
        const twitter = new TwitterAPI({
          appKey: process.env.TWITTER_API_KEY!.trim(),
          appSecret: process.env.TWITTER_API_KEY_SECRET!.trim(),
          accessToken: process.env.TWITTER_ACCESS_TOKEN!.trim(),
          accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!.trim(),
        });

        const text = `${n.summary || n.title} ${n.link} @${n.author.twitter} #wtfbund #neuland`;

        console.log('Write Tweet ...');
        await twitter.v2.tweet(text);
      }
    }

    console.log('Done');
  } finally {
    await mongo.close();
  }
}

main().catch(console.error);
