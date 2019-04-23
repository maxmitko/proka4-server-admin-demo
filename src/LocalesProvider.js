import { locales } from 'locales'
import React from 'react';

export const LocalesContext = React.createContext();

const LocalesProvider =  props => <LocalesContext.Provider value={locales} children={props.children} />

export default LocalesProvider