import styled from "@emotion/styled"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootStore } from "../redux/store";
import { changePostOrder } from "../redux/slices/posts.slice";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.5rem;
`;

const Buttons = styled.div`
    display: flex;
    gap: .5rem;
    margin-top: .5rem;
`;

const OrderButton = styled.button`
    all: unset;
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid #0088ee;
    font-size: .8rem;
    padding: .25rem .75rem;
    transition: 300ms ease;

    &:hover {
        background-color: #0088ee;
        color: #fff;
    }

    &.active {
        background-color: #0088aa;
        color: #fff;
    }

    &:disabled {
        cursor: text;
    }

`;

export const OrderTypeButtons = () => {
    const dispatch = useDispatch<AppDispatch>();
    const currentOrder = useSelector((store: RootStore) => store.posts.data.postsOrder)

    return <Container>
        <h3>Choose posts order</h3>
        <Buttons>
            <OrderButton
                onClick={() => dispatch(changePostOrder('old_first'))}
                className={currentOrder === 'old_first' ? 'active' : ''}
                disabled={currentOrder === 'old_first'}
            >Old first</OrderButton>
            <OrderButton
                onClick={() => dispatch(changePostOrder('new_first'))}
                className={currentOrder === 'new_first' ? 'active' : ''}
                disabled={currentOrder === 'new_first'}
            >New first</OrderButton>
        </Buttons>
    </Container>
}