import React from 'react';


import {AppButton} from '../../components/theme/button';
import EmptyState from '@atlaskit/empty-state';
import {MLink} from '../../components/theme/link';

export default function (props) {

    console.log("dash");
    const primaryAction = (
        <AppButton
            primary="true"
            href="/"
            component={React.forwardRef(({href = '', children, ...rest}, ref) => (
                <MLink {...rest} to={href} innerRef={ref}>
                    {children}
                </MLink>
            ))}
        >
            Home
        </AppButton>
    );


    const pageProps = {
        header: 'Oops!',
        description: `Page you are looking does not exists`,
        primaryAction,
    };
    return (
        <div>
            <EmptyState {...pageProps} />
        </div>
    );
}
