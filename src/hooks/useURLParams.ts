import { useLocation } from 'react-router-dom';

const useURLParams = () => {
  return new URLSearchParams(useLocation().search);
};

export default useURLParams;
