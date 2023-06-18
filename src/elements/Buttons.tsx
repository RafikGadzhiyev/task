import styled from '@emotion/styled';
import { ITextProps } from '../interfaces/elements.interface';
import { fontSize } from '../consts/styles';

export const OutlinedButton = styled.button<ITextProps>`
    all: unset;
    cursor: pointer;
    border-radius: 5px;
    padding: .35rem 1rem;
    color: ${(props) => props.color};
    border: 1.5px solid;
    font-size: ${(props) => fontSize[props.fontSize || 'md']};
    transition: 300ms ease-in;
    
    &:hover {
        background-color: ${(props) => props.color};
        color: rgb(255 255 255 / 1);
    }
`

export const TextButton = styled.button<ITextProps>`
    all: unset;
    cursor: pointer;
    position: relative;
    color: ${props => props.color};
    font-size: ${(props) => fontSize[props.fontSize || 'md']};
    
    &::after {
        content: '';
        width: 0;
        height: 1.5px;
        background-color: ${props => props.color};
        transition: 300ms ease;
        position: absolute;
        bottom: 0;
        left: 0;
    }

    &:hover{
        &:after {
            width: 100%;
        }
    }

`