import styled from 'styled-components/native';

export const Container = styled.View`
    margin-bottom: 5px;
    padding: 10px;
    box-shadow: 2px 2px rgba(0,0,0,0.4);
    background-color: rgba(0,0,0,0.02);

`;
export const Type = styled.View`
  width:25%;

`;
export const IconView = styled.View`
    flex-direction: row;
    background-color: ${props => props.type === 'despesa' ? '#c62c36' : '#00b94a'};
    padding: 3px 8px;
    border-radius: 7px;
    justify-content: center;
    align-items: center
`;
export const TypeText = styled.Text`
    color: #fff;
    font-size: 16px;
    font-style: italic;
`;
export const ValueText = styled.Text`
    color: #222;
    font-size: 22px;
    font-weight: bold;
`;







