import sprite from "../../common/image/svg/sprite.svg";
import { useScreenNavigation } from "../../context/ScreenNavigationContext";
import { Icon, IconButton, Navigate } from "./Header.styled";
const Header = () => {
  const { goTo } = useScreenNavigation();

  return (
    <Navigate>
      <IconButton
        type="button"
        aria-label="Go to home screen"
        onClick={() => goTo("home")}
      >
        <Icon>
          <use href={`${sprite}#arrowLeft`}></use>
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

export default Header;
