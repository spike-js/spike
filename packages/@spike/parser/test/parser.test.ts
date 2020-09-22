import parser from '../src/parser';

const mock = require('mock-fs');
const path = require('path');

describe('parser', () => {
  const expectedRes = [
    {
      id: path.join(path.resolve(), 'index.html'),
      nodeLocation: path.join(path.resolve(), 'index.html'),
      type: 'external',
      children: [],
      mimeType: 'html',
    },
  ];

  beforeEach(() => {
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
  });

  afterEach(() => mock.restore());

  it('parses a simple html file', async () => {
    const res = await parser();
    expect(res).toStrictEqual(expectedRes);
  });
});
