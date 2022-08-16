import useSettings from 'app/hooks/useSettings';
import logo from '../../images/logo.png';

const MatxLogo = ({ className }) => {
  const { settings } = useSettings();
  const theme = settings.themes[settings.activeTheme];

  return (
    <img src={logo} className={className} style={{width: '40px', height: '40px'}}/>
  );
};

export default MatxLogo;
