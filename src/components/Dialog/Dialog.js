import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PADDINGS = {
  small: '16px 24px',
  normal: '24px 48px',
  large: '24px 48px',
};

const WIDTHS = {
  small: 'width: 300px',
  normal: 'width: 600px',
  large: 'width: 900px',
  auto: `
    width: auto;
    max-width: 900px;
  `,
};

const HeaderStyled = styled.header.attrs({ tabIndex: 0 })`
  outline: none;
`;

const FooterStyled = styled.footer``;

const BodyStyled = styled.div``;

const WrapperResponsive = `
  ${p => p.theme.desktop_up`
    flex-flow: row-reverse wrap;
    align-items: center;
    justify-content: space-between;
    > * + * {
      margin-top: 0;
    }
  `};
`;

const Wrapper = styled.div`
  background-color: ${props => props.theme.white};
  box-shadow: 0 0 8px 0 rgba(120, 130, 139, 0.5);
  width: 100%;
  max-width: 100%;
  ${p => p.theme.desktop_up`
    ${props => WIDTHS[props.size]};
  `};

  ${HeaderStyled} {
    border-bottom: solid 1px ${props => props.theme.grey05};
    padding: ${props => PADDINGS[props.size] || PADDINGS.normal};
    font-size: 1.25em;
    font-weight: bold;
    text-align: center;
    color: ${props => props.theme.primary};
    ${p => p.theme.desktop_up`
      font-size: ${props => (props.size === 'small' ? '1.25em' : '1.5em')};
    `};
  }

  ${FooterStyled} {
    border-top: solid 1px ${props => props.theme.grey05};
    padding: ${props => PADDINGS[props.size] || PADDINGS.normal};
    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    > * + * {
      margin-top: 20px;
    }

    ${props => props.size !== 'small' && WrapperResponsive};
  }

  ${BodyStyled} {
    padding: ${props => PADDINGS[props.size] || PADDINGS.normal};
  }
`;

/**
 * Dialog component.
 */
function Dialog(props) {
  const { size, children, ...otherProps } = props;
  return (
    <Wrapper {...otherProps} size={size}>
      {children}
    </Wrapper>
  );
}

Dialog.defaultProps = {
  size: 'normal',
};

Dialog.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['auto', 'small', 'normal', 'large']),
};

Dialog.Header = HeaderStyled;
Dialog.Footer = FooterStyled;
Dialog.Body = BodyStyled;

/** @component */
export default Dialog;
