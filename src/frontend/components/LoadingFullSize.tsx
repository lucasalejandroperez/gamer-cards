import styled from 'styled-components';
import { Loading } from './Loading';

export const LoadingFullSize = () => {

    const LoadingContainer = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    `;

    return (
        <LoadingContainer>
            <Loading />
        </LoadingContainer>
    )
}
