import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const getMargin = ({ size, theme }) => {
  switch (size) {
    case 'small':
      return theme.stackMarginSmall;
    case 'large':
      return theme.stackMarginLarge;
    case 'normal':
    default:
      return theme.stackMarginBase;
  }
};

const stackVertical = css`
  flex-flow: column nowrap;
  > * + * {
    margin-top: ${getMargin};
  }
`;
const stackHorizontal = css`
  flex-flow: row nowrap;
  > * + * {
    margin-left: ${getMargin};
  }
`;

const Stack = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  ${p => (p.direction === 'horizontal' ? stackHorizontal : stackVertical)};
`;

Stack.defaultProps = {
  size: 'normal',
  direction: 'vertical',
};

Stack.propTypes = {
  size: PropTypes.oneOf(['small', 'normal', 'large']),
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
};

/** @component */
export default Stack;
