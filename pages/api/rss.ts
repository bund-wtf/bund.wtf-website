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

import xmlBuilder from 'xmlbuilder';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { withMongo } from '../../data/mongo';
import type { INewsEntry } from '../../types';

const handler: NextApiHandler = async (
  request: NextApiRequest,
  response: NextApiResponse<Buffer>
) => {
  if (request.method === 'GET') {
    const news: INewsEntry[] = await withMongo(async (database) => {
      const collection = database.collection<INewsEntry>('news');

      return collection.find({})
        .sort({
          'time': -1,
          '_id': -1
        })
        .toArray();
    });

    const builder = xmlBuilder.create('rss', {
      encoding: 'UTF-8'
    });

    const rss = builder.attribute('version', '2.0');

    const rss_channel = rss.element('channel');
    rss_channel.element('title', 'bund.wtf - Digitalisierung in Deutschland');
    rss_channel.element('link', 'https://bund.wtf');
    rss_channel.element('description', 'News und andere (vielleicht) lustige Dinge aus dem Digitalem Neuland');

    for (const n of news) {
      const item = rss_channel.element('item');

      item.element('title', n.title);
      item.element('link', n.link);
      item.element('description', n.summary || '');
      item.element('pubDate', n.time.toUTCString());
    }

    response.status(200)
      .setHeader('Content-Type', 'application/rss+xml; charset=utf-8')
      .send(Buffer.from(rss.end({ pretty: false }), 'utf8'));
  } else {
    response.status(404)
      .end();
  }
};

export default handler;
