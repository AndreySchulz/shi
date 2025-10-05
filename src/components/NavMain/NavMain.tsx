import sprite from "../../common/image/svg/sprite.svg";
import { Icon, Navigate } from "./NavMain.styled";

const NavMain = () => {
  return (
    <Navigate>
      <Icon>
        <use href={`${sprite}#Cup`}></use>
      </Icon>
      <Icon>
        <use href={`${sprite}#HamburgerMenu`}></use>
      </Icon>
    </Navigate>
  );
};

export default NavMain;
