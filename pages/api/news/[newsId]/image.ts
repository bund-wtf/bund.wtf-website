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

import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { withMongo } from '../../../../data/mongo';
import type { INewsEntry } from '../../../../types';

type ResponseData = Buffer;

const handler: NextApiHandler = async (
  request: NextApiRequest,
  response: NextApiResponse<ResponseData>
) => {
  if (request.method === 'GET') {
    const newsId = String(request.query.newsId || '').trim();

    if (newsId.length) {
      const existingEntry: INewsEntry | null | undefined = await withMongo(async (database) => {
        const collection = database.collection<INewsEntry>('news');

        return collection.findOne({
          id: newsId
        });
      });

      if (existingEntry?.image?.url?.length) {
        const imageResponse = await fetch(existingEntry.image.url);

        if (imageResponse.status === 200) {
          const data = Buffer.from(await imageResponse.arrayBuffer());

          return response.status(200)
            .setHeader('Content-Type', imageResponse.headers.get('content-type') || 'application/octet-stream')
            .send(data);
        }
      }
    }
  }

  response.status(404)
    .end();
};

export default handler;
