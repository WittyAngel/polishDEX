import React, { useState } from 'react';

import Landing from 'components/Landing';
import { useAuthenticationContext } from 'context/AuthenticationContext';
import Profile from './Profile';

const ProfileWrapper = () => {
  const { isAuthenticated } = useAuthenticationContext();

  return <>{isAuthenticated ? <Profile /> : <Landing />}</>;
};

export default ProfileWrapper;
