import "./App.css";
import {
  ScreenNavigationProvider,
  useScreenNavigation,
} from "./context/ScreenNavigationContext";

const ScreenNavigator = () => {
  const { currentScreen, goPrevious, goNext, previousScreen, nextScreen } =
    useScreenNavigation();

  const { Component: CurrentComponent, title } = currentScreen;

  return (
    <div className="app">
      <CurrentComponent />
      <nav className="navigation" aria-label="Screen navigation">
        <button
          type="button"
          className="nav-button"
          onClick={goPrevious}
          aria-label={`Go to ${previousScreen.title} screen`}
        >
          &larr;
        </button>
        <span className="navigation__label">{title}</span>
        <button
          type="button"
          className="nav-button"
          onClick={goNext}
          aria-label={`Go to ${nextScreen.title} screen`}
        >
          &rarr;
        </button>
      </nav>
    </div>
  );
};

function App() {
  return (
    <ScreenNavigationProvider>
      <ScreenNavigator />
    </ScreenNavigationProvider>
  );
}

export default App;
