import fallback from 'express-history-spa-fallback'
import parseUrl from 'stattic-parseurl'

let html = false

export default () => fallback((req, res, next) => {
  const { ext } = parseUrl(req.url)

  if ('' !== ext && 'html' !== ext) {
    return next()
  }

  if (!html) {
    const analytics = process.env.TRACKING_ID ? getAnalyticsSnippet(process.env.TRACKING_ID) : ''

    html = `<!doctype html>
<html lang="en-US">
<head>
  <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7, IE=9" />
  <meta charset="utf-8" />

  <title>Demo Chat App - redux-saga-sc</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body>
  <div id="app"></div>
  ${analytics}
  <script src="/app.js"></script>
</body>
</html>`

  }

  return res.send(html)
})
