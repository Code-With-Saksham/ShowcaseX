const ejs = require('ejs');
const archiver = require('archiver');
const path = require('path');

/**
 * Renders the chosen EJS template and streams a ZIP file containing index.html to response
 */
exports.generatePortfolioZip = async (portfolio, res) => {
  const templateName = portfolio.template || 'minimal';
  const templatePath = path.join(__dirname, '..', 'views', 'templates', `${templateName}.ejs`);

  // Render HTML content using EJS
  const renderedHtml = await new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, { p: portfolio }, (err, str) => {
      if (err) return reject(err);
      resolve(str);
    });
  });

  const username = portfolio.personal?.username || 'my';
  const fileName = `${username}-portfolio.zip`;

  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

  const archive = archiver('zip', { zlib: { level: 9 } });

  archive.on('error', (err) => {
    throw err;
  });

  archive.pipe(res);

  // Append index.html to the root of the ZIP
  archive.append(renderedHtml, { name: 'index.html' });

  // Finalize archive stream
  await archive.finalize();
};
