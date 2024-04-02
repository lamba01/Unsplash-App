import React, { useEffect } from 'react';
import axios from 'axios';

const RedirectPage = () => {
  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      if (code) {
        try {
          const response = await axios.post('https://unsplash.com/oauth/token', {
            params: {
              client_id: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
              client_secret: process.env.REACT_APP_UNSPLASH_CLIENT_SECRET,
              redirect_uri: 'http://localhost:3000/redirect',
              code: code,
              grant_type: 'authorization_code',
            }
          });
          console.log(response.data)
          const accessToken = response.data.access_token;
          localStorage.setItem('accessToken', accessToken);
      
          // Redirect user to home page or any other page after successful authentication
          // window.location.href = '/';
          // Inside the try block
setTimeout(() => {
  window.location.href = '/';
}, 5000); // Redirect after 5 seconds

        } catch (error) {
          console.error('Error exchanging code for access token:', error);
          // Inside the catch block
localStorage.setItem('authError', JSON.stringify(error));
// window.location.href = '/redirect';

          // Redirect user to error page or handle error accordingly
          // window.location.href = '/redirect';
        }
      }
    };

    handleCallback();
  }, []);

  return (
    <div>
      Redirecting...
    </div>
  );
};

export default RedirectPage;
