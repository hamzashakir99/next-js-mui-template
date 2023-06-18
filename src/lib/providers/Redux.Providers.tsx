'use client'

/* Core */

import { Provider } from 'react-redux'

/* Instruments */
import { store } from '@/redux/store';

const Providers = (props: React.PropsWithChildren) => {
  return <Provider store={store}>{props.children}</Provider>
}

export default Providers;
