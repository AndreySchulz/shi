import sprite from "../../../../common/image/svg/sprite.svg";
import { FooterBox, Icon } from "./FooterGame.styled";

const FooterGame = () => {
  return (
    <FooterBox>
      <Icon>
        <use href={`${sprite}#Smartphone`}></use>
      </Icon>
      <p>Player 1</p>
    </FooterBox>
  );
};

export default FooterGame;
