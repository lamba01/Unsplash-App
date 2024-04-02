import React, { useEffect } from 'react'

function Error() {
  // Inside your error page component
useEffect(() => {
  const authError = localStorage.getItem('authError');
  if (authError) {
    console.error('Authentication Error:', JSON.parse(authError));
  }
}, []);

  return (
    <div>Error</div>
  )
}

export default Error