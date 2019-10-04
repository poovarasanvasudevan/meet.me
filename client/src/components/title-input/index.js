import React from 'react';
import styled from 'styled-components';
import {colors, themed} from '@atlaskit/theme';
import {useStateValue} from "../../pages/blog/editor/util/context";


const TitleArea = styled.textarea`
  border: none;
  outline: none;
  font-size: 2.07142857em;
  margin: 0 0 21px;
  padding: 0;
  width: 100%;
  resize: none;
  vertical-align: bottom;
  color: ${themed({light: 'black', dark: colors.DN900})};

  /* Blend into the page bg colour. This way it's theme agnostic. */
  background: transparent;

  &::placeholder {
    color: ${colors.N90};
  }
`;
TitleArea.displayName = 'TitleArea';



export default function (props) {

    const [{title}, dispatch] = useStateValue();
    const handleTitleResize = (e) => {
        const elem = e.target;
        elem.style.height = 'inherit';
        elem.style.height = `${elem.scrollHeight}px`;
    };

    const handleUpdate = (e) => {
        handleTitleResize(e);
        dispatch({type: 'title', title: e.target.value})
    };

    return (
        <TitleArea
            id="editor-title"
            placeholder={props.placeholder || 'Give this page a title...'}
            rows="1"
            value={title}
            onChange={handleUpdate}
            innerRef={props.innerRef}
            onFocus={props.onFocus}
            onBlur={props.onBlur}
            onKeyDown={props.onKeyDown}
        />
    );

}
