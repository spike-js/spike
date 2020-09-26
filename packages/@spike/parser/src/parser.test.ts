import parser from './parser';

const mock = require('mock-fs');

describe('parser', () => {
  afterEach(() => mock.restore());

  it('parses a simple html file', async () => {
    mock({
      'index.html': `
        <!DOCTYPE html>
        <html>
          <body>
            foo
          </body>
        </html>
      `,
    });

    const res = await parser();

    expect(res).toMatchInlineSnapshot(`
      Array [
        Object {
          "children": Array [],
          "id": "/Users/christophermacrae/Code/spike-js/spike/packages/@spike/parser/index.html",
          "mimeType": "html",
          "nodeLocation": "/Users/christophermacrae/Code/spike-js/spike/packages/@spike/parser/index.html",
          "type": "external",
        },
      ]
    `);
  });

  it('adds inline nodes when style tags are present', async () => {
    mock({
      'index.html': `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { background-color: red; }
            </style>
          </head>
          <body>
            foo
            <style>
              body { color: white; }
            </style>
          </body>
        </html>
      `,
    });

    const res = await parser();

    expect(res).toMatchInlineSnapshot(`
      Array [
        Object {
          "children": Array [
            "/Users/christophermacrae/Code/spike-js/spike/packages/@spike/parser/index.html#5:13-5:89",
            "/Users/christophermacrae/Code/spike-js/spike/packages/@spike/parser/index.html#11:13-11:227",
          ],
          "id": "/Users/christophermacrae/Code/spike-js/spike/packages/@spike/parser/index.html",
          "mimeType": "html",
          "nodeLocation": "/Users/christophermacrae/Code/spike-js/spike/packages/@spike/parser/index.html",
          "type": "external",
        },
        Object {
          "children": Array [],
          "id": "/Users/christophermacrae/Code/spike-js/spike/packages/@spike/parser/index.html#5:13-5:89",
          "mimeType": "css",
          "nodeLocation": Object {
            "end": Object {
              "col": 89,
              "line": 5,
            },
            "start": Object {
              "col": 13,
              "line": 5,
            },
          },
          "type": "internal",
        },
        Object {
          "children": Array [],
          "id": "/Users/christophermacrae/Code/spike-js/spike/packages/@spike/parser/index.html#11:13-11:227",
          "mimeType": "css",
          "nodeLocation": Object {
            "end": Object {
              "col": 227,
              "line": 11,
            },
            "start": Object {
              "col": 13,
              "line": 11,
            },
          },
          "type": "internal",
        },
      ]
    `);
  });

  it('adds an inline nodes when stylesheets are present', async () => {
    mock({
      'index.html': `
        <!DOCTYPE html>
        <html>
          <head>
            <link rel="stylesheet" type="text/css" href="/test-1.css">
          </head>
          <body>
            foo
            <link rel="stylesheet" type="text/css" href="/test-2.css">
          </body>
        </html>
      `,
    });

    const res = await parser();

    expect(res).toMatchInlineSnapshot(`
      Array [
        Object {
          "children": Array [
            "/test-1.css",
            "/test-2.css",
          ],
          "id": "/Users/christophermacrae/Code/spike-js/spike/packages/@spike/parser/index.html",
          "mimeType": "html",
          "nodeLocation": "/Users/christophermacrae/Code/spike-js/spike/packages/@spike/parser/index.html",
          "type": "external",
        },
        Object {
          "children": Array [],
          "id": "/test-1.css",
          "mimeType": "css",
          "nodeLocation": "/test-1.css",
          "type": "external",
        },
        Object {
          "children": Array [],
          "id": "/test-2.css",
          "mimeType": "css",
          "nodeLocation": "/test-2.css",
          "type": "external",
        },
      ]
    `);
  });

  it('adds an inline nodes when script tags are present', async () => {
    mock({
      'index.html': `
        <!DOCTYPE html>
        <html>
          <head>
            <script>
              console.log('hello world');
            </script>
          </head>
          <body>
            foo
            <link rel="stylesheet" type="text/css" href="/test-2.css">
            <script src="test.js"></script>
          </body>
        </html>
      `,
    });

    const res = await parser();

    expect(res).toMatchInlineSnapshot(`
      Array [
        Object {
          "children": Array [
            "/Users/christophermacrae/Code/spike-js/spike/packages/@spike/parser/test.js",
            "/Users/christophermacrae/Code/spike-js/spike/packages/@spike/parser/index.html#5:13-5:90",
            "/test-2.css",
          ],
          "id": "/Users/christophermacrae/Code/spike-js/spike/packages/@spike/parser/index.html",
          "mimeType": "html",
          "nodeLocation": "/Users/christophermacrae/Code/spike-js/spike/packages/@spike/parser/index.html",
          "type": "external",
        },
        Object {
          "children": Array [],
          "id": "/Users/christophermacrae/Code/spike-js/spike/packages/@spike/parser/index.html#5:13-5:90",
          "mimeType": "javascript",
          "nodeLocation": Object {
            "end": Object {
              "col": 90,
              "line": 5,
            },
            "start": Object {
              "col": 13,
              "line": 5,
            },
          },
          "type": "internal",
        },
        Object {
          "children": Array [],
          "id": "/Users/christophermacrae/Code/spike-js/spike/packages/@spike/parser/test.js",
          "mimeType": "javascript",
          "nodeLocation": "/Users/christophermacrae/Code/spike-js/spike/packages/@spike/parser/test.js",
          "type": "external",
        },
        Object {
          "children": Array [],
          "id": "/test-2.css",
          "mimeType": "css",
          "nodeLocation": "/test-2.css",
          "type": "external",
        },
      ]
    `);
  });
});
