import styled from "styled-components";

const featuresData = [
  {
    title: "Banking",
    text: "From they fine john he give of rich he. They age and draw mrs like. Improving end distrusts may instantly was household applauded.",
  },
  {
    title: "Insurance",
    text: "Considered sympathize ten uncommonly occasional assistance sufficient not. Letter of on become he tended active enable to.",
  },
  {
    title: "Shopping",
    text: "Led ask possible mistress relation elegance eat likewise debating. By message or am nothing amongst chiefly address.",
  },
];

export default function Hero() {
  return (
    <HeroContent>
      <HeroH1>DynaBankInsuraCart</HeroH1>
      <HeroH2>Your one-stop shop for non-stop shopping</HeroH2>
      <FeatureArea>
        {featuresData.map((item, index) => (
          <FeatureContainer key={item.title + index}>
            <FeatureTitle>
              <div />
              <h1>{item.title}</h1>
            </FeatureTitle>
            <FeatureText>
              <p>{item.text}</p>
            </FeatureText>
          </FeatureContainer>
        ))}
      </FeatureArea>
    </HeroContent>
  );
}

const FeatureTitle = styled.div`
  flex: 1;
  max-width: 180px;
  margin-right: 2rem;
  div {
    width: 38px;
    height: 3px;
    background: linear-gradient(103.22deg, #ae67fa -14%, #f49867 100%);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin-bottom: 0.25rem;
  }
  h1 {
    font-weight: 800;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: -0.04em;
    color: #fff;
  }
`;

const FeatureText = styled.div`
  flex: 2;
  max-width: 390px;
  display: flex;
  p {
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: #81afdd;
  }
`;

const FeatureContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  margin: 1rem;
`;

const FeatureArea = styled.div`
  flex: 1.5;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: row;
  margin: 2rem 0rem;
`;

const HeroH2 = styled.h3`
  margin-top: 1rem;
  color: #fff;
`;

const HeroH1 = styled.h1`
  background: linear-gradient(89.97deg, #ae67fa 1.84%, #f49867 102.67%);
  font-weight: 800;
  font-size: 52px;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media screen and (max-width: 700px) {
    font-size: 48px;
  }
`;

const HeroContent = styled.div`
  max-width: 1300px;
  background-image: url("/images/hero.png");
  background-repeat: no-repeat;
  background-size: 1200px;
  background-position-x: right;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 4rem 6rem;
  @media screen and (max-width: 700px) {
    margin-right: 1rem;
    padding: 1rem 2rem;
  }
`;
/* .gpt3__header {
    display: flex;
    flex-direction: row;
}

.gpt3__header-content {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;

    margin-right: 5rem;
}

.gpt3__header-content h1 {
    font-family: var(--font-family);
    font-weight: 800;
    font-size: 62px;
    line-height: 75px;
    letter-spacing: -0.04em;
}

.gpt3__header-content p {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 20px;
    line-height: 28px;
    color: var(--color-text);

    margin-top: 1.5rem;
}

.gpt3__header-content__input {
    width: 100%;
    margin: 2rem 0 1rem;

    display: flex;
    flex-direction: row;
}

.gpt3__header-content__input input {
    flex: 2;
    width: 100%;
    min-height: 50px;
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 20px;
    line-height: 28px;
    background: var(--color-footer);
    border: 2px solid var(--color-footer);
    padding: 0 1rem;
    outline: none;
    color: #fff;

    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}

.gpt3__header-content__input button {
    flex: 0.6;
    width: 100%;
    min-height: 50px;
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 20px;
    line-height: 28px;
    background: #FF4820;
    border: 2px solid #FF4820;
    padding: 0 1rem;
    color: #fff;
    cursor: pointer;
    outline: none;

    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}

.gpt3__header-content__people {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;

    margin-top: 2rem;
}

.gpt3__header-content__people img {
    width: 181.79px;
    height: 38px;
}

.gpt3__header-content__people p {
    margin: 0 0 0 1rem;
    font-family: var(--font-family);
    font-weight: 500;
    font-size: 12px;
    line-height: 38px;
    color: #fff;
    text-align: center;
}

.gpt3__header-image {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.gpt3__header-image img {
    width: 100%;
    height: 100%;
}

@media screen and (max-width: 1050px) {
    .gpt3__header {
        flex-direction: column;
    }

    .gpt3__header-content {
        margin: 0 0 3rem;
    }
}

@media screen and (max-width: 650px) {
    .gpt3__header-content h1 {
        font-size: 48px;
        line-height: 60px;
    }

    .gpt3__header-content p {
        font-size: 16px;
        line-height: 24px;
    }
    
    .gpt3__header-content__people {
        flex-direction: column;
    }

    .gpt3__header-content__people p {
        margin: 0;
    }

    .gpt3__header-content__input input,
    .gpt3__header-content__input button {
        font-size: 16px;
        line-height: 24px;
    }
}

@media screen and (max-width: 490px) {
    .gpt3__header-content h1 {
        font-size: 36px;
        line-height: 48px;
    }

    .gpt3__header-content p {
        font-size: 14px;
        line-height: 24px;
    }

    .gpt3__header-content__input input,
    .gpt3__header-content__input button {
        font-size: 12px;
        line-height: 16px;
    }
} */
