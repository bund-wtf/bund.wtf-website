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

import axios from 'axios';
import dayJS from 'dayjs';
import { Parser as HtmlParser } from 'htmlparser2';
import type { PluginHandler } from "..";
import type { INewsEntry } from '../../types';

export const handler: PluginHandler = async (context) => {
  const newEntry: INewsEntry = {
    author: {
      name: "zdf.de",
      avatar: "https://www.zdf.de/static/0.83.9637/img/appicons/zdf-152.png",
      twitter: "@ZDFheute"
    },
    link: `${context.url}`,
    title: ''
  };

  const response = await axios.get(newEntry.link);
  if (response.status !== 200) {
    throw new Error(`Unexpected response: ${response.status}`);
  }

  const parser = new HtmlParser({
    onopentag(name, attributes) {
      if (name === 'meta') {
        // <meta />

        // <meta name />
        switch (attributes['name']?.toLowerCase().trim()) {
          case 'zdf:publicationdate':
            newEntry.time = dayJS.tz(
              String(attributes['content']).trim(),
              'Europe/Berlin'
            ).toDate();
            break;
        }

        // <meta property />
        switch (attributes['property']?.toLowerCase().trim()) {
          case 'og:description':
            newEntry.summary = String(attributes['content']).trim();
            break;

          case 'og:image':
            newEntry.image = {
              url: String(attributes['content']).trim()
            };
            break;

          case 'og:title':
            newEntry.title = String(attributes['content']).trim();
            break;
        }
      } else if (name === 'link') {
        // <link />

        switch (attributes['rel']?.toLowerCase().trim()) {
          case 'apple-touch-icon':
            newEntry.author.avatar = 'https://www.zdf.de' + String(attributes['href']).trim();
            break;
        }
      }
    }
  });

  parser.write(String(response.data));
  parser.end();

  return newEntry;
};
