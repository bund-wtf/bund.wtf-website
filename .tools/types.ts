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

/**
 * An news entry.
 */
export interface INewsEntry {
  /**
   * Author information.
   */
  author: INewsEntryAuthor;
  /**
   * The property for the ID on the database.
   */
  id?: string;
  /**
   * Image information.
   */
  image?: INewsEntryImage | null;
  /**
   * The link.
   */
  link: string;
  /**
   * Short description / summary.
   */
  summary?: string | null;
  /**
   * The time(stamp).
   */
  time?: Date | null;
  /**
   * The title.
   */
  title: string;
}

/**
 * News entry author information.
 */
export interface INewsEntryAuthor {
  /**
   * Optional link to avatar.
   */
  avatar?: string | null;
  /**
   * Display name.
   */
  name: string;
  /**
   * Optional Twitter handle.
   */
  twitter?: string | null;
}

/**
 * News entry image information.
 */
export interface INewsEntryImage {
  /**
   * The URL to the image.
   */
  url: string;
}

/**
 * Custom options for 'publishNews()' function.
 */
export interface IPublishNewsOptions {
  /**
   * List of optional hashtags.
   */
  hashtags?: string[] | null;
}
