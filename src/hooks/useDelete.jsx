import {useState} from 'react';
import axios from 'axios';

function useDelete(url, cancelRequest = false) {
  const [status, setStatus] = useState('loading');

  const APIProjectIDHeader = {'Novi-Education-Project-Id': 'ec0bf4cc-4e94-4807-8041-d95b0731722b'};

  if (cancelRequest) {
    return;
  }

  const executeDelete = async () => {
    setStatus('loading')

    try {
      await axios.delete(url, {
        headers: {
          ...APIProjectIDHeader
        }
      });

      setStatus('success');
    } catch (e) {
      setStatus('error');
    }
  }

  return {executeDelete, status};
}

export default useDelete;