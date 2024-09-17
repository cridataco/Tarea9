const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const IP_ADDRESS = "localhost";

app.use(express.json());
app.use(cors());

app.get('/combined-api', async (req, res) => {
  try {
    const linkedinResponse = await axios.get('https://linkedin-profile-data.p.rapidapi.com/linkedin-data?url=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fwilliamhgates', {
      headers: {
        'x-rapidapi-host': 'linkedin-profile-data.p.rapidapi.com',
        'x-rapidapi-key': 'f96426f9e4msh72464f506c312efp14416ejsne813336850ff'
      }
    });

    const { full_name, summary, profile_pic_url } = linkedinResponse.data;
    const yesNoResponse = await axios.get('https://yesno.wtf/api');
    const { image } = yesNoResponse.data;

    const combinedResponse = {
      fullName: full_name,
      summary: summary,
      profilePicUrl: profile_pic_url,
      yesNoGif: image
    };
    res.json(combinedResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al consultar las APIs');
  }
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toLocaleString()}`);
  next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, IP_ADDRESS, () => {
  console.log(`Servidor escuchando en http://${IP_ADDRESS}:${PORT}`);
});
