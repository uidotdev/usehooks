import styled from "styled-components";

export const Hook = styled.div`
  margin-bottom: 4rem;
`;

export const Composes = styled.div.attrs({
  className: "subtitle",
})`
  padding-top: 3px;
  font-size: 0.9rem !important;
`;

export const Name = styled.h2.attrs({
  className: "title is-3",
})`
  position: relative;

  .link-icon {
    display: none;
    position: absolute;
    left: -30px;
    top: 10px;
    opacity: 0.3;
    font-size: 22px;
  }

  a {
    color: inherit;
  }

  &:hover {
    .link-icon {
      display: inline;
    }
  }
`;

export const Content = styled.div`
  margin-bottom: 25px;
`;

export const Links = styled.div`
  background-color: #f3f9f8;
  padding: 25px;
  margin-top: 15px;
  border-radius: 10px;

  .links-title {
    margin-bottom: 8px;
    font-weight: bold;
  }
`;

export const LinksLi = styled.li`
  margin-bottom: 5px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const Info = styled.div.attrs({
  className: "level",
})`
  margin: 20px auto 0 auto;
  max-width: 560px;

  span {
    padding: 0 0.5rem;
    opacity: 0.2;
  }
`;

export const More = styled.div`
  text-align: center;
  font-size: 1.1rem;

  .next {
    margin-left: 10px;
    font-weight: bold;
  }

  i {
    opacity: 0.3;
    margin-right: 10px;
  }
`;

export const CodeContent = styled(Content)`
  .grvsc-container {
    margin-top: 2rem;
  }

  .grvsc-source {
    padding-left: 0;
  }

  ${({ language }) =>
    `.grvsc-container[data-language=${
      language === "tsx" ? "jsx" : "typescript"
    }] {
      display: none;
    }`}
`;
