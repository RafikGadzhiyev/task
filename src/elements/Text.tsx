import styled from '@emotion/styled';
import { ITextProps } from '../interfaces/elements.interface';
import { fontSize } from '../consts/styles';

export const Text = styled.span<ITextProps>`
    color: ${(props) => props.color};
    font-size: ${(props) => fontSize[props.fontSize || 'md']};
    font-style: ${props => props.fontStyle};
`;