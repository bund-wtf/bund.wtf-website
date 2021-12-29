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
import type { INewsEntry } from '../../types';

type ResponseData = INewsEntry[];

const handler: NextApiHandler = (
  request: NextApiRequest,
  response: NextApiResponse<ResponseData>
) => {
  // TODO: replace with data from database
  const news: INewsEntry[] = [{
    id: '1',
    title: 'Neue Analyse-Plattform: Windows-Treiber auf Trojaner untersuchen',
    summary: 'Microsoft bietet einen neuen Online-Service an, bei dem Entwickler und Sicherheitsforscher sich verdächtig verhaltende Treiber zur Analyse hochladen können.',
    time: '23.12.2021 10:14',
    image: {
      url: 'https://heise.cloudimg.io/v7/_www-heise-de_/imgs/18/3/2/4/1/5/0/1/shutterstock_1843250155.jpg-762002bdcc71f394.jpeg?q=70&width=1220'
    },
    author: {
      name: 'heise.de',
      avatar: 'https://heise.cloudimg.io/v7/_www-heise-de_/imgs/18/1/7/9/4/8/9/1/heise_online_logo_icon-ab45c6dd11f6d585.gif'
    },
    link: 'https://www.heise.de/news/Neue-Analyse-Plattform-Windows-Treiber-auf-Trojaner-untersuchen-6306937.html'
  }, {
    id: '2',
    title: 'Neue Analyse-Plattform: Windows-Treiber auf Trojaner untersuchen',
    summary: 'Microsoft bietet einen neuen Online-Service an, bei dem Entwickler und Sicherheitsforscher sich verdächtig verhaltende Treiber zur Analyse hochladen können.',
    time: '23.12.2021 10:14',
    image: {
      url: 'https://heise.cloudimg.io/v7/_www-heise-de_/imgs/18/3/2/4/1/5/0/1/shutterstock_1843250155.jpg-762002bdcc71f394.jpeg?q=70&width=1220'
    },
    author: {
      name: 'heise.de',
      avatar: 'https://heise.cloudimg.io/v7/_www-heise-de_/imgs/18/1/7/9/4/8/9/1/heise_online_logo_icon-ab45c6dd11f6d585.gif'
    },
    link: 'https://www.heise.de/news/Neue-Analyse-Plattform-Windows-Treiber-auf-Trojaner-untersuchen-6306937.html'
  }, {
    id: '3',
    title: 'Neue Analyse-Plattform: Windows-Treiber auf Trojaner untersuchen',
    summary: 'Microsoft bietet einen neuen Online-Service an, bei dem Entwickler und Sicherheitsforscher sich verdächtig verhaltende Treiber zur Analyse hochladen können.',
    time: '23.12.2021 10:14',
    image: {
      url: 'https://heise.cloudimg.io/v7/_www-heise-de_/imgs/18/3/2/4/1/5/0/1/shutterstock_1843250155.jpg-762002bdcc71f394.jpeg?q=70&width=1220'
    },
    author: {
      name: 'heise.de',
      avatar: 'https://heise.cloudimg.io/v7/_www-heise-de_/imgs/18/1/7/9/4/8/9/1/heise_online_logo_icon-ab45c6dd11f6d585.gif'
    },
    link: 'https://www.heise.de/news/Neue-Analyse-Plattform-Windows-Treiber-auf-Trojaner-untersuchen-6306937.html'
  }];

  response.status(200)
    .json(news);
};

export default handler;
