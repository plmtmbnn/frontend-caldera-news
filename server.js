const express = require('express');
const app = express();
const https = require('https');
const axios = require('axios');
const cors = require('cors');
const compression = require('compression');
const dotenv = require('dotenv');
dotenv.config();

const path = require('path');
const fs = require('fs');
const cheerio = require('cheerio');

app.use(express.static('build'));
app.use(cors());
app.use(compression());
app.get('*',async (req, res) => {
    let newsUrl = null;
    try {
        const urlArrays = req.originalUrl.split('/');
        newsUrl = urlArrays[2];
    } catch (error) {
        
    }
    if(newsUrl){
        let apiResult = {
            title: 'caldera.id',
            description: 'Berita seputar batak, berita toba, adat batak, berita budaya batak, wisata danau toba'
        };
        try {
            const httpsAgent = new https.Agent({
                rejectUnauthorized: false,
              });
            const newsResult = await axios.get(`https://api.caldera.id/news/show/${newsUrl}`, { httpsAgent });

            if(newsResult.data.status === 'SUCCESS') {
                apiResult = newsResult.data.data.news;
            }

        } catch (error) {
            console.log(error);
        }

        const getImage = (image_url) => {
            if(image_url){
              const current = 
              `https://api.caldera.id/news/image/news/${image_url}`;
              return(current);
            }
          };


        // Get the dynamic content from your API or other sources
        const title = apiResult.title;
        const description = apiResult.description;

        // Read the index.html file
        const indexFile = fs.readFileSync(path.join(__dirname, 'build', 'index.html'), 'utf8');

        // Load the HTML file with cheerio
        const $ = cheerio.load(indexFile);

        // Modify the <head> element with the dynamic content
        $('head').append(`<title>${title}</title>`);
        $('head').append(`<meta name="description" content="${description}">`);
        $('head').append(`<meta itemprop="image" content="${getImage(String(apiResult.image_url))}" />`);
        $('head').append(`<meta property="og:type" content="website" />`);
        $('head').append(`<meta property="og:url" content="https://www.caldera.id/article/${newsUrl}" />`);
        $('head').append(`<meta property="og:title" content="${String(apiResult.title || 'caldera.id').substring(0, 60)} />"`);
        $('head').append(`<meta property="og:image" content="${getImage(String(apiResult.image_url))}" />`);
        $('head').append(`<meta property="og:image:secure_url" content="${getImage(String(apiResult.image_url))}" />`);
        $('head').append(`<meta property="og:image:type" content="image/jpeg"/>`);
        $('head').append(`<meta property="og:image:width" content="450" />`);
        $('head').append(`<meta property="og:image:height" content="298" />`);
        $('head').append(`<meta property="twitter:card" content="summary_large_image"/>`);
        $('head').append(`<meta property="twitter:url" content="https://www.caldera.id/article/${newsUrl}" />`);
        $('head').append(`<meta property="twitter:title" content="${String(apiResult.title || 'caldera.id').substring(0, 60)}" />`);
        $('head').append(`<meta property="twitter:description" content="Berita seputar batak, berita toba, adat batak, berita budaya batak, wisata danau toba"/>`);
        $('head').append(`<meta property="twitter:image" content="${getImage(String(apiResult.image_url))}" />`);

        // Send the modified HTML file
        res.send($.html());       
    } else {
        res.sendFile(`${__dirname}/build/index.html`);
    }
  });
  
  
  const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
