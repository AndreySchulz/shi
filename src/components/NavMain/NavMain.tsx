import sprite from "../../common/image/svg/sprite.svg";
import { useScreenNavigation } from "../../context/ScreenNavigationContext";
import { Icon, IconButton, Navigate } from "./NavMain.styled";

const NavMain = () => {
  const { goTo } = useScreenNavigation();

  return (
    <Navigate>
      <IconButton
        type="button"
        aria-label="Go to table screen"
        onClick={() => goTo("table")}
      >
        <Icon>
          <use href={`${sprite}#Cup`}></use>
        </Icon>
      </IconButton>
      <IconButton type="button" aria-label="Open navigation menu">
        <Icon>
          <use href={`${sprite}#HamburgerMenu`}></use>
        </Icon>
      </IconButton>
    </Navigate>
  );
};

export default NavMain;
