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

// day.js
import dayJS from 'dayjs';
import dayJSUTC from 'dayjs/plugin/utc';
import dayJSTomezone from 'dayjs/plugin/timezone';
dayJS.extend(dayJSUTC);
dayJS.extend(dayJSTomezone);

import fs from 'fs';
import path from 'path';
import sanitizeFilename from 'sanitize-filename';
import yargs from 'yargs/yargs';
import { URL } from 'url';
import { hideBin } from 'yargs/helpers';
import type { INewsEntry } from '../types';
import { publishNews } from '../utils';

// load ../.env file
require('dotenv').config({
  path: path.join(__dirname, '../.env')
});

/**
 * A context for a plugin handler.
 */
export interface IPluginHandlerContext {
  /**
   * The URL to fetch from.
   */
  url: URL;
}

/**
 * A plugin handler.
 * 
 * @param {IPluginHandlerContext} context The context.
 * 
 * @returns {Promise<INewsEntry>} The promise with the new news entry.
 */
export type PluginHandler = (context: IPluginHandlerContext) => Promise<INewsEntry>;

const scriptEx = path.extname(__filename);
const pluginDir = path.join(__dirname, 'plugins');
const argv = yargs(hideBin(process.argv)).parseSync();

const newsTxtFile = path.join(__dirname, '../news.txt');

async function main() {
  const urlsToFetch: string[] = [];

  const argList = argv['_'].map(a => String(a).trim())
    .filter(a => a !== '');

  const urlArgList = argList.filter(a => !a.startsWith('#'));
  const hashtagArgList = argList.filter(a => a.startsWith('#'));

  for (let i = 0; i < urlArgList.length; i++) {
    // single URL from argument
    let ua = urlArgList[i];

    if (!ua.startsWith('http://') && !ua.startsWith('https://')) {
      ua = 'https://' + ua;  // add default scheme
    }

    if (ua.startsWith('http://')) {
      throw new Error('Unsecure URL schemes are not allowed!');
    }

    urlsToFetch.push(ua);
  }

  if (!urlsToFetch.length) {
    // from ../news.txt file

    const lines = (await fs.promises.readFile(newsTxtFile, 'utf8'))
      .split('\n')
      .map(l => l.trim())
      .filter(l => l !== '');

    urlsToFetch.push(...lines);
  }

  for (const u of urlsToFetch) {
    try {
      const url = new URL(u);

      // file of plugin script
      const pluginFilename = path.join(
        pluginDir,
        sanitizeFilename(`${url.host}`.toLowerCase().trim() + scriptEx)
      );

      if (!fs.existsSync(pluginFilename) || !fs.statSync(pluginFilename).isFile()) {
        throw new Error(`No plugin found for domain ${url.host}!`);
      }

      const pluginHandler: PluginHandler = require(pluginFilename).handler;
      if (typeof pluginHandler !== 'function') {
        throw new TypeError('Plugin handler is no function!');
      }

      console.log('Fetching URL', u);

      // prepare context for handler
      const context: IPluginHandlerContext = {
        url
      };

      // execute
      const newsEntry = await pluginHandler(context);
      // publish
      await publishNews(newsEntry, {
        hashtags: hashtagArgList
      });
    } catch (ex) {
      console.error('Could not fetch URL', u + ':', ex);
    }
  }
}

main().catch(console.error);
