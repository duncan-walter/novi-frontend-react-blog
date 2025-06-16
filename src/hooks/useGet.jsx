import {useEffect, useState} from 'react';
import axios from 'axios';

// De "cancel request" achtige constructie is nodig omdat useGet wordt gebruikt tijdens het laden van de pagina.
// Tijdens het laden van de pagina kunnen parameters opgehaald worden d.m.v. de useParams hook.
// De useParams hook heeft de parameters die nodig zijn in de url van een get request niet direct opgehaald (undefined).
// Aan de consumerende kant van deze functie kan een falsy check worden meegegeven als argumenten aan de cancelRequest parameter.
function useGet(url, cancelRequest = false) {
  const [data, setData] = useState(undefined);
  const [loading, toggleLoading] = useState(false);
  const [error, setError] = useState('');

  // De APIProjectIDHeader wordt nu op meerdere plekken gebruikt, hoe kan dit netjes DRY worden gemaakt?
  // Misschien een NOVIDynamicAPIClient als middelman?
  const APIProjectIDHeader = {'Novi-Education-Project-Id': 'ec0bf4cc-4e94-4807-8041-d95b0731722b'};

  useEffect(() => {
    if (cancelRequest) {
      return;
    }

    const executeGet = async () => {
      toggleLoading(true);
      setError('');

      try {
        const response = await axios.get(url, {
          headers: {
            ...APIProjectIDHeader
          }
        });

        setData(response.data);
      } catch (e) {
        setError('Er ging iets fout tijdens het ophalen van de data!');
      } finally {
        toggleLoading(false);
      }
    }

    // Ik krijg veel warnings over dat async functies niet worden ge-await. Toch zie ik dit online vaak zo terugkomen.
    executeGet();
  }, [url, cancelRequest]); // Ook krijg ik veel warnings over missende dependencies, maar ik wil alleen de useEffect hook af laten vuren wanneer 1 van deze properties wijzigt.

  return {data, loading, error};
}

export default useGet;