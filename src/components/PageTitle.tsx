import { useEffect } from 'react';
import { useLocation } from 'react-router';

interface PageTitleProps {
  title: string;
  separator?: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({
  title,
  separator = '|',
}) => {
  const location = useLocation();
  const APP_TITLE = 'React TODO';

  useEffect(() => {
    document.title = `${APP_TITLE} ${separator} ${title}`;
  }, [location, title]);

  return null;
};

export default PageTitle;
