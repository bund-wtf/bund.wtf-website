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

import { MongoClient } from 'mongodb';
import { v4 } from 'uuid';
import type { INewsEntry, IPublishNewsOptions } from "./types";
import TwitterAPI from 'twitter-api-v2';

/**
 * Publishes a news entry.
 *
 * @param {INewsEntry} newsEntry The entry to publish.
 * @param {IPublishNewsOptions} [options] Custom options.
 */
export async function publishNews(newsEntry: INewsEntry, options: IPublishNewsOptions = {}) {
  delete (newsEntry as any)._id;

  if (!newsEntry.id?.length) {
    newsEntry.id = v4();  // set ID
  }

  if (!newsEntry.time) {
    newsEntry.time = new Date();  // set current time
  }

  const mongo = new MongoClient(process.env.MONGO_URI!.trim());
  await mongo.connect();

  try {
    const db = mongo.db(process.env.MONGO_DB!.trim());
    const collection = db.collection('news');

    console.log('Write DB entry ...');
    await collection.insertOne(newsEntry);

    if (newsEntry.author?.twitter?.length) {  // publish on twitter?
      const suffixes = ['#wtfbund', '#neuland'];  // default hashtags
      suffixes.push(...(options.hashtags || []));  // more hashtags

      // normalize twitter handle
      let twitterHandle = newsEntry.author.twitter.trim();
      if (!twitterHandle.startsWith('@')) {
        twitterHandle = '@' + twitterHandle;
      }

      suffixes.unshift(twitterHandle);

      const twitter = new TwitterAPI({
        appKey: process.env.TWITTER_API_KEY!.trim(),
        appSecret: process.env.TWITTER_API_KEY_SECRET!.trim(),
        accessToken: process.env.TWITTER_ACCESS_TOKEN!.trim(),
        accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!.trim(),
      });

      const textSuffix = suffixes.join(' ');

      const maxTextLength = 200 - (textSuffix.length + 1);

      let text = `${String(newsEntry.summary || newsEntry.title).trim()} ${newsEntry.link}`;
      if (text.length > maxTextLength) {
        text = newsEntry.link;  // too long => link only
      }

      console.log('Write Tweet ...');
      await twitter.v2.tweet(`${text} ${textSuffix}`);
    }
  } finally {
    await mongo.close();
  }

  console.log(`News entry '${newsEntry.title}' (${newsEntry.id}) published`);
}
