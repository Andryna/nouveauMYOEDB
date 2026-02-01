import axios from 'axios';
import { URL_PROD } from '../constants/myconst';
import config from "../../config.json";
// import * as GoogleGenerativeAI from "@google/generative-ai";
import { TranslatorConfiguration, TranslatorFactory, ProviderTypes } from 'react-native-power-translator';
// import OpenAI from 'openai';
// import RNFS from 'react-native-fs';
// import RNFS from '@dr.pogodin/react-native-fs';
import { TemporaryDirectoryPath, writeFile } from '@dr.pogodin/react-native-fs';
import Sound from 'react-native-sound';
import Tts from 'react-native-tts';
import { Buffer } from 'buffer';

const base_url = config.base_url;
const API_KEY = 'AIzaSyBDy2-MeCYjV4I3RZK3GpfcUVdJCwWotD0';
const OpenAI_API_KEY = config.OPEN_AI_API_KEY;

// Configuration initiale avec votre clé API OpenAI
// const client = new OpenAI({
//   apiKey: OpenAI_API_KEY, // Assurez-vous que votre variable d'environnement est configurée
// });
// Variable globale pour gérer le son et son état
let currentSound = null;
let isPlaying = false;

const GOOGLE_API_KEY = config.googleCloud.apiKey;

export const translateTexts = async (text, targetLang = "en") => {
  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          q: text,
          target: targetLang,
          format: "text"
        })
      }
    );

    const json = await response.json();

    // gestion d’erreur API Google
    if (json.error) {
      console.error("Erreur Google:", json.error);
      return null;
    }

    return json.data.translations[0].translatedText;

  } catch (e) {
    console.error("Erreur de traduction:", e);
    return null;
  }
}

const API_URL = "https://libretranslate.com/translate";

export const translate = async ({ text, to = "en", from = "auto" }) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        source: from,
        target: to,
        format: "text"
      })
    });

    const data = await res.json();
    return data.translatedText;
  } catch (e) {
    console.error("Erreur traduction:", e);
    throw e;
  }
};



