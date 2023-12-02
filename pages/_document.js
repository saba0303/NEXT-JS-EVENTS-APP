import Document, { Html, Head, Main, NextScript } from 'next/document';
// replacement for index.html in standart react app.
class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
