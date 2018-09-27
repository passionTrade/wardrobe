import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import BaseModal from 'react-modal2';
import { DESKTOP } from '../../constants/Breakpoints';
import { hexToRgba } from '../../helpers/colors';

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

export const ModalStyles = css`
  background-color: ${props => props.theme.white};
  box-shadow: 0 0 8px 0 rgba(120, 130, 139, 0.5);
  width: 100%;
  max-width: 100%;
  @media ${DESKTOP} {
    ${props => WIDTHS[props.size]};
  }

  ${HeaderStyled} {
    border-bottom: solid 1px ${props => hexToRgba(props.theme.stoneGrey, 0.5)};
    padding: ${props => PADDINGS[props.size] || PADDINGS.normal};
    font-size: 1.25em;
    font-weight: bold;
    text-align: center;
    color: ${props => props.theme.skyBlue};
    @media ${DESKTOP} {
      font-size: ${props => (props.size === 'small' ? '1.25em' : '1.5em')};
    }
  }

  ${FooterStyled} {
    border-top: solid 1px ${props => hexToRgba(props.theme.stoneGrey, 0.5)};
    padding: ${props => PADDINGS[props.size] || PADDINGS.normal};
    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    > * + * {
      margin-top: 20px;
    }

    ${props =>
    props.size !== 'small'
      && `
      @media ${DESKTOP} {
        flex-flow: row-reverse wrap;
        align-items: center;
        justify-content: space-between;
        > * + * {
          margin-top: 0;
        }
      }
    `};
  }

  ${BodyStyled} {
    padding: ${props => PADDINGS[props.size] || PADDINGS.normal};
  }
`;

const Root = styled.section`
  .ft-modal--backdrop {
    position: fixed;
    display: block;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    max-height: 100vh;
    background-color: ${props => props.backdropColor || 'rgba(0, 0, 0, 0.61)'};
    z-index: 9999;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .ft--modal--dialog {
    z-index: 10000;
    position: absolute;
    max-height: 100vh;
    &:focus {
      outline: none;
    }
    @media ${DESKTOP} {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const ModalWrapper = styled.div`
  ${ModalStyles};
  height: 100vh;
  @media ${DESKTOP} {
    height: auto;
    margin: 20px 0;
  }
`;

/**
 * Main modal component.
 */
class Modal extends Component {
  preventBodyOverflow = null;

  componentDidMount() {
    const { open, preventGlobalScroll } = this.props;
    if (open && preventGlobalScroll) {
      this.blockGlobalScroll();
    }
  }

  componentDidUpdate({ open: prevOpen }) {
    const { open, preventGlobalScroll } = this.props;
    if (!preventGlobalScroll) {
      return;
    }
    if (!prevOpen && open) {
      this.blockGlobalScroll();
    } else if (prevOpen && !open) {
      this.unblockGlobalScroll();
    }
  }

  blockGlobalScroll() {
    if (!document) return;
    this.preventBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }

  unblockGlobalScroll() {
    if (!document) return;
    document.body.style.overflow = this.preventBodyOverflow;
    this.preventBodyOverflow = null;
  }

  render() {
    const { backdropColor, open, size, children, onClose } = this.props;
    if (!open) {
      return null;
    }
    return (
      <Root backdropColor={backdropColor} size={size} role="dialog">
        <BaseModal
          onClose={onClose}
          closeOnEsc
          closeOnBackdropClick
          backdropClassName="ft-modal--backdrop"
          modalClassName="ft--modal--dialog"
        >
          <ModalWrapper size={size}>{children}</ModalWrapper>
        </BaseModal>
      </Root>
    );
  }
}

Modal.defaultProps = {
  preventGlobalScroll: true,
  size: 'normal',
};

Modal.propTypes = {
  backdropColor: PropTypes.string,
  children: PropTypes.node.isRequired,
  preventGlobalScroll: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  size: PropTypes.oneOf(['auto', 'small', 'normal', 'large']),
  onClose: PropTypes.func,
};

Modal.Header = HeaderStyled;
Modal.Footer = FooterStyled;
Modal.Body = BodyStyled;

/** @component */
export default Modal;

// Screen-readers support opt-out. See https://github.com/cloudflare/react-modal2#accessibility
BaseModal.getApplicationElement = () => null;
