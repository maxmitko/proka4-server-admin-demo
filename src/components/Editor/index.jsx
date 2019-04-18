import BraftEditor from 'braft-editor'
import React from 'react'

import { languageFn } from './braft-editor-ru'

const Editor = React.forwardRef((props, ref) => {

    return (
        <BraftEditor
            {...props}
            ref={ref}
            language={languageFn}
        />
    )
})

export default React.memo(Editor)
