import { rest } from 'msw';
import response1 from './response-1.json'; // /r/javascript/top.json?t=year&limit=100
import response2 from './response-2.json'; // /r/javascript/top.json?t=year&limit=100&after=t3_f807cu
import response3 from './response-3.json'; // /r/javascript/top.json?t=year&limit=100&after=t3_gwddb5
import response4 from './response-4.json'; // /r/javascript/top.json?t=year&limit=100&after=t3_czqd6o
import response5 from './response-5.json'; // /r/javascript/top.json?t=year&limit=100&after=t3_e5dnm2

const cursorResponseMap = {
  initial: response1,
  t3_k69yg0: response2,
  t3_k07g82: response3,
  t3_mvk1m0: response4,
  t3_oym8a5: response5,
};

function getJSONResponseForRequest(req) {
  const after = req.url.searchParams.get('after');
  return cursorResponseMap[after || 'initial'];
}

const handlers = [
  rest.get(
    'https://www.reddit.com/r/less-than-500-posts/top.json',
    (req, res, ctx) => {
      const after = req.url.searchParams.get('after');

      const json = getJSONResponseForRequest(req);
      if (after === 't3_mvk1m0') {
        json.data.dist = 70;
        json.data.after = null;
        json.data.children = json.data.children.slice(0, 70);
      }
      return res(ctx.status(200), ctx.json(json));
    },
  ),

  rest.get(
    'https://www.reddit.com/r/failing-request/top.json',
    (req, res, ctx) => {
      const after = req.url.searchParams.get('after');

      if (after === 't3_mvk1m0') {
        return res(
          ctx.status(500),
          ctx.json({ errorMessage: 'Internal server error' }),
        );
      }
      return res(ctx.status(200), ctx.json(getJSONResponseForRequest(req)));
    },
  ),

  // eslint-disable-next-line arrow-body-style
  rest.options('https://www.reddit.com/*', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getJSONResponseForRequest(req)));
  }),

  // eslint-disable-next-line arrow-body-style
  rest.get('https://www.reddit.com/*', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getJSONResponseForRequest(req)));
  }),
];

export default handlers;
