import { locales } from 'locales'
import React from 'react';

export const LocalesContext = React.createContext();

export default props => <LocalesContext.Provider value={locales} children={props.children} />