// ==================== Fonction API custom ====================
export const getReworkVideo = async (id) => {
    const msg = "voici la reponse " + id + URL_PROD;
    try {
        const response = await axios.post(URL_PROD + '/portail-stagiaire/relatedvideo.php', {
            id: id,
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return msg;
    }
};

// ==================== Fonction de lecture vocale ====================
export const readText2 = async (
  text,
  onStatusChange,
  language = 'fr',
  gender = 'female',
  speed = 1.0
) => {
  try {
    onStatusChange({ isLoading: true, isPlaying: false });

    // Stop previous audio if playing
    if (currentSound) {
      currentSound.stop(() => currentSound.release());
      currentSound = null;
      isPlaying = false;
    }

    // Si texte très court, utiliser TTS local ou simple
    if (text.trim().split(/\s+/).length === 1) {
      // Par défaut, juste un placeholder pour TTS local si nécessaire
      onStatusChange({ isLoading: false, isPlaying: true });
      return;
    }

    // Déterminer la voix
    const voice = gender === 'male' ? 'onyx' : 'nova';

    // Requête OpenAI TTS
    const response = await axios.post(
      'https://api.openai.com/v1/audio/speech',
      {
        model: 'tts-1',
        input: text,
        voice: voice,
        response_format: 'mp3',
      },
      {
        headers: {
          Authorization: `Bearer ${OpenAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
      }
    );

    // Écriture du fichier dans le répertoire temporaire
    const path = `${TemporaryDirectoryPath}/openai_tts.mp3`;
    await writeFile(path, Buffer.from(response.data, 'binary').toString('base64'), 'base64');

    // Lecture audio
    currentSound = new Sound(path, '', (error) => {
      if (error) {
        console.error('Erreur chargement audio :', error);
        onStatusChange({ isLoading: false, isPlaying: false });
        return;
      }

      currentSound.setSpeed(speed); // appliquer la vitesse
      currentSound.play((success) => {
        onStatusChange({ isLoading: false, isPlaying: false });
        currentSound.release();
        currentSound = null;
      });

      onStatusChange({ isLoading: false, isPlaying: true });
    });
  } catch (error) {
    console.error('Erreur dans readText2 :', error);
    onStatusChange({ isLoading: false, isPlaying: false });
  }
};




// ==================== Fonction Play/Pause ====================
export const togglePausePlay = () => {
  if (currentSound) {
    if (isPlaying) {
      currentSound.pause();
      isPlaying = false;
      return false; // lecture en pause
    } else {
      currentSound.play(() => {
        isPlaying = false;
        if (currentSound) {
          currentSound.release();
          currentSound = null;
        }
      });
      isPlaying = true;
      return true; // lecture en cours
    }
  }
  return false; // pas de son
};


// ==================== Fonction Stop ====================
export const stopAudio = () => {
    if (currentSound) {
        const soundToStop = currentSound;
        currentSound = null;
        isPlaying = false;
        
        soundToStop.stop(() => {
            if (soundToStop) {
                soundToStop.release();
            }
        });
    }
};


export const getReworkAudio = (id) => {
    const msg = "voici la reponse " + id;
    return msg;
}
export const getStats = async (txt) => {
    const msg = "voici la reponse " + txt+ URL_PROD;
    try {
        const response = await axios.post(URL_PROD + '/portail-stagiaire/labo/newtestapi.php', {
            sentence: txt,
        });
        // console.log(response.data);
        return response.data;
        } catch (error) {
        console.error(error);
        return msg;
        }
}



// export const requestChart = async () => {
//   const url = 'http://149.202.58.189:5018/api/generate-chart';
//   const values = [15, 25, 35, 25];
//   const labels = ['X', 'Y', 'Z', 'W'];

//   const result = await generateChart({ url, values, labels });

//   if (result.success) {
//     console.log('Diagramme généré:', result.imageUrl);
//     return 'result.imageUrl';
//     // Utilisez `result.imageUrl` pour afficher l'image dans une balise Image
//   } else {
//     console.error('Erreur:', result.error);
//     return 'result.error';
//   }
// };
export const generateChart = async ({ url, values, labels }) => {
  try {
    const requestBody = {
      values,
      labels,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const text = await response.text(); // Récupère la réponse brute
    console.log('Réponse brute:', text);

    // Tente de parser en JSON
    const data = JSON.parse(text);

    if (response.ok && data.imageUrl) {
      return {
        success: true,
        imageUrl: data.imageUrl,
      };
    } else {
      return {
        success: false,
        error: data.message || 'Réponse invalide de l\'API',
      };
    }
  } catch (error) {
    console.error('Erreur dans generateChart:', error.message);
    return {
      success: false,
      error: error.message,
    };
  }
};



export const analyzeImage = async (base64Image) => {
    try {
      const response = await fetch(config.googleCloud.api + config.googleCloud.apiKey, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requests: [
            {
              image: {
                content: base64Image,
              },
              features: [{ type: 'TEXT_DETECTION', maxResults: 5 }],
            },
          ],
        }),
      });
  
      const data = await response.json();
      
      if (data && data.responses && data.responses[0]) {
        const text = data.responses[0].fullTextAnnotation.text;
        return {
          text,
          success: true,
        };
      } else {
        throw new Error('No text detected in the image.');
      }
    } catch (error) {
      console.error('Error analyzing image:', error);
      return {
        text: '',
        success: false,
        error: error.message,
      };
    }
  };

export const interactWithGemini = async (prompt) => {
  try {
    // alert('debut gemini');
    // const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
    // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // // Générer une réponse à partir du prompt utilisateur
    // const result = await model.generateContent(prompt);
    // const response = result.response;
    // const text = response.text();
    const text = "response.text()";
    // alert('fin gemini');
    
    return text;
  } catch (error) {
    console.error("Erreur lors de l'interaction avec Gemini:", error);
    return null;
  }
};

// services.js
export const saveCat = (categ, desc, userInfo, getCatCallback) => {
  return fetch('https://elprod.forma2plus.com/portail-stagiaire/savecat.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      categ: categ,
      desc: desc,
      id_groupe: userInfo.id_groupe,
      id: userInfo.id,
    }),
  })
    .then((response) => response.json())
    .then((reponse) => {
      return getCatCallback(userInfo.id_groupe).then(() => {
        console.log(reponse);
        return reponse; // retourne la réponse pour l'utiliser dans le composant
      });
    })
    .catch((error) => {
      console.error(error);
      throw error; // pour gérer les erreurs dans le composant
    });
};


export const transcript = async ({ userInfo, audioFile, infolangue, idLan, onProgress, typeteste }) => {
    const url = `${base_url}/portail-stagiaire/upaudio.php`;
    const path = `file://${audioFile}`;
    const formData = new FormData();
    formData.append('id_stag', "14937");
    formData.append('targL', idLan);
    formData.append('infolangue', infolangue);
    formData.append('id_groupe', "21786");
    formData.append('typeteste', typeteste || '');
    formData.append('recording', {
        uri: path,
        name: 'teste.wav',
        type: 'audio/wav',
    });
    try {
        const response = await axios.post(url, formData, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: progressEvent => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                if (onProgress) onProgress(percentCompleted);
            },
        });

        const tosend = {
            id_stag:  "14937",
            targL: idLan,
            infolangue: infolangue,
            idecate: response.data.idecate,
            id_groupe: "21786",
            transaudio: response.data.result,
            targTEXT: null,
            pathaudio: response.data.audio,
            duration: response.data.duration
        };

        return {
            success: true,
            data: response.data,
            tosend,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error,
        };
    }
};

export const translateText = async (language, text) => {
  if (!language || !text) {
    console.warn('Language or text is missing.');
    return '';
  }

  TranslatorConfiguration.setConfig(ProviderTypes.Google, config.googleCloud.apiKey, language);
  const translator = TranslatorFactory.createTranslator();

  try {
    const translated = await translator.translate(text);
    return translated;
  } catch (error) {
    console.error('Translation error:', error);
    return '';
  }
};

// export const getChatCompletion = async (userMessage, model = 'gpt-3.5-turbo') => {
//   try {
//     const response = await client.chat.completions.create({
//       model: model,
//       messages: [{ role: 'user', content: userMessage }],
//     });
//     console.log(response.choices[0].message.content);
//     return response.choices[0].message.content;  // Retourne la réponse du modèle
//   } catch (error) {
//     console.error('Error fetching chat completion:', error.message);
//     throw error;
//   }
// };
export const getChatCompletion = async (userMessage, model = 'gpt-3.5-turbo') => {
  try {
    // return response.choices[0].message.content;  // Retourne la réponse du modèle
    return "response.choices[0].message.content";  // Retourne la réponse du modèle
  } catch (error) {
    console.error('Error fetching chat completion:', error.message);
    throw error;
  }
};

// export const sendMessageToChatGPT = async (message, model = 'gpt-3.5-turbo') => {
//   try {
//     const response = await axios.post(
//       'https://api.openai.com/v1/chat/completions',
//       {
//         model: model,
//         messages: [
//           { role: 'system', content: `Repondez comme un prof de langue. N'utilisez pas de phrase introductive. Repndez diretement aux question. repondez directement sous forme de array json bien formaté. 
//           les resulats doivent suivre cette forme:  {
//             "langues":{
//               origninal:"",
//               traduction: ""
//             },
//             "expressions": [
//               {
//                 "original": "I'm really interested in what happens with the voice",
//                 "traduction": "Je suis vraiment intéressé par ce qui se passe avec la voix"
//               },
//               {
//                 "original": "with the body",
//                 "traduction": "avec le corps"
//               },
//             ],
//             "nature_ou_fonction": {
//               "adjectif": [
//                 {
//                   "original": "interested",
//                   "traduction": "intéressé"
//                 },
//                 {
//                   "original": "different",
//                   "traduction": "différent"
//                 }
//               ],
//               "conjonction": [
//                 {
//                   "original": "and",
//                   "traduction": "et"
//                 },
//                 {
//                   "original": "because",
//                   "traduction": "parce que"
//                 }
//               ],
//               "groupe_prenthétique": [
//                 {
//                   "original": "who has also researched Barack Obama's speaking style",
//                   "traduction": "qui a également étudié le style oratoire de Barack Obama"
//                 }
//               ],
//               "pronom_personnel": [
//                 {
//                   "original": "I'm",
//                   "traduction": "je suis"
//                 },
//                 {
//                   "original": "they're",
//                   "traduction": "ils sont"
//                 }
//               ],
//               "préposition": [
//                 {
//                   "original": "in",
//                   "traduction": "dans"
//                 },
//                 {
//                   "original": "with",
//                   "traduction": "avec"
//                 }
//               ],
//               "substantif": [
//                 {
//                   "original": "voice",
//                   "traduction": "voix"
//                 },
//                 {
//                   "original": "body",
//                   "traduction": "corps"
//                 }
//               ],
//               "verbe": [
//                 {
//                   "original": "interested",
//                   "traduction": "intéressé"
//                 },
//                 {
//                   "original": "happens",
//                   "traduction": "se passe"
//                 }
//               ]
//             }
//           }

//           ` },
//           { role: 'user', content: message },
//         ],
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${OpenAI_API_KEY}`,  // Utilisation de la clé API passée en argument
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     // Récupérer la réponse du modèle
//     console.log(response.data.choices[0].message.content);
//     return response.data.choices[0].message.content;
//   } catch (error) {
//     console.error('Error sending message to ChatGPT:', error);
//     throw error;  // Lancer l'erreur pour pouvoir la gérer ailleurs
//   }
// };
export const sendMessageToChatGPT = async (message, model = 'gpt-3.5-turbo') => {
  try {

    // Récupérer la réponse du modèle
    // console.log(response.data.choices[0].message.content);
    return message;
  } catch (error) {
    console.error('Error sending message to ChatGPT:', error);
    throw error;  // Lancer l'erreur pour pouvoir la gérer ailleurs
  }
};

  