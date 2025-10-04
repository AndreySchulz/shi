import sprite from "../../common/image/svg/sprite.svg";
import {
  FooterBox,
  HoldText,
  Icon,
  IconBox,
  InfoText,
} from "./FooterMain.styled";

const FooterMain = () => {
  return (
    <FooterBox>
      <IconBox>
        <Icon>
          <use href={`${sprite}#Spedometer`}></use>
        </Icon>
        <InfoText>418</InfoText>
      </IconBox>
      <IconBox>
        <Icon>
          <use href={`${sprite}#Heart`}></use>
        </Icon>
        <InfoText>
          8<HoldText>/10</HoldText>
        </InfoText>
      </IconBox>
    </FooterBox>
  );
};

export default FooterMain;
