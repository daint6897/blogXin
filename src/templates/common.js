import styled from "styled-components";
export const ToggleTocButton = styled.button`
  display: flex;
  position: fixed;
  justify-content: center;
  right: 20px;
  bottom: 20px;
  border-radius: 100%;
  box-shadow: 0 0 3px rgba(0, 0, 0, .03), 0 3px 46px rgba(0, 0, 0, .1);
  border: 0;
  z-index: 5000;
  width: 50px;
  height: 50px;
  background-color: #20232a;
  color: #fff;
  outline: none;

 
  @media (min-width: 900px) {
    display: none;
  }
`;
export const LeftSidebar = styled.div<{ show?: boolean }>`
  min-width: 0px;
  max-width: 0px;
  padding-left: 40px;
  transition: opacity .5s;

  
  @media (max-width: 360) {
    position: fixed;
    opacity: ${props => props.show ? 1 : 0};
    z-index: 1000;
    background-color: #fff;
    width: 100% !important;
    max-width: 100%;
    padding: 0 20px;
    margin-top: -5px;
    height: calc(100vh - 70px);
  }

  @media (max-width: 500px) {
    display: ${props => props.show ? 'unset' : 'none'};
    width: 100%;
    position:fixed;
    top: 40px;
    left: 0px;
    height: 100vh;
    background: #fff;
    max-width:1000px;
    padding:0px;  
    font-size: 18px;
  }
`;
export const TocWrapper = styled.div`
  position: sticky;
  top: 70px;
  padding: 40px 30px 40px 0;
  white-space: nowrap;
  @media (max-width: 500px) {
    padding: 20px;
    display: flex;
    justify-content: center;
  }
  
}
`;
export const BodyContent = styled.div`
  display:flex
  justify-content: center;
  @media (max-width: 500px) {
    display: unset;
  }
  h1::before, h2::before, h3::before, h4::before, h5::before, h6::before {
    display: block;
    content: " ";
    height: 60px;
    margin-top: -60px;
    visibility: hidden;
}
`;


