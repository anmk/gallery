import { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { useNavigate } from 'react-router-dom';

const RedirectTo = ({ path }) => {
  const navigate = useNavigate();
  useEffect(() => {
    let didCancel = false;
    const goToPage = () => navigate(path);
    if (!didCancel) {
      goToPage();
    }
    return () => {
      didCancel = true;
    };
  }, [navigate, path]);
  return ('');
};

RedirectTo.propTypes = {
  path: PropTypes.string.isRequired,
};

export default RedirectTo;
