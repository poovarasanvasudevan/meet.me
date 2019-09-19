import styled from "styled-components";
import {Link} from "react-router-dom";
import React from "react";

const MLink = styled(Link)`
    text-decoration: none;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

const RouterLink = (props) => {

    const {
        children,
        className,
        href,
        onMouseEnter,
        onMouseLeave,
    } = props;

    return (
        <MLink
            className={className}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            to={href}
        >
            {children}
        </MLink>
    );

};

export  {
    MLink,
    RouterLink
}
