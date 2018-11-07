import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';

import ToggleMenu from '../ToggleMenu';
import DropdownItem from '../DropdownItem';
import DropdownTitle from '../DropdownTitle';

const Trigger = styled.div`
  display: flex;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  transition: .2s linear;
  border: solid 1px ${props => (props.active ? props.color : 'transparent')};
`;

const Menu = styled.div`
  display: block;
  margin-top: 4px;
  background: ${props => props.theme.lightest};
  min-width: 100px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, .2);
  white-space: nowrap;
`;

class OverflowMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false
    };
  }

  getWidthAndHeightFromSize = () => {
    const { size } = this.props;
    const sizes = {
      small: {
        width: '5px',
        height: '21px'
      },
      medium: {
        width: '7px',
        height: '29px'
      },
      large: {
        width: '10px',
        height: '40px'
      }
    };

    return sizes[size];
  }

  getColorFromAppearance = () => {
    const { appearance, theme } = this.props;
    const colors = {
      primary: theme.primary,
      secondary: theme.dark,
      success: theme.success,
      warning: theme.warning,
      light: theme.lighter,
      dark: theme.darkest
    };
    return colors[appearance];
  }

  isControlled = () =>
    typeof this.props.open !== 'undefined';

  handleMenuOpen = () => {
    this.props.onOpen();
    if (!this.isControlled()) {
      this.setState({ menuOpen: true });
    }
  }

  handleMenuClose = () => {
    this.props.onClose();
    if (!this.isControlled()) {
      this.setState({ menuOpen: false });
    }
  }

  renderTrigger = () => {
    const { menuOpen } = this.state;
    const { color: propsColor, activeColor, ...otherProps } = this.props;
    const defaultColor = propsColor || this.getColorFromAppearance();
    const color = (menuOpen && activeColor) || defaultColor;
    const size = this.getWidthAndHeightFromSize();

    return (
      <Trigger {...otherProps} color={color} active={menuOpen}>
        <svg width={size.width} height={size.height} viewBox="0 0 5 21">
          <g fillRule="evenodd" fill={color}>
            <circle cx="2.5" cy="18.5" r="2.5" />
            <circle cx="2.5" cy="10.5" r="2.5" />
            <circle cx="2.5" cy="2.5" r="2.5" />
          </g>
        </svg>
      </Trigger>
    );
  }

  render() {
    const { children, position, open, persist } = this.props;

    return (
      <ToggleMenu
        trigger={this.renderTrigger()}
        position={position}
        onOpen={this.handleMenuOpen}
        onClose={this.handleMenuClose}
        persist={persist}
        open={open}
      >
        <Menu>
          {children}
        </Menu>
      </ToggleMenu>
    );
  }
}

OverflowMenu.defaultProps = {
  appearance: 'dark',
  position: 'right',
  onOpen: () => {},
  onClose: () => null,
  size: 'small'
};

OverflowMenu.propTypes = {
  appearance: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'light',
    'dark'
  ]),
  /** Static color of the icon (Overrides appearance) */
  color: PropTypes.string,
  /** Active color of the icon (Overrides appearance) */
  activeColor: PropTypes.string,
  children: PropTypes.node.isRequired,
  position: PropTypes.string,
  /** Makes dropdown panel stay after a click inside of it. */
  persist: PropTypes.bool,
  open: PropTypes.bool,
  theme: PropTypes.object,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

OverflowMenu.Item = DropdownItem;
OverflowMenu.Title = DropdownTitle;

export default withTheme(OverflowMenu);
