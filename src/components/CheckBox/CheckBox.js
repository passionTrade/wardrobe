import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled('span')`
  pointer-events: ${p => (p.isDisabled ? 'none' : 'initial')};
  opacity: ${p => (p.isDisabled ? '0.3' : 'initial')};
  cursor: pointer;
  line-height: 1;
  display: inline-flex;
  align-items: center;
`;

const Input = styled('span')`
  display: inline-block;
  position: relative;
  width: .8125em;
  height: .8125em;
  border-radius: 50%;
  box-shadow: 0px 0px 0px 1px ${p => (p.isChecked ? p.theme.skyBlue : p.theme.stoneGrey)};
  background: ${p => (p.isChecked ? p.theme.skyBlue : 'transparent')};
  border: solid .05em #fff;
  box-sizing: border-box;
  transition: background .3s ease-out;
`;

const Label = styled('span')`
  display: inline-block;
  margin-left: 8px;
  user-select: none;
`;

const InputWrapper = styled('span')`
  display: flex;
  align-items: center;
`;

const CheckBox = ({ label, isChecked, isDisabled, onToggle }) => (
  <Wrapper onClick={onToggle} isDisabled={isDisabled}>
    <InputWrapper>
      <Input isChecked={isChecked} />
    </InputWrapper>
    <Label>{label}</Label>
  </Wrapper>
);

CheckBox.defaultProps = {
  onToggle: () => null
};

CheckBox.propTypes = {
  onToggle: PropTypes.func,
  label: PropTypes.string,
  isDisabled: PropTypes.bool,
  isChecked: PropTypes.bool
};

export default CheckBox;