import React, { useMemo } from 'react';

import { UserLoginContext } from '../context';

const UserLoginProvider = ({children}) => {
    const value = useMemo(() => ({
    }), []);

    return (
        <UserLoginContext.Provider value={value}>
            {children}
        </UserLoginContext.Provider>
    )
}
export default UserLoginProvider;